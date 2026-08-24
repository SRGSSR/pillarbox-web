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
    it('should use the default URL handler when the urlHandler is undefined', async () => {
      const spyOnMediaCompositionUrlHandler = jest.spyOn(dataproviderService, 'mediaCompositionUrlHandler');

      const defaultRequestHandler = dataproviderService.handleRequest();

      await defaultRequestHandler(urn10272382);

      expect(spyOnMediaCompositionUrlHandler).toHaveBeenCalledWith(urn10272382, undefined);
    });

    it('should forward queryParams to the default URL handler when urlHandler is undefined', async () => {
      const spyOnMediaCompositionUrlHandler = jest.spyOn(
        dataproviderService,
        'mediaCompositionUrlHandler'
      );
      const queryParams = { stamina: '420', shield: '69' };
      const defaultRequestHandler = dataproviderService.handleRequest(
        undefined,
        undefined,
        queryParams
      );

      await defaultRequestHandler(urn10272382);

      expect(spyOnMediaCompositionUrlHandler).toHaveBeenCalledWith(
        urn10272382,
        queryParams
      );
    });

    it('should not use the default URL handler if urlHandler is defined', () => {
      const spyOnMediaCompositionUrlHandler = jest.spyOn(dataproviderService, 'mediaCompositionUrlHandler');
      const defaultRequestHandler = dataproviderService.handleRequest((urn) => urn);

      defaultRequestHandler(urn10272382);

      expect(spyOnMediaCompositionUrlHandler).not.toHaveBeenCalled();
    });

    it('should forward queryParams to the custom urlHandler if urlHandler is defined', async () => {
      const customUrlHandler = jest.fn((urn, _queryParams) => urn);
      const queryParams = { stamina: '420', shield: '69' };
      const requestHandler = dataproviderService.handleRequest(
        customUrlHandler,
        undefined,
        queryParams
      );

      await requestHandler(urn10272382);

      expect(customUrlHandler).toHaveBeenCalledWith(urn10272382, queryParams);
    });

    it('should throw an error if the urn does not exist', async () => {
      const requestHandler = dataproviderService.handleRequest();

      await expect(requestHandler(urnNotFound)).rejects.not.toBeNull();
    });

    it('should use headers when provided', async () => {
      const headers = { 'Accept-Language': 'jp' };
      const requestHandler = dataproviderService.handleRequest(
        undefined,
        headers
      );

      await requestHandler(urn10272382);

      expect(fetch).toHaveBeenCalledWith(expect.any(URL), { headers });
    });
  });

  /**
   *****************************************************************************
   * mediaCompositionUrlHandler ************************************************
   *****************************************************************************
   */
  describe('mediaCompositionUrlHandler', () => {
    it('should return the default URL when queryParams is undefined', () => {
      const url = dataproviderService.mediaCompositionUrlHandler(urn10272382);
      const expectedUrl = `https://il.srgssr.ch/integrationlayer/2.1/mediaComposition/byUrn/${urn10272382}?onlyChapters=true&vector=portalplay`;

      expect(url).toBeInstanceOf(URL);
      expect(url.toString()).toBe(expectedUrl);
    });

    it('should append queryParams to the URL', () => {
      const queryParams = { stamina: '420', shield: '69' };
      const url = dataproviderService.mediaCompositionUrlHandler(
        urn10272382,
        queryParams
      );
      const expectedUrl = `https://il.srgssr.ch/integrationlayer/2.1/mediaComposition/byUrn/${urn10272382}?stamina=420&shield=69&onlyChapters=true&vector=portalplay`;

      expect(url).toBeInstanceOf(URL);
      expect(url.toString()).toBe(expectedUrl);
    });

    it('should not allow queryParams to override default parameters', () => {
      const queryParams = { onlyChapters: 'false', vector: 'custom' };
      const url = dataproviderService.mediaCompositionUrlHandler(
        urn10272382,
        queryParams
      );
      const expectedUrl = `https://il.srgssr.ch/integrationlayer/2.1/mediaComposition/byUrn/${urn10272382}?onlyChapters=true&vector=portalplay`;

      expect(url).toBeInstanceOf(URL);
      expect(url.toString()).toBe(expectedUrl);
    });
  });
});
