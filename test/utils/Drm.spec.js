import Drm from '../../src/utils/Drm.js';

describe('Drm', () => {
  /**
   *****************************************************************************
   * buildKeySystems ***********************************************************
   *****************************************************************************
   */
  describe('buildKeySystems', () => {
    it('should return an empty keySystems object', () => {
      expect(Drm.buildKeySystems()).toMatchObject({
        keySystems: {},
      });
      expect(Drm.buildKeySystems([])).toMatchObject({
        keySystems: {},
      });
    });

    it('should return a valid Fairplay keySystems object', () => {
      expect(
        Drm.buildKeySystems([
          {
            type: 'FAIRPLAY',
            licenseUrl: 'https://license.url',
            certificateUrl: 'https://certificate.url',
          }
        ])
      ).toMatchObject({
        keySystems: {
          'com.apple.fps.1_0': {
            certificateUri: 'https://certificate.url',
            licenseUri: 'https://license.url',
          },
        },
      });
    });

    it('should return a valid Widevine keySystems object', () => {
      expect(
        Drm.buildKeySystems([
          {
            type: 'WIDEVINE',
            licenseUrl: 'https://license.url',
          }
        ])
      ).toMatchObject({
        keySystems: {
          'com.widevine.alpha': 'https://license.url',
        },
      });
    });
  });

  /**
   *****************************************************************************
   * hasDrm ********************************************************************
   *****************************************************************************
   */
  describe('hasDrm', () => {
    it('should return true if keySystemOptions is not empty', () => {
      expect(Drm.hasDrm([{ drmList: [1] }])).toBe(true);
    });

    it('should return false if keySystemOptions is empty', () => {
      expect(Drm.hasDrm([{ drmList: [] }])).toBe(false);
    });
  });
});
