import Player from '../../src/components/player.js';

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
});
