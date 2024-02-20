declare const _default: Player;
export default _default;
declare const Player_base: typeof import("video.js/dist/types/player").default;
/**
 * This class extends {@link VideoJsPlayer}.
 *
 * @class Player
 */
declare class Player extends Player_base {
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
    audioTrack(trackSelector?: TrackSelector): AudioTrack | undefined;
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
    textTrack(trackSelector?: TrackSelector): VideojsTextTrack | undefined;
}
//# sourceMappingURL=player.d.ts.map