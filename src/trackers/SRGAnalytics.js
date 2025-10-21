import * as PlayerEvents from '../utils/PlayerEvents.js';
import Pillarbox from '../pillarbox.js';

/** @import Player from 'video.js/dist/types/player' */

/* eslint max-lines-per-function: ["error", 200] */
/* eslint max-statements: ["error", 20]*/
/* eslint complexity: ["error", 10]*/

/**
 * The SRG analytics class tracks media playback according to the standard defined by SRG SSR.
 *
 * @class SRGAnalytics
 *
 * ### Official documentation
 *
 * - [New variable list]{@link https://srgssr-ch.atlassian.net/wiki/spaces/INTFORSCHUNG/pages/1009353309/Labels+check+for+migration+of+integration+layer+in+SAM}
 * - [Variables list]{@link https://srgssr-ch.atlassian.net/wiki/spaces/INTFORSCHUNG/pages/795904478/Datalayer+for+media+players}
 * - [Standard event sequences]{@link https://srgssr-ch.atlassian.net/wiki/spaces/INTFORSCHUNG/pages/795904171/standard+streaming+events+sequence+of+events+for+media+player+actions}
 * - [Review of Standard Media Actions]{@link https://srgssr-ch.atlassian.net/wiki/spaces/INTFORSCHUNG/pages/795902249/Implementation+Concept+-+draft}
 * - [ComScore Implementation Guide]{@link https://www.dropbox.com/sh/cdwuikq0abxi21m/AABmSyXYKUTWSAwRZgQA9Ujna/JavaScript%20Latest%20Version?dl=0&preview=Comscore_Library-JavaScript-Streaming_Tag-Implementation_Guide-International.pdf&subfolder_nav_tracking=1}
 *
 * ### Script URL
 *
 * JS script : https://colibri-js.akamaized.net/penguin/tc_SRGGD_11.js
 *
 * ### Variables list
 *
 * - event_id: init | play | stop | pos | pause | seek | uptime | eof
 * - event_timestamp: Seems to be generated automatically from the documentation, but the TP overrides it
 * - event_name: NA TP seems to not sending this variable
 * - event_source: NA TP seems to not sending this variable
 * - event_name: NA TP seems to not sending this variable
 * - event_value: NA TP seems to not sending this variable
 * - navigation_environment: prod | preprod
 * - media_subtitles_on: string true | false
 * - media_timeshift: need better description
 * - media_quality: SD | HD ?
 * - media_bandwidth: NA for the web, 64000
 * - media_volume: from 0 to 100
 * - media_embedding_url:
 * - media_player_name: videojs | letterbox-web ?
 * - media_chromecast_selected: boolean true | false
 * - media_player_version: player's version
 * - media_player_display: is the player mode, on the TP : inline, embed etc..
 * - media_audio_track: NA
 * - media_position_real: NA
 * - media_time_spent: NA
 * - device_id: NA
 * - user_id_log_in: NA only RTS has log in today
 * - media_thumbnail: Not required by the spec but sended by the TP
 * - media_bu_distributer: Not required by the spec but sended by the TP
 *
 * ### Sequence stories
 *
 * #### Story 1 (AoD/VOD-basics): A VoD is played. The user does not interact with the player. The VoD plays to its end.
 *
 * Hints:
 * - Media sessions always start with PLAY. They end with STOP or EOF (or with PAUSE or last POS)
 * - POS is sent ever 30s
 *
 * #### Story 2 (livestream-basics A): A Livestream is played. The user does not interact with the player. After 61 seconds, playback is paused.
 *
 * Hints:
 * - Media sessions always start with PLAY. They end with STOP (or, worse for data quailty, with PAUSE or last POS/UPTIME)
 * - UPTIME is sent only for livestreams
 * - POS is sent ever 30s, UPTIME every 60s with inital UPTIME after 30s.
 * - This is the interval: 30s: POS + UPTIME; 60s: POS; 90s: POS + UPTIME; ...
 *
 * #### Story 3 (Seeking a VoD/AoD): A VoD is played. User seeks in the VoD/AoD.
 *
 * Hints:
 * - Once the Media Player slider is released (seek is over), another action to finish up the seeking is initiated. Typically this is PLAY. For that second PLAY, the media position has altered.
 *
 * #### Story 4 (Seeking a livestream): A Livestream is played. User goes back in the livestream.
 *
 * Hints:
 * - Once the Media Player slider is released (seek is over), another action to finish up the seeking is initiated. Typically this is PLAY.  For that second PLAY, the a new variable, media_timeshift is passed.
 * - For livestreams media_position is always the "time passed on your watch" - regardless of the SEEK event. So, if 1 second after PLAY the slider is moved  back 600 seconds, then:
 *  1. The the value of media_timeshift is '600'.
 *  2. The value of media_position is '1'.
 */
