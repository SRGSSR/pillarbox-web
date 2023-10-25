import Pillarbox from '../../src/pillarbox.js';
import DataProvider from '../dataProvider/services/DataProvider.js';
import Image from '../utils/Image.js';
import Drm from '../utils/Drm.js';
import AkamaiTokenService from '../utils/AkamaiTokenService.js';
import SRGAnalytics from '../analytics/SRGAnalytics.js';

// Translations
import '../lang/de.js';
import '../lang/en.js';
import '../lang/fr.js';
import '../lang/it.js';
import '../lang/rm.js';

class SrgSsr {
  /**
   * Set a blocking reason according to the block reason returned
   * by mediaData.
   *
   * @param {VideoJsPlayer} player
   * @param {String} blockReason
   * @param {Object} srcMediaObj
   *
   * @returns {undefined|Boolean}
   */
  static blockingReason(player, blockReason, srcMediaObj) {
    if (!blockReason) return;

    const message = player.localize(blockReason);

    SrgSsr.error(player, {
      code: MediaError.MEDIA_ERR_ABORTED,
      message,
      cause: { type: blockReason, src: srcMediaObj },
    });

    return true;
  }

  /**
   * Add the Akamai token to all resources
   * if at least one of them has tokenType
   * set to Akamai.
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Promise<Array.<Object>>}
   */
  static async composeAkamaiResources(resources = []) {
    if (!AkamaiTokenService.hasToken(resources)) Promise.resolve(resources);

    // TODO allow to modify the Akamai URL
    return AkamaiTokenService.tokenizeSources(resources);
  }

  /**
   * Add the keySystems property to all resources
   * if at least one of them has DRM.
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Array.<Object>}
   */
  static composeKeySystemsResources(resources = []) {
    if (!Drm.hasDrm(resources)) resources;

    return resources.map((resource) => ({
      ...resource,
      ...Drm.buildKeySystems(resource.drmList),
    }));
  }

  /**
   * Get the main resources from a mediaComposition.
   * May add an Akamai token or key systems if required by the resource.
   *
   * @param {import('../dataProvider/model/MediaComposition.js').default} mediaComposition
   *
   * @returns {Promise<Array.<Object>>}
   */
  static composeMainResources(mediaComposition) {
    return SrgSsr.composeAkamaiResources(
      SrgSsr.composeKeySystemsResources(mediaComposition.getMainResources())
    );
  }

  /**
   * Compose source options with media data.
   * MediaData properties from source options overwrite mediaData from IL.
   *
   * @param {Object} srcOptions - provided by player.src
   * @param {Object} mediaData - provided by mediaComposition
   *
   * @returns {Object}
   */
  static composeSrcMediaData(
    { mediaData: srcMediaData, disableTrackers },
    { url, mimeType, keySystems, ...mediaData }
  ) {
    return {
      src: url,
      type: mimeType,
      keySystems,
      disableTrackers,
      mediaData: Pillarbox.obj.merge(mediaData, srcMediaData),
    };
  }

  /**
   * SRG SSR data provider singleton.
   *
   * @param {VideoJsPlayer} player
   *
   * @returns {DataProvider}
   */
  static dataProvider(player) {
    if (!player.options().srgOptions.dataProvider) {
      const { dataProviderHost } = player.options().srgOptions;
      const dataProvider = new DataProvider(dataProviderHost);

      player.options({
        srgOptions: {
          dataProvider,
        },
      });
    }

    return player.options().srgOptions.dataProvider;
  }

  /**
   * Set an error if something goes wrong with the data provider.
   *
   * @param {VideoJsPlayer} player
   * @param {Object} error
   *
   * @returns {undefined|true}
   */
  static dataProviderError(player, error) {
    const hasError =
      error.url && error.url.includes(SrgSsr.dataProvider(player).baseUrl);

    if (!hasError) return;

    SrgSsr.error(player, {
      code: 0,
      message: player.localize('UNKNOWN'),
      cause: {
        type: 'UNKNOWN',
        urn: player.src(),
        status: error.status,
        statusText: error.statusText,
        url: error.url,
      },
    });

    return true;
  }

