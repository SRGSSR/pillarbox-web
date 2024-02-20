import videojs from 'video.js';
import 'videojs-contrib-eme';

var version = "1.0.1";

/**
 * @ignore
 * @type {typeof import('video.js/dist/types/player').default}
 */
const vjsPlayer = videojs.getComponent('player');

/**
 * This class extends {@link VideoJsPlayer}.
 *
 * @class Player
 */
class Player extends vjsPlayer {

  /**
   * A getter/setter for the media's audio track.
   * Activates the audio track according to the language and kind properties.
   * Falls back on the first audio track found if the kind property is not satisfied.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioTrack/kind
   * @see https://developer.mozilla.org/en-US/docs/Web/API/AudioTrack/language
   *
   * @param {TrackSelector} [trackSelector]
   *
   * @example
   * // Get the current audio track
   * player.audioTrack();
   *
   * @example
   * // Activate an audio track based on language and kind properties
   * player.audioTrack({language:'en', kind:'description'});
   *
   * @example
   * // Activate first audio track found corresponding to language
   * player.audioTrack({language:'fr'});
   *
   * @return {AudioTrack|undefined}
   */
  audioTrack(trackSelector) {
    const audioTracks = Array.from(this.player().audioTracks());

    if (!trackSelector) {
      return audioTracks.find((audioTrack) => audioTrack.enabled);
    }

    const { kind, language } = trackSelector;
    const audioTrack =
      audioTracks.find(
        (audioTrack) =>
          audioTrack.language === language && audioTrack.kind === kind
      ) || audioTracks.find((audioTrack) => audioTrack.language === language);

    if (audioTrack) {
      audioTrack.enabled = true;
    }

    return audioTrack;
  }

  /**
   * A getter/setter for the media's text track.
   * Activates the text track according to the language and kind properties.
   * Falls back on the first text track found if the kind property is not satisfied.
   * Disables all subtitle tracks that are `showing` if the `trackSelector` is truthy but does not satisfy any condition.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/TextTrack/kind
   * @see https://developer.mozilla.org/en-US/docs/Web/API/textTrack/language
   *
   * @param {TrackSelector} [trackSelector]
   *
   * @example
   * // Get the current text track
   * player.textTrack();
   *
   * @example
   * // Disable all text tracks has a side effect
   * player.textTrack('off');
   * player.textTrack({});
   *
   * @example
   * // Activate an text track based on language and kind properties
   * player.textTrack({language:'en', kind:'captions'});
   *
   * @example
   * // Activate first text track found corresponding to language
   * player.textTrack({language:'fr'});
   *
   * @return {VideojsTextTrack|undefined}
   */
  textTrack(trackSelector) {
    const textTracks = Array.from(this.player().textTracks()).filter(
      (textTrack) => !['chapters', 'metadata'].includes(textTrack.kind)
    );

    if (!trackSelector) {
      return textTracks.find((textTrack) => textTrack.mode === 'showing');
    }

    textTracks.forEach((textTrack) => (textTrack.mode = 'disabled'));

    const { kind, language } = trackSelector;
    const textTrack =
      textTracks.find((textTrack) => {
        if (textTrack.language === language && textTrack.kind === kind) {
          textTrack.mode = 'showing';
        }

        return textTrack.mode === 'showing';
      }) ||
      textTracks.find((textTrack) => {
        if (textTrack.language === language) {
          textTrack.mode = 'showing';
        }

        return textTrack.mode === 'showing';
      });

    return textTrack;
  }
}

/**
 * @type {Player}
 */
// Overrides the default video.js player component
var player = videojs.registerComponent('player', Player);

/**
 * Pillarbox is an alias for the video.js namespace with additional options.
 *
 * @namespace
 * @see https://docs.videojs.com/module-videojs-videojs
 * @type {videojs}
 */
const pillarbox = videojs;

pillarbox.VERSION = {
  pillarbox: version,
  videojs: videojs.VERSION,
  [videojs.VhsSourceHandler.name]: videojs.VhsSourceHandler.VERSION,
  eme: videojs.getPlugin('eme').VERSION,
};

/**
 * Enable smooth seeking for Pillarbox.
 *
 * @see [Video.js enableSmoothSeeking Option]{@link https://videojs.com/guides/options/#enablesmoothseeking}
 * @type {boolean}
 * @default true
 */
pillarbox.options.enableSmoothSeeking = true;
/**
 * Configuration options for HTML5 settings in Pillarbox.
 *
 * @see [VHS useForcedSubtitles Option]{@link https://github.com/videojs/http-streaming/blob/main/README.md#useforcedsubtitles}
 * @type {Object}
 * @property {Object} vhs - Configuration for the Video.js HTTP Streaming.
 * @property {boolean} useForcedSubtitles - Enables the player to display forced subtitles by default.
 * Forced subtitles are pieces of information intended for display when no other text representation
 * is selected. They are used to clarify dialogue, provide alternate languages, display texted graphics,
 * or present location/person IDs that are not otherwise covered in the dubbed/localized audio.
 */
pillarbox.options.html5 = {
  vhs: { useForcedSubtitles: true }
};
/**
 * Configuration for the live tracker.
 *
 * @see [Video.js liveTracker Option]{@link https://videojs.com/guides/options/#livetrackertrackingthreshold}
 * @type {Object}
 * @property {number} trackingThreshold - A threshold that controls when the liveui should be shown.
 * @property {number} liveTolerance - An option that controls how far from the seekable end should be considered live playback.
 */
pillarbox.options.liveTracker = {
  trackingThreshold: 120,
  liveTolerance: 15,
};
/**
 * Allows the player to use the live ui that includes:
 *
 * - A progress bar for seeking within the live window
 * - A button that can be clicked to seek to the live edge with a circle indicating if you are at the live edge or not.
 *
 * @see [Video.js liveui Option]{@link https://videojs.com/guides/options/#liveui}
 * @type {boolean}
 */
pillarbox.options.liveui = true;
/**
 * Indicates that the video is to be played "inline", that is within the element's playback area.
 *
 * @see [Video element playsinline attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#playsinline}
 * @type {boolean}
 */
pillarbox.options.playsinline = true;
/**
 * Configuration for plugins.
 *
 * @see [Video.js Plugins Option]{@link https://videojs.com/guides/options/#plugins}
 * @type {Object}
 * @property {boolean} eme - Enable the EME (Encrypted Media Extensions) plugin.
 */
pillarbox.options.plugins = { eme: true };
/**
 * Enable responsive mode, this will cause the player to customize itself based on responsive breakpoints.
 *
 * @see [Video.js Responsive Option]{@link https://videojs.com/guides/options/#responsive}
 * @type {boolean}
 */
pillarbox.options.responsive = true;
/**
 * A placeholder for accessing trackers directly from the player.
 *
 * @type {Object}
 */
pillarbox.options.trackers = {};

/**
 * @class MediaComposition
 */
class MediaComposition {
  /**
   * Find a chapter by its URN.
   *
   * @param {String} urn
   *
   * @returns {Object} chapter
   */
  findChapterByUrn(urn) {
    if (this.chapterList) {
      const [chapter] = this.chapterList.filter(
        (element) => element.urn === urn
      );

      return chapter;
    }

    return undefined;
  }

  /**
   * Return a segment from main chapter following segmentUrn in mediaComposition.
   *
   * @returns {Object|undefined} main segment
   */
  findMainSegment() {
    if (!this.segmentUrn) {
      return undefined;
    }

    const segmentList = this.getMainSegments();
    const [segment] = segmentList.filter(
      (element) => element.urn === this.segmentUrn
    );

    return segment;
  }

  /**
   * Find resource list by URN.
   *
   * @param {String} urn
   * @returns {Array|undefined} of resources
   */
  findResourceListByUrn(urn) {
    const chapterByUrn = this.findChapterByUrn(urn);

    if (chapterByUrn) {
      return chapterByUrn.resourceList || [];
    }

    return undefined;
  }

  /**
   * A list of chapters.
   *
   * @returns {Array} of chapters
   */
  getChapters() {
    return this.chapterList;
  }

  /**
   * Filter external text tracks that are already available internally.
   *
   * __Rules:__
   * 1. TTML format is filtered
   *
   * 2. If both are empty that means only internal text tracks will be displayed
   * to the user as they are automatically loaded by the player.
   *
   * 3. If subtitleInformationList is missing from the MediaComposition and subtitleList
   * is available but the media contains internal text tracks that are also available internally.
   * It will result on a duplication client side.
   *
   * 4. If subtitleList and subtitleInformationList a merge between both will be operated,
   * removing the external text tracks already available internally.
   *
   *
   * @returns {Array} external text tracks
   */
  getFilteredExternalSubtitles() {
    const { subtitleList } = this.getMainChapter();
    const [{ subtitleInformationList } = {}] = this.getResourceList().filter(
      ({ subtitleInformationList }) => subtitleInformationList
    );
    const onlyHasExternalSubtitles = subtitleList && !subtitleInformationList;

    if (!subtitleList) {
      return [];
    }

    // TTML format is not supported
    const subtitles = subtitleList.filter(
      (subtitle) => subtitle.format !== 'TTML'
    );

    if (onlyHasExternalSubtitles) {
      return subtitles;
    }

    return subtitles.filter((subtitle) => {
      const addSubtitle = !subtitleInformationList.find(
        (subtitleInformation) =>
          subtitleInformation.locale === subtitle.locale &&
          subtitle.type === subtitleInformation.type
      );

      return addSubtitle;
    });
  }

  /**
   * Block reason for main chapter. This also uses current date for STARTDATE.
   *
   * @see BlockingReason
   *
   * @returns {undefined|String} undefined if main chapter is not blocked
   */
  getMainBlockReason() {
    const mainChapter = this.getMainChapter();

    if (!mainChapter) {
      return undefined;
    }

    let { blockReason } = mainChapter;

    if (!blockReason && new Date() < this.getMainValidFromDate()) {
      blockReason = 'STARTDATE';
    }

    return blockReason;
  }

  /**
   * Get the mediaComposition's main chapter.
   *
   * @returns {Object}
   */
  getMainChapter() {
    if (!this.mainChapter) {
      this.mainChapter = this.findChapterByUrn(this.chapterUrn);
    }

    if (!this.mainChapter && this.chapterList && this.chapterList.length > 0) {
      [this.mainChapter] = this.chapterList;
    }

    return this.mainChapter;
  }

  /**
   * Get the main chapter's image URL decorated with default width and format.
   *
   * @returns {String|undefined} image URL
   */
  getMainChapterImageUrl() {
    const mainChapter = this.getMainChapter();

    if (!mainChapter || !mainChapter.imageUrl) {
      return undefined;
    }

    return mainChapter.imageUrl;
  }

  /**
   * Get main resources.
   *
   * @returns {Array} array of sources
   */
  getMainResources() {
    const resourceList = this.getResourceList();

    if (!resourceList || !resourceList.length) {
      return undefined;
    }

    return resourceList.map((resource) => ({
      analyticsData: this.getMergedAnalyticsData(resource.analyticsData),
      analyticsMetadata: this.getMergedAnalyticsMetadata(
        resource.analyticsMetadata
      ),
      blockReason: this.getMainChapter().blockReason,
      vendor: this.getMainChapter().vendor,
      drmList: resource.drmList,
      dvr: resource.dvr,
      eventData: this.getMainChapter().eventData,
      id: this.getMainChapter().id,
      imageCopyright: this.getMainChapter().imageCopyright,
      live: resource.live,
      mediaType: this.getMainChapter().mediaType,
      mimeType: resource.mimeType,
      presentation: resource.presentation,
      quality: resource.quality,
      streaming: resource.streaming,
      streamOffset: resource.streamOffset,
      tokenType: resource.tokenType,
      url: resource.url,
    }));
  }

