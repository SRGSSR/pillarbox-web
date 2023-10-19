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
}

// Overrides the default video.js player component
videojs.registerComponent('player', Player);

export default Player;
