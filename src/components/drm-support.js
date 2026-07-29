import videojs from 'video.js';

/** @import Component from 'video.js/dist/types/component' */
/** @import Player from 'video.js/dist/types/player' */

/**
 * @ignore
 * @type {typeof Component}
 */
const Component = videojs.getComponent('Component');

/**
 * A component that provides DRM support detection.
 *
 * @class DrmSupport
 *
 * @extends {Component}
 */
class DrmSupport extends Component {
  /**
   * Creates an instance of DrmSupport.
   *
   * @param {Player} player the player instance
   * @param {Object} [options={}] the component options
   */
  constructor(player, options = {}) {
    const opts = videojs.obj.merge(options, { createEl: false });

    super(player, opts);
  }

  /**
   * Checks DRM and HDCP capabilities.
   *
   * @param {Object} [options={}] configuration options
   * @param {string} [options.contentType='video/mp4; codecs="avc1.42E01E"'] video content type to test
   * @param {string[]} [options.initDataTypes=['cenc']] initialization data types
   *
   * @returns {Promise<Object>} object containing supported levels and HDCP per vendor
   *
   * @example
   * player.drmSupport.check().then((results) => {
   *   console.log('DRM Support Results:', results);
   *   // Example output:
   *   // {
   *   //   widevine: { level: 'L1', hdcp: '2.2' },
   *   //   playReady: null,
   *   //   fairPlay: null,
   *   //   clearKey: { level: 'Supported', hdcp: null }
   *   // }
   * });
   *
   * @example
   * player.drmSupport().check({
   *   contentType: 'video/mp4; codecs="avc1.4d401e"',
   *   initDataTypes: ['cenc', 'keyids']
   * }).then((results) => {
   *   console.log('DRM Support Results:', results)
   * });
   */
  async check({
    contentType = 'video/mp4; codecs="avc1.42E01E"',
    initDataTypes = ['cenc']
  } = {}) {
    const results = {};
    const promises = Object.entries(DrmSupport.DRM_CONFIG).map(
      async ([key, { vendor, levels }]) => {
        results[key] =
          await this.checkVendor(vendor, levels, initDataTypes, contentType);
      }
    );

    await Promise.all(promises);

    return results;
  }

  /**
   * Tests robustness levels and HDCP for specific DRM vendor.
   *
   * @param {string} vendor key system identifier
   * @param {Array<{robustness: string, label: string}>} levels array of robustness levels to test
   * @param {string[]} initDataTypes initialization data types
   * @param {string} contentType video content type
   *
   * @returns {Promise<{level: string, hdcp: string|null}|null>} supported level and HDCP or null
   */
  async checkVendor(vendor, levels, initDataTypes, contentType) {
    for (const { robustness, label } of levels) {
      try {
        const config = [{
          initDataTypes,
          videoCapabilities: [{ contentType, robustness }]
        }];

        const access =
          await navigator.requestMediaKeySystemAccess(vendor, config);
        const mediaKeys = await access.createMediaKeys();
        const hdcp = await this.findMaxHdcp(mediaKeys);

        return { level: label, hdcp };
      } catch (e) {
        videojs.log.debug(
          'DrmSupport',
          `checkVendor failed (vendor=${vendor}, level=${label}, contentType=${contentType}, robustness=${robustness})`,
          e
        );
      }
    }

    return null;
  }

  /**
   * Iterates through HDCP versions to find maximum supported version.
   *
   * @param {MediaKeys} mediaKeys instantiated MediaKeys object
   *
   * @returns {Promise<string|null>} maximum usable HDCP version or null
   */
  async findMaxHdcp(mediaKeys) {
    if (!mediaKeys.getStatusForPolicy) {
      return null;
    }

    const versions = ['2.3', '2.2', '2.1', '2.0', '1.4', '1.3', '1.2', '1.1', '1.0'];

    for (const version of versions) {
      const status = await mediaKeys
        .getStatusForPolicy({ minHdcpVersion: version })
        .catch(() => null);

      if (status === 'usable') {
        return version;
      }
    }

    return null;
  }

  /**
   * Returns static DRM configuration matrix.
   *
   * @returns {Object} DRM configuration
   */
  static get DRM_CONFIG() {
    return {
      widevine: {
        vendor: 'com.widevine.alpha',
        levels: [
          { robustness: 'HW_SECURE_ALL', label: 'L1' },
          { robustness: 'SW_SECURE_CRYPTO', label: 'L3' }
        ]
      },
      playReady: {
        vendor: 'com.microsoft.playready',
        levels: [
          { robustness: '3000', label: 'SL3000' },
          { robustness: '2000', label: 'SL2000' }
        ]
      },
      fairPlay: {
        vendor: 'com.apple.fps',
        levels: [
          { robustness: '', label: 'Supported' }
        ]
      },
      clearKey: {
        vendor: 'org.w3.clearkey',
        levels: [
          { robustness: '', label: 'Supported' }
        ]
      }
    };
  }
}

videojs.registerComponent('DrmSupport', DrmSupport);

export default DrmSupport;
