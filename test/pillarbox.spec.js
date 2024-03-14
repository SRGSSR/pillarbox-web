import pillarbox from '../src/pillarbox.js';
import { version } from '../package.json';
import videojs from 'video.js';

describe('Pillarbox', () => {
  it('should create an instance of the component player', () => {
    const videoEl = document.createElement('video');

    videoEl.id = 'player';

    document.body.appendChild(videoEl);

    const player = new pillarbox('player');

    expect(player).toBeInstanceOf(pillarbox.getComponent('Player'));
    expect(player.id()).toEqual('player');
  });

  describe('options', () => {
    it('should have enableSmoothSeeking set to true by default', () => {
      expect(pillarbox.options.enableSmoothSeeking).toBe(true);
    });

    it('should set useForcedSubtitles to true in VHS configuration', () => {
      expect(pillarbox.options.html5).toEqual({
        vhs: { useForcedSubtitles: true }
      });
    });

    it('should have liveTracker configuration with default values', () => {
      expect(pillarbox.options.liveTracker).toEqual({
        trackingThreshold: 120,
        liveTolerance: 15,
      });
    });

    it('should have liveui set to true by default', () => {
      expect(pillarbox.options.liveui).toBe(true);
    });

    it('should have playsinline set to true by default', () => {
      expect(pillarbox.options.playsinline).toBe(true);
    });

    it('should have fill set to true by default', () => {
      expect(pillarbox.options.fill).toBe(true);
    });

    it('should have responsive set to true by default', () => {
      expect(pillarbox.options.responsive).toBe(true);
    });
  });

  describe('VERSION', () => {
    it('should contain the version provided by the package.json file', () => {
      expect(pillarbox.VERSION.pillarbox).toEqual(version);
    });
    it('should contain the version provided by http-streaming', () => {
      expect(pillarbox.VERSION[videojs.VhsSourceHandler.name]).toEqual(
        videojs.VhsSourceHandler.VERSION
      );
    });
    it('should contain the version provided by videojs-contrib-eme', () => {
      expect(pillarbox.VERSION[videojs.getPlugin('eme').name]).toEqual(
        videojs.getPlugin('eme').VERSION
      );
    });
  });
});
