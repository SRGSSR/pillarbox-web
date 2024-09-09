import pillarbox from '../pillarbox.js';

/* eslint max-statements: ["error", 25]*/

/**
 * The PillarboxMonitoring class retrieves data about media playback.
 *
 * This data can be used to :
 *  - help investigate playback problems
 *  - measure the quality of our service
 *
 * The sending of this data tries to respect as much as possible the
 * specification described in the link below.
 *
 * However, some platforms may have certain limitations.
 * In this case, only the data available will be sent.
 *
 * @see https://github.com/SRGSSR/pillarbox-documentation/blob/main/Specifications/monitoring.md
 */
class PillarboxMonitoring {
  constructor(player, {
    playerName = 'none',
    playerVersion = 'none',
    platform = 'web',
    schemaVersion = 1,
    heartbeatInterval = 30_000,
    beaconUrl = 'https://zdkimhgwhh.eu-central-1.awsapprunner.com/metrics'
  } = {}) {
    /**
     * @type {import('video.js/dist/types/player').default}
     */
    this.player = player;
    /**
     * @type {string}
     */
    this.playerName = playerName;
    /**
     * @type {string}
     */
    this.playerVersion = playerVersion;
    /**
     * @type {string}
     */
    this.platform = platform;
    /**
     * @type {string}
     */
    this.schemaVersion = schemaVersion;
    /**
     * @type {Number}
     */
    this.heartbeatInterval = heartbeatInterval;
    /**
     * @type {string}
     */
    this.beaconUrl = beaconUrl;
    /**
     * @type {string}
     */
    this.currentSessionId = undefined;
    /**
     * @type {Number}
     */
    this.lastPlaybackDuration = 0;
    /**
     * @type {Number}
     */
    this.lastPlaybackStartTimestamp = 0;
    /**
     * @type {Number}
     */
    this.lastStallCount = 0;
    /**
     * @type {Number}
     */
    this.lastStallDuration = 0;
    /**
     * @type {Number}
     */
    this.loadStartTimestamp = undefined;
    /**
     * @type {Number}
     */
    this.metadataRequestTime = 0;
    /**
     * @type {string}
     */
    this.mediaAssetUrl = undefined;
    /**
     * @type {string}
     */
    this.mediaId = undefined;
    /**
     * @type {string}
     */
    this.mediaMetadataUrl = undefined;
    /**
     * @type {string}
     */
    this.mediaOrigin = undefined;
    /**
     * @type {Number}
     */
    this.tokenRequestTime = 0;

    this.addListeners();
  }

  /**
   * Adds event listeners to the player and the window.
   */
  addListeners() {
    this.bindCallBacks();

    this.player.on('loadstart', this.loadStart);
    this.player.on('loadeddata', this.loadedData);
    this.player.on('pillarbox-monitoring/sessionstart', this.sessionStart);
    this.player.on('playing', this.playbackStart);
    this.player.on('pause', this.playbackStop);
    this.player.on('error', this.error);
    this.player.on(['playerreset', 'dispose', 'ended'], this.sessionStop);
    this.player.on(['waiting', 'stalled'], this.stalled);

    window.addEventListener('beforeunload', this.sessionStop);
  }

  /**
   * The current bandwidth of the last segment download.
   *
   * @returns {number|undefined} The current bandwidth in bits per second,
   *                             undefined otherwise.
   */
  bandwidth() {
    const playerStats = this.player
      .tech(true).vhs ? this.player.tech(true).vhs.stats : undefined;

    return playerStats ? playerStats.bandwidth : undefined;
  }

  /**
   * Binds the callback functions to the current instance.
   */
  bindCallBacks() {

    this.error = this.error.bind(this);
    this.loadedData = this.loadedData.bind(this);
    this.loadStart = this.loadStart.bind(this);
    this.playbackStart = this.playbackStart.bind(this);
    this.playbackStop = this.playbackStop.bind(this);
    this.sessionStart = this.sessionStart.bind(this);
    this.stalled = this.stalled.bind(this);
    this.sessionStop = this.sessionStop.bind(this);
  }

