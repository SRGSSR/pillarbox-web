import fetch from '../../__mocks__/fetch.js';

import MediaComposition from '../../../src/dataProvider/model/MediaComposition.js';
import DataProvider from '../../../src/dataProvider/services/DataProvider.js';

describe('DataProvider', () => {
  const urn10272382 = 'urn:rts:video:10272382';
  const urn8414077 = 'urn:rts:video:8414077';
  const urnNotFound = 'urn:not:found';
  const dataproviderService = new DataProvider();

  it('should override the default hostName parameter', async () => {
    const dataproviderServiceOverrideHostName = new DataProvider(
      'rts.ch'
    );

    expect(dataproviderServiceOverrideHostName.baseUrl.includes('rts.ch')).toBe(
      true
    );
  });

  /**
   *****************************************************************************
   * getMediaCompositionByUrn **************************************************
   *****************************************************************************
   */
  describe('getMediaCompositionByUrn', () => {
    it('should return a mediaComposition object', async () => {
      const spyObject = jest.spyOn(Object, 'assign');
      const mediaComposition =
        await dataproviderService.getMediaCompositionByUrn(urn10272382);

      expect(mediaComposition).toBeTruthy();
      expect(spyObject).toHaveBeenCalled();
    });

    it('called multiple times should return a mediaComposition object', async () => {
      const { mediaComposition: mediaCompositionUrn10272382 } =
        await dataproviderService.getMediaCompositionByUrn(urn10272382);

      const { mediaComposition: mediaCompositionUrn8414077 } =
        await dataproviderService.getMediaCompositionByUrn(urn8414077);

      expect(mediaCompositionUrn10272382).toBeTruthy();
      expect(mediaCompositionUrn10272382.chapterUrn).toEqual(urn10272382);

      expect(mediaCompositionUrn8414077).toBeTruthy();
      expect(mediaCompositionUrn8414077.chapterUrn).toEqual(urn8414077);
    });

    it('should be an instance of MediaComposition', async () => {
      const { mediaComposition: mediaCompositionUrn10272382 } =
        await dataproviderService.getMediaCompositionByUrn(urn10272382);

      expect(mediaCompositionUrn10272382).toBeInstanceOf(MediaComposition);
    });

    it('should set the param onlyChapters to false', async () => {
      const { mediaComposition: mediaCompositionUrn10272382 } =
        await dataproviderService.getMediaCompositionByUrn(urn10272382, false);

      expect(mediaCompositionUrn10272382.onlyChapters).toBe(false);
    });

    it('should be rejected if URN does not exist', async () => {
      await expect(
        dataproviderService.getMediaCompositionByUrn(urnNotFound)
      ).rejects.not.toBeNull();
    });
  });

  it('should satisfy eslint', async () => {
    expect(fetch(urn10272382)).toBeTruthy();
  });
});
