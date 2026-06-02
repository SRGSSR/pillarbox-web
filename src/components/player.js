import videojs from 'video.js';
import 'videojs-contrib-eme';

/** @import VJSPlayer from 'video.js/dist/types/player' */
/** @import AudioTrack from 'video.js/dist/types/tracks/audio-track' */
/** @import TextTrack from 'video.js/dist/types/tracks/text-track' */
/** @import {TrackSelector} from './typedef' */

/**
 * @ignore
 * @type {typeof VJSPlayer}
 */
const vjsPlayer = videojs.getComponent('player');

/**
 * This class extends the video.js Player.
 *
 * @class Player
 * @see https://docs.videojs.com/player
 */
class Player extends vjsPlayer {
  constructor(tag, options, ready) {
    /**
     * Configuration for plugins.
     *
     * @see [Video.js Plugins Option]{@link https://videojs.com/guides/options/#plugins}
     * @type {Object}
     * @property {boolean} eme - Enable the EME (Encrypted Media Extensions) plugin.
     */
    options = videojs.obj.merge(options, { plugins: { eme: true }});
    super(tag, options, ready);
  }

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
   * @return {AudioTrack | undefined} The
   *         currently enabled audio track. See {@link https://docs.videojs.com/audiotrack}.
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
   * Calculates an array of ranges based on the `buffered()` data.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/buffered
   *
   * @returns {Array<{start: number, end: number}>} An array of objects representing start and end points of buffered ranges.
   */
  bufferedRanges() {
    const ranges = [];

    for (let i = 0; i < this.buffered().length; i++) {
      const start = this.buffered().start(i);
      const end = this.buffered().end(i);

      ranges.push({ start, end });
    }

    return ranges;
  }

  /**
   * Create a floating video window always on top of other windows so that users may
   * continue consuming media while they interact with other content sites, or
   * applications on their device.
   *
   * This can use document picture-in-picture or element picture in picture
   *
   * Set `enableDocumentPictureInPicture` to `true` to use docPiP on a supported browser
   * Else set `disablePictureInPicture` to `false` to disable elPiP on a supported browser
   *
   *
   * @see [Spec]{@link https://w3c.github.io/picture-in-picture/}
   * @see [Spec]{@link https://wicg.github.io/document-picture-in-picture/}
   *
   * @fires Player#enterpictureinpicture
   *
   * @return {Promise}
   *         A promise with a Picture-in-Picture window.
   */
  /* eslint-disable */
  requestPictureInPicture() {
    if (this.options_.enableDocumentPictureInPicture && window.documentPictureInPicture) {
      const pipContainer = document.createElement(this.el().tagName);

      pipContainer.classList = this.el().classList;
      pipContainer.classList.add('vjs-pip-container');
      if (this.posterImage) {
        pipContainer.appendChild(this.posterImage.el().cloneNode(true));
      }
      if (this.titleBar) {
        pipContainer.appendChild(this.titleBar.el().cloneNode(true));
      }
      pipContainer.appendChild(videojs.dom.createEl('p', { className: 'vjs-pip-text' }, {}, this.localize('Playing in picture-in-picture')));

      return window.documentPictureInPicture.requestWindow({
        // The aspect ratio won't be correct, Chrome bug https://crbug.com/1407629
        width: this.videoWidth(),
        height: this.videoHeight()
      }).then(pipWindow => {
        videojs.dom.copyStyleSheetsToWindow(pipWindow);
        this.el_.parentNode.insertBefore(pipContainer, this.el_);

        pipWindow.document.body.appendChild(this.el_);
        pipWindow.document.body.classList.add('vjs-pip-window');

        this.player_.isInPictureInPicture(true);
        this.player_.trigger({ type: 'enterpictureinpicture', pipWindow });

        // Listen for the PiP closing event to move the video back.
        pipWindow.addEventListener('pagehide', (event) => {
          console.log(event.target);
          const pipVideo = event.target.querySelector('.vjs-v8');

          pipContainer.parentNode.replaceChild(pipVideo, pipContainer);
          this.player_.isInPictureInPicture(false);
          this.player_.trigger('leavepictureinpicture');
        });

        return pipWindow;
      });
    }
    if ('pictureInPictureEnabled' in document && this.disablePictureInPicture() === false) {
      /**
       * This event fires when the player enters picture in picture mode
       *
       * @event Player#enterpictureinpicture
       * @type {Event}
       */
      return this.techGet_('requestPictureInPicture');
    }

    return Promise.reject('No PiP mode is available');
  }
  /* eslint-enable */

  /**
   * Get the percent (as a decimal) of the media that's been played.
   * This method is not a part of the native HTML video API.
   *
   * Live streams with DVR are not currently supported.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#htmlmediaelement.played
   *
   * @return {number}
   *         A decimal between 0 and 1 representing the percent
   *         that is played 0 being 0% and 1 being 100%
   */
  playedPercent() {
    if (!Number.isFinite(this.duration())) return NaN;

    let timePlayed = 0;

    for (let i = 0; i != this.played().length; i++) {
      timePlayed += this.played().end(i) - this.played().start(i);
    }

    const percentPlayed = timePlayed / this.duration();

    return percentPlayed;
  }

  /**
   * Get an array of ranges based on the `played` data.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#htmlmediaelement.played
   *
   * @returns {Array<{start: number, end: number}>} An array of objects representing start and end points of played ranges.
   */
  playedRanges() {
    const ranges = [];

    for (let i = 0; i < this.played().length; i++) {
      const start = this.played().start(i);
      const end = this.played().end(i);

      ranges.push({ start, end });
    }

    return ranges;
  }

  /**
   * Calculates an array of ranges based on the `seekable()` data.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seekable
   *
   * @returns {Array<{start: number, end: number}>} An array of objects representing start and end points of seekable ranges.
   */
  seekableRanges() {
    const ranges = [];

    for (let i = 0; i < this.seekable().length; i++) {
      const start = this.seekable().start(i);
      const end = this.seekable().end(i);

      ranges.push({ start, end });
    }

    return ranges;
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
   * @return {TextTrack | undefined} The
   *         currently enabled text track. See {@link https://docs.videojs.com/texttrack}.
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

videojs.registerComponent('player', Player);

export default Player;
