import * as SRGQuality from '../../src/utils/SRGQuality.js';
import * as urnRts1Drm from '../__mocks__/urn:rts:video:3608506.json';
import * as urnRtsInfo from '../__mocks__/urn:rts:video:1967124.json';
import * as urnSdHd from '../__mocks__/urn:rts:video:10272382.json';
import * as urnLaPremiere from '../__mocks__/urn:rts:audio:3262320.json';

describe('SRGQuality', () => {
  /**
   *****************************************************************************
   * containQualities **********************************************************
   *****************************************************************************
   */
  describe('containQualities', () => {
    it('should be false if SD and HD qualities are not found', () => {
      // Only SD
      expect(
        SRGQuality.containQualities(
          urnRts1Drm.chapterList[0].resourceList
        )
      ).toBe(false);

      // Only HD
      expect(
        SRGQuality.containQualities(
          urnRtsInfo.chapterList[0].resourceList
        )
      ).toBe(false);

      // Only HD and HD
      expect(
        SRGQuality.containQualities(
          urnLaPremiere.chapterList[0].resourceList
        )
      ).toBe(false);
    });

    it('should be true if SD and HD qualities are found', () => {
      expect(
        SRGQuality.containQualities(urnSdHd.chapterList[0].resourceList)
      ).toBe(true);
    });

    it('should be false if SD quality is not found', () => {
      expect(
        SRGQuality.containQualities(
          urnRtsInfo.chapterList[0].resourceList,
          ['SD']
        )
      ).toBe(false);

      expect(
        SRGQuality.containQualities(
          urnLaPremiere.chapterList[0].resourceList,
          ['SD']
        )
      ).toBe(false);
    });

    it('should be true if the quality is found', () => {
      expect(
        SRGQuality.containQualities(
          urnRtsInfo.chapterList[0].resourceList,
          ['HD']
        )
      ).toBe(true);

      expect(
        SRGQuality.containQualities(
          urnSdHd.chapterList[0].resourceList,
          ['HD']
        )
      ).toBe(true);

      expect(
        SRGQuality.containQualities(
          urnLaPremiere.chapterList[0].resourceList,
          ['HD']
        )
      ).toBe(true);

      expect(
        SRGQuality.containQualities(
          urnLaPremiere.chapterList[0].resourceList,
          ['HD', 'HQ']
        )
      ).toBe(true);
    });

    it('should be false if qualities is an empty array', () => {
      expect(
        SRGQuality.containQualities(
          urnSdHd.chapterList[0].resourceList,
          []
        )
      ).toBe(false);
    });

    it('should be false if qualities are not valid', () => {
      expect(
        SRGQuality.containQualities(
          urnSdHd.chapterList[0].resourceList,
          ['XD']
        )
      ).toBe(false);

      expect(
        SRGQuality.containQualities(
          urnSdHd.chapterList[0].resourceList,
          ['XQ']
        )
      ).toBe(false);

      expect(
        SRGQuality.containQualities(
          urnSdHd.chapterList[0].resourceList,
          ['X', 'Y', 'Z']
        )
      ).toBe(false);
    });
  });

  /**
   *****************************************************************************
   * isSourceHD ****************************************************************
   *****************************************************************************
   */
  describe('isSourceHD', () => {
    it('should be true if the source is HD or HQ', () => {
      expect(SRGQuality.isSourceHD({ quality: 'HD' })).toBe(true);
      expect(SRGQuality.isSourceHD({ quality: 'HQ' })).toBe(true);
    });
    it('should be false if the source is SD', () => {
      expect(SRGQuality.isSourceHD({ quality: 'SD' })).toBe(false);
    });
  });
});
