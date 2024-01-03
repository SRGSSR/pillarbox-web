import Pillarbox from '../src/pillarbox.js';
import { version } from '../package.json';
import videojs from 'video.js';

describe('Pillarbox', () => {
  it('should create an instance of the component player', () => {
    const videoEl = document.createElement('video');

    videoEl.id = 'player';

    document.body.appendChild(videoEl);

    const pillarbox = new Pillarbox('player');

    expect(pillarbox).toBeInstanceOf(Pillarbox.getComponent('Player'));
    expect(pillarbox.id()).toEqual('player');
  });

  describe('options', () => {
    it('should have enableSmoothSeeking set to true by default', () => {
      expect(Pillarbox.options.enableSmoothSeeking).toBe(true);
    });
  });

  describe('VERSION', () => {
    it('should contain the version provided by the package.json file', () => {
      expect(Pillarbox.VERSION.pillarbox).toEqual(version);
    });
    it('should contain the version provided by video.js', () => {
      expect(Pillarbox.VERSION.videojs).toEqual(videojs.VERSION);
    });
    it('should contain the version provided by http-streaming', () => {
      expect(Pillarbox.VERSION[videojs.VhsSourceHandler.name]).toEqual(
        videojs.VhsSourceHandler.VERSION
      );
    });
    it('should contain the version provided by videojs-contrib-eme', () => {
      expect(Pillarbox.VERSION[videojs.getPlugin('eme').name]).toEqual(
        videojs.getPlugin('eme').VERSION
      );
    });
  });
});