class SRGAnalytics {
  /**
   * Creates an instance of SRGAnalytics.
   *
   * @constructor
   * @param {Player} player The player instance
   * @param {SRGAnalyticsOptions} [options={}] Configuration options
   * @param {boolean} [options.debug=false] Enables debug mode if set to true
   * @param {string} [options.environment='prod'] The environment in which the data is sent
   * @param {string} [options.playerVersion='none'] The version of the player
   * @param {string} [options.tagCommanderScriptURL='//colibri-js.akamaized.net/penguin/tc_SRGGD_11.js'] The URL for the Tag Commander script
   */
  constructor(
    player,
    {
      debug = false,
      environment = 'prod',
      playerVersion = 'none',
      tagCommanderScriptURL = './commandersact/tc.js',
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

    this.player.off(PlayerEvents.EMPTIED, this.emptiedListener);
    this.player.off(PlayerEvents.ENDED, this.endedListener);
    this.player.off(PlayerEvents.LOAD_START, this.loadstartListener);
    this.player.off(PlayerEvents.LOADED_DATA, this.loadeddataListener);
    this.player.off(PlayerEvents.PLAYING, this.playListener);
    this.player.off(PlayerEvents.PAUSE, this.pauseListener);
    this.player.off(PlayerEvents.RATE_CHANGE, this.rateChangeListener);
    this.player.off(PlayerEvents.SEEKING, this.seekingListener);
    this.player.off(PlayerEvents.TIME_UPDATE, this.timeUpdateListener);
    this.player.off(PlayerEvents.WAITING, this.waitingListener);
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

    // (window.tC3666_59 && window.cact
    if (window.cact && this.pendingQueue.length > 0) {
      this.pendingQueue.forEach((notification) => {
        window.cact('emit', 'notify', notification.labels);
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
      media_player_id: this.player.id(),
      event_name: eventName,
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

      ...this.srcMediaData.mediaData.analyticsMetadata,
      media_bu_distributer: this.srcMediaData.mediaData.vendor,
      media_chromecast_selected: Boolean(this.player.tech(true).isCasting),
      media_embedding_url: document.referrer,
      media_player_display: 'default', // TODO implement if it still relevant
      media_player_name: 'pillarbox-web', // TODO add a property playerName in the constructor with a default value ?
      media_player_version: this.playerVersion,
      media_url: this.srcMediaData.src,
    };

    if (this.isAudioTrackEnabled()) {
      labels.media_audio_track = this.getCurrentAudioTrack();
      labels.media_audiodescription_on = this.isAudioDescriptionEnabled();
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

      labels.media_timeshift = [PlayerEvents.PLAY, PlayerEvents.PAUSE].includes(
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

    this.player.on(PlayerEvents.EMPTIED, this.emptiedListener);
    this.player.on(PlayerEvents.ENDED, this.endedListener);
    this.player.on(PlayerEvents.LOAD_START, this.loadstartListener);
    this.player.on(PlayerEvents.LOADED_DATA, this.loadeddataListener);
    this.player.on(PlayerEvents.PLAYING, this.playListener);
    this.player.on(PlayerEvents.PAUSE, this.pauseListener);
    this.player.on(PlayerEvents.RATE_CHANGE, this.rateChangeListener);
    this.player.on(PlayerEvents.SEEKING, this.seekingListener);
    this.player.on(PlayerEvents.TIME_UPDATE, this.timeUpdateListener);
    this.player.on(PlayerEvents.WAITING, this.waitingListener);
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
   * Check if the audio description track is enabled.
   *
   * @returns {Boolean} __true__ if enabled __false__ otherwise.
   */
  isAudioDescriptionEnabled() {
    const currentTrack = Array
      .from(this.player.audioTracks())
      .find(track => track.enabled && track.kind.includes('desc'));

    return Boolean(currentTrack);
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

    this.notify('init');
    this.notify('buffer_start');
    this.hasStarted = false;
  }

  /**
   * The first frame of the media has finished loading.
   *
   * @see https://docs.videojs.com/player#event:loadeddata
   */
  loadeddata() {
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
      // window.tC3666_59 && window.cact
      if (window.cact) {
        window.cact('emit', 'notify', labels);
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
    if (Pillarbox.browser.IS_ANY_SAFARI) {
      this.player.one(PlayerEvents.TIME_UPDATE, bufferStop);
    } else {
      // As Chromium-based browsers are not consistent with their timeupdate event, it is better to use the playing event.
      // Firefox is consistent with its playing event.
      this.player.one(PlayerEvents.PLAYING, bufferStop);
    }
  }
}

export default SRGAnalytics;