  /**
   * Get segments of the main chapter ordered by markIn.
   *
   * @returns {Array} of segments
   */
  getMainSegments() {
    const mainChapter = this.getMainChapter();

    if (!this.mainSegments && mainChapter && mainChapter.segmentList) {
      this.mainSegments = mainChapter.segmentList;
    }

    return this.mainSegments || [];
  }

  /**
   * Compute a date from which this content is valid. Always return a date object.
   *
   * @returns {Date} date specified in media composition or EPOCH when no date present.
   */
  getMainValidFromDate() {
    const mainChapter = this.getMainChapter();

    if (!mainChapter) {
      return new Date(0);
    }

    const { validFrom } = mainChapter;

    if (validFrom) {
      return new Date(validFrom);
    }
  }

  /**
   * Get merged analytics data.
   *
   * @returns {Object}
   */
  getMergedAnalyticsData(analyticsData) {
    return {
      ...this.analyticsData,
      ...this.getMainChapter().analyticsData,
      ...analyticsData,
    };
  }

  /**
   * Get merged analytics metadata.
   *
   * @returns {Object}
   */
  getMergedAnalyticsMetadata(analyticsMetadata) {
    return {
      ...this.analyticsMetadata,
      ...this.getMainChapter().analyticsMetadata,
      ...analyticsMetadata,
    };
  }

  /**
   * Get the chapter's resource list
   * @returns {Array} of resources
   */
  getResourceList() {
    const { resourceList } = this.getMainChapter();

    return resourceList || [];
  }
}

/**
 * @ignore
 */
class DataProvider {
  constructor(hostName = 'il.srgssr.ch') {
    this.setIlHost(hostName);
  }

  setIlHost(hostName) {
    this.baseUrl = `${hostName}/integrationlayer/2.1/`;
  }

  /**
   * Get media composition by URN.
   *
   * @param {String} urn URN of the media composition.
   * @param {Boolean} [onlyChapters=true] Whether to retrieve only chapters or not.
   *
   * @returns {Promise<{mediaComposition: MediaComposition}>} Promise that resolves with the `mediaComposition` object.
   * @throws {Promise<Response>} If the response is not ok.
   */
  async getMediaCompositionByUrn(urn, onlyChapters = true) {
    const url = `https://${this.baseUrl}mediaComposition/byUrn/${urn}?onlyChapters=${onlyChapters}&vector=portalplay`;
    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    const mediaComposition = Object.assign(new MediaComposition(), data, {
      onlyChapters,
    });

    return {
      mediaComposition,
    };
  }
}

const SCALE = {
  WIDTH_240: '240',
  WIDTH_320: '320',
  WIDTH_480: '480',
  WIDTH_960: '960',
  WIDTH_1920: '1920',
};

const FORMAT = {
  JPG: 'jpg',
  WEBP: 'webp',
  PNG: 'png',
};

const IMAGE_SERVICE_URL = 'https://il.srgssr.ch/images/';

/**
 * @class Image
 */
class Image {
  /**
   * Generates the image scaling URL.
   *
   * @property {Object} image is the object representation of an image.
   * @property {String} [image.url] is the image URL.
   * @property {String} [image.width=960] is the width of the image, default value 960.
   * @property {String} [image.format=jpg] is the format of the image, default value jpg.
   * @property {String} [imageServiceUrl] Url of the image service that needs to comply with the specification defined by the IL.
   *
   * @see https://confluence.srg.beecollaboration.com/pages/viewpage.action?spaceKey=SRGPLAY&title=Project+-+Image+Service
   *
   * @returns {String|undefined} the image scaling URL.
   */
  static scale(
    { url, width = SCALE.WIDTH_960, format = FORMAT.JPG } = {},
    imageServiceUrl = IMAGE_SERVICE_URL
  ) {
    if (!url) return;

    const scaleUrl = new URL(imageServiceUrl);

    scaleUrl.searchParams.set('imageUrl', url);
    scaleUrl.searchParams.set('format', format);
    scaleUrl.searchParams.set('width', width);

    return decodeURIComponent(scaleUrl.href);
  }

  static get JPG() {
    return FORMAT.JPG;
  }

  static get PNG() {
    return FORMAT.PNG;
  }

  static get WEBP() {
    return FORMAT.WEBP;
  }

  static get WIDTH_240() {
    return SCALE.WIDTH_240;
  }

  static get WIDTH_320() {
    return SCALE.WIDTH_320;
  }

  static get WIDTH_480() {
    return SCALE.WIDTH_480;
  }

  static get WIDTH_960() {
    return SCALE.WIDTH_960;
  }

  static get WIDTH_1920() {
    return SCALE.WIDTH_1920;
  }
}

const DRM_VENDORS = {
  WIDEVINE: 'com.widevine.alpha',
  FAIRPLAY: 'com.apple.fps.1_0',
  PLAYREADY: 'com.microsoft.playready',
};

/**
 * @class Drm
 */
class Drm {
  /**
   * Build the keySystems object according to the DRM vendor.
   *
   * @param {Array.<Object>} drmList
   *
   * @returns {Object}
   */
  static buildKeySystems(drmList = []) {
    const keySystems = {};

    drmList.forEach((drmVendor) => {
      const type = Drm.vendors[drmVendor.type];

      if (Drm.vendors.FAIRPLAY === type) {
        const { certificateUrl: certificateUri, licenseUrl: licenseUri } =
          drmVendor;

        keySystems[type] = {
          certificateUri,
          licenseUri,
        };
      } else {
        keySystems[type] = drmVendor.licenseUrl;
      }
    });

    return {
      keySystems,
    };
  }

  /**
   * Check if some of the resources have DRM.
   */
  static hasDrm(resources) {
    return resources.some(({ drmList }) => drmList && drmList.length > 0);
  }

  /**
   * Get DRM vendors.
   */
  static get vendors() {
    return DRM_VENDORS;
  }
}

const TOKEN_TYPES = {
  AKAMAI: 'AKAMAI',
  NONE: 'NONE',
};

/**
 * @class AkamaiTokenService
 */
class AkamaiTokenService {
  /**
   * Get the acl path.
   *
   * @param {URL} streamUrl
   *
   * @returns {String}
   */
  static aclPath(streamUrl) {
    const path = streamUrl.pathname;

    return `${path.substring(0, path.lastIndexOf('/') + 1)}*`;
  }

  /**
   * AKAMAI
   *
   * @type {String}
   */
  static get AKAMAI() {
    return TOKEN_TYPES.AKAMAI;
  }

  /**
   * Check if the resources are protected by an Akamai token.
   * Keep in mind, as we are using the some function,
   * if the resources have at least one resource
   * protected by a token it returns true!
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Boolean}
   */
  static hasToken(resources) {
    return resources.some((resource) =>
      AkamaiTokenService.isAkamai(resource.tokenType));
  }

  /**
   * Check if the token type is AKAMAI.
   *
   * @param {String} tokentype
   *
   * @returns {Boolean}
   */
  static isAkamai(tokentype) {
    return TOKEN_TYPES.AKAMAI === tokentype;
  }

  /**
   * Check if the token type is NONE.
   *
   * @param {String} tokentype
   *
   * @returns {Boolean}
   */
  static isNone(tokentype) {
    return TOKEN_TYPES.NONE === tokentype;
  }

  /**
   * NONE
   *
   * @type {String}
   */
  static get NONE() {
    return TOKEN_TYPES.NONE;
  }

  /**
   * Generate the stream URL with the akamai token.
   *
   * @param {String} source
   * @param {String} tokenServerUrl
   *
   * @returns {Promise.<Object>}
   */
  static tokenize(source, tokenServerUrl) {
    const streamUrlToTokenize = new URL(`${source.url}`);
    const acl = AkamaiTokenService.aclPath(streamUrlToTokenize);
    const url = `${tokenServerUrl}${encodeURIComponent(acl)}`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      })
      .then(({ token: { authparams }}) => {
        const akamaiAuthParams = new URLSearchParams(authparams);

        akamaiAuthParams.forEach((v, k) =>
          streamUrlToTokenize.searchParams.set(k, v));

        return Object.assign({}, source, {
          url: streamUrlToTokenize.toString(),
        });
      })
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  /**
   * Generate a token for each source
   *
   * @param {Array} sources
   * @param {String} tokenServerUrl
   *
   * @returns {Promise.<Array.<Object>>}
   */
  static tokenizeSources(
    sources,
    tokenServerUrl = 'https://tp.srgssr.ch/akahd/token?acl='
  ) {
    const tokenizedSources = [];

    sources.forEach((source) => {
      const tokenizedSource = AkamaiTokenService.tokenize(
        source,
        tokenServerUrl
      );

      tokenizedSources.push(tokenizedSource);
    });

    return Promise.all(tokenizedSources)
      .then((values) => values)
      .catch((reason) => Promise.reject(reason));
  }
}

/**
 * Exhaustive list of player events.
 *
 * See below the documentation related to the media events
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
 *
 * @namespace {Object} PlayerEvents
 */


/**
 * Triggered when the media element is emptied (e.g., reset as part of the seeking process).
 *
 * @event PlayerEvents#EMPTIED
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event
 */
const EMPTIED = 'emptied';

/**
 * Triggered when the media playback has ended.
 *
 * @event PlayerEvents#ENDED
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event
 */
const ENDED = 'ended';

/**
 * Triggered when the media data has been loaded.
 *
 * @event PlayerEvents#LOADED_DATA
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event
 */
const LOADED_DATA = 'loadeddata';

/**
 * Triggered when the browser starts looking for media data.
 *
 * @event PlayerEvents#LOAD_START
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event
 */
const LOAD_START = 'loadstart';

/**
 * Triggered when the media playback is paused.
 *
 * @event PlayerEvents#PAUSE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event
 */
const PAUSE = 'pause';

/**
 * Triggered when the media playback is resumed or started.
 *
 * @event PlayerEvents#PLAY
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event
 */
const PLAY = 'play';

/**
 * Triggered when the media playback is in progress.
 *
 * @event PlayerEvents#PLAYING
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event
 */
const PLAYING = 'playing';

/**
 * Triggered when the playback rate changes.
 *
 * @event PlayerEvents#RATE_CHANGE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event
 */
const RATE_CHANGE = 'ratechange';

/**
 * Triggered when a seek operation is in progress.
 *
 * @event PlayerEvents#SEEKING
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event
 */
const SEEKING = 'seeking';

/**
 * Triggered when the current playback position is updated.
 *
 * @event PlayerEvents#TIME_UPDATE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
 */
const TIME_UPDATE = 'timeupdate';

/**
 * Triggered when the media playback is waiting for data.
 *
 * @event PlayerEvents#WAITING
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event
 */
const WAITING = 'waiting';