  /**
   * Get the buffer duration in milliseconds.
   *
   * @returns {Number} The buffer duration
   */
  bufferDuration() {
    const buffered = this.player.buffered();
    let bufferDuration = 0;

    for (let i = 0; i < buffered.length; i++) {
      const start = buffered.start(i);
      const end = buffered.end(i);

      bufferDuration += end - start;
    }

    return PillarboxMonitoring.secondsToMilliseconds(bufferDuration);
  }

  /**
   * Get the current representation when playing a Dash or Hls media.
   *
   * @typedef {Object} Representation
   * @property {number|undefined} bandwidth The bandwidth of the current
   *                                        representation
   * @property {number|undefined} programDateTime The program date time of the
   *                                              current representation
   * @property {string|undefined} uri The URL of the current representation
   *
   * @returns {Representation|undefined} The current representation object
   *                                     undefined otherwise
   */
  currentRepresentation() {
    const {
      activeCues: { cues_: [cue] } = { cues_: [] }
    } = Array.from(this.player.textTracks())
      .find(({ label, kind }) => kind === 'metadata' && label === 'segment-metadata') || {};

    return cue ? cue.value : undefined;
  }

  /**
   * Get the current resource information including bitrate and URL when available.
   *
   * @typedef {Object} Resource
   * @property {number|undefined} bitrate The bitrate of the current resource
   * @property {string|undefined} url The URL of the current resource
   *
   * @returns {Resource} The current resource information.
   */
  currentResource() {
    let { bandwidth: bitrate, uri: url } = this.currentRepresentation() || {};

    if (pillarbox.browser.IS_ANY_SAFARI) {
      const { configuration } = Array
        .from(this.player.videoTracks()).find(track => track.selected) || {};

      bitrate = configuration ? configuration.bitrate : undefined;
      url = this.player.currentSource().src;
    }

    return {
      bitrate,
      url
    };
  }

  /**
   * The media data of the current source.
   *
   * @returns {Object} The media data of the current source, or an empty object
   *                   if no media data is available.
   */
  currentSourceMediaData() {
    if (!this.player.currentSource().mediaData) return {};

    return this.player.currentSource().mediaData;
  }

  /**
   * Handles player errors by sending an `ERROR` event, then resets the session.
   */
  error() {
    const error = this.player.error();
    const playbackPosition = this.playbackPosition();
    const representation = this.currentRepresentation();
    const url = representation ?
      representation.uri : this.player.currentSource().src;

    if (!this.player.hasStarted()) {
      this.sendEvent('START', this.startEventData());
    }

    this.sendEvent('ERROR', {
      log: error.metadata || JSON
        .stringify(pillarbox.log.history().slice(-15)),
      message: error.message,
      name: error.code,
      ...playbackPosition,
      severity: 'FATAL',
      url
    });

    this.reset();
  }

  /**
   * Get the DRM license request duration from performance API.
   *
   * @returns {number|undefined} The request duration
   */
  getDrmRequestDuration() {
    const keySystems = Object
      .values(this.player.currentSource().keySystems || {})
      .map(keySystem => keySystem.url);

    if (!keySystems.length) return;

    const resource = performance
      .getEntriesByType('resource')
      .filter(({ initiatorType, name }) =>
        initiatorType === 'xmlhttprequest' && keySystems.includes(name))
      .pop();

    return resource && resource.duration;
  }

  /**
   * Get metadata information from the performance API for a given id.
   *
   * @typedef {Object} MetadataInfo
   * @property {string} name The URL of the resource
   * @property {number} duration The duration of the resource fetch in milliseconds
   *
   * @param {string} id The id to search for in the resource entries
   *
   * @returns {MetadataInfo|undefined} An object containing metadata
   * information, or undefined otherwise
   */
  getMetadataInfo(id) {
    const resource = performance
      .getEntriesByType('resource')
      .filter(({ initiatorType, name }) =>
        initiatorType === 'fetch' && name.includes(id))
      .pop();

    if (!resource) return {};

    return {
      name: resource.name,
      duration: resource.duration
    };
  }