  /**
   * Set player error.
   *
   * @param {VideoJsPlayer} player
   * @param {Object} error
   */
  static error(player, { code, message, cause }) {
    player.error(null);

    player.error({
      code,
      message,
      cause,
    });
  }

  /**
   * Get mediaComposition from an URN.
   *
   * @param {String} urn
   * @param {DataProvider} dataProvider
   *
   * @returns {MediaComposition}
   */
  static async getMediaComposition(urn, dataProvider = new DataProvider()) {
    return dataProvider.getMediaCompositionByUrn(urn);
  }

  /**
   * Get the mediaData most likely to be compatible depending on the browser.
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Object} By default, the first entry is used if none is compatible.
   */
  static getMediaData(resources = []) {
    if (AkamaiTokenService.hasToken(resources)) return resources[0];

    const type = Pillarbox.browser.IS_ANY_SAFARI ? 'HLS' : 'DASH';
    const resource = resources.find(({ streaming }) => streaming === type);

    return resource || resources[0];
  }

  /**
   * SRG SSR analytics singleton.
   *
   * @param {VideoJsPlayer} player
   *
   * @returns
   */
  static srgAnalytics(player) {
    if (player.options().trackers.srgAnalytics === false) return;

    if (!player.options().trackers.srgAnalytics) {
      const srgAnalytics = new SRGAnalytics(player, {
        debug: player.debug(),
        playerVersion: Pillarbox.VERSION.pillarbox,
        tagCommanderScriptURL:
          player.options().srgOptions.tagCommanderScriptURL,
      });

      player.options({
        trackers: {
          srgAnalytics,
        },
      });
    }
  }

  /**
   * Update player's poster.
   *
   * @param {VideojsPlayer} player
   * @param {MediaComposition} mediaComposition
   * @param {Image} imageService
   */
  static updatePoster(player, mediaComposition, imageService = Image) {
    player.poster(
      imageService.scale({
        url: mediaComposition.getMainChapterImageUrl(),
      })
    );
  }

  /**
   * Update player titleBar with title and description.
   *
   * @param {VideojsPlayer} player
   * @param {MediaComposition} mediaComposition
   */
  static updateTitleBar(player, mediaComposition) {
    if (!player.titleBar) return;

    player.titleBar.update({
      title: mediaComposition.getMainChapter().vendor,
      description: mediaComposition.getMainChapter().title,
    });
  }

  /**
   * Middleware to resolve SRG SSR URNs into playable media.
   *
   * @param {VideojsPlayer} player
   * @param {Image} imageService
   *
   * @returns {Object}
   */
  static middleware(player, imageService = Image) {
    return {
      /* eslint max-statements: ["error", 15]*/
      setSource: async (srcObj, next) => {
        try {
          const { src: urn, ...srcOptions } = srcObj;
          const { mediaComposition } = await SrgSsr.getMediaComposition(
            urn,
            SrgSsr.dataProvider(player)
          );
          const mainResources = await SrgSsr.composeMainResources(
            mediaComposition
          );
          const mediaData = SrgSsr.getMediaData(mainResources);
          const srcMediaObj = SrgSsr.composeSrcMediaData(srcOptions, mediaData);

          SrgSsr.srgAnalytics(player);
          SrgSsr.updateTitleBar(player, mediaComposition);
          SrgSsr.updatePoster(player, mediaComposition, imageService);

          if (SrgSsr.blockingReason(player, mediaData.blockReason, srcMediaObj))
            return;

          return next(null, srcMediaObj);
        } catch (error) {
          if (SrgSsr.dataProviderError(player, error)) return;

          return next(error);
        }
      },
    };
  }
}

Pillarbox.use('srgssr/urn', SrgSsr.middleware);

export default SrgSsr;