/* eslint max-lines-per-function: ["error", 200] */
/* eslint max-statements: ["error", 20]*/
/* eslint complexity: ["error", 10]*/
/**
 * SRG analytics
 * @class SRGAnalytics
 * @ignore
 *
 * ### Script URL
 * JS script : https://colibri-js.akamaized.net/penguin/tc_SRGGD_11.js
 *
 * ### Official documentation
 * Variables list
 * @see https://confluence.srg.beecollaboration.com/display/INTFORSCHUNG/Datalayer+for+media+players
 *
 * Standard event sequences
 * @see https://confluence.srg.beecollaboration.com/display/INTFORSCHUNG/standard+streaming+events%3A+sequence+of+events+for+media+player+actions
 *
 * Review of Standard Media Actions
 * @see https://confluence.srg.beecollaboration.com/display/INTFORSCHUNG/Implementation+Concept+-+draft
 *
 * ComScore Implementation Guide
 * @see https://www.dropbox.com/sh/cdwuikq0abxi21m/AABmSyXYKUTWSAwRZgQA9Ujna/JavaScript%20Latest%20Version?dl=0&preview=Comscore_Library-JavaScript-Streaming_Tag-Implementation_Guide-International.pdf&subfolder_nav_tracking=1
 *
 * ### Variables list
 * - 'event_id', // init | play | stop | pos | pause | seek | uptime | eof
 * - 'event_timestamp', // Seems to be generated automatically from the documentation, but the TP overrides it
 * - 'event_name', // NA TP seems to not sending this variable
 * - 'event_source', // NA TP seems to not sending this variable
 * - 'event_name', // NA TP seems to not sending this variable
 * - 'event_value', // NA TP seems to not sending this variable
 * - 'navigation_environment', // prod | preprod
 * - 'media_subtitles_on', // string true | false
 * - 'media_timeshift', // need better description
 * - 'media_quality', // SD | HD ?
 * - 'media_bandwidth', // NA for the web, 64000
 * - 'media_volume', // from 0 to 100
 * - 'media_embedding_url', //
 * - 'media_player_name', // videojs | letterbox-web ?
 * - 'media_chromecast_selected', // boolean true | false
 * - 'media_player_version', // player's version
 * - 'media_player_display', // is the player mode, on the TP : inline, embed etc..
 * - 'media_audio_track', // NA
 * - 'media_position_real', // NA
 * - 'media_time_spent', // NA
 * - 'device_id', // NA
 * - 'user_id_log_in', // NA only RTS has log in today
 * - 'media_thumbnail', // Not required by the spec but sended by the TP
 * - 'media_bu_distributer', // Not required by the spec but sended by the TP
 *
 *
 * ### Sequence stories
 *
 * __Story 1 (AoD/VOD-basics)__: A VoD is played. The user does not interact with the player. The VoD plays to its end.
 *
 * Hints:
 * - Media sessions always start with PLAY. They end with STOP or EOF (or with PAUSE or last POS)
 * - POS is sent ever 30s
 *
 *
 * __Story 2 (livestream-basics A)__: A Livestream is played. The user does not interact with the player. After 61 seconds, playback is paused.
 *
 * Hints:
 * - Media sessions always start with PLAY. They end with STOP (or, worse for data quailty, with PAUSE or last POS/UPTIME)
 * - UPTIME is sent only for livestreams
 * - POS is sent ever 30s, UPTIME every 60s with inital UPTIME after 30s.
 * - This is the interval: 30s: POS + UPTIME; 60s: POS; 90s: POS + UPTIME; ...
 *
 *
 * __Story 3 (Seeking a VoD/AoD)__: A VoD is played. User seeks in the VoD/AoD.
 *
 * Hints:
 * - Once the Media Player slider is released (seek is over), another action to finish up the seeking is initiated. Typically this is PLAY. For that second PLAY, the media position has altered.
 *
 *
 * __Story 4 (Seeking a livestream)__: A Livestream is played. User goes back in the livestream.
 *
 * Hints:
 * - Once the Media Player slider is released (seek is over), another action to finish up the seeking is initiated. Typically this is PLAY.  For that second PLAY, the a new variable, media_timeshift is passed.
 * - For livestreams media_position is always the "time passed on your watch" - regardless of the SEEK event. So, if 1 second after PLAY the slider is moved  back 600 seconds, then:
 *  1. The the value of media_timeshift is '600'.
 *  2. The value of media_position is '1'.
 */
class SRGAnalytics {
  constructor(
    player,
    {
      debug = false,
      environment = 'prod',
      playerVersion = 'none',
      tagCommanderScriptURL = '//colibri-js.akamaized.net/penguin/tc_SRGGD_11.js',
    } = {}
  ) {
    this.isDebugEnabled = debug;
    this.elapsedPlaybackTime = 0;
    this.environment = environment;
    this.hasStarted = false;
    this.heartBeatIntervalId = undefined;
    /* Set to true when 'init' event is sent or queued. */
    this.initialized = false;
    this.isSeeking = false;
    this.isWaiting = false;
    this.mediaSession = 0;
    this.pendingQueue = [];
    this.pendingTagCommanderReload = false;
    this.player = player;
    this.playerVersion = playerVersion;
    this.srcMediaData = undefined;
    this.startPlaybackSession = 0;
    this.tagCommanderScriptURL = tagCommanderScriptURL;
    this.trackedCurrentTime = 0;
    this.uptimeIntervalId = undefined;

    this.initScript();
    this.initListeners();
  }

  /**
   * Sent when the window, the document and its resources are about to be unloaded.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
   */
  beforeunload() {
    this.notify('stop');
  }

  /**
   * Clear timers used to send uptime and heartbeat.
   */
  clearTimers() {
    clearInterval(this.heartBeatIntervalId);
    clearInterval(this.uptimeIntervalId);
    clearTimeout(this.uptimeTimeoutId);
  }

  /**
   * Get the tracked current time in seconds.
   *
   * @returns {Number} current time in seconds
   */
  currentTime() {
    // see PLAYRTS-2771
    return Math.round(this.trackedCurrentTime);
  }

  /**
   * Get or set debug mode.
   *
   * @returns {Boolean|undefined}
   */
  debug(enabled) {
    if (enabled === undefined) {
      return this.isDebugEnabled || this.player.debug();
    }

    this.isDebugEnabled = Boolean(enabled);
  }

  /**
   * Destroy all properties and setIntervals to avoid mixing media sessions.
   */
  destroy() {
    this.clearTimers();

    if (!window.tc_vars) {
      window.tc_vars = {};
    }
    this.elapsedPlaybackTime = 0;
    this.hasStarted = false;
    this.heartBeatIntervalId = undefined;
    this.initialized = false;
    this.isWaiting = false;
    this.mediaSession = 0;
    this.pendingQueue = [];
    this.srcMediaData = undefined;
    this.startPlaybackSession = 0;
    this.trackedCurrentTime = 0;
    this.uptimeIntervalId = undefined;
  }

  /**
   * Dispose all listeners used to send analytics data to TagCommander.
   *
   * Calls `beforeunload` to send a notify stop.
   * Clear intervals and timeouts.
   *
   * __Used events__
   * - beforeunload
   * - emptied
   * - ended
   * - loadstart
   * - loadeddata
   * - play
   * - pause
   * - timeupdate
   */
  dispose() {
    this.beforeunload();
    this.clearTimers();

    window.removeEventListener('beforeunload', this.beforeunloadListener);

    this.player.off(EMPTIED, this.emptiedListener);
    this.player.off(ENDED, this.endedListener);
    this.player.off(LOAD_START, this.loadstartListener);
    this.player.off(LOADED_DATA, this.loadeddataListener);
    this.player.off(PLAYING, this.playListener);
    this.player.off(PAUSE, this.pauseListener);
    this.player.off(RATE_CHANGE, this.rateChangeListener);
    this.player.off(SEEKING, this.seekingListener);
    this.player.off(TIME_UPDATE, this.timeUpdateListener);
    this.player.off(WAITING, this.waitingListener);
  }

  /**
   * Sent before a new media is loading.
   * - Destroy all properties.
   * - Send a notify stop if the media is not ended and new media is about to be loaded.
   */
  emptied() {
    if (!this.player.ended()) {
      this.notify('stop');
    }
  }

  /**
   * Sent when playback completes.
   *
   * @see https://docs.videojs.com/player#event:ended
   */
  ended() {
    this.notify('eof');

    this.mediaSession = 0;

    this.clearTimers();
  }

  /**
   * Flush the queued events when tc event script is loaded.
   */
  flush() {
    if (this.isTrackerDisabled()) return;

    if (this.pendingTagCommanderReload && window.tC) {
      window.tC.container.reload();
      this.pendingTagCommanderReload = false;
    }

    if (window.tc_events_11 && this.pendingQueue.length > 0) {
      this.pendingQueue.forEach((notification) => {
        window.tc_events_11(
          this.player.el(),
          notification.action,
          notification.labels
        );
      });

      this.pendingQueue = [];
    }
  }

  /**
   * Get the language of the current audio track.
   *
   * @returns {String} empty string or uppercase language.
   */
  getCurrentAudioTrack() {
    const currentTrack = Array.from(this.player.audioTracks()).find(
      (track) => track.enabled
    );
    let language = 'und';

    if (currentTrack && !!currentTrack.language) {
      // eslint-disable-next-line prefer-destructuring
      language = currentTrack.language;
    }

    return currentTrack ? language.toUpperCase() : '';
  }

  /**
   * Get the language of the current text track.
   *
   * @returns {String} empty string or uppercase language.
   */
  getCurrentTextTrack() {
    const currentTrack = this.player.textTrack();
    let language = 'und';

    if (currentTrack && !!currentTrack.language) {
      // eslint-disable-next-line prefer-destructuring
      language = currentTrack.language;
    }

    return currentTrack ? language.toUpperCase() : '';
  }

  /**
   * Get the position inside the dvr window where the 0 represents the live edge
   *
   * @return {Number} 0 or the position in milliseconds
   */
  getDvrWindowPosition() {
    const { liveTracker } = this.player;
    const ct = (this.currentTime() - liveTracker.seekableStart()) | 0;
    const position = liveTracker.liveWindow() - ct;

    return position < 0 || position === Infinity ? 0 : position * 1000;
  }

  /**
   * Get the size of the live DVR window in milliseconds.
   *
   * @return {Number} DVR window size in milliseconds
   */
  getDvrWindowSize() {
    const isInfinity = this.player.liveTracker.liveWindow() === Infinity;
    const windowSize = this.player.liveTracker.liveWindow() * 1000;

    return isInfinity ? 0 : windowSize;
  }

  /**
   * Get the elapsed playback time in seconds.
   *
   * @returns {Number} elapsed time in seconds
   */
  getElapsedPlaybackTime() {
    if (this.startPlaybackSession) {
      return this.getElapsedPlayingTime();
    }

    return this.elapsedPlaybackTime;
  }

  /**
   * Get the elapsed playing time in seconds.
   *
   * @returns {Number} elapsed time in seconds
   */
  getElapsedPlayingTime() {
    const playingSession = (SRGAnalytics.now() - this.startPlaybackSession) | 0;

    return this.elapsedPlaybackTime + playingSession;
  }

  /**
   * Set all event labels to be sent to TagCommander. The event labels are updated whenever a new event occurs.
   *
   * @param {String} eventName init | play | stop | pos | pause | seek | uptime | eof
   *
   * @returns {Object} JSON to be sent to TagCommander
   */
  getEventLabels(eventName) {
    const labels = {
      event_id: eventName,
      event_timestamp: SRGAnalytics.now(),
      media_dvr_window_length: 0,
      media_dvr_window_offset: 0,
      media_is_dvr: false,
      media_is_live: false,
      media_mute: this.player.muted() ? '1' : '0',
      media_playback_rate: this.player.playbackRate(),
      media_position: this.currentTime(),
      media_quality: this.srcMediaData.mediaData.quality,
      // TODO use media_is_dvr, media_is_live to define peach media_stream_type
      media_subtitles_on: this.isTextTrackEnabled(),
      media_volume: (this.player.volume() * 100).toFixed(0),
      navigation_environment: this.environment,
    };

    if (this.isAudioTrackEnabled()) {
      labels.media_audio_track = this.getCurrentAudioTrack();
    }

    if (this.isTextTrackEnabled()) {
      labels.media_subtitle_selection = this.getCurrentTextTrack();
    }

    // DVR or Live related labels
    if (!this.isMediaOnDemand()) {
      labels.media_is_live = true;
      labels.media_position = this.getElapsedPlaybackTime();
    }

    // DVR related labels
    if (this.isMediaDvr()) {
      labels.media_dvr_window_offset = this.getDvrWindowPosition() | 0;
      labels.media_dvr_window_length = this.getDvrWindowSize() | 0;

      labels.media_is_dvr = true;

      labels.media_timeshift = [PLAY, PAUSE].includes(
        eventName
      )
        ? this.timeShifted()
        : 0;
    }

    return labels;
  }