  /**
   * Get the Akamai token request duration from performance API.
   *
   * @returns {number|undefined} The request duration
   */
  getTokenRequestDuration(tokenType) {
    if (!tokenType) return;

    const resource = performance
      .getEntriesByType('resource')
      .filter(({ initiatorType, name }) =>
        initiatorType === 'fetch' && name.includes('/akahd/token'))
      .pop();

    return resource && resource.duration;
  }

  /**
   * Send an 'HEARTBEAT' event with the date of the current playback state at
   * regular intervals.
   */
  heartbeat() {
    this.heartbeatIntervalId = setInterval(() => {
      this.sendEvent('HEARTBEAT', this.statusEventData());
    }, this.heartbeatInterval);
  }

  /**
   * Check if the tracker is disabled.
   *
   * @returns {Boolean} __true__ if disabled __false__ otherwise.
   */
  isTrackerDisabled() {
    const currentSource = this.player.currentSource();

    if (!Array.isArray(currentSource.disableTrackers)) {
      return Boolean(currentSource.disableTrackers);
    }

    return Boolean(
      currentSource.disableTrackers.find(
        (tracker) => tracker.toLowerCase() === PillarboxMonitoring
          .name.toLowerCase()
      )
    );
  }

  /**
   * Handles the session start by sending a `START` event immediately followed
   * by a `HEARTBEAT` when the `loadeddata` event is triggered.
   */
  loadedData() {
    this.sendEvent('START', this.startEventData());
    this.sendEvent('HEARTBEAT', this.statusEventData());
    // starts the heartbeat interval
    this.heartbeat();
  }

  /**
   * Handles `loadstart` event and captures the current timestamp. Will be used
   * to calculate the media loading time.
   */
  loadStart() {
    // if the content is a plain old URL
    if (
      !Object.keys(this.currentSourceMediaData()).length &&
      this.currentSessionId
    ) {
      this.sessionStop();
      // Reference timestamp used to calculate the different time metrics.
      this.sessionStartTimestamp = PillarboxMonitoring.timestamp();
    }

    this.loadStartTimestamp = PillarboxMonitoring.timestamp();
  }

  /**
   * The media information.
   *
   * @typedef {Object} MediaInfo
   * @property {string} asset_url  The URL of the media
   * @property {string} id  The ID of the media
   * @property {string} metadata_url  The URL of the media metadata
   * @property {string} origin  The origin of the media
   *
   * @returns {MediaInfo} An object container the media information
   */
  mediaInfo() {
    return {
      asset_url: this.mediaAssetUrl,
      id: this.mediaId,
      metadata_url: this.mediaMetadataUrl,
      origin: this.mediaOrigin,
    };
  }

  /**
   * The total playback duration for the current session.
   *
   * @returns {number} The total playback duration in milliseconds.
   */
  playbackDuration() {
    if (!this.lastPlaybackStartTimestamp) {
      return this.lastPlaybackDuration;
    }

    return (
      PillarboxMonitoring.timestamp() +
      this.lastPlaybackDuration -
      this.lastPlaybackStartTimestamp
    );
  }

  /**
   * The current playback position and position timestamp.
   *
   * @typedef {Object} PlaybackPosition
   * @property {number} position The current playback position in milliseconds
   * @property {number|undefined} position_timestamp The timestamp of the
   *                    current playback position, or undefined if not available
   *
   * @returns {PlaybackPosition} The playback position object.
   */
  playbackPosition() {
    const currentRepresentation = this.currentRepresentation();
    const position = PillarboxMonitoring
      .secondsToMilliseconds(this.player.currentTime());
    let position_timestamp;

    // Get the position timestamp from the program date time when VHS is used
    // or undefined if there is no value
    if (currentRepresentation) {
      position_timestamp = currentRepresentation.programDateTime;
    }

    // Calculate the position timestamp from the start date on Safari
    if (pillarbox.browser.IS_ANY_SAFARI) {
      const startDate = Date.parse(this.player.$('video').getStartDate());

      position_timestamp = !isNaN(startDate) ?
        (startDate + position) : undefined;
    }

    return {
      position,
      position_timestamp
    };
  }

  /**
   * Assign the timestamp each time the playback starts.
   */
  playbackStart() {
    this.lastPlaybackStartTimestamp = PillarboxMonitoring.timestamp();
  }

