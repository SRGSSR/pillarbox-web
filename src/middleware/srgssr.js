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

/**
 * @class SrgSsr
 */
class SrgSsr {
  /**
   * Adds remote text tracks from an array of subtitles.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Array} [subtitles=[]]
   */
  static addRemoteTextTracks(player, subtitles = []) {
    if (!Array.isArray(subtitles)) return;

    subtitles.forEach(({
      type,
      language: label,
      locale: language,
      url: src
    }) => {
      player.addRemoteTextTrack({
        kind: type === 'SDH' ? 'captions' : 'subtitles',
        label,
        language,
        src
      });
    });
  }

  /**
   * Adds chapters to the player.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {string} chapterUrn The URN of the main chapter.
   * @param {Array} [chapters=[]]
   */
  static addChapters(player, chapterUrn, chapters = []) {
    const trackId = 'srgssr-chapters';
    const removeTrack = player.textTracks().getTrackById(trackId);

    if (removeTrack) {
      player.textTracks().removeTrack(removeTrack);
    }

    if (!Array.isArray(chapters) || !chapters.length) return;

    const chapterTrack = new Pillarbox.TextTrack({
      tech: player.tech(true),
      kind: 'metadata',
      id: trackId
    });

    chapters.forEach(chapter => {
      if (chapterUrn !== chapter.fullLengthUrn) return;

      chapterTrack.addCue({
        startTime: chapter.fullLengthMarkIn / 1_000,
        endTime: chapter.fullLengthMarkOut / 1_000,
        text: JSON.stringify(chapter)
      });
    });

    player.textTracks().addTrack(chapterTrack);
  }

  /**
   * Set a blocking reason according to the block reason returned
   * by mediaData.
   *
   * @param {import('video.js/dist/types/player').default} player
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
      metadata: { errorType: blockReason, src: srcMediaObj },
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
    if (!AkamaiTokenService.hasToken(resources)) {
      return Promise.resolve(resources);
    }

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
      SrgSsr.composeKeySystemsResources(
        SrgSsr.filterIncompatibleResources(mediaComposition.getMainResources())
      )
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
   * @param {import('video.js/dist/types/player').default} player
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
   * @param {import('video.js/dist/types/player').default} player
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
      metadata: {
        errorType: 'UNKNOWN',
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
   * @param {import('video.js/dist/types/player').default} player
   * @param {Object} error
   */
  static error(player, { code, message, metadata }) {
    player.error(null);

    player.error({
      code,
      message,
      metadata,
    });
  }

  /**
   * Filter out incompatible resources such as `RTMP` and `HDS`.
   *
   * @param {Array.<Object>} resources Resources to filter
   *
   * @returns {Array.<Object>} The filtered resources
   */
  static filterIncompatibleResources(resources = []) {
    return resources.filter(
      (resource) => !['RTMP', 'HDS'].includes(resource.streaming)
    );
  }

  /**
   * Get mediaComposition from an URN.
   *
   * @param {String} urn
   * @param {DataProvider} dataProvider
   *
   * @returns {Promise<{mediaComposition: import('../dataProvider/model/MediaComposition.js').default}>}
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
   * @param {import('video.js/dist/types/player').default} player
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
   * @param {import('video.js/dist/types/player').default} player
   * @param {import('../dataProvider/model/MediaComposition.js').default} mediaComposition
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
   * @param {import('video.js/dist/types/player').default} player
   * @param {import('../dataProvider/model/MediaComposition.js').default} mediaComposition
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
   * @param {import('video.js/dist/types/player').default} player
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

          SrgSsr.addRemoteTextTracks(player, mediaData.subtitles);
          SrgSsr.addChapters(player, mediaData.urn, mediaData.chapters);

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

// Add Middleware specific options
Pillarbox.options.srgOptions = {
  dataProviderHost: undefined,
  tagCommanderScriptURL: undefined,
};

export default SrgSsr;