  /**
   * Set all internal labels to be sent to TagCommander. Internal labels are assigned once at initialisation time.
   */
  getInternalLabels() {
    const data = {
      media_bu_distributer: this.srcMediaData.mediaData.vendor,
      media_chromecast_selected: Boolean(this.player.tech(true).isCasting),
      media_embedding_url: document.referrer,
      media_player_display: 'default', // TODO implement if it still relevant
      media_player_name: 'pillarbox-web', // TODO add a property playerName in the constructor with a default value ?
      media_player_version: this.playerVersion,
      media_url: this.srcMediaData.src,
    };
    const analyticsMetadata =
      this.srcMediaData.mediaData.analyticsMetadata || {};

    window.tc_vars = Object.assign({}, window.tc_vars, data, analyticsMetadata);
  }

  /**
   * Heart beat, current position of a AoD/VoD (every 30s).
   *
   * @description The action pos should be sent regularly every 30 seconds.
   * It is used for tracking the viewed chapters of a video and the last position of the video, in case the user ends the video by closing the browser tab/window.
   *
   * - pos should be sent when the media player is in "play mode".
   * - once the video is paused or stopped, the timer for sending these actions must be stopped.
   *
   * @see https://confluence.srg.beecollaboration.com/display/INTFORSCHUNG/standard+streaming+events%3A+sequence+of+events+for+media+player+actions#standardstreamingevents:sequenceofeventsformediaplayeractions-mandatoryplayerevents
   */
  heartBeat() {
    this.heartBeatIntervalId = setInterval(() => {
      // Send only when playing
      if (!this.player.paused()) {
        this.notify('pos');
      }
    }, 30000);
  }

  /**
   * Initialize callbacks used to send analytics data to TagCommander.
   *
   * __Used events__
   * - beforeunload
   * - emptied
   * - ended
   * - loadstart
   * - loadeddata
   * - play
   * - pause
   * - ratechange
   * - seeking
   * - timeupdate
   * - waiting
   */
  initCallbacks() {
    this.beforeunloadListener = this.beforeunload.bind(this);
    this.emptiedListener = this.emptied.bind(this);
    this.endedListener = this.ended.bind(this);
    this.loadstartListener = this.loadstart.bind(this);
    this.loadeddataListener = this.loadeddata.bind(this);
    this.playListener = this.play.bind(this);
    this.pauseListener = this.pause.bind(this);
    this.rateChangeListener = this.rateChange.bind(this);
    this.seekingListener = this.seeking.bind(this);
    this.timeUpdateListener = this.timeUpdate.bind(this);
    this.waitingListener = this.waiting.bind(this);
  }

  /**
   * Initialize all listeners used to send analytics data to TagCommander.
   *
   * __Used events__
   * - beforeunload
   * - dispose
   * - emptied
   * - ended
   * - loadstart
   * - loadeddata
   * - play
   * - pause
   * - timeupdate
   * - waiting
   */
  initListeners() {
    this.initCallbacks();

    window.addEventListener('beforeunload', this.beforeunloadListener);

    this.player.on(EMPTIED, this.emptiedListener);
    this.player.on(ENDED, this.endedListener);
    this.player.on(LOAD_START, this.loadstartListener);
    this.player.on(LOADED_DATA, this.loadeddataListener);
    this.player.on(PLAYING, this.playListener);
    this.player.on(PAUSE, this.pauseListener);
    this.player.on(RATE_CHANGE, this.rateChangeListener);
    this.player.on(SEEKING, this.seekingListener);
    this.player.on(TIME_UPDATE, this.timeUpdateListener);
    this.player.on(WAITING, this.waitingListener);
    this.player.one('dispose', this.dispose.bind(this));
  }

  /**
   * Initialize TagCommander script dynamically and add it to the DOM
   */
  initScript() {
    const scriptId = 'tc_script__11';

    if (!document.querySelector(`#${scriptId}`)) {
      const script = document.createElement('script');
      const src = this.tagCommanderScriptURL;

      script.defer = true;
      script.id = scriptId;
      script.src = src;
      script.type = 'text/javascript';

      script.onload = (_e) => {
        this.flush();
      };

      document.body.appendChild(script);
    }
  }

  /**
   * Check if the audio track is enabled.
   *
   * @returns {Boolean} __true__ if enabled __false__ otherwise.
   */
  isAudioTrackEnabled() {
    return !!this.getCurrentAudioTrack();
  }

  /**
   * Check if the media is a live with DVR.
   *
   * @returns {Boolean} __true__ if it DVR __false__ otherwise.
   */
  isMediaDvr() {
    const { trackingThreshold } = this.player.liveTracker.options();

    return (
      !this.isMediaOnDemand() &&
      trackingThreshold < this.player.liveTracker.liveWindow()
    );
  }

  /**
   * Check if the media is a live.
   *
   * @returns {Boolean} __true__ if live __false__ otherwise.
   */
  isMediaLive() {
    const { trackingThreshold } = this.player.liveTracker.options();

    return (
      !this.isMediaOnDemand() &&
      trackingThreshold > this.player.liveTracker.liveWindow()
    );
  }

  /**
   * Check if the media is an on demand.
   *
   * @returns {Boolean} __true__ if on demand __false__ otherwise.
   */
  isMediaOnDemand() {
    return Number.isFinite(this.player.duration());
  }

  /**
   * Check if the text track is enabled.
   *
   * @returns {Boolean} __true__ if enabled __false__ otherwise.
   */
  isTextTrackEnabled() {
    return !!this.getCurrentTextTrack();
  }

  /**
   * Check if the tracker is disabled.
   *
   * @returns {Boolean} __true__ if disabled __false__ otherwise.
   */
  isTrackerDisabled() {
    if (!this.srcMediaData || !this.srcMediaData.mediaData)
      return true;

    if (!Array.isArray(this.srcMediaData.disableTrackers)) {
      return Boolean(this.srcMediaData.disableTrackers);
    }

    return Boolean(
      this.srcMediaData.disableTrackers.find(
        (tracker) => tracker.toLowerCase() === SRGAnalytics.name.toLowerCase()
      )
    );
  }

  /**
   * Sent when loading of the media begins.
   *
   * @see https://docs.videojs.com/player#event:loadstart
   */
  loadstart() {
    this.destroy();
    this.updateSrcMediaData(this.player.currentSource());

    if (this.isTrackerDisabled()) return;

    this.getInternalLabels();
    // Set ComScore labels
    this.reloadTagCommanderContainer();

    this.notify('buffer_start');
    this.hasStarted = false;
  }

  /**
   * The first frame of the media has finished loading.
   *
   * @see https://docs.videojs.com/player#event:loadeddata
   */
  loadeddata() {
    this.notify('init');
    this.initialized = true;

    this.notify('buffer_stop');
  }

  /**
   * Event logger that prints the current event, event labels and internal labels in the browser's console.
   *
   * @param {String} eventName init | play | stop | pos | pause | seek | uptime | eof
   * @param {Object} eventMetadata event metadata object
   * @param {String} severity log | warn | error
   */
  log(eventName, eventMetadata, severity = 'log') {
    if (this.debug()) {
      // eslint-disable-next-line
      console[severity](
        `SRGAnalytics:${eventName}`,
        eventMetadata,
        window.tc_vars
      );
    }
  }

  /**
   * Notify TagCommander all event and internal labels. If tc script is not available it queues all pending events.
   *
   * @param {String} eventName init | play | stop | pos | pause | seek | uptime | eof
   */
  notify(eventName, eventMetadata) {
    if (this.isTrackerDisabled()) return;

    try {
      this.flush();
    } catch (error) {
      this.log(eventName, error, 'error');
    }

    const labels = Object.assign(
      {},
      this.getEventLabels(eventName),
      eventMetadata
    );

    this.log(eventName, labels);

    try {
      if (window.tc_events_11) {
        window.tc_events_11(this.player.el(), eventName, labels);
      } else {
        this.pendingQueue.push({
          action: eventName,
          labels,
        });
      }
    } catch (error) {
      this.log(eventName, error, 'error');
    }
  }

  /**
   * Return the current timestamp in seconds.
   *
   * @returns {Number} Timestamp in seconds
   */
  static now() {
    return (Date.now() / 1000).toFixed(0);
  }

  /**
   * Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.
   *
   * @see https://docs.videojs.com/player#event:play
   */
  play() {
    if (!this.hasStarted) this.hasStarted = true;

    if (!this.startPlaybackSession && !this.isMediaOnDemand()) {
      this.startPlaybackSession = SRGAnalytics.now();
    }

    if (this.mediaSession === 0) {
      this.mediaSession = SRGAnalytics.now();

      this.heartBeat();
      this.uptime();
    }

    this.timeUpdate();
    this.notify('play');

    if (this.isSeeking) this.isSeeking = false;
  }

  /**
   * Sent when the playback state is changed to paused (paused property is true).
   * Pause event is sent if :
   * - The player is not scrubbing
   * - The stream is not a live only
   * - The current time is strictly inferior to the duration
   *
   * @see https://docs.videojs.com/player#event:pause
   */
  pause() {
    if (!this.isMediaOnDemand()) {
      this.elapsedPlaybackTime = this.getElapsedPlayingTime();
      this.startPlaybackSession = 0;
    }

    if (
      !this.player.seeking() &&
      !this.isMediaLive() &&
      this.player.currentTime() < this.player.duration()
    ) {
      this.notify('pause');

      return;
    }

    if (this.hasStarted && !this.isSeeking) {
      this.notify('seek');
      this.isSeeking = true;
    }
  }

  /**
   * Sent to ComScore when the playback rate changes.
   *
   * @see https://github.com/SRGSSR/srgletterbox-web/issues/761
   * @see https://jira.srg.beecollaboration.com/browse/ADI-256
   */
  rateChange() {
    this.notify('change_playback_rate');
  }

  /**
   * Reload the tagCommander container and set all ComScore labels
   */
  reloadTagCommanderContainer() {
    if (window.tC) {
      window.tC.container.reload();
      this.pendingTagCommanderReload = false;
    } else {
      this.pendingTagCommanderReload = true;
    }
  }

  /**
   * Sent when the current time is modified by the player's currentTime API.
   *
   * @see https://docs.videojs.com/player#event:seeking
   */
  seeking() {
    if (this.hasStarted && !this.player.paused() && !this.isSeeking) {
      this.notify('seek');
      this.isSeeking = true;
    }
  }

  /**
   * Track current time updates delayed by a tick.
   *
   * @see https://docs.videojs.com/player#event:timeupdate
   */
  timeUpdate() {
    if (!this.player.paused()) {
      this.trackedCurrentTime = this.player.currentTime();
    }
  }

  /**
   * Gets the number of seconds that separate from the live edge that is represented by 0.
   *
   * @returns {String}
   */
  timeShifted() {
    const isAtLiveEdge = this.player.liveTracker.atLiveEdge();
    const liveCurrentTime = this.player.liveTracker.liveCurrentTime();
    const currentTime = this.player.currentTime();
    const timeShifted = isAtLiveEdge
      ? 0
      : (liveCurrentTime - currentTime).toFixed(0);

    return timeShifted;
  }

  /**
   * Update the src media data.
   */
  updateSrcMediaData(srcMediaData) {
    this.srcMediaData = srcMediaData;
  }

