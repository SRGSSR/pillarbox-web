import videojs from 'video.js';

class Player extends videojs.getComponent('player') {
  /**
   * A getter/setter for the media's audio track.
   * Activates the audio track according to the language and kind properties.
   * Falls back on the first audio track found if the kind property is not satisfied.
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
   * @return { import('video.js/dist/types/tracks/audio-track').default|undefined }
   */
  audioTrack(trackSelector) {
    const audioTracks = Array.from(this.player().audioTracks());

    if (!trackSelector) {
      return audioTracks.find((audioTrack) => audioTrack.enabled);
    }

    const { kind, language } = trackSelector;
    const audioTrack =
      audioTracks.find((audioTrack) => {
        return (audioTrack.enabled =
          audioTrack.language === language && audioTrack.kind === kind);
      }) ||
      audioTracks.find((audioTrack) => {
        return (audioTrack.enabled = audioTrack.language === language);
      });

    return audioTrack;
  }

  /**
   * A getter/setter for the media's text track.
   * Activates the text track according to the language and kind properties.
   * Falls back on the first text track found if the kind property is not satisfied.
   * Disables all subtitle tracks that are `showing` if the `trackSelector` is truthy but does not satisfy any condition.
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
   * @return { import('video.js/dist/types/tracks/audio-track').default|undefined }
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

// Overrides the default video.js player component
export default videojs.registerComponent('player', Player);
