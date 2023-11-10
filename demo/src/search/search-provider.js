const IL_DEFAULT_HOST = 'il.srgssr.ch';
const DEFAULT_QUERY_PARAMS = {
  'includeAggregations': false,
  'includeSuggestions': false,
  'sortBy': 'default',
  'sortDir': 'desc',
  'vector': 'appplay',
  'pageSize': 50
};

/**
 * Class representing a Search Provider for the integration layer.
 *
 * @class
 */
class SearchProvider {
  /**
   * Creates an instance of SearchProvider.
   *
   * @param {string} [hostName='il.srgssr.ch'] - The hostname for the integration layer (without the protocol).
   */
  constructor(hostName = IL_DEFAULT_HOST) {
    this.baseUrl = `${hostName}/integrationlayer/2.0`;
  }

  /**
   * Performs a search for media content based on the provided business unit and query.
   *
   * @param {string} bu - The business unit for which the search is performed (rsi, rtr, rts, srf or swi).
   * @param {string} query - The search query.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the search results.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async search(bu, query) {
    const queryParams = new URLSearchParams({ ...DEFAULT_QUERY_PARAMS, ...{ 'q': query }}).toString();
    const url = `https://${this.baseUrl}/${bu}/searchResultMediaList?${queryParams}`;

    return fetch(url).then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json().then((data) => data.searchResultMediaList.map(
        ({ title, urn }) => ({ title, urn })
      ));
    }).catch((reason) => {
      return Promise.reject(reason);
    });
  }
}

export default new SearchProvider();
