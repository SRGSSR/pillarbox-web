import { version } from '../package.json';
import videojs from 'video.js';
import 'videojs-contrib-eme';
import './components/player.js';

/**
 * @namespace
 * @class Pillarbox
 *
 * @extends import('video.js').VideoJsPlayer
 *
 */
class Pillarbox extends videojs {
  static get VERSION() {
    return {
      pillarbox: version,
      videojs: videojs.VERSION,
      [videojs.VhsSourceHandler.name]: videojs.VhsSourceHandler.VERSION,
      eme: videojs.getPlugin('eme').VERSION,
    };
  }
}

/**
 * Enable smooth seeking for Pillarbox.
 *
 * @see [Video.js enableSmoothSeeking Option]{@link https://videojs.com/guides/options/#enablesmoothseeking}
 * @type {boolean}
 */
Pillarbox.options.enableSmoothSeeking = true;
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
Pillarbox.options.html5 = {
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
Pillarbox.options.liveTracker = {
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
Pillarbox.options.liveui = true;
/**
 * Indicates that the video is to be played "inline", that is within the element's playback area.
 *
 * @see [Video element playsinline attribute]{@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#playsinline}
 * @type {boolean}
 */
Pillarbox.options.playsinline = true;
/**
 * Configuration for plugins.
 *
 * @see [Video.js Plugins Option]{@link https://videojs.com/guides/options/#plugins}
 * @type {Object}
 * @property {boolean} eme - Enable the EME (Encrypted Media Extensions) plugin.
 */
Pillarbox.options.plugins = { eme: true };
/**
 * Enable responsive mode, this will cause the player to customize itself based on responsive breakpoints.
 *
 * @see [Video.js Responsive Option]{@link https://videojs.com/guides/options/#responsive}
 * @type {boolean}
 */
Pillarbox.options.responsive = true;
Pillarbox.options.srgOptions = {
  dataProviderHost: undefined,
  tagCommanderScriptURL: undefined,
};
Pillarbox.options.trackers = {};


export default Pillarbox;
