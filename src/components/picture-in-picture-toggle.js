import videojs from 'video.js';

/**
 * @ignore
 */
const VJSPictureInPictureToggle = videojs.getComponent('PictureInPictureToggle');

class PictureInPictureToggle extends VJSPictureInPictureToggle {
  /**
   * Displays or hides the button depending on the audio mode detection.
   * Exits picture-in-picture if it is enabled when switching to audio mode.
   */
  /* eslint-disable */
  handlePictureInPictureAudioModeChange() {
    // This audio detection will not detect HLS or DASH audio-only streams because there was no reliable way to detect them at the time
    const isSourceAudio = this.player_.currentType().substring(0, 5) === 'audio';
    const isAudioMode =
      isSourceAudio || this.player_.audioPosterMode() || this.player_.audioOnlyMode();

    if (!isAudioMode || (this.player_.options_.enableDocumentPictureInPicture && 'documentPictureInPicture' in window)) {
      this.show();

      return;
    }

    if (this.player_.isInPictureInPicture()) {
      this.player_.exitPictureInPicture();
    }

    this.hide();
  }
  /* eslint-enable */

  /**
 * Show the `Component`s element if it is hidden by removing the
 * 'vjs-hidden' class name from it only in browsers that support the Picture-in-Picture API.
 */
  show() {
    // Does not allow to display the pictureInPictureToggle in browsers that do not support the Picture-in-Picture or DocumentPictureInPicture API.
    if (
      typeof document.exitPictureInPicture !== 'function' &&
      !(this.player_.options_.enableDocumentPictureInPicture && 'documentPictureInPicture' in window)
    ) {
      return;
    }

    this.removeClass('vjs-hidden');
  }
}

videojs.registerComponent('PictureInPictureToggle', PictureInPictureToggle);
export default PictureInPictureToggle;