  /**
   * Calculate the uptime when playing a live stream with or without DVR
   *
   * __Rules__:
   * - Send the first uptime after 30 seconds
   * - Send uptime each 60 seconds after the 30 seconds
   * - Uptime is sent only when playing
   */
  uptime() {
    const notifyUptime = () => {
      if (!this.player.paused() && !this.isMediaOnDemand()) {
        this.notify('uptime');
      }
    };

    // Send the first uptime after 30 seconds
    this.uptimeTimeoutId = setTimeout(() => {
      // Send only when playing
      notifyUptime();

      // Initialize the uptime interval after 30 seconds
      this.uptimeIntervalId = setInterval(() => {
        // Send only when playing
        notifyUptime();
      }, 60000);
    }, 30000);
  }

  /**
   *  __ComScore__:
   * It's expected notifyBufferStart() to be called when the player starts buffering
   * and a call to notifyBufferStop() when content resumes after buffering.
   *
   * @see Item 2: https://jira.srg.beecollaboration.com/browse/PLAY-2628
   *
   * After the issue PLAYRTS-321
   * @see Fix: https://jira.srg.beecollaboration.com/browse/PLAYRTS-321?focusedCommentId=201023&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-201023
   * @see Fix: https://jira.srg.beecollaboration.com/browse/PLAYRTS-3065
   */
  waiting() {
    if (!this.initialized || this.isWaiting) {
      return;
    }

    const bufferStop = () => {
      this.isWaiting = false;
      this.notify('buffer_stop');
    };

    this.isWaiting = true;

    this.notify('buffer_start');

    // As Safari is not consistent with its playing event, it is better to use the timeupdate event.
    if (pillarbox.browser.IS_ANY_SAFARI) {
      this.player.one(TIME_UPDATE, bufferStop);
    } else {
      // As Chromium-based browsers are not consistent with their timeupdate event, it is better to use the playing event.
      // Firefox is consistent with its playing event.
      this.player.one(PLAYING, bufferStop);
    }
  }
}

var Play$4 = "Wiedergabe";
var Pause$4 = "Pause";
var Replay$4 = "Erneut abspielen";
var Duration$4 = "Dauer";
var LIVE$4 = "LIVE";
var Loaded$4 = "Geladen";
var Progress$4 = "Status";
var Fullscreen$4 = "Vollbild";
var Mute$4 = "Stumm schalten";
var Unmute$4 = "Ton einschalten";
var Subtitles$4 = "Untertitel";
var Captions$4 = "Untertitel";
var Chapters$4 = "Kapitel";
var Close$4 = "Schließen";
var Descriptions$4 = "Beschreibungen";
var Text$4 = "Schrift";
var White$4 = "Weiß";
var Black$4 = "Schwarz";
var Red$4 = "Rot";
var Green$4 = "Grün";
var Blue$4 = "Blau";
var Yellow$4 = "Gelb";
var Magenta$4 = "Magenta";
var Cyan$4 = "Türkis";
var Background$4 = "Hintergrund";
var Window$4 = "Fenster";
var Transparent$4 = "Durchsichtig";
var Opaque$4 = "Undurchsichtig";
var None$4 = "Kein";
var Raised$3 = "Erhoben";
var Depressed$3 = "Gedrückt";
var Uniform$4 = "Uniform";
var Casual$3 = "Zwanglos";
var Script$3 = "Schreibschrift";
var Reset$4 = "Zurücksetzen";
var Done$4 = "Fertig";
var Color$3 = "Farbe";
var Opacity$3 = "Deckkraft";
var de$1 = {
	Play: Play$4,
	Pause: Pause$4,
	Replay: Replay$4,
	"Current Time": "Aktueller Zeitpunkt",
	Duration: Duration$4,
	"Remaining Time": "Verbleibende Zeit",
	"Stream Type": "Streamtyp",
	LIVE: LIVE$4,
	Loaded: Loaded$4,
	Progress: Progress$4,
	Fullscreen: Fullscreen$4,
	"Exit Fullscreen": "Vollbildmodus beenden",
	Mute: Mute$4,
	Unmute: Unmute$4,
	"Playback Rate": "Wiedergabegeschwindigkeit",
	Subtitles: Subtitles$4,
	"subtitles off": "Untertitel aus",
	Captions: Captions$4,
	"captions off": "Untertitel aus",
	Chapters: Chapters$4,
	"You aborted the media playback": "Sie haben die Videowiedergabe abgebrochen.",
	"A network error caused the media download to fail part-way.": "Der Videodownload ist aufgrund eines Netzwerkfehlers fehlgeschlagen.",
	"The media could not be loaded, either because the server or network failed or because the format is not supported.": "Das Video konnte nicht geladen werden, da entweder ein Server- oder Netzwerkfehler auftrat oder das Format nicht unterstützt wird.",
	"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "Die Videowiedergabe wurde entweder wegen eines Problems mit einem beschädigten Video oder wegen verwendeten Funktionen, die vom Browser nicht unterstützt werden, abgebrochen.",
	"No compatible source was found for this media.": "Für dieses Video wurde keine kompatible Quelle gefunden.",
	"Play Video": "Video abspielen",
	Close: Close$4,
	"Modal Window": "Modales Fenster",
	"This is a modal window": "Dies ist ein modales Fenster",
	"This modal can be closed by pressing the Escape key or activating the close button.": "Durch Drücken der Esc-Taste bzw. Betätigung der Schaltfläche \"Schließen\" wird dieses modale Fenster geschlossen.",
	", opens captions settings dialog": ", öffnet Einstellungen für Untertitel",
	", opens subtitles settings dialog": ", öffnet Einstellungen für Untertitel",
	", selected": ", ausgewählt",
	"captions settings": "Untertiteleinstellungen",
	"subtitles settings": "Untertiteleinstellungen",
	"descriptions settings": "Einstellungen für Beschreibungen",
	"Close Modal Dialog": "Modales Fenster schließen",
	Descriptions: Descriptions$4,
	"descriptions off": "Beschreibungen aus",
	"The media is encrypted and we do not have the keys to decrypt it.": "Die Entschlüsselungsschlüssel für den verschlüsselten Medieninhalt sind nicht verfügbar.",
	", opens descriptions settings dialog": ", öffnet Einstellungen für Beschreibungen",
	"Audio Track": "Tonspur",
	Text: Text$4,
	White: White$4,
	Black: Black$4,
	Red: Red$4,
	Green: Green$4,
	Blue: Blue$4,
	Yellow: Yellow$4,
	Magenta: Magenta$4,
	Cyan: Cyan$4,
	Background: Background$4,
	Window: Window$4,
	Transparent: Transparent$4,
	"Semi-Transparent": "Halbdurchsichtig",
	Opaque: Opaque$4,
	"Font Size": "Schriftgröße",
	"Text Edge Style": "Textkantenstil",
	None: None$4,
	Raised: Raised$3,
	Depressed: Depressed$3,
	Uniform: Uniform$4,
	"Drop shadow": "Schlagschatten",
	"Font Family": "Schriftfamilie",
	"Proportional Sans-Serif": "Proportionale Sans-Serif",
	"Monospace Sans-Serif": "Monospace Sans-Serif",
	"Proportional Serif": "Proportionale Serif",
	"Monospace Serif": "Monospace Serif",
	Casual: Casual$3,
	Script: Script$3,
	"Small Caps": "Small-Caps",
	Reset: Reset$4,
	"restore all settings to the default values": "Alle Einstellungen auf die Standardwerte zurücksetzen",
	Done: Done$4,
	"Caption Settings Dialog": "Einstellungsdialog für Untertitel",
	"Beginning of dialog window. Escape will cancel and close the window.": "Anfang des Dialogfensters. Esc bricht ab und schließt das Fenster.",
	"End of dialog window.": "Ende des Dialogfensters.",
	"Audio Player": "Audio-Player",
	"Video Player": "Video-Player",
	"Progress Bar": "Fortschrittsbalken",
	"progress bar timing: currentTime={1} duration={2}": "{1} von {2}",
	"Volume Level": "Lautstärke",
	"{1} is loading.": "{1} wird geladen.",
	"Seek to live, currently behind live": "Zur Live-Übertragung wechseln. Aktuell wird es nicht live abgespielt.",
	"Seek to live, currently playing live": "Zur Live-Übertragung wechseln. Es wird aktuell live abgespielt.",
	"Exit Picture-in-Picture": "Bild-im-Bild-Modus beenden",
	"Picture-in-Picture": "Bild-im-Bild-Modus",
	"No content": "Kein Inhalt",
	Color: Color$3,
	Opacity: Opacity$3,
	"Text Background": "Texthintergrund",
	"Caption Area Background": "Hintergrund des Untertitelbereichs",
	"Playing in Picture-in-Picture": "Wird im Bild-im-Bild-Modus wiedergegeben",
	"Skip forward {1} seconds": "{1} Sekunden vorwärts",
	"Skip backward {1} seconds": "{1} Sekunden zurück"
};

var vjsLang$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Background: Background$4,
  Black: Black$4,
  Blue: Blue$4,
  Captions: Captions$4,
  Casual: Casual$3,
  Chapters: Chapters$4,
  Close: Close$4,
  Color: Color$3,
  Cyan: Cyan$4,
  Depressed: Depressed$3,
  Descriptions: Descriptions$4,
  Done: Done$4,
  Duration: Duration$4,
  Fullscreen: Fullscreen$4,
  Green: Green$4,
  LIVE: LIVE$4,
  Loaded: Loaded$4,
  Magenta: Magenta$4,
  Mute: Mute$4,
  None: None$4,
  Opacity: Opacity$3,
  Opaque: Opaque$4,
  Pause: Pause$4,
  Play: Play$4,
  Progress: Progress$4,
  Raised: Raised$3,
  Red: Red$4,
  Replay: Replay$4,
  Reset: Reset$4,
  Script: Script$3,
  Subtitles: Subtitles$4,
  Text: Text$4,
  Transparent: Transparent$4,
  Uniform: Uniform$4,
  Unmute: Unmute$4,
  White: White$4,
  Window: Window$4,
  Yellow: Yellow$4,
  default: de$1
});

var AGERATING12$4 = "Aus Gründen des Jugendschutzes steht dieser Inhalt nur zwischen 20:00 und 06:00 Uhr zur Verfügung.";
var AGERATING18$4 = "Aus Gründen des Jugendschutzes steht dieser Inhalt nur zwischen 23:00 und 05:00 Uhr zur Verfügung.";
var COMMERCIAL$4 = "Die Werbung wurde übersprungen.";
var ENDDATE$4 = "Dieser Inhalt ist nicht mehr verfügbar.";
var GEOBLOCK$4 = "Dieser Inhalt ist ausserhalb der Schweiz nicht verfügbar.";
var LEGAL$4 = "Dieser Inhalt ist aus rechtlichen Gründen nicht verfügbar.";
var STARTDATE$4 = "Dieser Inhalt ist noch nicht verfügbar. Bitte probieren Sie es später noch einmal.";
var UNKNOWN$4 = "Dieser Inhalt ist nicht verfügbar.";
var de = {
	AGERATING12: AGERATING12$4,
	AGERATING18: AGERATING18$4,
	COMMERCIAL: COMMERCIAL$4,
	ENDDATE: ENDDATE$4,
	GEOBLOCK: GEOBLOCK$4,
	LEGAL: LEGAL$4,
	STARTDATE: STARTDATE$4,
	UNKNOWN: UNKNOWN$4
};

var pillarboxLang$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AGERATING12: AGERATING12$4,
  AGERATING18: AGERATING18$4,
  COMMERCIAL: COMMERCIAL$4,
  ENDDATE: ENDDATE$4,
  GEOBLOCK: GEOBLOCK$4,
  LEGAL: LEGAL$4,
  STARTDATE: STARTDATE$4,
  UNKNOWN: UNKNOWN$4,
  default: de
});

pillarbox.addLanguage('de', {
  ...vjsLang$3,
  ...pillarboxLang$4,
});

