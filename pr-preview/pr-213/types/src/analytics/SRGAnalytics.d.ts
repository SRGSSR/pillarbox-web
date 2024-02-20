export default SRGAnalytics;
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
declare class SRGAnalytics {
    /**
     * Return the current timestamp in seconds.
     *
     * @returns {Number} Timestamp in seconds
     */
    static now(): number;
    constructor(player: any, { debug, environment, playerVersion, tagCommanderScriptURL, }?: {
        debug?: boolean;
        environment?: string;
        playerVersion?: string;
        tagCommanderScriptURL?: string;
    });
    isDebugEnabled: boolean;
    elapsedPlaybackTime: number;
    environment: string;
    hasStarted: boolean;
    heartBeatIntervalId: NodeJS.Timeout;
    initialized: boolean;
    isSeeking: boolean;
    isWaiting: boolean;
    mediaSession: number;
    pendingQueue: any[];
    pendingTagCommanderReload: boolean;
    player: any;
    playerVersion: string;
    srcMediaData: any;
    startPlaybackSession: number;
    tagCommanderScriptURL: string;
    trackedCurrentTime: number;
    uptimeIntervalId: NodeJS.Timeout;
    /**
     * Sent when the window, the document and its resources are about to be unloaded.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
     */
    beforeunload(): void;
    /**
     * Clear timers used to send uptime and heartbeat.
     */
    clearTimers(): void;
    /**
     * Get the tracked current time in seconds.
     *
     * @returns {Number} current time in seconds
     */
    currentTime(): number;
    /**
     * Get or set debug mode.
     *
     * @returns {Boolean|undefined}
     */
    debug(enabled: any): boolean | undefined;
    /**
     * Destroy all properties and setIntervals to avoid mixing media sessions.
     */
    destroy(): void;
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
    dispose(): void;
    /**
     * Sent before a new media is loading.
     * - Destroy all properties.
     * - Send a notify stop if the media is not ended and new media is about to be loaded.
     */
    emptied(): void;
    /**
     * Sent when playback completes.
     *
     * @see https://docs.videojs.com/player#event:ended
     */
    ended(): void;
    /**
     * Flush the queued events when tc event script is loaded.
     */
    flush(): void;
    /**
     * Get the language of the current audio track.
     *
     * @returns {String} empty string or uppercase language.
     */
    getCurrentAudioTrack(): string;
    /**
     * Get the language of the current text track.
     *
     * @returns {String} empty string or uppercase language.
     */
    getCurrentTextTrack(): string;
    /**
     * Get the position inside the dvr window where the 0 represents the live edge
     *
     * @return {Number} 0 or the position in milliseconds
     */
    getDvrWindowPosition(): number;
    /**
     * Get the size of the live DVR window in milliseconds.
     *
     * @return {Number} DVR window size in milliseconds
     */
    getDvrWindowSize(): number;
    /**
     * Get the elapsed playback time in seconds.
     *
     * @returns {Number} elapsed time in seconds
     */
    getElapsedPlaybackTime(): number;
    /**
     * Get the elapsed playing time in seconds.
     *
     * @returns {Number} elapsed time in seconds
     */
    getElapsedPlayingTime(): number;
    /**
     * Set all event labels to be sent to TagCommander. The event labels are updated whenever a new event occurs.
     *
     * @param {String} eventName init | play | stop | pos | pause | seek | uptime | eof
     *
     * @returns {Object} JSON to be sent to TagCommander
     */
    getEventLabels(eventName: string): any;
    /**
     * Set all internal labels to be sent to TagCommander. Internal labels are assigned once at initialisation time.
     */
    getInternalLabels(): void;
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
    heartBeat(): void;
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
    initCallbacks(): void;
    beforeunloadListener: any;
    emptiedListener: any;
    endedListener: any;
    loadstartListener: any;
    loadeddataListener: any;
    playListener: any;
    pauseListener: any;
    rateChangeListener: any;
    seekingListener: any;
    timeUpdateListener: any;
    waitingListener: any;
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
    initListeners(): void;
    /**
     * Initialize TagCommander script dynamically and add it to the DOM
     */
    initScript(): void;
    /**
     * Check if the audio track is enabled.
     *
     * @returns {Boolean} __true__ if enabled __false__ otherwise.
     */
    isAudioTrackEnabled(): boolean;
    /**
     * Check if the media is a live with DVR.
     *
     * @returns {Boolean} __true__ if it DVR __false__ otherwise.
     */
    isMediaDvr(): boolean;
    /**
     * Check if the media is a live.
     *
     * @returns {Boolean} __true__ if live __false__ otherwise.
     */
    isMediaLive(): boolean;
    /**
     * Check if the media is an on demand.
     *
     * @returns {Boolean} __true__ if on demand __false__ otherwise.
     */
    isMediaOnDemand(): boolean;
    /**
     * Check if the text track is enabled.
     *
     * @returns {Boolean} __true__ if enabled __false__ otherwise.
     */
    isTextTrackEnabled(): boolean;
    /**
     * Check if the tracker is disabled.
     *
     * @returns {Boolean} __true__ if disabled __false__ otherwise.
     */
    isTrackerDisabled(): boolean;
    /**
     * Sent when loading of the media begins.
     *
     * @see https://docs.videojs.com/player#event:loadstart
     */
    loadstart(): void;
    /**
     * The first frame of the media has finished loading.
     *
     * @see https://docs.videojs.com/player#event:loadeddata
     */
    loadeddata(): void;
    /**
     * Event logger that prints the current event, event labels and internal labels in the browser's console.
     *
     * @param {String} eventName init | play | stop | pos | pause | seek | uptime | eof
     * @param {Object} eventMetadata event metadata object
     * @param {String} severity log | warn | error
     */
    log(eventName: string, eventMetadata: any, severity?: string): void;
    /**
     * Notify TagCommander all event and internal labels. If tc script is not available it queues all pending events.
     *
     * @param {String} eventName init | play | stop | pos | pause | seek | uptime | eof
     */
    notify(eventName: string, eventMetadata: any): void;
    /**
     * Sent when the playback state is no longer paused, as a result of the play method, or the autoplay attribute.
     *
     * @see https://docs.videojs.com/player#event:play
     */
    play(): void;
    /**
     * Sent when the playback state is changed to paused (paused property is true).
     * Pause event is sent if :
     * - The player is not scrubbing
     * - The stream is not a live only
     * - The current time is strictly inferior to the duration
     *
     * @see https://docs.videojs.com/player#event:pause
     */
    pause(): void;
    /**
     * Sent to ComScore when the playback rate changes.
     *
     * @see https://github.com/SRGSSR/srgletterbox-web/issues/761
     * @see https://jira.srg.beecollaboration.com/browse/ADI-256
     */
    rateChange(): void;
    /**
     * Reload the tagCommander container and set all ComScore labels
     */
    reloadTagCommanderContainer(): void;
    /**
     * Sent when the current time is modified by the player's currentTime API.
     *
     * @see https://docs.videojs.com/player#event:seeking
     */
    seeking(): void;
    /**
     * Track current time updates delayed by a tick.
     *
     * @see https://docs.videojs.com/player#event:timeupdate
     */
    timeUpdate(): void;
    /**
     * Gets the number of seconds that separate from the live edge that is represented by 0.
     *
     * @returns {String}
     */
    timeShifted(): string;
    /**
     * Update the src media data.
     */
    updateSrcMediaData(srcMediaData: any): void;
    /**
     * Calculate the uptime when playing a live stream with or without DVR
     *
     * __Rules__:
     * - Send the first uptime after 30 seconds
     * - Send uptime each 60 seconds after the 30 seconds
     * - Uptime is sent only when playing
     */
    uptime(): void;
    uptimeTimeoutId: NodeJS.Timeout;
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
    waiting(): void;
}
//# sourceMappingURL=SRGAnalytics.d.ts.map