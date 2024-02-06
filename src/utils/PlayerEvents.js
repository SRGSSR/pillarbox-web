/**
 * Exhaustive list of player events.
 *
 * See below the documentation related to the media events
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events
 *
 * @namespace {Object} PlayerEvents
 */

/**
 * Triggered when the media can start playing.
 *
 * @event PlayerEvents#CAN_PLAY
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event
 */
export const CAN_PLAY = 'canplay';

/**
 * Triggered when the media can be played through to the end without buffering.
 *
 * @event PlayerEvents#CAN_PLAY_THROUGH
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event
 */
export const CAN_PLAY_THROUGH = 'canplaythrough';

/**
 * Triggered when the duration of the media changes.
 *
 * @event PlayerEvents#DURATION_CHANGE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event
 */
export const DURATION_CHANGE = 'durationchange';

/**
 * Triggered when the media element is emptied (e.g., reset as part of the seeking process).
 *
 * @event PlayerEvents#EMPTIED
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event
 */
export const EMPTIED = 'emptied';

/**
 * Triggered when the media playback has ended.
 *
 * @event PlayerEvents#ENDED
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event
 */
export const ENDED = 'ended';

/**
 * Triggered when an error occurs during media playback.
 *
 * @event PlayerEvents#ERROR
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event
 */
export const ERROR = 'error';

/**
 * Triggered when the media data has been loaded.
 *
 * @event PlayerEvents#LOADED_DATA
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event
 */
export const LOADED_DATA = 'loadeddata';

/**
 * Triggered when metadata for the media has been loaded.
 *
 * @event PlayerEvents#LOADED_METADATA
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event
 */
export const LOADED_METADATA = 'loadedmetadata';

/**
 * Triggered when the browser starts looking for media data.
 *
 * @event PlayerEvents#LOAD_START
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event
 */
export const LOAD_START = 'loadstart';

/**
 * Triggered when the media playback is paused.
 *
 * @event PlayerEvents#PAUSE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event
 */
export const PAUSE = 'pause';

/**
 * Triggered when the media playback is resumed or started.
 *
 * @event PlayerEvents#PLAY
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event
 */
export const PLAY = 'play';

/**
 * Triggered when the media playback is in progress.
 *
 * @event PlayerEvents#PLAYING
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event
 */
export const PLAYING = 'playing';

/**
 * Triggered as the media is being loaded.
 *
 * @event PlayerEvents#PROGRESS
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event
 */
export const PROGRESS = 'progress';

/**
 * Triggered when the playback rate changes.
 *
 * @event PlayerEvents#RATE_CHANGE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event
 */
export const RATE_CHANGE = 'ratechange';

/**
 * Triggered when a seek operation is completed.
 *
 * @event PlayerEvents#SEEKED
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event
 */
export const SEEKED = 'seeked';

/**
 * Triggered when a seek operation is in progress.
 *
 * @event PlayerEvents#SEEKING
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event
 */
export const SEEKING = 'seeking';

/**
 * Triggered when the media playback is stalled.
 *
 * @event PlayerEvents#STALLED
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event
 */
export const STALLED = 'stalled';

/**
 * Triggered when media loading is suspended.
 *
 * @event PlayerEvents#SUSPEND
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event
 */
export const SUSPEND = 'suspend';

/**
 * Triggered when the current playback position is updated.
 *
 * @event PlayerEvents#TIME_UPDATE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event
 */
export const TIME_UPDATE = 'timeupdate';

/**
 * Triggered when the volume is changed.
 *
 * @event PlayerEvents#VOLUME_CHANGE
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event
 */
export const VOLUME_CHANGE = 'volumechange';

/**
 * Triggered when the media playback is waiting for data.
 *
 * @event PlayerEvents#WAITING
 * @type {string}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event
 */
export const WAITING = 'waiting';
