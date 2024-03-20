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
   * handleRequest *************************************************************
   *****************************************************************************
   */
  describe('handleRequest', () => {
    it('should return a mediaComposition object', async () => {
      const spyObject = jest.spyOn(Object, 'assign');
      const mediaComposition =
        await dataproviderService.handleRequest()(urn10272382);

      expect(mediaComposition).toBeTruthy();
      expect(spyObject).toHaveBeenCalled();
    });

    it('called multiple times should return a mediaComposition object', async () => {
      const mediaCompositionUrn10272382  =
        await dataproviderService.handleRequest()(urn10272382);

      const mediaCompositionUrn8414077  =
        await dataproviderService.handleRequest()(urn8414077);

      expect(mediaCompositionUrn10272382).toBeTruthy();
      expect(mediaCompositionUrn10272382.chapterUrn).toEqual(urn10272382);

      expect(mediaCompositionUrn8414077).toBeTruthy();
      expect(mediaCompositionUrn8414077.chapterUrn).toEqual(urn8414077);
    });

    it('should be an instance of MediaComposition', async () => {
      const  mediaCompositionUrn10272382  =
        await dataproviderService.handleRequest()(urn10272382);

      expect(mediaCompositionUrn10272382).toBeInstanceOf(MediaComposition);
    });

    it('should use a custom URL handler', async () => {
      const customUrlHandler = (urn)=> urn;
      const  mediaCompositionUrn10272382  =
        await dataproviderService.handleRequest(customUrlHandler)(urn10272382);

      expect(mediaCompositionUrn10272382).toBeInstanceOf(MediaComposition);
    });

    it('should be rejected if URN does not exist', async () => {
      await expect(
        dataproviderService.handleRequest()(urnNotFound)
      ).rejects.not.toBeNull();
    });
  });

  it('should satisfy eslint', async () => {
    expect(fetch(urn10272382)).toBeTruthy();
  });
});