var Play$3 = "Play";
var Pause$3 = "Pause";
var Replay$3 = "Replay";
var Duration$3 = "Duration";
var LIVE$3 = "LIVE";
var Loaded$3 = "Loaded";
var Progress$3 = "Progress";
var Fullscreen$3 = "Fullscreen";
var Mute$3 = "Mute";
var Unmute$3 = "Unmute";
var Subtitles$3 = "Subtitles";
var Captions$3 = "Captions";
var Chapters$3 = "Chapters";
var Descriptions$3 = "Descriptions";
var Close$3 = "Close";
var Text$3 = "Text";
var White$3 = "White";
var Black$3 = "Black";
var Red$3 = "Red";
var Green$3 = "Green";
var Blue$3 = "Blue";
var Yellow$3 = "Yellow";
var Magenta$3 = "Magenta";
var Cyan$3 = "Cyan";
var Background$3 = "Background";
var Window$3 = "Window";
var Transparent$3 = "Transparent";
var Opaque$3 = "Opaque";
var None$3 = "None";
var Raised$2 = "Raised";
var Depressed$2 = "Depressed";
var Uniform$3 = "Uniform";
var Casual$2 = "Casual";
var Script$2 = "Script";
var Reset$3 = "Reset";
var Done$3 = "Done";
var Color$2 = "Color";
var Opacity$2 = "Opacity";
var en$1 = {
	"Audio Player": "Audio Player",
	"Video Player": "Video Player",
	Play: Play$3,
	Pause: Pause$3,
	Replay: Replay$3,
	"Current Time": "Current Time",
	Duration: Duration$3,
	"Remaining Time": "Remaining Time",
	"Stream Type": "Stream Type",
	LIVE: LIVE$3,
	"Seek to live, currently behind live": "Seek to live, currently behind live",
	"Seek to live, currently playing live": "Seek to live, currently playing live",
	Loaded: Loaded$3,
	Progress: Progress$3,
	"Progress Bar": "Progress Bar",
	"progress bar timing: currentTime={1} duration={2}": "{1} of {2}",
	Fullscreen: Fullscreen$3,
	"Exit Fullscreen": "Exit Fullscreen",
	Mute: Mute$3,
	Unmute: Unmute$3,
	"Playback Rate": "Playback Rate",
	Subtitles: Subtitles$3,
	"subtitles off": "subtitles off",
	Captions: Captions$3,
	"captions off": "captions off",
	Chapters: Chapters$3,
	Descriptions: Descriptions$3,
	"descriptions off": "descriptions off",
	"Audio Track": "Audio Track",
	"Volume Level": "Volume Level",
	"You aborted the media playback": "You aborted the media playback",
	"A network error caused the media download to fail part-way.": "A network error caused the media download to fail part-way.",
	"The media could not be loaded, either because the server or network failed or because the format is not supported.": "The media could not be loaded, either because the server or network failed or because the format is not supported.",
	"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "The media playback was aborted due to a corruption problem or because the media used features your browser did not support.",
	"No compatible source was found for this media.": "No compatible source was found for this media.",
	"The media is encrypted and we do not have the keys to decrypt it.": "The media is encrypted and we do not have the keys to decrypt it.",
	"Play Video": "Play Video",
	Close: Close$3,
	"Close Modal Dialog": "Close Modal Dialog",
	"Modal Window": "Modal Window",
	"This is a modal window": "This is a modal window",
	"This modal can be closed by pressing the Escape key or activating the close button.": "This modal can be closed by pressing the Escape key or activating the close button.",
	", opens captions settings dialog": ", opens captions settings dialog",
	", opens subtitles settings dialog": ", opens subtitles settings dialog",
	", opens descriptions settings dialog": ", opens descriptions settings dialog",
	", selected": ", selected",
	"captions settings": "captions settings",
	"subtitles settings": "subtitles settings",
	"descriptions settings": "descriptions settings",
	Text: Text$3,
	White: White$3,
	Black: Black$3,
	Red: Red$3,
	Green: Green$3,
	Blue: Blue$3,
	Yellow: Yellow$3,
	Magenta: Magenta$3,
	Cyan: Cyan$3,
	Background: Background$3,
	Window: Window$3,
	Transparent: Transparent$3,
	"Semi-Transparent": "Semi-Transparent",
	Opaque: Opaque$3,
	"Font Size": "Font Size",
	"Text Edge Style": "Text Edge Style",
	None: None$3,
	Raised: Raised$2,
	Depressed: Depressed$2,
	Uniform: Uniform$3,
	"Drop shadow": "Drop shadow",
	"Font Family": "Font Family",
	"Proportional Sans-Serif": "Proportional Sans-Serif",
	"Monospace Sans-Serif": "Monospace Sans-Serif",
	"Proportional Serif": "Proportional Serif",
	"Monospace Serif": "Monospace Serif",
	Casual: Casual$2,
	Script: Script$2,
	"Small Caps": "Small Caps",
	Reset: Reset$3,
	"restore all settings to the default values": "restore all settings to the default values",
	Done: Done$3,
	"Caption Settings Dialog": "Caption Settings Dialog",
	"Beginning of dialog window. Escape will cancel and close the window.": "Beginning of dialog window. Escape will cancel and close the window.",
	"End of dialog window.": "End of dialog window.",
	"{1} is loading.": "{1} is loading.",
	"Exit Picture-in-Picture": "Exit Picture-in-Picture",
	"Picture-in-Picture": "Picture-in-Picture",
	"No content": "No content",
	Color: Color$2,
	Opacity: Opacity$2,
	"Text Background": "Text Background",
	"Caption Area Background": "Caption Area Background",
	"Playing in Picture-in-Picture": "Playing in Picture-in-Picture",
	"Skip backward {1} seconds": "Skip backward {1} seconds",
	"Skip forward {1} seconds": "Skip forward {1} seconds"
};

var vjsLang$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Background: Background$3,
  Black: Black$3,
  Blue: Blue$3,
  Captions: Captions$3,
  Casual: Casual$2,
  Chapters: Chapters$3,
  Close: Close$3,
  Color: Color$2,
  Cyan: Cyan$3,
  Depressed: Depressed$2,
  Descriptions: Descriptions$3,
  Done: Done$3,
  Duration: Duration$3,
  Fullscreen: Fullscreen$3,
  Green: Green$3,
  LIVE: LIVE$3,
  Loaded: Loaded$3,
  Magenta: Magenta$3,
  Mute: Mute$3,
  None: None$3,
  Opacity: Opacity$2,
  Opaque: Opaque$3,
  Pause: Pause$3,
  Play: Play$3,
  Progress: Progress$3,
  Raised: Raised$2,
  Red: Red$3,
  Replay: Replay$3,
  Reset: Reset$3,
  Script: Script$2,
  Subtitles: Subtitles$3,
  Text: Text$3,
  Transparent: Transparent$3,
  Uniform: Uniform$3,
  Unmute: Unmute$3,
  White: White$3,
  Window: Window$3,
  Yellow: Yellow$3,
  default: en$1
});

var AGERATING12$3 = "To protect children this content is only available between 8PM and 6AM.";
var AGERATING18$3 = "To protect children this content is only available between 10PM and 5AM.";
var COMMERCIAL$3 = "This commercial content is not available.";
var ENDDATE$3 = "This content is not available anymore.";
var GEOBLOCK$3 = "This content is not available outside Switzerland.";
var LEGAL$3 = "This content is not available due to legal restrictions.";
var STARTDATE$3 = "This content is not available yet.";
var UNKNOWN$3 = "This content is not available.";
var en = {
	AGERATING12: AGERATING12$3,
	AGERATING18: AGERATING18$3,
	COMMERCIAL: COMMERCIAL$3,
	ENDDATE: ENDDATE$3,
	GEOBLOCK: GEOBLOCK$3,
	LEGAL: LEGAL$3,
	STARTDATE: STARTDATE$3,
	UNKNOWN: UNKNOWN$3
};

var pillarboxLang$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AGERATING12: AGERATING12$3,
  AGERATING18: AGERATING18$3,
  COMMERCIAL: COMMERCIAL$3,
  ENDDATE: ENDDATE$3,
  GEOBLOCK: GEOBLOCK$3,
  LEGAL: LEGAL$3,
  STARTDATE: STARTDATE$3,
  UNKNOWN: UNKNOWN$3,
  default: en
});

pillarbox.addLanguage('en', {
  ...vjsLang$2,
  ...pillarboxLang$3,
});

