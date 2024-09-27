import Pillarbox from '../../src/pillarbox.js';
import DataProvider from '../dataProvider/services/DataProvider.js';
import Image from '../utils/Image.js';
import Drm from '../utils/Drm.js';
import AkamaiTokenService from '../utils/AkamaiTokenService.js';
import SRGAnalytics from '../trackers/SRGAnalytics.js';
import PillarboxMonitoring from '../trackers/PillarboxMonitoring.js';
import MediaComposition from '../dataProvider/model/MediaComposition.js';

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
   * @param {Array<import('../dataProvider/model/typedef').Segment>} [segments=[]]
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
   * @param {Array<import('../dataProvider/model/typedef').Subtitle>} [subtitles=[]]
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
   * @param {
   *   import('../dataProvider/model/typedef').Segment |
   *   import('../dataProvider/model/typedef').Chapter |
   *   import('../dataProvider/model/typedef').TimeInterval
   * } data SRG SSR's cue-like representation
   */
  static addTextTrackCue(textTrack, data) {
    const startTime = (Number.isFinite(data.markIn)
      ? data.markIn : data.fullLengthMarkIn) / 1_000;
    const endTime = (Number.isFinite(data.markOut)
      ? data.markOut : data.fullLengthMarkOut) / 1_000;

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
   * @param {import('./typedef').ComposedSrcMediaData} srcMediaObj
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
   * @param {Array.<import('../dataProvider/model/typedef').Chapter>} [chapters=[]]
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
   * @param {Array.<import('../dataProvider/model/typedef').TimeInterval>} [intervals=[]]
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
   * @param {import('./typedef').ComposedSrcMediaData} srcMediaObj
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
   * @param {Array.<import('./typedef').MainResourceWithKeySystems>} resources
   *
   * @returns {Promise<Array.<import('./typedef').MainResourceWithKeySystems>>}
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
   * @param {Array.<import('../dataProvider/model/typedef').MainResource>} resources
   *
   * @returns {Array.<import('./typedef').MainResourceWithKeySystems>}
   */
  static composeKeySystemsResources(resources = []) {
    if (!Drm.hasDrm(resources)) return resources;

    const resourcesWithKeySystems = resources.map((resource) => ({
      ...resource,
      ...Drm.buildKeySystems(resource.drmList),
    }));

    return resourcesWithKeySystems;
  }

  /**
   * Get the main resources from a mediaComposition.
   * May add an Akamai token or key systems if required by the resource.
   *
   * @param {MediaComposition} mediaComposition
   *
   * @returns {Promise<Array.<import('./typedef').MainResourceWithKeySystems>>}
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
   * @param {any} srcObj
   * @param {any} srcObj.mediaData overrides or adds metadata to the composed mediaData.
   * @param {boolean} srcObj.disableTrackers
   * @param {import('./typedef').MainResourceWithKeySystems} resource
   *
   * @returns {import('./typedef').ComposedSrcMediaData}
   */
  static composeSrcMediaData(
    { mediaData: srcMediaData, disableTrackers },
    resource
  ) {
    const {
      url,
      mimeType,
      keySystems,
      ...mediaData
    } = Pillarbox.obj.merge(resource, srcMediaData);

    return {
      src: url,
      type: mimeType,
      keySystems,
      disableTrackers,
      mediaData,
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
        resolve(new Pillarbox.TextTrack({
          id: trackId,
          kind: 'metadata',
          label: trackId,
          tech: player.tech(true),
        }));
      }, 100);
    });
  }

  /**
   * Proxy SRG SSR chapters and intervals cuechange events at player level.
   *
   * @param {import('video.js/dist/types/player').default} player
   */
  static cuechangeEventProxy(player) {
    player.textTracks().on('addtrack', ({ track }) => {
      if (!['srgssr-chapters', 'srgssr-intervals'].includes(track.id)) return;

      track.on('cuechange', () => {
        const [cue] = Array.from(track.activeCues);
        const type = track.id.includes('srgssr-chapters') ? 'srgssr/chapter' : 'srgssr/interval';

        player.trigger({ type, data: cue });
      });
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
      const {
        dataProviderHost,
        dataProviderUrlHandler
      } = player.options().srgOptions;
      const dataProvider = new DataProvider(dataProviderHost);
      const requestHandler = dataProvider
        .handleRequest(dataProviderUrlHandler);

      player.options({
        srgOptions: {
          dataProvider: requestHandler,
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
    if (!error) return;

    const statusText = error.statusText ? error.statusText : error.message;

    SrgSsr.error(player, {
      code: 0,
      message: player.localize('UNKNOWN'),
      metadata: {
        errorType: 'UNKNOWN',
        urn: player.src(),
        status: error.status,
        statusText,
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
   * @param {Array.<import('../dataProvider/model/typedef').MainResource>} resources Resources to filter
   *
   * @returns {Array.<import('../dataProvider/model/typedef').MainResource>} The filtered resources
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
   * Get the VTT cue of a blocked segment.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {Number} currentTime
   *
   * @returns {VTTCue|undefined} The VTT cue of a blocked segment, or undefined
   */
  static getBlockedSegmentByTime(player, currentTime) {
    const blockedSegment = SrgSsr.getBlockedSegment(player);

    if (!blockedSegment) return;

    const isBlocked = currentTime >= blockedSegment.startTime &&
      currentTime < blockedSegment.endTime;

    return isBlocked ? blockedSegment : undefined;
  }

  /**
   * Get mediaComposition from an URN.
   *
   * @param {String} urn
   * @param {Function} requestHandler
   *
   * @returns {Promise<MediaComposition>}
   */
  static async getMediaComposition(
    urn,
    handleRequest = new DataProvider().handleRequest()
  ) {
    const data = await handleRequest(urn);

    return Object.assign(new MediaComposition(), data);
  }

  /**
   * Get the mediaData most likely to be compatible depending on the browser.
   *
   * @param {Array.<import('./typedef').MainResourceWithKeySystems>} resources
   *
   * @returns {import('./typedef').MainResourceWithKeySystems} By default, the first entry is used if none is compatible.
   */
  static getMediaData(resources = []) {
    if (AkamaiTokenService.hasToken(resources)) return resources[0];

    const type = Pillarbox.browser.IS_ANY_SAFARI ? 'HLS' : 'DASH';
    const resource = resources.find(({ streaming }) => streaming === type);

    return resource || resources[0];
  }

  /**
   * Get the source media object.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {any} srcObj
   *
   * @returns {Promise<import('./typedef').ComposedSrcMediaData>} - The composed source media data.
   */
  static async getSrcMediaObj(player, srcObj) {
    if (SrgSsr.pillarboxMonitoring(player)) {
      SrgSsr.pillarboxMonitoring(player).sessionStart();
    }

    const { src: urn, ...srcOptions } = srcObj;
    const mediaComposition = await SrgSsr.getMediaComposition(
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
    const blockedSegment = SrgSsr
      .getBlockedSegmentByTime(player, currentTime);

    if (!blockedSegment || !Number.isFinite(blockedSegment.endTime)) {
      return currentTime;
    }

    // as a workaround, add 0.1 seconds to avoid getting stuck on endTime on
    // some safaris.
    const endTimeWithTolerance = blockedSegment.endTime + 0.1;

    // proxy for handling cuechange events at the player level
    player.trigger({ type: 'srgssr/blocked-segment', data: blockedSegment });
    player.currentTime(endTimeWithTolerance);

    return endTimeWithTolerance;
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
    const { endTime: blockedSegmentEndTime } = SrgSsr
      .getBlockedSegmentByTime(player, currentTime) || {};

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
   * @param {any} srcObj
   * @param {function} next
   *
   * @returns {Promise<any>}
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
   * PillarboxMonitoring monitoring singleton.
   *
   * @param {import('video.js/dist/types/player').default} player
   *
   * @returns {PillarboxMonitoring} instance of PillarboxMonitoring
   */
  static pillarboxMonitoring(player) {
    if (player.options().trackers.pillarboxMonitoring === false) return;

    if (!player.options().trackers.pillarboxMonitoring) {
      const pillarboxMonitoring = new PillarboxMonitoring(player, {
        debug: player.debug(),
        playerVersion: Pillarbox.VERSION.pillarbox,
        playerName: 'Pillarbox',
      });

      player.options({
        trackers: {
          pillarboxMonitoring,
        },
      });
    }

    return player.options().trackers.pillarboxMonitoring;
  }

  /**
   * Update player's poster.
   *
   * @param {import('video.js/dist/types/player').default} player
   * @param {import('./typedef').ComposedSrcMediaData} srcMediaObj
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
   * @param {import('./typedef').ComposedSrcMediaData} srcMediaObj
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
    SrgSsr.pillarboxMonitoring(player);
    SrgSsr.cuechangeEventProxy(player);

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

Pillarbox.use('srgssr/urn', SrgSsr.middleware);

// Add Middleware specific options
Pillarbox.options.srgOptions = {
  dataProvider: undefined,
  dataProviderHost: undefined,
  dataProviderUrlHandler: undefined,
  tagCommanderScriptURL: undefined,
};

export default SrgSsr;