  /**
   * Calculates and accumulates the duration of the playback session each time
   * the playback stops for the current media.
   */
  playbackStop() {
    this.lastPlaybackDuration +=
      PillarboxMonitoring.timestamp() - this.lastPlaybackStartTimestamp;

    this.lastPlaybackStartTimestamp = undefined;
  }

  /**
   * The current dimensions of the player.
   *
   * @typedef {Object} PlayerCurrentDimensions
   * @property {number} width The current width of the player
   * @property {number} height The current height of the player
   *
   * @returns {PlayerCurrentDimensions} The current dimensions of the player object.
   */
  playerCurrentDimensions() {
    return this.player.currentDimensions();
  }

  /**
   * Information about the player.
   *
   * @typedef {Object} PlayerInfo
   * @property {string} name The name of the player
   * @property {string} version The version of the player
   * @property {string} platform The platform on which the player is running
   *
   * @returns {PlayerInfo} An object containing player information.
   */
  playerInfo() {
    return {
      name: this.playerName,
      version: this.playerVersion,
      platform: this.platform
    };
  }

  /**
   * Generates the QoE timings object.
   *
   * @typedef {Object} QoeTimings
   * @property {number} metadata The time taken to load metadata
   * @property {number} asset The time taken to load the asset
   * @property {number} total The total time taken from session start to data load
   *
   * @param {number} timeToLoadedData The time taken to load the data
   * @param {number} timestamp The current timestamp
   *
   * @returns {QoeTimings} The QoE timings
   */
  qoeTimings(timeToLoadedData, timestamp) {
    return {
      metadata: this.metadataRequestTime,
      asset: timeToLoadedData,
      total: timestamp - this.sessionStartTimestamp
    };
  }

  /**
   * Generates the QoS timings object.
   *
   * @typedef {Object} QosTimings
   * @property {number} asset The time taken to load the asset
   * @property {number} drm The time taken for DRM processing
   * @property {number} metadata The time taken to load metadata
   * @property {number} token The time taken to request the token
   *
   * @param {number} timeToLoadedData The time taken to load the data
   *
   * @returns {QosTimings} The QoS timings
   */
  qosTimings(timeToLoadedData) {
    return {
      asset: timeToLoadedData,
      drm: this.getDrmRequestDuration(),
      metadata: this.metadataRequestTime,
      token: this.tokenRequestTime,
    };
  }

  /**
   * Removes all event listeners from the player and the window.
   */
  removeListeners() {
    this.player.off('loadstart', this.loadStart);
    this.player.off('loadeddata', this.loadedData);
    this.player.off('pillarbox-monitoring/sessionstart', this.sessionStart);
    this.player.off('playing', this.playbackStart);
    this.player.off('pause', this.playbackStop);
    this.player.off('error', this.error);
    this.player.off(['playerreset', 'dispose', 'ended'], this.sessionStop);
    this.player.off(['waiting', 'stalled'], this.stalled);

    window.removeEventListener('beforeunload', this.sessionStop);
  }

  /**
   * Remove the token from the asset URL.
   *
   * @param {string} assetUrl The URL of the asset
   *
   * @returns {string|undefined} The URL without the token, or undefined if the
   *                             input URL is invalid
   */
  removeTokenFromAssetUrl(assetUrl) {
    if (!assetUrl) return;

    try {
      const url = new URL(assetUrl);

      url.searchParams.delete('hdnts');

      return url.href;
    } catch (e) {
      return;
    }
  }

  /**
   * Resets the playback session and clears relevant properties.
   *
   * @param {Event} event The event that triggered the reset. If the event type
   *                 is not 'ended' or 'playerreset', listeners will be removed.
   */
  reset(event) {
    this.currentSessionId = undefined;
    this.lastPlaybackDuration = 0;
    this.lastPlaybackStartTimestamp = 0;
    this.lastStallCount = 0;
    this.lastStallDuration = 0;
    this.loadStartTimestamp = 0;
    this.metadataRequestTime = 0;
    this.mediaAssetUrl = undefined;
    this.mediaId = undefined;
    this.mediaMetadataUrl = undefined;
    this.mediaOrigin = undefined;
    this.sessionStartTimestamp = undefined;
    this.tokenRequestTime = 0;

    clearInterval(this.heartbeatIntervalId);

    if (event && !['ended', 'playerreset'].includes(event.type)) {
      this.removeListeners();
    }
  }

