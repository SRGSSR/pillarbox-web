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
            certificateUrl: 'https://certificate.url',
          }
        ])
      ).toMatchObject({
        keySystems: {
          'com.apple.fps.1_0': {
            certificateUri: 'https://certificate.url',
            getContentId: expect.any(Function),
            getLicense: expect.any(Function),
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
   * buildFairplayConfig *******************************************************
   *****************************************************************************
   */
  describe('buildFairplayConfig', () => {
    it('should replace skd: with https:', () => {
      const config = Drm.buildFairplayConfig({
        certificateUrl: 'https://cert.url'
      });

      expect(config.getContentId(null, 'skd://my-license-url')).toBe('https://my-license-url');
    });
  });

  /**
   *****************************************************************************
   * parseLicenseError *********************************************************
   *****************************************************************************
   */
  describe('parseLicenseError', () => {
    it('should parse JSON error response correctly', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ code: '69', message: 'Forbidden Access' }),
        status: 403,
      };
      const result = await Drm.parseLicenseError(mockResponse);

      expect(result).toBe('DRM license error: 69 Forbidden Access');
    });
  });

  /**
   *****************************************************************************
   * requestLicense ************************************************************
   *****************************************************************************
   */
  describe('requestLicense', () => {
    let originalFetch;

    beforeEach(() => {
      originalFetch = global.fetch;
      global.fetch = jest.fn();
    });

    afterEach(() => {
      global.fetch = originalFetch;
    });

    it('should fetch license and call callback with arrayBuffer on success', async () => {
      const mockBuffer = new ArrayBuffer(8);

      global.fetch.mockResolvedValue({
        ok: true,
        arrayBuffer: jest.fn().mockResolvedValue(mockBuffer),
      });

      const callback = jest.fn();

      await Drm.requestLicense('https://license.url', 'keyMessageData', callback);

      expect(global.fetch).toHaveBeenCalledWith('https://license.url', {
        method: 'POST',
        body: 'keyMessageData',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });
      expect(callback).toHaveBeenCalledWith(null, mockBuffer);
    });

    it('should parse error and call callback with string if response is not ok', async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 502,
        statusText: 'Something is no bueno',
      });

      const callback = jest.fn();

      await Drm.requestLicense('https://license.url', 'not_an_arrayBuffer', callback);

      expect(callback).toHaveBeenCalledWith('DRM license error: 502 Something is no bueno');
    });

    it('should catch network errors and pass them to the callback', async () => {
      const networkError = new Error('Network Failure');

      global.fetch.mockRejectedValue(networkError);

      const callback = jest.fn();

      await Drm.requestLicense('https://license.url', 'keyMessageData', callback);

      expect(callback).toHaveBeenCalledWith(networkError);
    });
  });

  /**
   *****************************************************************************
   * hasDrm ********************************************************************
   *****************************************************************************
   */
  describe('hasDrm', () => {
    it('should return true if drmList is not empty', () => {
      expect(Drm.hasDrm([{ drmList: [1] }])).toBe(true);
    });

    it('should return false if drmList is empty', () => {
      expect(Drm.hasDrm([{ drmList: [] }])).toBe(false);
    });
  });
});
