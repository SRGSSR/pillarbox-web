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
videojs.registerComponent('player', Player);

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

export { pillarbox as default };