  /**
   * Sends an event to the server using the Beacon API.
   *
   * @param {string} eventName Either START, STOP, ERROR, HEARTBEAT
   * @param {Object} [data={}] The payload object to be sent. Defaults to an
   *                           empty object if not provided
   */
  sendEvent(eventName, data = {}) {
    // If the tracker is disabled for the current session, and there has been no
    // previous session, no event is sent. However, if a session was already
    // active, we still want to send the STOP event so that it is properly
    // stopped.
    if (
      (this.isTrackerDisabled() && !this.currentSessionId) ||
      !this.currentSessionId
    ) return;

    const payload = JSON.stringify({
      event_name: eventName,
      session_id: this.currentSessionId,
      timestamp: PillarboxMonitoring.timestamp(),
      version: this.schemaVersion,
      data
    });

    navigator.sendBeacon(
      this.beaconUrl,
      payload
    );
  }

  /**
   * Starts a new session by first stopping the previous session, then resetting
   * the session start timestamp and media ID to their new values.
   */
  sessionStart() {
    if (this.sessionStartTimestamp) {
      this.sessionStop();
    }

    // Reference timestamp used to calculate the different time metrics.
    this.sessionStartTimestamp = PillarboxMonitoring.timestamp();
    // At this stage currentSource().src is the media identifier
    // and not the playable source.
    this.mediaId = this.player.currentSource().src;
  }

  /**
   * Stops the current session by sending a `STOP` event and resetting the
   * session.
   *
   * @param {Event} [event] The event that triggered the stop. This is passed
   *                        to the reset function.
   */
  sessionStop(event) {
    this.sendEvent('STOP', this.statusEventData());
    this.reset(event);
  }

  /**
   * Handles the stalled state of the player. Sets the stalled state and listens
   * for the event that indicates the player is no longer stalled.
   */
  stalled() {
    if (
      !this.player.hasStarted() ||
      this.player.seeking() ||
      this.isStalled
    ) return;

    this.isStalled = true;

    const stallStart = PillarboxMonitoring.timestamp();
    const unstalled = () => {
      const stallEnd = PillarboxMonitoring.timestamp();

      this.isStalled = false;
      this.lastStallCount += 1;
      this.lastStallDuration += (stallEnd - stallStart);
    };

    // As Safari is not consistent with its playing event, it is better to use
    // the timeupdate event.
    if (pillarbox.browser.IS_ANY_SAFARI) {
      this.player.one('timeupdate', unstalled);
    } else {
      // As Chromium-based browsers are not consistent with their timeupdate
      // event, it is better to use the playing event.
      //
      // Firefox is consistent with its playing event.
      this.player.one('playing', unstalled);
    }
  }

  /**
   * Information about the player's stall events.
   *
   * @typedef {Object} StallInfo
   * @property {number} count The number of stall events
   * @property {number} duration The total duration of stall events in
   *                             milliseconds
   *
   * @returns {StallInfo} An object containing the stall information
   */
  stallInfo() {
    return {
      count: this.lastStallCount,
      duration: this.lastStallDuration,
    };
  }

  /**
   * Get data on the current playback state. Will be used when sending `HEARTBEAT` or `STOP` events.
   *
   * @typedef {Object} StatusEventData
   * @property {number} bandwidth The current bandwidth
   * @property {number|undefined} bitrate The bitrate of the current resource
   * @property {number} buffered_duration The duration of the buffered content
   * @property {number} playback_duration The duration of the playback
   * @property {number} position The current playback position
   * @property {number} position_timestamp The timestamp of the current playback position
   * @property {Object} stall Information about any stalls
   * @property {string} stream_type The type of stream, either 'on-demand' or 'live'
   * @property {string|undefined} url The URL of the current resource
   *
   * @returns {StatusEventData} The current event data
   */
  statusEventData() {
    const bandwidth = this.bandwidth();
    const buffered_duration = this.bufferDuration();
    const { bitrate, url } = this.currentResource();
    const playback_duration = this.playbackDuration();
    const { position, position_timestamp } = this.playbackPosition();
    const stream_type = isFinite(this.player.duration()) ? 'On-demand' : 'Live';
    const stall = this.stallInfo();

    const data = {
      bandwidth,
      bitrate,
      buffered_duration,
      playback_duration,
      position,
      position_timestamp,
      stall,
      stream_type,
      url,
    };

    return data;
  }

