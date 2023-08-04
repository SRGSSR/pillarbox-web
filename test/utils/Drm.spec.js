import Drm from '../../src/utils/Drm.js';

describe('Drm', () => {
  /**
   *****************************************************************************
   * hasDrm ********************************************************************
   *****************************************************************************
   */

  describe('hasDrm', () => {
    it('should return true if keySystemOptions is not empty', () => {
      expect(Drm.hasDrm([{ keySystemOptions : [1] }])).toBe(
        true
      );
    });

    it('should return false if keySystemOptions is empty', () => {
      expect(Drm.hasDrm([{ keySystemOptions : [] }])).toBe(
        false
      );
    });
  });
});
