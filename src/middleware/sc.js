import Pillarbox from '../../src/pillarbox.js';
import DataProvider from '../dataProvider/services/DataProvider.js';

// Translations
import '../lang/de.js';
import '../lang/en.js';
import '../lang/fr.js';
import '../lang/it.js';
import '../lang/rm.js';

/** @import Player from 'video.js/dist/types/player' */
/** @import { StandardMetadata, TimeRange, Subtitle, Chapter, ComposedSrcMediaData, MainResourceWithKeySystems } from './typedef' */

/**
 * @class Sc
 */
class Sc {
  /**
   * Adds blocked ranges to the player.
   *
   * @param {Player} player
   * @param {TimeRange[]} [ranges=[]]
   */
  static async addBlockedRanges(player, ranges = []) {
    const trackId = 'sc-blocked-ranges';
    const blockedRangesToAdd = Sc.getBlockRanges(ranges);

    await Sc.createTextTrack(player, trackId, blockedRangesToAdd);
  }

  /**
   * Adds remote text tracks from an array of subtitles.
   *
   * @param {Player} player
   * @param {Subtitle[]} [subtitles=[]]
   */
  static addRemoteTextTracks(player, subtitles = []) {
    if (!Array.isArray(subtitles)) return;

    subtitles.forEach(({
      kind,
      label,
      language,
      url: src
    }) => {
      player.addRemoteTextTrack({
        kind,
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
   * @param {Chapter | TimeRange} data Standard connector cue-like representation
   */
  static addTextTrackCue(textTrack, data) {
    const startTime = (Number.isFinite(data.startTime)
      ? data.startTime : 0) / 1_000;
    const endTime = (Number.isFinite(data.endTime)
      ? data.endTime : 0) / 1_000;
    const text = JSON.stringify(data);
    const cue = new VTTCue(startTime, endTime, text);

    if (data.identifier) {
      cue.id = data.identifier;
    }

    textTrack.addCue(cue);
  }

  /**
   * Add a new cues to a text track with the given array.
   *
   * @param {TextTrack} textTrack
   * @param {(Chapter | TimeRange)[]} cues Standard connector cues-like representation
   */
  static addTextTrackCues(textTrack, cues = []) {
    if (!Array.isArray(cues)) return;

    cues.forEach(cue => {
      Sc.addTextTrackCue(textTrack, cue);
    });
  }

  /**
   * Add multiple text tracks to the player.
   *
   * @param {Player} player
   * @param {{ mediaData: StandardMetadata }} options
   */
  static addTextTracks(player, { mediaData }) {
    Sc.addRemoteTextTracks(player, mediaData.subtitles);
    Sc.addChapters(player, mediaData.chapters);
    Sc.addBlockedRanges(player, mediaData.timeRanges);
    Sc.addTimeRanges(player, mediaData.timeRanges);
  }

  /**
   * Adds chapters to the player.
   *
   * @param {Player} player
   * @param {Chapter[]} [chapters=[]]
   */
  static async addChapters(player, chapters = []) {
    const trackId = 'sc-chapters';
    const chaptersToAdd = Array.isArray(chapters) ? chapters : [];

    await Sc.createTextTrack(player, trackId, chaptersToAdd);
  }

  /**
   * Adds time ranges to the player.
   *
   * @param {Player} player
   * @param {TimeRange[]} [timeRanges=[]]
   */
  static async addTimeRanges(player, timeRanges = []) {
    const trackId = 'sc-time-ranges';
    const timeRangesToAdd = Sc.getTimeRanges(timeRanges);

    await Sc.createTextTrack(player, trackId, timeRangesToAdd);
  }

  /**
   * Add the keySystems property to all resources
   * if at least one of them has DRM.
   *
   * @param {StandardMetadata} mediaData
   *
   * @returns {Object|undefined}
   */
  static getKeySystem(mediaData) {
    if (!mediaData.drm) return undefined;

    if ('FAIRPLAY' !== mediaData.drm.keySystem) {
      return {
        'com.widevine.alpha': mediaData.drm.licenseUrl,
      };
    }

    const {
      certificateUrl: certificateUri,
      licenseUrl: licenseUri
    } = mediaData.drm;

    return {
      'com.apple.fps.1_0': {
        certificateUri,
        licenseUri,
      },
    };
  }

  /**
   * Compose source options with media data.
   * MediaData properties from source options overwrite mediaData from IL.
   *
   * @param {Object} srcObj
   * @param {StandardMetadata} srcObj.mediaData overrides or adds metadata to the composed mediaData.
   * @param {boolean} srcObj.disableTrackers
   * @param {MainResourceWithKeySystems} standardData
   *
   * @returns {ComposedSrcMediaData}
   */
  static composeSrcMediaData(
    { mediaData: srcMediaData, disableTrackers },
    standardData
  ) {
    const {
      url,
      mimeType,
      keySystems,
      ...mediaData
    } = Pillarbox.obj.merge(standardData, srcMediaData);

    return {
      src: url,
      type: mimeType,
      keySystems,
      disableTrackers,
      mediaData,
    };
  }

  /**
   * Create a new metadata text track and add it to the player.
   *
   * If a text track with the same trackId exists, it is deleted beforehand.
   *
   * @param {Player} player
   * @param {String} trackId Text track unique ID
   * @param {(Chapter | TimeRange)[]} cues SRG SSR's cues-like representation
   *
   * @returns {Promise<TextTrack>}
   */
  static async createTextTrack(player, trackId, cues = []) {
    const removeTrack = player.textTracks().getTrackById(trackId);

    if (removeTrack) {
      player.textTracks().removeTrack(removeTrack);
    }

    // See https://github.com/videojs/video.js/issues/8519
    const textTrack = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Pillarbox.TextTrack({
          id: trackId,
          kind: 'metadata',
          label: trackId,
          tech: player.tech(true),
        }));
      }, 100);
    });

    Sc.addTextTrackCues(textTrack, cues);

    player.textTracks().addTrack(textTrack);

    return textTrack;
  }