var Play$2 = "Lecture";
var Pause$2 = "Pause";
var Replay$2 = "Revoir";
var Duration$2 = "Durée";
var LIVE$2 = "EN DIRECT";
var Loaded$2 = "Chargé";
var Progress$2 = "Progression";
var Fullscreen$2 = "Plein écran";
var Mute$2 = "Mettre en sourdine";
var Unmute$2 = "Activer le son";
var Subtitles$2 = "Sous-titres";
var Captions$2 = "Sous-titres transcrits";
var Chapters$2 = "Chapitres";
var Descriptions$2 = "Descriptions";
var Close$2 = "Fermer";
var Text$2 = "Texte";
var White$2 = "Blanc";
var Black$2 = "Noir";
var Red$2 = "Rouge";
var Green$2 = "Vert";
var Blue$2 = "Bleu";
var Yellow$2 = "Jaune";
var Magenta$2 = "Magenta";
var Cyan$2 = "Cyan";
var Background$2 = "Arrière-plan";
var Window$2 = "Fenêtre";
var Transparent$2 = "Transparent";
var Opaque$2 = "Opaque";
var None$2 = "Aucun";
var Raised$1 = "Élevé";
var Depressed$1 = "Enfoncé";
var Uniform$2 = "Uniforme";
var Casual$1 = "Manuscrite";
var Script$1 = "Scripte";
var Reset$2 = "Réinitialiser";
var Done$2 = "Terminé";
var Color$1 = "Couleur";
var Opacity$1 = "Opacité";
var fr$1 = {
	"Audio Player": "Lecteur audio",
	"Video Player": "Lecteur vidéo",
	Play: Play$2,
	Pause: Pause$2,
	Replay: Replay$2,
	"Current Time": "Temps actuel",
	Duration: Duration$2,
	"Remaining Time": "Temps restant",
	"Stream Type": "Type de flux",
	LIVE: LIVE$2,
	"Seek to live, currently behind live": "Rechercher le direct, actuellement après le direct",
	"Seek to live, currently playing live": "Rechercher le direct, le direct actuellement en cours de lecture",
	Loaded: Loaded$2,
	Progress: Progress$2,
	"Progress Bar": "Barre de progression",
	"progress bar timing: currentTime={1} duration={2}": "{1} de {2}",
	Fullscreen: Fullscreen$2,
	"Exit Fullscreen": "Fenêtré",
	Mute: Mute$2,
	Unmute: Unmute$2,
	"Playback Rate": "Vitesse de lecture",
	Subtitles: Subtitles$2,
	"subtitles off": "Sous-titres désactivés",
	Captions: Captions$2,
	"captions off": "Sous-titres transcrits désactivés",
	Chapters: Chapters$2,
	Descriptions: Descriptions$2,
	"descriptions off": "descriptions désactivées",
	"Audio Track": "Piste audio",
	"Volume Level": "Niveau de volume",
	"You aborted the media playback": "Vous avez interrompu la lecture de la vidéo.",
	"A network error caused the media download to fail part-way.": "Une erreur de réseau a interrompu le téléchargement de la vidéo.",
	"The media could not be loaded, either because the server or network failed or because the format is not supported.": "Cette vidéo n'a pas pu être chargée, soit parce que le serveur ou le réseau a échoué ou parce que le format n'est pas reconnu.",
	"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "La lecture de la vidéo a été interrompue à cause d'un problème de corruption ou parce que la vidéo utilise des fonctionnalités non prises en charge par votre navigateur.",
	"No compatible source was found for this media.": "Aucune source compatible n'a été trouvée pour cette vidéo.",
	"The media is encrypted and we do not have the keys to decrypt it.": "Le média est chiffré et nous n'avons pas les clés pour le déchiffrer.",
	"Play Video": "Lire la vidéo",
	Close: Close$2,
	"Close Modal Dialog": "Fermer la boîte de dialogue modale",
	"Modal Window": "Fenêtre modale",
	"This is a modal window": "Ceci est une fenêtre modale",
	"This modal can be closed by pressing the Escape key or activating the close button.": "Ce modal peut être fermé en appuyant sur la touche Échap ou activer le bouton de fermeture.",
	", opens captions settings dialog": ", ouvrir les paramètres des sous-titres transcrits",
	", opens subtitles settings dialog": ", ouvrir les paramètres des sous-titres",
	", opens descriptions settings dialog": ", ouvrir les paramètres des descriptions",
	", selected": ", sélectionné",
	"captions settings": "Paramètres des sous-titres transcrits",
	"subtitles settings": "Paramètres des sous-titres",
	"descriptions settings": "Paramètres des descriptions",
	Text: Text$2,
	White: White$2,
	Black: Black$2,
	Red: Red$2,
	Green: Green$2,
	Blue: Blue$2,
	Yellow: Yellow$2,
	Magenta: Magenta$2,
	Cyan: Cyan$2,
	Background: Background$2,
	Window: Window$2,
	Transparent: Transparent$2,
	"Semi-Transparent": "Semi-transparent",
	Opaque: Opaque$2,
	"Font Size": "Taille des caractères",
	"Text Edge Style": "Style des contours du texte",
	None: None$2,
	Raised: Raised$1,
	Depressed: Depressed$1,
	Uniform: Uniform$2,
	"Drop shadow": "Ombre portée",
	"Font Family": "Famille de polices",
	"Proportional Sans-Serif": "Polices à chasse variable sans empattement (Proportional Sans-Serif)",
	"Monospace Sans-Serif": "Polices à chasse fixe sans empattement (Monospace Sans-Serif)",
	"Proportional Serif": "Polices à chasse variable avec empattement (Proportional Serif)",
	"Monospace Serif": "Polices à chasse fixe avec empattement (Monospace Serif)",
	Casual: Casual$1,
	Script: Script$1,
	"Small Caps": "Petites capitales",
	Reset: Reset$2,
	"restore all settings to the default values": "Restaurer tous les paramètres aux valeurs par défaut",
	Done: Done$2,
	"Caption Settings Dialog": "Boîte de dialogue des paramètres des sous-titres transcrits",
	"Beginning of dialog window. Escape will cancel and close the window.": "Début de la fenêtre de dialogue. La touche d'échappement annulera et fermera la fenêtre.",
	"End of dialog window.": "Fin de la fenêtre de dialogue.",
	"Exit Picture-in-Picture": "Quitter le mode image dans l'image",
	"Picture-in-Picture": "Image dans l'image",
	"{1} is loading.": "{1} en cours de chargement.",
	"No content": "Aucun contenu",
	Color: Color$1,
	Opacity: Opacity$1,
	"Text Background": "Arrière-plan du texte",
	"Caption Area Background": "Arrière-plan de la zone de sous-titre",
	"Skip backward {1} seconds": "Reculer de {1} secondes",
	"Skip forward {1} seconds": "Avancer de {1} secondes"
};

var vjsLang$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Background: Background$2,
  Black: Black$2,
  Blue: Blue$2,
  Captions: Captions$2,
  Casual: Casual$1,
  Chapters: Chapters$2,
  Close: Close$2,
  Color: Color$1,
  Cyan: Cyan$2,
  Depressed: Depressed$1,
  Descriptions: Descriptions$2,
  Done: Done$2,
  Duration: Duration$2,
  Fullscreen: Fullscreen$2,
  Green: Green$2,
  LIVE: LIVE$2,
  Loaded: Loaded$2,
  Magenta: Magenta$2,
  Mute: Mute$2,
  None: None$2,
  Opacity: Opacity$1,
  Opaque: Opaque$2,
  Pause: Pause$2,
  Play: Play$2,
  Progress: Progress$2,
  Raised: Raised$1,
  Red: Red$2,
  Replay: Replay$2,
  Reset: Reset$2,
  Script: Script$1,
  Subtitles: Subtitles$2,
  Text: Text$2,
  Transparent: Transparent$2,
  Uniform: Uniform$2,
  Unmute: Unmute$2,
  White: White$2,
  Window: Window$2,
  Yellow: Yellow$2,
  default: fr$1
});

var AGERATING12$2 = "Pour protéger les enfants, ce contenu est accessible entre 20h et 6h.";
var AGERATING18$2 = "Pour protéger les enfants, ce contenu est accessible entre 23h et 5h.";
var COMMERCIAL$2 = "Ce contenu n'est actuellement pas disponible.";
var ENDDATE$2 = "Ce contenu n'est plus disponible.";
var GEOBLOCK$2 = "La RTS ne dispose pas des droits de diffusion en dehors de la Suisse.";
var LEGAL$2 = "Pour des raisons juridiques, ce contenu n'est pas disponible.";
var STARTDATE$2 = "Ce contenu n'est pas encore disponible. Veuillez réessayer plus tard.";
var UNKNOWN$2 = "Ce contenu n'est actuellement pas disponible.";
var fr = {
	AGERATING12: AGERATING12$2,
	AGERATING18: AGERATING18$2,
	COMMERCIAL: COMMERCIAL$2,
	ENDDATE: ENDDATE$2,
	GEOBLOCK: GEOBLOCK$2,
	LEGAL: LEGAL$2,
	STARTDATE: STARTDATE$2,
	UNKNOWN: UNKNOWN$2
};

var pillarboxLang$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AGERATING12: AGERATING12$2,
  AGERATING18: AGERATING18$2,
  COMMERCIAL: COMMERCIAL$2,
  ENDDATE: ENDDATE$2,
  GEOBLOCK: GEOBLOCK$2,
  LEGAL: LEGAL$2,
  STARTDATE: STARTDATE$2,
  UNKNOWN: UNKNOWN$2,
  default: fr
});

pillarbox.addLanguage('fr', {
  ...vjsLang$1,
  ...pillarboxLang$2,
});

var Play$1 = "Play";
var Pause$1 = "Pausa";
var Replay$1 = "Replay";
var Duration$1 = "Durata";
var LIVE$1 = "LIVE";
var Loaded$1 = "Caricato";
var Progress$1 = "Stato";
var Fullscreen$1 = "Schermo intero";
var Mute$1 = "Disattiva l’audio";
var Unmute$1 = "Attiva l’audio";
var Subtitles$1 = "Sottotitoli";
var Captions$1 = "Sottotitoli non udenti";
var Chapters$1 = "Capitolo";
var Descriptions$1 = "Descrizioni";
var Close$1 = "Chiudi";
var Text$1 = "Testo";
var White$1 = "Bianco";
var Black$1 = "Nero";
var Red$1 = "Rosso";
var Green$1 = "Verde";
var Blue$1 = "Blu";
var Yellow$1 = "Giallo";
var Magenta$1 = "Magenta";
var Cyan$1 = "Ciano";
var Background$1 = "Sfondo";
var Window$1 = "Finestra";
var Transparent$1 = "Trasparente";
var Opaque$1 = "Opaco";
var None$1 = "Nessuno";
var Uniform$1 = "Uniforme";
var Reset$1 = "Reinizializza";
var Done$1 = "Fatto";
var Color = "Colore";
var Opacity = "Opacità";
var it$1 = {
	"Audio Player": "Lettore audio",
	"Video Player": "Lettore video",
	Play: Play$1,
	Pause: Pause$1,
	Replay: Replay$1,
	"Current Time": "Orario attuale",
	Duration: Duration$1,
	"Remaining Time": "Tempo rimanente",
	"Stream Type": "Tipo di streaming",
	LIVE: LIVE$1,
	Loaded: Loaded$1,
	Progress: Progress$1,
	"Progress Bar": "Barra di avanzamento",
	"progress bar timing: currentTime={1} duration={2}": "{1} di {2}",
	Fullscreen: Fullscreen$1,
	"Exit Fullscreen": "Chiudi Schermo intero",
	Mute: Mute$1,
	Unmute: Unmute$1,
	"Playback Rate": "Velocità di riproduzione",
	Subtitles: Subtitles$1,
	"subtitles off": "Senza sottotitoli",
	Captions: Captions$1,
	"captions off": "Senza sottotitoli non udenti",
	Chapters: Chapters$1,
	Descriptions: Descriptions$1,
	"descriptions off": "Descrizioni disattivate",
	"Audio Track": "Traccia audio",
	"Volume Level": "Livello del volume",
	"You aborted the media playback": "La riproduzione del contenuto multimediale è stata interrotta.",
	"A network error caused the media download to fail part-way.": "Il download del contenuto multimediale è stato interrotto a causa di un problema rete.",
	"The media could not be loaded, either because the server or network failed or because the format is not supported.": "Il contenuto multimediale non può essere caricato a causa di un errore nel server o nella rete o perché il formato non viene supportato.",
	"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "La riproduzione del contenuto multimediale è stata interrotta a causa di un file danneggiato o per l’utilizzo di impostazioni non supportate dal browser.",
	"No compatible source was found for this media.": "Non ci sono fonti compatibili per questo contenuto multimediale.",
	"The media is encrypted and we do not have the keys to decrypt it.": "Il contenuto multimediale è criptato e non disponiamo delle chiavi per decifrarlo.",
	"Play Video": "Riproduci il video",
	Close: Close$1,
	"Close Modal Dialog": "Chiudi la finestra di dialogo",
	"Modal Window": "Finestra di dialogo",
	"This is a modal window": "Questa è una finestra di dialogo",
	"This modal can be closed by pressing the Escape key or activating the close button.": "Questa finestra di dialogo può essere chiusa premendo sul tasto Esc o attivando il pulsante di chiusura.",
	", opens captions settings dialog": ", aprire i parametri della trascrizione dei sottotitoli",
	", opens subtitles settings dialog": ", aprire i parametri dei sottotitoli",
	", opens descriptions settings dialog": ", aprire i parametri delle descrizioni",
	", selected": ", selezionato",
	"captions settings": "Parametri sottotitoli non udenti",
	"subtitles settings": "Parametri sottotitoli",
	"descriptions settings": "Parametri descrizioni",
	Text: Text$1,
	White: White$1,
	Black: Black$1,
	Red: Red$1,
	Green: Green$1,
	Blue: Blue$1,
	Yellow: Yellow$1,
	Magenta: Magenta$1,
	Cyan: Cyan$1,
	Background: Background$1,
	Window: Window$1,
	Transparent: Transparent$1,
	"Semi-Transparent": "Semi-Trasparente",
	Opaque: Opaque$1,
	"Font Size": "Dimensione dei caratteri",
	"Text Edge Style": "Stile dei bordi del testo",
	None: None$1,
	Uniform: Uniform$1,
	"Drop shadow": "Ombra",
	"Font Family": "Carattere",
	"Proportional Sans-Serif": "Sans-Serif proporzionale",
	"Monospace Sans-Serif": "Sans-Serif monospaziato",
	"Proportional Serif": "Serif proporzionale",
	"Monospace Serif": "Serif monospaziato",
	"Small Caps": "Maiuscoletto",
	Reset: Reset$1,
	"restore all settings to the default values": "Ripristina i valori predefiniti per tutti i parametri",
	Done: Done$1,
	"Caption Settings Dialog": "Finestra di dialogo dei parametri della trascrizione dei sottotitoli",
	"Beginning of dialog window. Escape will cancel and close the window.": "Inizio della finestra di dialogo. Il tasto Esc annullerà l’operazione e chiuderà la finestra.",
	"End of dialog window.": "Fine della finestra di dialogo.",
	"{1} is loading.": "{1} in fase di caricamento.",
	"Exit Picture-in-Picture": "Esci dalla modalità Picture-in-Picture",
	"Picture-in-Picture": "Picture-in-Picture",
	Color: Color,
	Opacity: Opacity,
	"Text Background": "Sfondo testo",
	"Caption Area Background": "Sfondo area sottotitoli",
	"Skip forward {1} seconds": "Avanti {1} secondi",
	"Skip backward {1} seconds": "Indietro {1} secondi"
};

