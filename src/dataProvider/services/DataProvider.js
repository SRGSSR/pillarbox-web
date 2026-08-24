/** @import MediaComposition from '../model/MediaComposition.js' */

/**
 * Represents a data provider for constructing URLs and handling requests.
 * @class
 */
class DataProvider {
  /**
   * Creates an instance of DataProvider.
   *
   * @param {string} [hostName='il.srgssr.ch'] The base host name for constructing URLs
   */
  constructor(hostName = 'il.srgssr.ch') {
    this.setIlHost(hostName);
  }

  /**
   * Sets the integration layer host name.
   *
   * @param {string} hostName The host name to set
   */
  setIlHost(hostName) {
    this.baseUrl = `${hostName}/integrationlayer/2.1/`;
  }

  /**
   * Handles requests by constructing URLs and fetching data.
   *
   * This provides unified error handling, regardless of the urlHandler used.
   *
   * @param {function(string, Object): string} urlHandler A function that constructs the URL
   * @param {Object<string, string>|Headers} headers An object containing HTTP headers to be sent with the request
   * @param {Object<string, string>} queryParams The query params to be passed to the request URL
   *
   * @returns {Promise<MediaComposition>} A promise with the fetched data
   */
  handleRequest(urlHandler, headers, queryParams) {
    return async (urn) => {
      const url = typeof urlHandler === 'function' ? urlHandler(urn, queryParams) : this.mediaCompositionUrlHandler(urn, queryParams);
      const response = await fetch(url, {
        headers
      });

      if (!response.ok) {
        throw response;
      }

      /** @type {MediaComposition} */
      const data = await response.json();

      return data;
    };
  }

  /**
   * Gets the media composition URL by URN.
   *
   * @param {string} urn The URN for the media composition
   * @param {Object<string, string>} [queryParams] The query params to be passed to the request URL
   *
   * @returns {URL} The constructed URL
   */
  mediaCompositionUrlHandler(urn, queryParams) {
    const url = new URL(`https://${this.baseUrl}mediaComposition/byUrn/${urn}`);

    if (queryParams) {
      Object
        .entries(queryParams)
        .forEach(([key, value]) => url.searchParams.set(key, value));
    }

    url.searchParams.set('onlyChapters', 'true');
    url.searchParams.set('vector', 'portalplay');

    return url;
  }
}

export default DataProvider;
