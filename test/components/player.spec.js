import Player from '../../src/components/player.js';
import pillarbox from '../../src/pillarbox.js';

// jsdom doesn’t implement the HTMLMediaElement.prototype.load
// Mainly used by the loadMedia test cases.
Object.defineProperty(global.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  value: () => {} // Noop function
});

describe('Player', () => {
  const videoEl = document.createElement('video');

  videoEl.id = 'mock-player';

  describe('audioTrack', () => {
    const player = new Player(videoEl);

    player.audioTracks = jest.fn(() => ({
      0: {
        enabled: true,
        id: '1',
        kind: 'main',
        label: 'English',
        language: 'en',
      },
      1: {
        enabled: false,
        id: '2',
        kind: 'alternative',
        label: 'English alternative',
        language: 'en',
      },
      length: 2,
    }));

    it('should return the currently active audio track if the function parameter is undefined', () => {
      expect(player.audioTrack()).toMatchObject({
        enabled: true,
        id: '1',
        kind: 'main',
        label: 'English',
        language: 'en',
      });
    });
    it('should enable and return the audio track according to the language and kind properties', () => {
      expect(
        player.audioTrack({ language: 'en', kind: 'alternative' })
      ).toMatchObject({
        enabled: true,
        id: '2',
        kind: 'alternative',
        label: 'English alternative',
        language: 'en',
      });
    });
    it('should enable and return the audio track according to the language property if the kind property does not satisfy the condition', () => {
      expect(
        player.audioTrack({ language: 'en', kind: 'invalid' })
      ).toMatchObject({
        enabled: true,
        id: '1',
        kind: 'main',
        label: 'English',
        language: 'en',
      });
    });
    it('should return undefined and not disable the already active audio track if the language and kind properties do not satisfy the condition', () => {
      expect(player.audioTrack({ language: 'fr' })).toBeUndefined();
      expect(player.audioTracks.mock.results[0].value[0].enabled).toBe(true);
    });
  });

  describe('bufferedRanges', () => {
    it('should return an empty array if there are no buffered ranges', () => {
      const player = new Player(videoEl);

      player.buffered = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges();
      });

      expect(player.bufferedRanges()).toHaveLength(0);
    });

    it('should return an array containing two entries', () => {
      const player = new Player(videoEl);

      player.buffered = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges([
          [0, 10],
          [11, 69]
        ]);
      });

      expect(player.bufferedRanges()).toHaveLength(2);
      expect(player.bufferedRanges()).toEqual(
        expect.arrayContaining([
          { 'end': 10, 'start': 0 },
          { 'end': 69, 'start': 11 }
        ])
      );
    });
  });

  describe('playedPercent', () => {
    it('should return NaN if the duration is not finite', () => {
      const player = new Player(videoEl);

      player.duration = jest.fn().mockImplementation(() => {
        return Infinity;
      });

      expect(player.playedPercent()).toBeNaN();
    });

    it('should return the correct percentage played', () => {
      const player = new Player(videoEl);

      player.duration = jest.fn().mockImplementation(() => {
        return 100;
      });
      player.played = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges([
          [0, 5],
          [10, 15]
        ]);
      });

      expect(player.playedPercent()).toEqual(0.1);
    });
  });

  describe('playedRanges', () => {
    it('should return an empty array if there are no played ranges', () => {
      const player = new Player(videoEl);

      player.duration = jest.fn().mockImplementation(() => {
        return 69;
      });
      player.played = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges();
      });

      expect(player.playedRanges()).toHaveLength(0);
    });

    it('should return an array containing two entries', () => {
      const player = new Player(videoEl);

      player.duration = jest.fn().mockImplementation(() => {
        return 420;
      });
      player.played = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges([
          [0, 10],
          [69, 420]
        ]);
      });

      expect(player.playedRanges()).toHaveLength(2);
      expect(player.playedRanges()).toEqual(
        expect.arrayContaining([
          { 'end': 10, 'start': 0 },
          { 'end': 420, 'start': 69 }
        ])
      );
    });
  });

  describe('seekableRanges', () => {
    it('should return an empty array if there are no seekable ranges', () => {
      const player = new Player(videoEl);

      player.seekable = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges();
      });

      expect(player.seekableRanges()).toHaveLength(0);
    });

    it('should return an array containing two entries', () => {
      const player = new Player(videoEl);

      player.seekable = jest.fn().mockImplementation(() => {
        return pillarbox.time.createTimeRanges([
          [0, 10],
          [11, 69]
        ]);
      });

      expect(player.seekableRanges()).toHaveLength(2);
      expect(player.seekableRanges()).toEqual(
        expect.arrayContaining([
          { 'end': 10, 'start': 0 },
          { 'end': 69, 'start': 11 }
        ])
      );
    });
  });

  describe('textTrack', () => {
    const player = new Player(videoEl);

    player.textTracks = jest.fn(() => ({
      0: {
        mode: 'showing',
        id: '1',
        kind: 'subtitles',
        label: 'English',
        language: 'en',
      },
      1: {
        mode: 'disabled',
        id: '2',
        kind: 'descriptions',
        label: 'English AD',
        language: 'en',
      },
      length: 2,
    }));

    it('should return the currently active text track if the function parameter is undefined', () => {
      expect(player.textTrack()).toMatchObject({
        mode: 'showing',
        id: '1',
        kind: 'subtitles',
        label: 'English',
        language: 'en',
      });
    });
    it('should enable and return the text track according to the language and kind properties', () => {
      expect(
        player.textTrack({ language: 'en', kind: 'descriptions' })
      ).toMatchObject({
        mode: 'showing',
        id: '2',
        kind: 'descriptions',
        label: 'English AD',
        language: 'en',
      });
    });
    it('should enable and return the text track according to the language property if the kind property does not satisfy the condition', () => {
      expect(
        player.textTrack({ language: 'en', kind: 'invalid' })
      ).toMatchObject({
        mode: 'showing',
        id: '1',
        kind: 'subtitles',
        label: 'English',
        language: 'en',
      });
    });
    it('should return undefined and disable every active text track if the language and kind properties do not satisfy the condition', () => {
      expect(player.textTrack({ language: 'fr' })).toBeUndefined();
      expect(player.textTracks.mock.results[0].value[0].mode).toBe('disabled');
      expect(player.textTracks.mock.results[0].value[1].mode).toBe('disabled');
    });
  });

  describe('eme', () => {
    const player = new Player(videoEl);

    it('should have initialize eme plugin', () => {
      expect(player.eme).toBeDefined();
      // When a plugin is initialized its function becomes an object
      expect(typeof player.eme).not.toBe('function');
      expect(typeof player.eme).toBe('object');
    });
  });

  describe('src', () => {
    const player = new Player(videoEl);

    it('should not trigger the beforesourceset event when no parameter is passed to the src function', () => {
      const handler = jest.fn();

      player.on('beforesourceset', handler);
      player.src();

      expect(handler).not.toHaveBeenCalled();
    });

    it('should trigger the beforesourceset event when a new source is passed to the src function', () => {
      const handler = jest.fn();

      player.on('beforesourceset', handler);
      player.src('http://mock.url.ch');

      expect(handler).toHaveBeenCalled();
    });
  });

  // Ensures that the beforesourceset event also works with loadMedia
  describe('loadMedia', () => {
    const player = new Player(videoEl);

    it('should not trigger the beforesourceset event when no parameter is passed to the loadMedia function', () => {
      const handler = jest.fn();

      player.on('beforesourceset', handler);
      player.loadMedia();

      expect(handler).not.toHaveBeenCalled();
    });

    it('should trigger the beforesourceset event when a new source is passed to the loadMedia function', () => {
      const handler = jest.fn();

      player.on('beforesourceset', handler);
      player.loadMedia({ src: { src: 'http://mock.url.ch' }});

      expect(handler).toHaveBeenCalled();
    });
  });
});
