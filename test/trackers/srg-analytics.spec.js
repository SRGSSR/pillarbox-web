import SRGAnalytics from '../../src/trackers/SRGAnalytics.js';
import * as mediaData from '../__mocks__/mediaData.json';

const playbackSequences = (player, timeRanges = [[]]) => {
  timeRanges.forEach(([start, end], i) => {
    let shouldSeek = i > 0;

    for (let x = end - start, j = 0; j <= x; j++) {
      const currentTimeNextTick = start + j;
      const isSeeking = shouldSeek && currentTimeNextTick === start;

      if (isSeeking) {
        jest.spyOn(player, 'seeking', 'get').mockReturnValue(true);

        player.dispatchEvent(new Event('pause'));
        player.dispatchEvent(new Event('seeking'));
      }

      jest.spyOn(player, 'currentTime', 'get').mockReturnValue(currentTimeNextTick);

      player.dispatchEvent(new Event('timeupdate'));

      if (isSeeking) {
        player.dispatchEvent(new Event('seeked'));

        jest.spyOn(player, 'seeking', 'get').mockReturnValue(false);

        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      }

      jest.advanceTimersByTime(1_000);
    }
  });

  if (player.duration === player.currentTime) {
    jest.spyOn(player, 'ended', 'get').mockReturnValue(true);
    player.dispatchEvent(new Event('ended'));
  }
};

