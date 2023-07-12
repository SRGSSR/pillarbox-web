import Pillarbox from '../src/pillarbox.js';
import { version } from '../package.json';
import videojs from 'video.js';

describe('Pillarbox', () => {
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
  });
});