  /**
   * Proxy SRG SSR chapters and intervals cuechange events at player level.
   *
   * @param {Player} player
   */
  static cuechangeEventProxy(player) {
    player.textTracks().on('addtrack', ({ track }) => {
      if (!['sc-chapters', 'sc-time-ranges'].includes(track.id)) return;

      track.on('cuechange', () => {
        const [cue] = Array.from(track.activeCues);
        const type = track.id.includes('sc-chapters') ? 'sc/chapter' : 'sc/time-range';

        player.trigger({ type, data: cue });
      });
    });
  }

  /**
   * SRG SSR data provider singleton.
   *
   * @param {Player} player
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
   * @param {Player} player
   * @param {Object} error
   *
   * @returns {undefined|true}
   */
  static dataProviderError(player, error) {
    if (!error) return;

    const statusText = error.statusText ? error.statusText : error.message;

    Sc.error(player, {
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
   * @param {Player} player
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
   * Get the current blocked segment from the player.
   *
   * @param {Player} player
   *
   * @returns {VTTCue|undefined} The blocked segment cue object, or undefined
   */
  static getBlockedRange(player) {
    const trackId = 'sc-blocked-ranges';
    const blockedRangesTrack = player.textTracks().getTrackById(trackId);

    if (!blockedRangesTrack) return;

    /** @type {VTTCue} */
    const [blockedCue] = Array.from(blockedRangesTrack.activeCues);

    return blockedCue;
  }

  /**
   * Get the VTT cue of a blocked segment.
   *
   * @param {Player} player
   * @param {Number} currentTime
   *
   * @returns {VTTCue|undefined} The VTT cue of a blocked segment, or undefined
   */
  static getBlockedRangeByTime(player, currentTime) {
    const blockedRange = Sc.getBlockedRange(player);

    if (!blockedRange) return;

    const isBlocked = currentTime >= blockedRange.startTime &&
      currentTime < blockedRange.endTime;

    return isBlocked ? blockedRange : undefined;
  }

  /**
   * Get blocked segments.
   *
   * @param {TimeRange[]} [ranges=[]]
   *
   * @returns {TimeRange[]}
   */
  static getBlockRanges(ranges = []) {
    if (!Array.isArray(ranges) || !ranges.length) return [];

    return ranges.filter(range => range.type.includes('BLOCKED'));
  }

  /**
   * Get time ranges.
   *
   * @param {TimeRange[]} [timeRanges=[]]
   *
   * @returns {TimeRange[]}
   */
  static getTimeRanges(timeRanges = []) {
    if (!Array.isArray(timeRanges) || !timeRanges.length) return [];

    return timeRanges.filter(timeRange => !timeRange.type.includes('BLOCKED'));
  }

  /**
   * Get mediaComposition from an URN.
   *
   * @param {String} urn
   * @param {Function} handleRequest
   *
   * @returns {Promise<StandardMetadata>}
   */
  static async getStandardData(
    urn,
    handleRequest = new DataProvider().handleRequest()
  ) {
    /** @type {StandardMetadata} */
    const data = await handleRequest(urn);

    return data;
  }

  /**
   * Get the mediaData most likely to be compatible depending on the browser.
   *
   * @param {StandardMetadata} standardData
   *
   * @returns {Object|undefined} By default, the first entry is used if none is compatible.
   */
  static getMediaData(standardData) {
    if (!standardData.source) return;

    const { url, mimeType } = standardData.source;

    return { url, mimeType };
  }

  /**
   * Get the source media object.
   *
   * @param {Player} player
   * @param {any} srcObj
   *
   * @returns {Promise<ComposedSrcMediaData>} The composed source media data.
   */
  static async getSrcMediaObj(player, srcObj) {
    const { src: identifier, ...srcOptions } = srcObj;

    const standardData = await Sc.getStandardData(
      identifier,
      Sc.dataProvider(player)
    );

    let mediaData = {
      ...Sc.getMediaData(standardData),
      ...Sc.getKeySystem(standardData),
      ...standardData
    };

    return Sc.composeSrcMediaData(srcOptions, mediaData);
  }

  /**
   * Handles the middleware's currentTime function.
   * - If the current time is between the start and end of a blocked segment,
   *   the blocked portion will be skipped.
   *
   * _Note_: This function should disappear as soon as this behavior is
   *         supported on the packaging side.
   *
   * @param {Player} player
   * @param {number} currentTime
   *
   * @returns {number}
   */
  static handleCurrentTime(player, currentTime) {
    const blockedRange = Sc
      .getBlockedRangeByTime(player, currentTime);

    if (!blockedRange || !Number.isFinite(blockedRange.endTime)) {
      return currentTime;
    }

    // as a workaround, add 0.1 seconds to avoid getting stuck on endTime on
    // some safaris.
    const endTimeWithTolerance = blockedRange.endTime + 0.1;

    // proxy for handling cuechange events at the player level
    player.trigger({ type: 'sc/blocked-range', data: blockedRange });
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
   * @param {Player} player
   * @param {number} currentTime
   *
   * @returns {number}
   */
  static handleSetCurrentTime(player, currentTime) {
    const { endTime: blockedRangeEndTime } = Sc
      .getBlockedRangeByTime(player, currentTime) || {};

    return Number
      .isFinite(blockedRangeEndTime) ? blockedRangeEndTime : currentTime;
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
   * @param {Player} player
   * @param {any} srcObj
   * @param {function} next
   *
   * @returns {Promise<any>}
   */
  static async handleSetSource(player, srcObj, next) {
    try {
      const srcMediaObj = await Sc.getSrcMediaObj(player, srcObj);

      Sc.updateTitleBar(player, srcMediaObj);
      Sc.updatePoster(player, srcMediaObj);
      Sc.addTextTracks(player, srcMediaObj);

      return next(null, srcMediaObj);
    } catch (error) {
      if (Sc.dataProviderError(player, error)) return;

      return next(error);
    }
  }

  /**
   * Update player's poster.
   *
   * @param {Player} player
   * @param {ComposedSrcMediaData} srcMediaObj
   */
  static updatePoster(player, srcMediaObj) {
    player.poster(srcMediaObj.mediaData.posterUrl);
  }

  /**
   * Update player titleBar with title and description.
   *
   * @param {Player} player
   * @param {ComposedSrcMediaData} srcMediaObj
   */
  static updateTitleBar(player, srcMediaObj) {
    if (!player.titleBar) return;

    player.titleBar.update({
      title: srcMediaObj.mediaData.title,
      description: srcMediaObj.mediaData.subtitle,
    });
  }

  /**
   * Middleware to resolve SRG SSR URNs into playable media.
   *
   * @param {Player} player
   *
   * @returns {Object}
   */
  static middleware(player) {
    Sc.cuechangeEventProxy(player);

    return {
      currentTime: (currentTime) =>
        Sc.handleCurrentTime(player, currentTime),
      setCurrentTime: (currentTime) =>
        Sc.handleSetCurrentTime(player, currentTime),
      setSource: async (srcObj, next) =>
        Sc.handleSetSource(player, srcObj, next),
    };
  }
}

Pillarbox.use('pbw/sc', Sc.middleware);

// Add Middleware specific options
Pillarbox.options.srgOptions = {
  dataProvider: undefined,
  dataProviderHost: undefined,
  dataProviderUrlHandler: undefined,
  tagCommanderScriptURL: undefined,
};

export default Sc;