var vjsLang = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Background: Background$1,
  Black: Black$1,
  Blue: Blue$1,
  Captions: Captions$1,
  Chapters: Chapters$1,
  Close: Close$1,
  Color: Color,
  Cyan: Cyan$1,
  Descriptions: Descriptions$1,
  Done: Done$1,
  Duration: Duration$1,
  Fullscreen: Fullscreen$1,
  Green: Green$1,
  LIVE: LIVE$1,
  Loaded: Loaded$1,
  Magenta: Magenta$1,
  Mute: Mute$1,
  None: None$1,
  Opacity: Opacity,
  Opaque: Opaque$1,
  Pause: Pause$1,
  Play: Play$1,
  Progress: Progress$1,
  Red: Red$1,
  Replay: Replay$1,
  Reset: Reset$1,
  Subtitles: Subtitles$1,
  Text: Text$1,
  Transparent: Transparent$1,
  Uniform: Uniform$1,
  Unmute: Unmute$1,
  White: White$1,
  Window: Window$1,
  Yellow: Yellow$1,
  default: it$1
});

var AGERATING12$1 = "Per proteggere i bambini, questo media è disponibile solo fra le 20 e le 6.";
var AGERATING18$1 = "Per proteggere i bambini, questo media è disponibile solo fra le 23 le 5.";
var COMMERCIAL$1 = "Questo contenuto commerciale non è disponibile.";
var ENDDATE$1 = "Questo media non è più disponibile.";
var GEOBLOCK$1 = "Questo media non è disponibile fuori dalla Svizzera.";
var LEGAL$1 = "Il contenuto non è fruibile a causa di restrizioni legali.";
var STARTDATE$1 = "Il contenuto non è ancora disponibile. Per cortesia prova più tardi.";
var UNKNOWN$1 = "Questo media non è disponibile.";
var it = {
	AGERATING12: AGERATING12$1,
	AGERATING18: AGERATING18$1,
	COMMERCIAL: COMMERCIAL$1,
	ENDDATE: ENDDATE$1,
	GEOBLOCK: GEOBLOCK$1,
	LEGAL: LEGAL$1,
	STARTDATE: STARTDATE$1,
	UNKNOWN: UNKNOWN$1
};

var pillarboxLang$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AGERATING12: AGERATING12$1,
  AGERATING18: AGERATING18$1,
  COMMERCIAL: COMMERCIAL$1,
  ENDDATE: ENDDATE$1,
  GEOBLOCK: GEOBLOCK$1,
  LEGAL: LEGAL$1,
  STARTDATE: STARTDATE$1,
  UNKNOWN: UNKNOWN$1,
  default: it
});

pillarbox.addLanguage('it', {
  ...vjsLang,
  ...pillarboxLang$1,
});

var Play = "Laschar ir";
var Pause = "Pausa";
var Replay = "Mussar danovamain";
var Duration = "Durada";
var LIVE = "LIVE";
var Loaded = "Chargià";
var Progress = "Progress";
var Fullscreen = "Entir visur";
var Mute = "Senza tun";
var Unmute = "Cun tun";
var Subtitles = "Suttitels";
var Captions = "Suttitels";
var Chapters = "Chapitels";
var Descriptions = "Descripziuns";
var Close = "Serrar";
var Text = "Text";
var White = "Alv";
var Black = "Nair";
var Red = "Cotschn";
var Green = "Verd";
var Blue = "Blau";
var Yellow = "Mellen";
var Magenta = "Magenta";
var Cyan = "Cyan";
var Background = "Fund";
var Window = "Fanestra";
var Transparent = "Transparent";
var Opaque = "Betg transparent";
var None = "Nagin";
var Raised = "Auzà";
var Depressed = "Sbassà";
var Uniform = "Uniform";
var Dropshadow = "Sumbriva";
var Casual = "Casual";
var Script = "Script";
var Reset = "Da nov";
var Done = "Fatg";
var AGERATING12 = "Per proteger uffants, è quest cuntegn disponibel mo tranter las 20.00 e las 06.00.";
var AGERATING18 = "Per proteger uffants, è quest cuntegn disponibel mo tranter las 23.00 e las 05.00.";
var COMMERCIAL = "Quest medium commerzial n'è betg disponibel.";
var ENDDATE = "Quest cuntegn n'è betg pli disponibel.";
var GEOBLOCK = "Quest cuntegn n'è betg disponibel ordaifer la Svizra.";
var LEGAL = "Quest cuntegn n'è betg disponibel perquai ch'el è scadì.";
var STARTDATE = "Quest cuntegn n'è betg anc disponibel. Empruvai pli tard.";
var UNKNOWN = "Quest cuntegn n'è betg disponibel.";
var rm = {
	"Audio Player": "Audio-Player",
	"Video Player": "Video-Player",
	Play: Play,
	Pause: Pause,
	Replay: Replay,
	"Current Time": "Temp actual",
	Duration: Duration,
	"Remaining Time": "Temp restant",
	"Stream Type": "Tip dal stream",
	LIVE: LIVE,
	Loaded: Loaded,
	Progress: Progress,
	"Progress Bar": "Bar da progessiun",
	"progress bar timing: currentTime={1} duration={2}": "{1} da {2}",
	Fullscreen: Fullscreen,
	"Non-Fullscreen": "Betg entir visur",
	Mute: Mute,
	Unmute: Unmute,
	"Playback Rate": "Tempo ",
	Subtitles: Subtitles,
	"subtitles off": "senza suttitels",
	Captions: Captions,
	"captions off": "senza suttitels",
	Chapters: Chapters,
	Descriptions: Descriptions,
	"descriptions off": "senza descripziuns",
	"Audio Track": "Piese audio",
	"Volume Level": "Nivel dal volumen",
	"You aborted the media playback": "Vus avais interrut il vdieo",
	"A network error caused the media download to fail part-way.": "In sbagl en la rait ha impedì il download",
	"The media could not be loaded, either because the server or network failed or because the format is not supported.": "Il video n'è betg chargià - ubain per in sbagl da server / da la rait, ubain ch'il format n'è betg cumpatibel.",
	"The media playback was aborted due to a corruption problem or because the media used features your browser did not support.": "Il video è interrut: Ubain ch'il video è donnegià, ubain che funcziuns n'èn betg cumpatiblas.",
	"No compatible source was found for this media.": "Chattà nagina funtauna cumpatibla per quest video.",
	"The media is encrypted and we do not have the keys to decrypt it.": "Il video è codifitgà da moda nunenconuschenta.",
	"Play Video": "Aviar video",
	Close: Close,
	"Close Modal Dialog": "Serrar la fanestra modala",
	"Modal Window": "Fanestra modala",
	"This is a modal window": "Quai è ina fanestra modala",
	"This modal can be closed by pressing the Escape key or activating the close button.": "Questa fanestra modala pudais serrar cun la tasta \"Escape\" ubain cun il buttun.",
	", opens captions settings dialog": ", avra opziuns per ils suttitels",
	", opens subtitles settings dialog": ", avra opziuns per ils suttitels",
	", opens descriptions settings dialog": ", avra opziuns per la descripziun",
	", selected": ", selecziunà",
	"captions settings": "opziuns per ils suttitels",
	"subtitles settings": "opziuns per ils suttitels",
	"descriptions settings": "opziuns per la descripziun",
	Text: Text,
	White: White,
	Black: Black,
	Red: Red,
	Green: Green,
	Blue: Blue,
	Yellow: Yellow,
	Magenta: Magenta,
	Cyan: Cyan,
	Background: Background,
	Window: Window,
	Transparent: Transparent,
	"Semi-Transparent": "Mez transparent",
	Opaque: Opaque,
	"Font Size": "Grandezza dal text",
	"Text Edge Style": "Stil dal text",
	None: None,
	Raised: Raised,
	Depressed: Depressed,
	Uniform: Uniform,
	Dropshadow: Dropshadow,
	"Font Family": "Scrittira",
	"Proportional Sans-Serif": "Proportionale Sans-Serif",
	"Monospace Sans-Serif": "Monospace Sans-Serif",
	"Proportional Serif": "Proportionale Serif",
	"Monospace Serif": "Monospace Serif",
	Casual: Casual,
	Script: Script,
	"Small Caps": "Bustabs pitschens",
	Reset: Reset,
	"restore all settings to the default values": "Enavos tar las opziuns da standard",
	Done: Done,
	"Caption Settings Dialog": "Opziuns per suttitels",
	"Beginning of dialog window. Escape will cancel and close the window.": "Entschatta da la fanestra da dialog. Escape stizza e serra la fanestra.",
	"End of dialog window.": "Fin da la fanestra da dialog.",
	AGERATING12: AGERATING12,
	AGERATING18: AGERATING18,
	COMMERCIAL: COMMERCIAL,
	ENDDATE: ENDDATE,
	GEOBLOCK: GEOBLOCK,
	LEGAL: LEGAL,
	STARTDATE: STARTDATE,
	UNKNOWN: UNKNOWN
};

var pillarboxLang = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AGERATING12: AGERATING12,
  AGERATING18: AGERATING18,
  Background: Background,
  Black: Black,
  Blue: Blue,
  COMMERCIAL: COMMERCIAL,
  Captions: Captions,
  Casual: Casual,
  Chapters: Chapters,
  Close: Close,
  Cyan: Cyan,
  Depressed: Depressed,
  Descriptions: Descriptions,
  Done: Done,
  Dropshadow: Dropshadow,
  Duration: Duration,
  ENDDATE: ENDDATE,
  Fullscreen: Fullscreen,
  GEOBLOCK: GEOBLOCK,
  Green: Green,
  LEGAL: LEGAL,
  LIVE: LIVE,
  Loaded: Loaded,
  Magenta: Magenta,
  Mute: Mute,
  None: None,
  Opaque: Opaque,
  Pause: Pause,
  Play: Play,
  Progress: Progress,
  Raised: Raised,
  Red: Red,
  Replay: Replay,
  Reset: Reset,
  STARTDATE: STARTDATE,
  Script: Script,
  Subtitles: Subtitles,
  Text: Text,
  Transparent: Transparent,
  UNKNOWN: UNKNOWN,
  Uniform: Uniform,
  Unmute: Unmute,
  White: White,
  Window: Window,
  Yellow: Yellow,
  default: rm
});

pillarbox.addLanguage('rm', {
  ...pillarboxLang,
});

/**
 * @class SrgSsr
 */
class SrgSsr {
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
    if (!Drm.hasDrm(resources)) ;

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

    const type = pillarbox.browser.IS_ANY_SAFARI ? 'HLS' : 'DASH';
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

          return next(null, srcMediaObj);
        } catch (error) {
          if (SrgSsr.dataProviderError(player, error)) return;

          return next(error);
        }
      },
    };
  }
}

pillarbox.use('srgssr/urn', SrgSsr.middleware);

// Add Middleware specific options
pillarbox.options.srgOptions = {
  dataProviderHost: undefined,
  tagCommanderScriptURL: undefined,
};

export { player as Player, SrgSsr, pillarbox as default };
