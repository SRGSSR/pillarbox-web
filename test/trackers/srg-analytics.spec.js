import SRGAnalytics from '../../src/trackers/SRGAnalytics.js';
import Pillarbox from '../../src/pillarbox.js';
import playerMock from '../__mocks__/player-mock.js';

jest.mock('../../src/pillarbox.js', () => ({
  browser: {
    IS_ANY_SAFARI: false,
  },
}));

const playbackSequences = (player, timeRanges = [[]]) => {
  timeRanges.forEach(([start, end], i) => {
    let shouldSeek = i > 0;

    for (let x = end - start, j = 0; j <= x; j++) {
      const currentTimeNextTick = start + j;
      const isSeeking = shouldSeek && currentTimeNextTick === start;

      if (isSeeking) {
        player.seeking.mockReturnValue(true);
        player.trigger('pause');
        player.trigger('seeking');
      }

      player.currentTime.mockReturnValue(currentTimeNextTick);
      player.trigger('timeupdate');

      if (isSeeking) {
        player.trigger('seeked');
        player.seeking.mockReturnValue(false);
        player.trigger('play');
        player.trigger('playing');
      }

      jest.advanceTimersByTime(1_000);
    }
  });

  if (player.duration() === player.currentTime()) {
    player.ended.mockReturnValue(true);
    player.trigger('ended');
  }
};

describe('SRGAnalytics', () => {
  let player;
  let analytics;

  beforeEach(() => {
    player = playerMock();
    analytics = new SRGAnalytics(player);
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

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loadeddata');

      player.duration.mockReturnValue(60);
      player.play();
      player.paused.mockReturnValue(false);

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

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loadeddata');

      player.liveTracker.liveWindow.mockReturnValue(7200);
      player.currentTime.mockReturnValue(7200);
      player.duration.mockReturnValue(Infinity);
      player.play();
      player.paused.mockReturnValue(false);

      playbackSequences(player, [[7200, 7291]]);

      player.pause();
      player.paused.mockReturnValue(true);

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

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loadeddata');

      player.duration.mockReturnValue(720);
      player.paused.mockReturnValue(false);
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

      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loadeddata');

      player.duration.mockReturnValue(Infinity);
      player.play();
      player.paused.mockReturnValue(false);

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

      player.trigger('loadstart');
      player.trigger('dispose');

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

      player.trigger('loadstart');

      expect(clearInterval).toHaveBeenCalledWith(analytics.heartBeatIntervalId);
      expect(clearInterval).toHaveBeenCalledWith(analytics.uptimeIntervalId);
      expect(clearTimeout).toHaveBeenCalledWith(analytics.uptimeTimeoutId);
    });
  });

  /**
   *****************************************************************************
   * dispose *******************************************************************
   *****************************************************************************
   */
  describe('dispose', () => {
    it('should clear everything and remove all listeners', () => {
      const spyBeforeUnload = jest.spyOn(analytics, 'beforeunload');
      const spyClearTimers = jest.spyOn(analytics, 'clearTimers');
      const spyWindowRemoveEventListener = jest.spyOn(
        window,
        'removeEventListener'
      );
      const spyPlayerOff = jest.spyOn(player, 'off');

      player.trigger('loadstart');
      player.trigger('dispose');

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
    it('should notify stop', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loaddata');
      player.play();
      player.src();

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
      player.trigger('loadstart');
      player.trigger('loadeddata');

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
      player.audioTracks = jest.fn(() => ({
        0: {
          enabled: true,
          id: 'whatever',
          kind: 'audio',
          label: 'we-dont-care',
          language: 'fr',
        },
        1: {
          enabled: false,
          id: 'whatever2',
          kind: 'audio',
          label: 'we-dont-care-2',
          language: 'en',
        },
        length: 2,
      }));

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
      player.textTrack.mockReturnValueOnce({
        kind: 'subtitle',
        language: 'fr',
        label: 'Français',
        mode: 'showing',
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
      player.trigger('loadstart');

      expect(analytics.isTrackerDisabled()).toBe(false);
    });

    it('should return true if disableTrackers is set to true', () => {
      const src = {
        ...player.currentSource(),
        disableTrackers: true,
      };

      player.currentSource.mockReturnValueOnce(src);
      player.trigger('loadstart');

      expect(analytics.isTrackerDisabled()).toBe(true);
    });

    it('should return true if disableTrackers contains SRGAnalytics', () => {
      const src = {
        ...player.currentSource(),
        disableTrackers: ['SRGAnalytics'],
      };

      player.currentSource.mockReturnValueOnce(src);
      player.trigger('loadstart');

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
      const spyConsole = jest.spyOn(console, 'log');

      spyConsole.mockImplementation();

      player.trigger('loadstart');
      player.trigger('loadeddata');

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

      player.trigger('loadstart');
      player.trigger('loadeddata');

      spyFlush.mockImplementationOnce(() => {
        throw new Error('Mock Error');
      });

      player.play();

      expect(spyNotify).toThrow();
    });

    it('should catch any errors that may occur in the tag manager', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      window.tc_events_11 = jest.fn();

      player.trigger('loadstart');
      player.trigger('loadeddata');

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

      player.trigger('loadstart');
      player.trigger('loadeddata');
      player.trigger('ratechange');

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

      player.trigger('loadstart');
      player.trigger('loadeddata');
      player.trigger('timeupdate');

      expect(analytics.hasStarted).toBe(false);
      expect(spyIsMediaLive).not.toHaveBeenCalled();
    });
  });

  /**
   *****************************************************************************
   * updateSrcMediaData ********************************************************
   *****************************************************************************
   */
  describe('updateSrcMediaData', () => {
    it('should set the srcMediaData', () => {
      analytics.updateSrcMediaData(player.currentSource());
      expect(analytics.srcMediaData).toBe(player.currentSource());
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

      player.trigger('waiting');

      expect(analytics.isWaiting).toBe(false);
      expect(analytics.initialized).toBe(false);
      expect(spyNotify).not.toHaveBeenCalled();
    });

    it('should send buffer_start when the player starts buffering and buffer_stop when the playback resumes based on a playing event', () => {
      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loadeddata');
      player.play();

      expect(analytics.isWaiting).toBe(false);
      expect(analytics.initialized).toBe(true);

      player.trigger('waiting');

      expect(analytics.isWaiting).toBe(true);
      expect(spyNotify).toHaveBeenLastCalledWith('buffer_start');

      player.play();

      expect(spyNotify).toHaveBeenLastCalledWith('buffer_stop');
    });

    it('should send buffer_start when the player starts buffering and buffer_stop when the playback resumes based on a timeupdate event', () => {
      const mockIsAnySafari = jest.replaceProperty(Pillarbox, 'browser', {
        IS_ANY_SAFARI: true,
      });
      const spyNotify = jest.spyOn(analytics, 'notify');

      player.trigger('loadstart');
      player.trigger('loadeddata');
      player.play();

      expect(analytics.isWaiting).toBe(false);
      expect(analytics.initialized).toBe(true);

      player.trigger('waiting');

      expect(analytics.isWaiting).toBe(true);
      expect(spyNotify).toHaveBeenLastCalledWith('buffer_start');

      player.trigger('timeupdate');

      expect(spyNotify).toHaveBeenLastCalledWith('buffer_stop');

      mockIsAnySafari.restore();
    });
  });
});
