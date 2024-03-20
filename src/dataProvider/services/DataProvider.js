import MediaComposition from '../model/MediaComposition.js';

/**
 * Represents a data provider for constructing URLs and handling requests.
 * @class
 * @ignore
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
   * @param {Function} urlHandler A function that constructs the URL
   *
   * @returns {Promise<MediaComposition>} A promise with the fetched data
   */
  handleRequest(urlHandler) {
    return async (urn) => {
      const url = typeof urlHandler === 'function' ? urlHandler(urn) : this.mediaCompositionUrlHandler(urn);
      const response = await fetch(url);

      if (!response.ok) {
        throw response;
      }

      const data = await response.json();

      return Object.assign(new MediaComposition(), data);
    };
  }

  /**
   * Gets the media composition URL by URN.
   *
   * @param {string} urn The URN for the media composition
   *
   * @returns {string} The constructed URL
   */
  mediaCompositionUrlHandler(urn) {
    return `https://${this.baseUrl}mediaComposition/byUrn/${urn}?onlyChapters=true&vector=portalplay`;
  }
}

export default DataProvider;
