import Pillarbox from '../src/pillarbox.js';
import { version } from '../package.json';

describe('Pillarbox', () => {
  describe('VERSION', () => {
    it('should be equal to the package.json file', () => {
      expect(Pillarbox.VERSION).toEqual(version);
    });
  });
});
