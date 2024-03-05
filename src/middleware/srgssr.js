import pillarbox from '../../src/pillarbox.js';
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
   * Adds blocked segments to the player.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Array} [segments=[]]
   */
  static addBlockedSegments(player, segments = []) {
    const trackId = 'srgssr-blocked-segments';
    const removeTrack = player.textTracks().getTrackById(trackId);

    if (removeTrack) {
      player.textTracks().removeTrack(removeTrack);
    }

    if (!Array.isArray(segments) || !segments.length) return;

    const blockedSegments = segments.filter(segment => segment.blockReason);

    if (!blockedSegments.length) return;

    SrgSsr.createTextTrack(player, trackId).then(segmentTrack => {
      blockedSegments.forEach(segment => {
        SrgSsr.addTextTrackCue(segmentTrack, segment);
      });

      player.textTracks().addTrack(segmentTrack);
    });
  }

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
   * Add a new cue to a text track with the given data.
   *
   * @param {TextTrack} textTrack
   * @param {Object} data SRG SSR's cue-like representation
   * @param {number} data.markIn The start time in milliseconds
   * @param {number} data.fullLengthMarkIn Alternative start time in milliseconds
   * @param {number} data.markOut The end time in milliseconds
   * @param {number} data.fullLengthMarkOut The alternative end time in milliseconds
   */
  static addTextTrackCue(textTrack, data) {
    const startTime = (data.markIn ?? data.fullLengthMarkIn) / 1_000;
    const endTime = (data.markOut ?? data.fullLengthMarkOut) / 1_000;

    textTrack.addCue(new VTTCue(
      startTime,
      endTime,
      JSON.stringify(data)
    ));
  }

  /**
   * Add multiple text tracks to the player.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Object} mediaData
   */
  static addTextTracks(player, { mediaData }) {
    SrgSsr.addRemoteTextTracks(player, mediaData.subtitles);
    SrgSsr.addChapters(player, mediaData.urn, mediaData.chapters);
    SrgSsr.addBlockedSegments(player, mediaData.blockedSegments);
    SrgSsr.addIntervals(player, mediaData.intervals);
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

    SrgSsr.createTextTrack(player, trackId).then(chapterTrack => {
      chapters.forEach(chapter => {
        if (chapterUrn !== chapter.fullLengthUrn) return;

        SrgSsr.addTextTrackCue(chapterTrack, chapter);
      });

      player.textTracks().addTrack(chapterTrack);
    });
  }

  /**
   * Adds intervals to the player.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Array} [intervals=[]]
   */
  static addIntervals(player, intervals = []) {
    const trackId = 'srgssr-intervals';
    const removeTrack = player.textTracks().getTrackById(trackId);

    if (removeTrack) {
      player.textTracks().removeTrack(removeTrack);
    }

    if (!Array.isArray(intervals) || !intervals.length) return;

    SrgSsr.createTextTrack(player, trackId).then(intervalTrack => {
      intervals.forEach(interval => {
        SrgSsr.addTextTrackCue(intervalTrack, interval);
      });

      player.textTracks().addTrack(intervalTrack);
    });
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
  static blockingReason(player, srcMediaObj) {
    if (!srcMediaObj.mediaData.blockReason) return;

    const message = player.localize(srcMediaObj.mediaData.blockReason);

    SrgSsr.error(player, {
      code: MediaError.MEDIA_ERR_ABORTED,
      message,
      metadata: {
        errorType: srcMediaObj.mediaData.blockReason,
        src: srcMediaObj
      },
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
      mediaData: pillarbox.obj.merge(mediaData, srcMediaData),
    };
  }

  /**
   * Create a new metadata text track.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {String} trackId Text track unique ID
   *
   * @returns {Promise<TextTrack>}
   */
  static createTextTrack(player, trackId) {
    // See https://github.com/videojs/video.js/issues/8519
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new pillarbox.TextTrack({
          id: trackId,
          kind: 'metadata',
          label: trackId,
          tech: player.tech(true),
        }));
      }, 100);
    });
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
   * Get the current blocked segment from the player.
   *
   * @param {import('video.js/dist/types/player').default} player
   *
   * @returns {VTTCue|undefined} The blocked segment cue object, or undefined
   */
  static getBlockedSegment(player) {
    const trackId = 'srgssr-blocked-segments';
    const blockedSegmentsTrack = player.textTracks().getTrackById(trackId);

    if (!blockedSegmentsTrack) return;

    /** @type {VTTCue} */
    const [blockedCue] = Array.from(blockedSegmentsTrack.activeCues);

    return blockedCue;
  }

  /**
   * Get the end time of a blocked segment.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Number} currentTime
   *
   * @returns {Number|undefined} The end time of a blocked segment, or undefined
   */
  static getBlockedSegmentEndTime(player, currentTime) {
    const blockedSegment = SrgSsr.getBlockedSegment(player);

    if (!blockedSegment) return;

    const isBlocked = currentTime >= blockedSegment.startTime &&
      currentTime < blockedSegment.endTime;

    return isBlocked ? blockedSegment.endTime : undefined;
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

    const type = pillarbox.browser.IS_ANY_SAFARI ? 'HLS' : 'DASH';
    const resource = resources.find(({ streaming }) => streaming === type);

    return resource || resources[0];
  }

  /**
   * Get the source media object.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Object} srcObj
   *
   * @returns {Promise<Object>} - The composed source media data.
   */
  static async getSrcMediaObj(player, srcObj) {
    const { src: urn, ...srcOptions } = srcObj;
    const { mediaComposition } = await SrgSsr.getMediaComposition(
      urn,
      SrgSsr.dataProvider(player)
    );
    const mainResources = await SrgSsr.composeMainResources(
      mediaComposition
    );
    const mediaData = SrgSsr.getMediaData(mainResources);

    return SrgSsr.composeSrcMediaData(srcOptions, mediaData);
  }

  /**
   * Handles the middleware's currentTime function.
   * - If the current time is between the start and end of a blocked segment,
   *   the blocked portion will be skipped.
   *
   * _Note_: This function should disappear as soon as this behavior is
   *         supported on the packaging side.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {number} currentTime
   *
   * @returns {number}
   */
  static handleCurrentTime(player, currentTime) {
    const blockedSegmentEndTime = SrgSsr
      .getBlockedSegmentEndTime(player, currentTime);

    if (!Number.isFinite(blockedSegmentEndTime)) {
      return currentTime;
    }

    if (!pillarbox.browser.IS_FIREFOX) {
      player.textTracks().getTrackById('srgssr-blocked-segments').trigger('cuechange');
    }

    player.currentTime(blockedSegmentEndTime);

    return blockedSegmentEndTime;
  }

  /**
   * Handles the middleware's setCurrentTime function.
   * - Modify the current time if the value is between the start and end of a
   *   blocked segment.
   *
   * _Note_: This function should disappear as soon as this behavior is
   *         supported on the packaging side.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {number} currentTime
   *
   * @returns {number}
   */
  static handleSetCurrentTime(player, currentTime) {
    const blockedSegmentEndTime = SrgSsr
      .getBlockedSegmentEndTime(player, currentTime);

    return Number
      .isFinite(blockedSegmentEndTime) ? blockedSegmentEndTime : currentTime;
  }

  /**
   * Handles the middleware's setSource function.
   *
   * This function allows to:
   * - resolve a URN into media that can be played by the player
   * - initialize media playback tracking
   * - update the title bar
   * - handle blocking reasons
   * - add remote subtitles
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {number} currentTime
   *
   * @returns {number}
   */
  static async handleSetSource(player, srcObj, next) {
    try {
      const srcMediaObj = await SrgSsr.getSrcMediaObj(player, srcObj);

      SrgSsr.srgAnalytics(player);
      SrgSsr.updateTitleBar(player, srcMediaObj);
      SrgSsr.updatePoster(player, srcMediaObj);

      if (SrgSsr.blockingReason(player, srcMediaObj)) return;

      SrgSsr.addTextTracks(player, srcMediaObj);

      return next(null, srcMediaObj);
    } catch (error) {
      if (SrgSsr.dataProviderError(player, error)) return;

      return next(error);
    }
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
        playerVersion: pillarbox.VERSION.pillarbox,
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
   * @param {Object} srcMediaObj
   * @param {Image} imageService
   */
  static updatePoster(player, srcMediaObj, imageService = Image) {
    player.poster(
      imageService.scale({
        url: srcMediaObj.mediaData.imageUrl,
      })
    );
  }

  /**
   * Update player titleBar with title and description.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Object} srcMediaObj
   */
  static updateTitleBar(player, srcMediaObj) {
    if (!player.titleBar) return;

    player.titleBar.update({
      title: srcMediaObj.mediaData.vendor,
      description: srcMediaObj.mediaData.title,
    });
  }

  /**
   * Middleware to resolve SRG SSR URNs into playable media.
   *
   * @param {import('video.js/dist/types/player').default} player
   *
   * @returns {Object}
   */
  static middleware(player) {
    return {
      currentTime: (currentTime) =>
        SrgSsr.handleCurrentTime(player, currentTime),
      setCurrentTime: (currentTime) =>
        SrgSsr.handleSetCurrentTime(player, currentTime),
      setSource: async (srcObj, next) =>
        SrgSsr.handleSetSource(player, srcObj, next),
    };
  }
}

pillarbox.use('srgssr/urn', SrgSsr.middleware);

// Add Middleware specific options
pillarbox.options.srgOptions = {
  dataProviderHost: undefined,
  tagCommanderScriptURL: undefined,
};

export default SrgSsr;