describe('SRGAnalytics', () => {
  let player;
  let playerContainer;
  let analytics;

  beforeEach(() => {
    const container = document.createElement('div');
    const video = document.createElement('video');

    container.append(video);

    // player = videoElementMock(); // playerMock();
    player = video; // playerMock();
    playerContainer = container;
    analytics = new SRGAnalytics(player);
    analytics.setPlaybackData({
      analyticsMetadata: mediaData.mediaData.analyticsMetadata,
      audioTrack: jest.fn(),
      debug: jest.fn(),
      disableTrackers: undefined,
      textTrack: jest.fn(),
    });
  });

  it('should init the TC script and all listeners', () => {
    const initScript = jest.spyOn(SRGAnalytics.prototype, 'initScript');
    const initListeners = jest.spyOn(SRGAnalytics.prototype, 'initListeners');
    const srgAnalytics = new SRGAnalytics(player);

    expect(srgAnalytics).toBeInstanceOf(SRGAnalytics);

    expect(initScript).toHaveBeenCalled();
    expect(initListeners).toHaveBeenCalled();
  });

  /**
   *****************************************************************************
   * standard streaming events *************************************************
   *****************************************************************************
   */
  describe('standard streaming events: sequence of events for media player actions', () => {
    it('should pass: Story 1, AoD/VOD-basics', () => {
      jest.useFakeTimers();
      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      jest.spyOn(player, 'duration', 'get').mockReturnValue(60);

      player.play();

      jest.spyOn(player, 'paused', 'get').mockReturnValue(false);

      playbackSequences(player, [[0, 60]]);

      expect(spyNotify).toHaveBeenNthCalledWith(1, 'buffer_start');
      expect(spyNotify).toHaveBeenNthCalledWith(2, 'init');
      expect(spyNotify).toHaveBeenNthCalledWith(3, 'buffer_stop');
      expect(spyNotify).toHaveBeenNthCalledWith(4, 'play');
      expect(spyNotify).toHaveBeenNthCalledWith(5, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(6, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(7, 'eof');
    });

    it('should pass: Story 2, livestream-basics', () => {
      jest.useFakeTimers();
      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });
      jest.spyOn(player, 'pause').mockImplementation(() => {
        player.dispatchEvent(new Event('pause'));
      });

      mediaData.mediaData.analyticsMetadata = {
        ...mediaData.mediaData.analyticsMetadata,
        media_is_dvr: true,
        media_is_live: true,
      };
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(),
        debug: jest.fn(),
        disableTrackers: undefined,
        textTrack: jest.fn(),
      });

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      jest.spyOn(player, 'duration', 'get').mockReturnValue(8420);
      jest.spyOn(player, 'currentTime', 'get').mockReturnValue(7200);

      player.play();

      jest.spyOn(player, 'paused', 'get').mockReturnValue(false);

      playbackSequences(player, [[7200, 7291]]);

      player.pause();

      jest.spyOn(player, 'paused', 'get').mockReturnValue(false);

      expect(spyNotify).toHaveBeenNthCalledWith(1, 'buffer_start');
      expect(spyNotify).toHaveBeenNthCalledWith(2, 'init');
      expect(spyNotify).toHaveBeenNthCalledWith(3, 'buffer_stop');
      expect(spyNotify).toHaveBeenNthCalledWith(4, 'play');
      expect(spyNotify).toHaveBeenNthCalledWith(5, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(6, 'uptime');
      expect(spyNotify).toHaveBeenNthCalledWith(7, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(8, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(9, 'uptime');
      expect(spyNotify).toHaveBeenNthCalledWith(10, 'pause');
    });

    it('should pass: Story 3, Seeking a VoD/AoD', () => {
      jest.useFakeTimers();
      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      mediaData.mediaData.analyticsMetadata = {
        ...mediaData.mediaData.analyticsMetadata,
        media_is_dvr: false,
        media_is_live: false,
      };
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(),
        debug: jest.fn(),
        disableTrackers: undefined,
        textTrack: jest.fn(),
      });

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      jest.spyOn(player, 'duration', 'get').mockReturnValue(720);
      jest.spyOn(player, 'paused', 'get').mockReturnValue(false);

      player.play();

      playbackSequences(player, [
        [0, 10],
        [600, 720]
      ]);

      expect(spyNotify).toHaveBeenNthCalledWith(1, 'buffer_start');
      expect(spyNotify).toHaveBeenNthCalledWith(2, 'init');
      expect(spyNotify).toHaveBeenNthCalledWith(3, 'buffer_stop');
      expect(spyNotify).toHaveBeenNthCalledWith(4, 'play');
      expect(spyNotify).toHaveBeenNthCalledWith(5, 'seek');
      expect(spyNotify).toHaveBeenNthCalledWith(6, 'play');
      expect(spyNotify).toHaveBeenNthCalledWith(7, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(8, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(9, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(10, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(11, 'eof');
    });

    it('should pass: Story 4, Seeking a livestream', () => {
      jest.useFakeTimers();
      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      mediaData.mediaData.analyticsMetadata = {
        ...mediaData.mediaData.analyticsMetadata,
        media_is_dvr: true,
        media_is_live: true,
      };
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(),
        debug: jest.fn(),
        disableTrackers: undefined,
        textTrack: jest.fn(),
      });

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      jest.spyOn(player, 'duration', 'get').mockReturnValue(420);

      player.play();

      jest.spyOn(player, 'paused', 'get').mockReturnValue(false);

      playbackSequences(player, [
        [0, 10],
        [600, 720]
      ]);

      expect(spyNotify).toHaveBeenNthCalledWith(1, 'buffer_start');
      expect(spyNotify).toHaveBeenNthCalledWith(2, 'init');
      expect(spyNotify).toHaveBeenNthCalledWith(3, 'buffer_stop');
      expect(spyNotify).toHaveBeenNthCalledWith(4, 'play');
      expect(spyNotify).toHaveBeenNthCalledWith(5, 'seek');
      expect(spyNotify).toHaveBeenNthCalledWith(6, 'play');
      expect(spyNotify).toHaveBeenNthCalledWith(7, 'pos');
      expect(spyNotify).toHaveBeenNthCalledWith(8, 'uptime');
    });
  });

  /**
   *****************************************************************************
   * beforeunload **************************************************************
   *****************************************************************************
   */
  describe('beforeunload', () => {
    it('should notify stop', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('loadstart'));
      window.dispatchEvent(new Event('beforeunload'));

      expect(spyNotify).toHaveBeenCalledWith('stop');
    });
  });

  /**
   *****************************************************************************
   * clearTimers ***************************************************************
   *****************************************************************************
   */
  describe('clearTimers', () => {
    it('should clear intervals and timeouts', () => {
      const clearInterval = jest.spyOn(window, 'clearInterval');
      const clearTimeout = jest.spyOn(window, 'clearTimeout');

      window.tc_vars = undefined;
      player.dispatchEvent(new Event('emptied'));

      expect(clearInterval).toHaveBeenCalledWith(analytics.heartBeatIntervalId);
      expect(clearInterval).toHaveBeenCalledWith(analytics.uptimeIntervalId);
      expect(clearTimeout).toHaveBeenCalledWith(analytics.uptimeTimeoutId);
      expect(window.tc_vars).toBeDefined();
    });
  });

  /**
   *****************************************************************************
   * dispose *******************************************************************
   *****************************************************************************
   */
  describe('dispose', () => {
    it('should clear everything and remove all listeners', async () => {
      const spyBeforeUnload = jest.spyOn(analytics, 'beforeunload');
      const spyClearTimers = jest.spyOn(analytics, 'clearTimers');
      const spyWindowRemoveEventListener = jest.spyOn(
        window,
        'removeEventListener'
      );
      const spyPlayerOff = jest.spyOn(player, 'removeEventListener');

      player.dispatchEvent(new Event('loadstart'));
      await playerContainer.removeChild(player);

      expect(spyBeforeUnload).toHaveBeenCalled();
      expect(spyClearTimers).toHaveBeenCalled();
      expect(spyWindowRemoveEventListener).toHaveBeenCalled();
      expect(spyPlayerOff).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * emptied *******************************************************************
   *****************************************************************************
   */
  describe('emptied', () => {
    it('should notify stop when the source is changed', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });
      jest.spyOn(player, 'src', 'set').mockImplementation(() => {
        player.dispatchEvent(new Event('emptied'));
      });

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loaddata'));
      player.play();
      player.src = '';

      expect(spyNotify).toHaveBeenLastCalledWith('stop');
    });
  });

  /**
   *****************************************************************************
   * flush *********************************************************************
   *****************************************************************************
   */
  describe('flush', () => {
    it('should reload tC container there is a pending reload', () => {
      window.tC = {
        container: {
          reload: jest.fn(),
        },
      };
      const spyIsTrackerDisabled = jest.spyOn(analytics, 'isTrackerDisabled');

      spyIsTrackerDisabled.mockReturnValue(false);

      analytics.flush();

      expect(window.tC.container.reload).not.toHaveBeenCalled();

      analytics.pendingTagCommanderReload = true;
      analytics.flush();

      expect(window.tC.container.reload).toHaveBeenCalled();
      expect(analytics.pendingTagCommanderReload).toBe(false);
    });

    it('should be able to flush pending events when tc_events_11 becomes available', () => {
      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      analytics.flush();

      expect(analytics.pendingQueue).toHaveLength(3);

      window.tc_events_11 = jest.fn();

      analytics.flush();

      expect(analytics.pendingQueue).toHaveLength(0);
    });
  });

  /**
   *****************************************************************************
   * getCurrentAudioTrack ******************************************************
   *****************************************************************************
   */
  describe('getCurrentAudioTrack', () => {
    it('should return an empty string if no audio track is enabled', () => {
      expect(analytics.getCurrentAudioTrack()).toBeFalsy();
    });

    it('should return an upper case string representing the audio language', () => {
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(() => ({
          enabled: true,
          id: 'whatever',
          kind: 'audio',
          label: 'we-dont-care',
          language: 'fr',
        })),
        debug: jest.fn(),
        disableTrackers: undefined,
        textTrack: jest.fn(),
      });

      expect(analytics.getCurrentAudioTrack()).toBe('FR');
    });
  });

  /**
   *****************************************************************************
   * getCurrentTextTrack *******************************************************
   *****************************************************************************
   */
  describe('getCurrentTextTrack', () => {
    it('should return an empty string if no text track is enabled', () => {
      expect(analytics.getCurrentTextTrack()).toBeFalsy();
    });

    it('should return an upper case string representing the text language', () => {
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(),
        debug: jest.fn(),
        disableTrackers: undefined,
        textTrack: jest.fn(() => ({
          kind: 'subtitle',
          language: 'fr',
          label: 'Français',
          mode: 'showing',
        })),
      });

      expect(analytics.getCurrentTextTrack()).toBe('FR');
    });
  });

  /**
   *****************************************************************************
   * isTrackerDisabled *********************************************************
   *****************************************************************************
   */
  describe('isTrackerDisabled', () => {
    it('should return false for all non-array, non-Boolean values', () => {
      player.dispatchEvent(new Event('loadstart'));

      expect(analytics.isTrackerDisabled()).toBe(false);
    });

    it('should return true if disableTrackers is set to true', () => {
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(),
        debug: jest.fn(),
        disableTrackers: true,
        textTrack: jest.fn(),
      });

      player.dispatchEvent(new Event('loadstart'));

      expect(analytics.isTrackerDisabled()).toBe(true);
    });

    it('should return true if disableTrackers contains SRGAnalytics', () => {
      analytics.setPlaybackData({
        analyticsMetadata: mediaData.mediaData.analyticsMetadata,
        audioTrack: jest.fn(),
        debug: jest.fn(),
        disableTrackers: ['SRGAnalytics'],
        textTrack: jest.fn(),
      });

      player.dispatchEvent(new Event('loadstart'));

      expect(analytics.isTrackerDisabled()).toBe(true);
    });
  });

  /**
   *****************************************************************************
   * initScript ****************************************************************
   *****************************************************************************
   */
  describe('initScript', () => {
    it('should call flush function when the script is loaded', async () => {
      const spyFlush = jest.spyOn(SRGAnalytics.prototype, 'flush');

      spyFlush.mockImplementation();

      analytics.initScript();
      document.querySelector('script').dispatchEvent(new Event('load'));

      expect(spyFlush).toHaveBeenCalled();
      spyFlush.mockRestore();
    });
  });

  /**
   *****************************************************************************
   * reloadTagCommanderContainer ***********************************************
   *****************************************************************************
   */
  describe('reloadTagCommanderContainer', () => {
    it('should reload tC container if available', () => {
      window.tC = {
        container: {
          reload: jest.fn(),
        },
      };

      analytics.reloadTagCommanderContainer();

      expect(window.tC.container.reload).toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * log ***********************************************************************
   *****************************************************************************
   */
  describe('log', () => {
    it('should call console.log when debug is set to true', () => {
      const spyConsole = jest.spyOn(console, 'log').mockImplementation(); // mockImplementation() avoid printing a log in the console

      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      analytics.debug(true);
      player.play();
      analytics.debug(false);

      expect(spyConsole).toHaveBeenCalled();
      spyConsole.mockRestore();
    });
  });

  /**
   *****************************************************************************
   * notify ********************************************************************
   *****************************************************************************
   */
  describe('notify', () => {
    it('should catch any errors that may occur during the flush', () => {
      const spyFlush = jest.spyOn(analytics, 'flush');
      const spyNotify = jest.spyOn(analytics, 'notify');

      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      spyFlush.mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });

      player.play();

      expect(spyNotify).toThrow();
    });

    it('should catch any errors that may occur in the tag manager', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      window.tc_events_11 = jest.fn();

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      window.tc_events_11.mockImplementationOnce((..._args) => {
        throw new Error('Mock Error');
      });
      player.play();

      expect(spyNotify).toThrow();
    });
  });

  /**
   *****************************************************************************
   * rateChange ****************************************************************
   *****************************************************************************
   */
  describe('rateChange', () => {
    it('should notify change_playback_rate each time playback rate change', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));
      player.dispatchEvent(new Event('ratechange'));

      expect(spyNotify).toHaveBeenNthCalledWith(1, 'buffer_start');
      expect(spyNotify).toHaveBeenNthCalledWith(2, 'init');
      expect(spyNotify).toHaveBeenNthCalledWith(3, 'buffer_stop');
      expect(spyNotify).toHaveBeenNthCalledWith(4, 'change_playback_rate');
    });
  });

  /**
   *****************************************************************************
   * timeUpdate ****************************************************************
   *****************************************************************************
   */
  describe('timeUpdate', () => {
    it('should not call isMediaLive if playback has not started', () => {
      const spyIsMediaLive = jest.spyOn(analytics, 'isMediaLive');

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));
      player.dispatchEvent(new Event('timeupdate'));

      expect(analytics.hasStarted).toBe(false);
      expect(spyIsMediaLive).not.toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * setPlaybackData ***********************************************************
   *****************************************************************************
   */
  describe('setPlaybackData', () => {
    it('should set the playbackData', () => {
      analytics.setPlaybackData(mediaData.mediaData);
      expect(analytics.playbackData).toBe(mediaData.mediaData);
    });
  });

  /**
   *****************************************************************************
   * waiting *******************************************************************
   *****************************************************************************
   */
  describe('waiting', () => {
    it('should not call notify the initialization has not been done', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      player.dispatchEvent(new Event('waiting'));

      expect(analytics.isWaiting).toBe(false);
      expect(analytics.initialized).toBe(false);
      expect(spyNotify).not.toHaveBeenCalled();
    });

    it('should send buffer_start when the player starts buffering and buffer_stop when the playback\n\t\t\t\tresumes based on a playing event if the browser is not Safari', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      analytics.playbackData.browser = {
        IS_ANY_SAFARI: false
      };

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      player.play();

      expect(analytics.isWaiting).toBe(false);
      expect(analytics.initialized).toBe(true);

      player.dispatchEvent(new Event('waiting'));

      expect(analytics.isWaiting).toBe(true);
      expect(spyNotify).toHaveBeenLastCalledWith('buffer_start');

      player.play();

      expect(spyNotify).toHaveBeenLastCalledWith('buffer_stop');
    });

    it('should send buffer_start when the player starts buffering and buffer_stop when the playback resumes based on a timeupdate event if the browser is Safari', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      jest.spyOn(player, 'play').mockImplementation(() => {
        player.dispatchEvent(new Event('play'));
        player.dispatchEvent(new Event('playing'));
      });

      analytics.playbackData.browser = {
        IS_ANY_SAFARI: true
      };

      player.dispatchEvent(new Event('loadstart'));
      player.dispatchEvent(new Event('loadeddata'));

      player.play();

      expect(analytics.isWaiting).toBe(false);
      expect(analytics.initialized).toBe(true);

      player.dispatchEvent(new Event('waiting'));

      expect(analytics.isWaiting).toBe(true);
      expect(spyNotify).toHaveBeenLastCalledWith('buffer_start');

      player.dispatchEvent(new Event('timeupdate'));

      expect(spyNotify).toHaveBeenLastCalledWith('buffer_stop');
    });
  });
});