  /**
   * Generates the data for the start event.
   *
   * @typedef {Object} Device
   * @property {string} id The device ID.
   *
   * @typedef {Object} StartEventData
   * @property {string} browser The user agent string of the browser.
   * @property {Device} device Information about the device.
   * @property {MediaInfo} media Information about the media.
   * @property {PlayerInfo} player Information about the player.
   * @property {QoeTimings} qoe_timings Quality of Experience timings.
   * @property {QosTimings} qos_timings Quality of Service timings.
   * @property {PlayerCurrentDimensions} screen The current dimensions of the
   *                                            player.
   *
   * @returns {StartEventData} An object containing the start event data.
   */
  startEventData() {
    const timestamp = PillarboxMonitoring.timestamp();
    // This avoids false subtraction results when loadStartTimestamp is not
    // initialized.
    // loadStartTimestamp will be 0 if loadstart is not triggered.
    // This is the case when a STARTDATE error occurs.
    const timeToLoadedData = this
      .loadStartTimestamp ? timestamp - this.loadStartTimestamp : 0;

    if (!this.isTrackerDisabled()) {
      this.currentSessionId = PillarboxMonitoring.sessionId();
    }

    this.mediaAssetUrl = this
      .removeTokenFromAssetUrl(this.player.currentSource().src);
    this.mediaMetadataUrl = this.getMetadataInfo(this.mediaId).name;
    this.metadataRequestTime = this.getMetadataInfo(this.mediaId).duration;
    this.mediaOrigin = window.location.href;
    this.tokenRequestTime = this.getTokenRequestDuration(
      this.currentSourceMediaData().tokenType
    );

    return {
      browser: PillarboxMonitoring.userAgent(),
      device: { id: PillarboxMonitoring.deviceId() },
      media: this.mediaInfo(),
      player: this.playerInfo(),
      qoe_timings: this.qoeTimings(timeToLoadedData, timestamp),
      qos_timings: this.qosTimings(timeToLoadedData),
      screen: this.playerCurrentDimensions()
    };
  }

  /**
   * Generates a new session ID.
   *
   * @returns {string} random UUID
   */
  static sessionId() {
    return PillarboxMonitoring.randomUUID();
  }

  /**
   * Retrieve or generate a unique device ID and stores it in localStorage.
   *
   * @returns {string|undefined} The device ID if localStorage is available,
   *                             otherwise `undefined`
   */
  static deviceId() {
    if (!localStorage) return;

    const deviceIdKey = 'pillarbox_device_id';
    let deviceId = localStorage.getItem(deviceIdKey);

    if (!deviceId) {
      deviceId = PillarboxMonitoring.randomUUID();
      localStorage.setItem(deviceIdKey, deviceId);
    }

    return deviceId;
  }

  /**
   * Generate a cryptographically secure random UUID.
   *
   * @returns {string}
   */
  static randomUUID() {
    if (!crypto.randomUUID) {
      // Polyfill from the author of uuid js which is simple and
      // cryptographically secure.
      // https://stackoverflow.com/a/2117523
      return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
        // eslint-disable-next-line
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4)
          .toString(16));
    }

    return crypto.randomUUID();
  }

  /**
   * converts seconds into milliseconds.
   *
   * @param {number} seconds
   *
   * @returns {number} milliseconds as an integer value
   */
  static secondsToMilliseconds(seconds) {
    return parseInt(seconds * 1000);
  }

  /**
   * The timestamp in milliseconds.
   *
   * @return {number} milliseconds as an integer value
   */
  static timestamp() {
    return Date.now();
  }

  /**
   * The browser's user agent.
   *
   * @returns {string}
   */
  static userAgent() {
    return {
      user_agent: navigator.userAgent
    };
  }
}

export default PillarboxMonitoring;
