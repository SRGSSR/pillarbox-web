import '../../__mocks__/fetch.js';

import DataProvider from '../../../src/dataProvider/services/DataProvider.js';

describe('DataProvider', () => {
  const urn10272382 = 'urn:rts:video:10272382';
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
    it('should use the default URL handler when the urlHandler is undefined', () => {
      const spyOnMediaCompositionUrlHandler = jest.spyOn(dataproviderService, 'mediaCompositionUrlHandler');

      const defaultRequestHandler = dataproviderService.handleRequest();

      defaultRequestHandler(urn10272382);

      expect(spyOnMediaCompositionUrlHandler).toHaveBeenCalledWith(urn10272382);
    });

    it('should not use the default URL handler if urlHandler is defined', () => {
      const spyOnMediaCompositionUrlHandler = jest.spyOn(dataproviderService, 'mediaCompositionUrlHandler');
      const defaultRequestHandler = dataproviderService.handleRequest((urn)=> urn);

      defaultRequestHandler(urn10272382);

      expect(spyOnMediaCompositionUrlHandler).not.toHaveBeenCalled();
    });

    it('should throw an error if the urn does not exist', async () => {
      const requestHandler = dataproviderService.handleRequest();

      await expect(requestHandler(urnNotFound)).rejects.not.toBeNull();
    });
  });
});
