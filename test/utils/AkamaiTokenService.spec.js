import AkamaiTokenService from '../../src/utils/AkamaiTokenService.js';
import streamTypeList from '../__mocks__/streamTypeList.js';

window.fetch = jest.fn((source) => {
  return Promise.resolve({
    ok: source.includes('success'),
    status: 503,
    statusText: 'Service Unavailable',
    json: () => {
      if (source.includes('success')) {
        return Promise.resolve({ token: { authparams: 'faketoken=123445' }});
      }
    },
  });
});

describe('AkamaiTokenService', () => {
  it('Getters are type of String', () => {
    expect(AkamaiTokenService.AKAMAI).toEqual(expect.any(String));
    expect(AkamaiTokenService.NONE).toEqual(expect.any(String));
  });
  /**
   *****************************************************************************
   * aclPath *******************************************************************
   *****************************************************************************
   */
  describe('aclPath', () => {
    it('should not match the pattern', () => {
      const url = new URL(
        'https://mock-token.ch/with/a/long/path/manifest.m3u8'
      );

      expect(AkamaiTokenService.aclPath(url)).toBe(
        '/with/a/long/path/*'
      );
    });
  });

  /**
   *****************************************************************************
   * hasToken ******************************************************************
   *****************************************************************************
   */
  describe('hasToken', () => {
    it('should return true if the resources are containing at least one resource protected by an AKAMAI token', () => {
      const hasToken = true;

      expect(AkamaiTokenService.hasToken(streamTypeList)).toBe(hasToken);
    });
  });

  /**
   *****************************************************************************
   * isAkamai ******************************************************************
   *****************************************************************************
   */
  describe('isAkamai', () => {
    it('should return true if the resource is protected by an AKAMAI token', () => {
      streamTypeList.forEach((stream) => {
        const { tokenType } = stream;
        const hasToken = AkamaiTokenService.AKAMAI === tokenType;

        expect(AkamaiTokenService.isAkamai(tokenType)).toBe(hasToken);
      });
    });
  });

  /**
   *****************************************************************************
   * isNone ********************************************************************
   *****************************************************************************
   */
  describe('isNone', () => {
    it('should return true if the resource is not protected by an AKAMAI token', () => {
      streamTypeList.forEach((stream) => {
        const { tokenType } = stream;
        const hasToken = AkamaiTokenService.NONE === tokenType;

        expect(AkamaiTokenService.isNone(tokenType)).toBe(hasToken);
      });
    });
  });

  /**
   *****************************************************************************
   * tokenize ******************************************************************
   *****************************************************************************
   */
  describe('tokenize', () => {
    it('should return a tokenized source', async () => {
      const spyOnObject = jest.spyOn(Object, 'assign');

      const result = await AkamaiTokenService.tokenize(
        { url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8' },
        'https://success.token.server.ch'
      );

      expect(result).toMatchObject({
        url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8?faketoken=123445',
      });
      expect(spyOnObject).toHaveBeenCalled();
    });

    it('should be rejected if something went wrong', async () => {
      await expect(
        AkamaiTokenService.tokenize(
          { url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8' },
          'https://unavailable.token.server.ch'
        )
      ).rejects.not.toBeNull();
    });
  });

  /**
   *****************************************************************************
   * tokenizeSources ***********************************************************
   *****************************************************************************
   */
  describe('tokenizeSources', () => {
    it('should return a tokenized sources', async () => {
      const result = await AkamaiTokenService.tokenizeSources(
        [
          { url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8' },
          { url: 'https://mock-token.ch/with/a/long/path/manifest2.m3u8' }
        ],
        'https://success.token.server.ch'
      );

      expect(result).toMatchObject([
        { url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8?faketoken=123445' },
        { url: 'https://mock-token.ch/with/a/long/path/manifest2.m3u8?faketoken=123445' }
      ]);
    });

    it('should be rejected if something went wrong', async () => {
      const spyOnTokenize = jest.spyOn(AkamaiTokenService, 'tokenize');

      await expect(
        AkamaiTokenService.tokenizeSources(
          [
            { url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8' },
            { url: 'https://mock-token.ch/with/a/long/path/manifest2.m3u8' }
          ],
          'https://unavailable.token.server.ch'
        )
      ).rejects.not.toBeNull();
      expect(spyOnTokenize).toHaveBeenCalledWith(expect.anything(), 'https://unavailable.token.server.ch');
    });

    it('should be called with the default URL', async () => {
      await expect(
        AkamaiTokenService.tokenizeSources(
          [
            { url: 'https://mock-token.ch/with/a/long/path/manifest.m3u8' },
            { url: 'https://mock-token.ch/with/a/long/path/manifest2.m3u8' }
          ]
        )
      ).rejects.not.toBeNull();

    });
  });
});
