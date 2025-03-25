import PillarboxMonitoring from '../../src/trackers/PillarboxMonitoring.js';
import pillarbox from '../../src/pillarbox.js';
import playerMock from '../__mocks__/player-mock.js';

describe('PillarboxMonitoring', () => {
  let player;
  let monitoring;

  global.navigator.sendBeacon = jest.fn();
  global.window.MediaError = jest.fn().mockReturnValue({  });

  beforeEach(() => {
    player = playerMock();
    monitoring = new PillarboxMonitoring(player.tech().el());
  });

  it('should ensure that listeners are added when a new instance is created', () => {
    const spyOnAddListeners = jest.spyOn(PillarboxMonitoring.prototype, 'addListeners');
    const srgQos = new PillarboxMonitoring(player);

    expect(srgQos).toBeInstanceOf(PillarboxMonitoring);

    expect(spyOnAddListeners).toHaveBeenCalled();
  });

  /**
   *****************************************************************************
   * addListeners **************************************************************
   *****************************************************************************
   */
  describe('addListeners', () => {
    it('should bind the callbacks and add the event listeners to the player and window', () => {
      const spyOnBindCallBacks = jest.spyOn(monitoring, 'bindCallBacks');

      monitoring.addListeners();

      expect(spyOnBindCallBacks).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * bandwidth *****************************************************************
   *****************************************************************************
   */
  describe('bandwidth', () => {
    it('should return the bandwidth when available', () => {
      const bandwidth = 69420;

      player.tech.mockReturnValue({
        vhs: {
          stats: {
            bandwidth
          }
        }
      });

      expect(monitoring.bandwidth()).toBe(bandwidth);
    });

    it('should undefined if vhs is not used', () => {
      expect(monitoring.bandwidth()).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * bufferDuration ************************************************************
   *****************************************************************************
   */
  describe('bufferDuration', () => {
    it('should return 0 if the buffer is empty', () => {
      player.buffered.mockReturnValue(pillarbox.time.createTimeRanges());

      expect(monitoring.bufferDuration()).toBe(0);
    });

    it('should return the buffer\'s duration in milliseconds', () => {
      player.buffered.mockReturnValue(pillarbox.time.createTimeRanges([[1, 70]]));

      expect(monitoring.bufferDuration()).toBe(69000);
    });
  });

  /**
   *****************************************************************************
   * currentRepresentation *****************************************************
   *****************************************************************************
   */
  describe('currentRepresentation', () => {
    it('should return undefined when there is no CUE', () => {
      expect(monitoring.currentRepresentation()).toBeUndefined();
    });

    it('should return the current representation', () => {
      const value = {
        bandwidth: 2129221,
        codecs: 'avc1.4d401f,mp4a.40.2',
        byteLength: 1963217
      };

      player.textTracks.mockReturnValue([{
        activeCues: {
          cues_: [{
            value
          }]
        },
        mode: 'hidden',
        kind: 'metadata',
        label: 'segment-metadata',
      }]);

      expect(monitoring.currentRepresentation()).toStrictEqual(value);
    });
  });

  /**
   *****************************************************************************
   * currentResource ***********************************************************
   *****************************************************************************
   */
  describe('currentResource', () => {
    it('should return the current resource returned by currentRepresentation', () => {
      const spyOnCurrentSource = jest.spyOn(player, 'currentSource');

      jest.spyOn(monitoring, 'currentRepresentation').mockReturnValueOnce({
        bandwidth: 69420,
        uri: 'https://example.com/sd/35.m4s',
      });

      expect(monitoring.currentResource()).toStrictEqual({
        bitrate: 69420,
        url: 'https://example.com/sd/35.m4s',
      });
      expect(spyOnCurrentSource).not.toHaveBeenCalled();
    });

    it('should return the current resource from videoTracks when the browser is any safari', () => {
      const mockIsAnySafari = jest.replaceProperty(pillarbox, 'browser', {
        IS_ANY_SAFARI: true,
      });

      player.videoTracks.mockReturnValue([
        {
          selected: false,
          configuration: {
            bitrate: 35420,
          }
        },
        {
          selected: true,
          configuration: {
            bitrate: 69420,
          }
        }
      ]);
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8'
      });

      expect(monitoring.currentResource()).toStrictEqual({
        bitrate: 69420,
        url: 'https://example.com/sd/player.m3u8'
      });

      mockIsAnySafari.restore();
    });
  });

  /**
   *****************************************************************************
   * currentSourceMediaData ****************************************************
   *****************************************************************************
   */
  describe('currentSourceMediaData', () => {
    it('should return an empty object if the currentSource does not contain a mediaData object', () => {
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8'
      });

      expect(monitoring.currentSourceMediaData()).toStrictEqual({});
    });

    it('should the mediaData object if available', () => {
      const mediaData = {
        urn: 'urn:test:1'
      };

      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8',
        mediaData
      });

      expect(monitoring.currentSourceMediaData()).toStrictEqual(mediaData);
    });
  });

  /**
   *****************************************************************************
   * error *********************************************************************
   *****************************************************************************
   */
  describe('error', () => {
    it('should send an error and reset the session', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([]);
      player.error.mockReturnValueOnce({
        metadata: { hasSomething: true },
        message: 'Source not found',
        code: 69
      });
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8'
      });
      jest.spyOn(monitoring, 'playbackPosition').mockReturnValueOnce({
        position: true,
        position_timestamp: true
      });
      jest.spyOn(monitoring, 'currentRepresentation').mockReturnValueOnce({
        bandwidth: 2129221,
        codecs: 'avc1.4d401f,mp4a.40.2',
        byteLength: 1963217,
      });
      const spyOnSendEvent = jest.spyOn(monitoring, 'sendEvent');
      const spyOnReset = jest.spyOn(monitoring, 'reset');

      monitoring.error();

      expect(spyOnSendEvent).toHaveBeenCalledWith('ERROR', expect.any(Object));
      expect(spyOnReset).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * getDrmRequestDuration *****************************************************
   *****************************************************************************
   */
  describe('getDrmRequestDuration', () => {
    it('should return undefined if no key system is provided', () => {
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8',
        keySystems: undefined
      });

      expect(monitoring.getDrmRequestDuration()).toBeUndefined();
    });

    it('should return undefined if the resource is not found', () => {
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8',
        keySystems: {
          'com.microsoft.playready': {
            url: 'https://example.com/widevine/license'
          }
        }
      });

      global.performance.getEntriesByType = jest.fn().mockReturnValue([{
        duration: 69,
        initiatorType: 'xmlhttprequest',
        name: 'https://example.com/playready/license',
      }]);

      expect(monitoring.getDrmRequestDuration()).toBeUndefined();
    });

    it('should return the request duration', () => {
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8',
        keySystems: {
          'com.microsoft.playready': {
            url: 'https://example.com/widevine/license'
          }
        }
      });

      global.performance.getEntriesByType = jest.fn().mockReturnValue([{
        duration: 69,
        initiatorType: 'xmlhttprequest',
        name: 'https://example.com/playready/license',
      },
      {
        duration: 420,
        initiatorType: 'xmlhttprequest',
        name: 'https://example.com/widevine/license',
      }
      ]);

      expect(monitoring.getDrmRequestDuration()).toBe(420);
    });
  });

  /**
   *****************************************************************************
   * getMetadataInfo ***********************************************************
   *****************************************************************************
   */
  describe('getMetadataInfo', () => {
    it('should return an empty object if the media id is not found', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([{
        initiatorType: 'fetch',
        name: 'https://example.com/metadata/old-media-id',
      }]);

      expect(monitoring.getMetadataInfo('new-media-id')).toEqual({});
    });

    it('should return the medatada url according to the media id', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([{
        initiatorType: 'fetch',
        name: 'https://example.com/metadata/new-media-id',
        duration: 420
      }]);

      expect(monitoring.getMetadataInfo('new-media-id')).toEqual({
        name: 'https://example.com/metadata/new-media-id',
        duration: 420
      });
    });
  });

  /**
   *****************************************************************************
   * getTokenRequestDuration ***************************************************
   *****************************************************************************
   */
  describe('getTokenRequestDuration', () => {
    it('should return undefined if the tokenType is undefined', () => {
      expect(monitoring.getTokenRequestDuration()).toBeUndefined();
    });

    it('should return undefined if there is no URL token related resource', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([{
        initiatorType: 'fetch',
        name: 'https://example.com/metadata/new-media-id',
        duration: 420
      }]);

      expect(monitoring.getTokenRequestDuration(true)).toBeUndefined();
    });

    it('should return the token request duration', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([{
        initiatorType: 'fetch',
        name: 'https://example.com/akahd/token',
        duration: 420
      }]);

      expect(monitoring.getTokenRequestDuration(true)).toBe(420);
    });
  });

  /**
   *****************************************************************************
   * heartbeat *****************************************************************
   *****************************************************************************
   */
  describe('heartbeat', () => {
    it('should send an HEARTBEAT when the time interval timeout has been reached', () => {
      jest.useFakeTimers();

      const spyOnSendEvent = jest.spyOn(monitoring, 'sendEvent');

      monitoring.heartbeat();

      jest.advanceTimersByTime(100);
      expect(spyOnSendEvent).not.toHaveBeenCalled();

      jest.advanceTimersByTime(30_000);
      expect(spyOnSendEvent).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * loadedData ****************************************************************
   *****************************************************************************
   */
  describe('loadedData', () => {
    it('should send a START immediately followed by an HEARTBEAT', () => {
      player.currentSource.mockReturnValue({
        mediaData: {}
      });

      jest.spyOn(monitoring, 'getMetadataInfo').mockReturnValue({});
      const spyOnSendEvent = jest.spyOn(monitoring, 'sendEvent');
      const spyOnRandomUUID = jest.spyOn(PillarboxMonitoring, 'randomUUID').mockReturnValue(true);

      monitoring.loadedData();

      expect(spyOnSendEvent).toHaveBeenCalledTimes(2);
      expect(spyOnSendEvent).toHaveBeenNthCalledWith(1, 'START', expect.any(Object));
      expect(spyOnSendEvent).toHaveBeenNthCalledWith(2, 'HEARTBEAT', expect.any(Object));

      spyOnRandomUUID.mockRestore();
    });
  });

  /**
   *****************************************************************************
   * loadStart *****************************************************************
   *****************************************************************************
   */
  describe('loadStart', () => {
    it('should set the timestamp when the function is called', () => {

      expect(monitoring.loadStartTimestamp).toBeUndefined();

      monitoring.loadStart();

      expect(monitoring.loadStartTimestamp).toEqual(expect.any(Number));
    });

    it('should stop the previous session when playing a plain old media URL', () => {
      const spyOnSessionStop = jest.spyOn(monitoring, 'sessionStop');

      monitoring.currentSessionId = true;
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8'
      });

      expect(monitoring.sessionStartTimestamp).toBeUndefined();

      monitoring.loadStart();

      expect(monitoring.sessionStartTimestamp).toEqual(expect.any(Number));
      expect(spyOnSessionStop).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * playbackDuration **********************************************************
   *****************************************************************************
   */
  describe('playbackDuration', () => {
    it('should return 0 if the playback hasn\'t started', () => {
      expect(monitoring.playbackDuration()).toBe(0);
    });
    it('should return the intermediate playback time', () => {
      const now = jest.now();

      jest.setSystemTime(now);

      monitoring.playbackStart();

      jest.setSystemTime(now + 420);

      expect(monitoring.playbackDuration()).toBe(420);
    });
  });

  /**
   *****************************************************************************
   * playbackPosition **********************************************************
   *****************************************************************************
   */
  describe('playbackPosition', () => {
    it('should return the playback position in milliseconds and undefined if there no position timestamp available', () => {
      player.currentTime.mockReturnValue(69);
      expect(monitoring.playbackPosition()).toEqual({
        position: 69_000,
        position_timestamp: undefined
      });
    });

    it('should return the playback position in milliseconds and the timestamp position', () => {
      const now = jest.now();

      player.currentTime.mockReturnValue(69);
      jest.spyOn(monitoring, 'currentRepresentation').mockReturnValueOnce({
        programDateTime: now
      });

      expect(monitoring.playbackPosition()).toEqual({
        position: 69_000,
        position_timestamp: now
      });
    });
  });

  /**
   *****************************************************************************
   * removeListeners ***********************************************************
   *****************************************************************************
   */
  describe('removeListeners', () => {
    it('should remove all listeners', () => {

      const spyOnOff = jest.spyOn(player, 'off');
      const spyOnRemoveEventListener = jest.spyOn(
        window,
        'removeEventListener'
      );

      monitoring.removeListeners();

      expect(spyOnOff).toHaveBeenCalledTimes(7);
      expect(spyOnRemoveEventListener).toHaveBeenCalledTimes(1);
    });
  });

  /**
   *****************************************************************************
   * removeTokenFromAssetUrl ***************************************************
   *****************************************************************************
   */
  describe('removeTokenFromAssetUrl', () => {
    it('should return undefined if no asset url is provided', () => {
      expect(monitoring.removeTokenFromAssetUrl()).toBeUndefined();
    });

    it('should remove the token from asset url', () => {
      expect(monitoring.removeTokenFromAssetUrl('https://example.com/sd/player.m3u8?hdnts=xyz69&other=420')).toBe('https://example.com/sd/player.m3u8?other=420');
    });

    it('should return undefined if the url is invalid', () => {
      expect(monitoring.removeTokenFromAssetUrl('invalid_url')).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * reset ********************************************************************
   *****************************************************************************
   */
  describe('reset', () => {
    it('should reset the properties whithout removing the event listeners', () => {
      const spyOnRemoveListeners = jest.spyOn(monitoring, 'removeListeners');

      monitoring.reset();

      expect(spyOnRemoveListeners).not.toHaveBeenCalled();
    });

    it('should reset the properties and remove the event listeners', () => {
      const spyOnRemoveListeners = jest.spyOn(monitoring, 'removeListeners');

      monitoring.reset('dispose');

      expect(spyOnRemoveListeners).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * sendEvent *****************************************************************
   *****************************************************************************
   */
  describe('sendEvent', () => {
    it('should send a POST request using sendBeacon', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([]);

      const spyOnSendBeacon = jest.spyOn(navigator, 'sendBeacon');

      monitoring.startEventData();
      monitoring.sendEvent('start', {
        property: 'value'
      });

      expect(spyOnSendBeacon).toHaveBeenCalledWith(expect.any(String), expect.any(String));
    });

    it('should only send a STOP event if there was a previous session', () => {
      global.performance.getEntriesByType = jest.fn().mockReturnValue([]);

      const spyOnSendBeacon = jest.spyOn(navigator, 'sendBeacon');
      const spyOnIsTrackerDisabled = jest.spyOn(monitoring, 'isTrackerDisabled').mockReturnValue(false);

      // previous playback session
      monitoring.startEventData();
      monitoring.sessionStop();

      // new playback session
      spyOnIsTrackerDisabled.mockReturnValue(true);
      monitoring.sendEvent('start', {
        property: 'value'
      });
      monitoring.sendEvent('heartbeat', {
        property: 'value'
      });

      expect(spyOnSendBeacon).toHaveBeenCalledTimes(1);
      expect(spyOnSendBeacon).toHaveBeenCalledWith(expect.any(String), expect.any(String));

      spyOnIsTrackerDisabled.mockRestore();
    });
  });

  /**
   *****************************************************************************
   * stalled *******************************************************************
   *****************************************************************************
   */
  describe('stalled', () => {
    it('should do nothing if the content has not started', () => {
      const spyOnTimestamp = jest.spyOn(PillarboxMonitoring, 'timestamp');

      player.hasStarted.mockReturnValue(false);
      monitoring.stalled();

      expect(spyOnTimestamp).not.toHaveBeenCalled();
    });

    it('should do nothing if the player is seeking', () => {
      const spyOnTimestamp = jest.spyOn(PillarboxMonitoring, 'timestamp');

      player.hasStarted.mockReturnValue(true);
      player.seeking.mockReturnValue(true);
      monitoring.stalled();

      expect(spyOnTimestamp).not.toHaveBeenCalled();
    });

    it('should do nothing if the player is already stalled', () => {
      const spyOnTimestamp = jest.spyOn(PillarboxMonitoring, 'timestamp');

      player.hasStarted.mockReturnValue(true);
      player.seeking.mockReturnValue(true);
      monitoring.isStalled = true;
      monitoring.stalled();

      expect(spyOnTimestamp).not.toHaveBeenCalled();
    });

    it('should add a listener to the timeupdate event that fires once on Safari', () => {
      const mockIsAnySafari = jest.replaceProperty(pillarbox, 'browser', {
        IS_ANY_SAFARI: true,
      });
      const spyOnTimestamp = jest.spyOn(PillarboxMonitoring, 'timestamp');
      const spyOnOne = jest.spyOn(player, 'one');

      player.hasStarted.mockReturnValue(true);

      monitoring.stalled();
      player.trigger('timeupdate');
      player.trigger('timeupdate');
      player.trigger('timeupdate');
      player.trigger('timeupdate');

      expect(spyOnOne).toHaveBeenCalledWith('timeupdate', expect.any(Function));
      expect(spyOnTimestamp).toHaveBeenCalledTimes(2);

      mockIsAnySafari.restore();
    });

    it('should add a listener to the playing event that fires once', () => {
      const spyOnOne = jest.spyOn(player, 'one');

      player.hasStarted.mockReturnValue(true);

      monitoring.stalled();

      expect(spyOnOne).toHaveBeenCalledWith('playing', expect.any(Function));
    });
  });

  /**
   *****************************************************************************
   * sessionStart **************************************************************
   *****************************************************************************
   */
  describe('sessionStart', () => {
    it('should call sessionStop if there is no active session', () => {
      const spyOnRandomUUID = jest.spyOn(PillarboxMonitoring, 'randomUUID').mockReturnValue(true);
      const spyOnStop = jest.spyOn(monitoring, 'sessionStop');

      monitoring.sessionStart();

      expect(spyOnStop).not.toHaveBeenCalled();
      spyOnRandomUUID.mockRestore();
    });

    it('should stop the previous session before starting a new one', () => {
      const spyOnRandomUUID = jest.spyOn(PillarboxMonitoring, 'randomUUID').mockReturnValue(true);
      const spyOnStop = jest.spyOn(monitoring, 'sessionStop');

      monitoring.sessionStartTimestamp = jest.now();
      monitoring.sessionStart();

      expect(spyOnStop).toHaveBeenCalled();
      spyOnRandomUUID.mockRestore();
    });
  });

  /**
   *****************************************************************************
   * statusEventData ***********************************************************
   *****************************************************************************
   */
  describe('statusEventData', () => {
    it('should return a well formed json object', () => {
      player.tech.mockReturnValue({
        vhs: {
          stats: {
            bandwidth: 69000
          }
        }
      });
      player.currentSource.mockReturnValue({
        src: 'https://example.com/sd/player.m3u8'
      });
      jest.spyOn(monitoring, 'playbackPosition').mockReturnValueOnce({
        position: 10,
        position_timestamp: jest.now() + 1000
      });
      jest.spyOn(monitoring, 'currentRepresentation').mockReturnValueOnce({
        bandwidth: 2129221,
        codecs: 'avc1.4d401f,mp4a.40.2',
        byteLength: 1963217,
        uri: 'https://example.com/sd/35.m4s',
      });
      jest.spyOn(monitoring, 'playbackDuration').mockReturnValueOnce(0);

      expect(monitoring.statusEventData()).toEqual(expect
        .objectContaining({
          bandwidth: expect.any(Number),
          bitrate: expect.any(Number),
          buffered_duration: expect.any(Number),
          playback_duration: expect.any(Number),
          position: expect.any(Number),
          position_timestamp: expect.any(Number),
          stall: expect.any(Object),
          stream_type: expect.any(String),
          url: expect.any(String),
        }));
    });
  });
});
