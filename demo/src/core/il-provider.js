const IL_DEFAULT_HOST = 'il.srgssr.ch';
const DEFAULT_QUERY_PARAMS = {
  'vector': 'srgplay'
};
const DEFAULT_SEARCH_PARAMS = {
  'includeAggregations': false,
  'includeSuggestions': false,
  'sortBy': 'default',
  'sortDir': 'desc',
  'pageSize': 50,
  ...DEFAULT_QUERY_PARAMS
};
const DEFAULT_SHOWLIST_PARAMS = {
  'onlyActiveShows': true,
  ...DEFAULT_QUERY_PARAMS
};

/**
 * Class representing a provider for the integration layer.
 *
 * @class
 */
class ILProvider {
  /**
   * Creates an instance of ILProvider.
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
   * @param {AbortSignal} [signal=undefined] - (Optional) An abort signal, allows to abort the query through an abort controller.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the search results.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async search(bu, query, signal = undefined) {
    const data = await this.fetch(
      `/${bu.toLowerCase()}/searchResultMediaList`,
      { ...DEFAULT_SEARCH_PARAMS, 'q': query },
      signal
    );

    return data.searchResultMediaList
      .map(({ title, urn, mediaType, date, duration }) => ({
        title, urn, mediaType, date, duration
      }));
  }

  /**
   * Retrieves a list of topics for the specified business unit and transmission type.
   *
   * @param {string} bu - The business unit for which to retrieve topics (rsi, rtr, rts, srf, or swi).
   * @param {string} [transmission='tv'] - The transmission type ('tv' or 'radio').
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the topics.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async topics(bu, transmission = 'tv') {
    const data = await this.fetch(`/${bu.toLowerCase()}/topicList/${transmission}`);

    return data.topicList.map(
      ({ title, urn }) => ({ title, urn })
    );
  }

  /**
   * Retrieves the latest media content for a specific topic.
   *
   * @param {string} topicUrn - The URN (Unique Resource Name) of the topic.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the latest media content related to the topic.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async latestByTopic(topicUrn) {
    const data = await this.fetch(`/mediaList/latest/byTopicUrn/${topicUrn}`);

    return data.mediaList.map(({ title, urn, mediaType, date, duration }) => ({
      title, urn, mediaType, date, duration
    }));
  }

  /**
   * Retrieves a list of shows for the specified business unit, transmission type, and ordering.
   *
   * @param {string} bu - The business unit for which to retrieve shows (rsi, rtr, rts, srf, or swi).
   * @param {string} [pageSize='unlimited'] - The maximum number of shows to retrieve. Use 'unlimited' for all shows.
   * @param {string} [transmission='tv'] - The transmission type ('tv' or 'radio').
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the shows.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async shows(bu, pageSize = 'unlimited', transmission = 'tv') {
    const data = await this.fetch(
      `/${bu.toLowerCase()}/showList/${transmission}/alphabetical`,
      { ...DEFAULT_SHOWLIST_PARAMS, 'pageSize': pageSize }
    );

    return data.showList.map(
      ({ title, urn }) => ({ title, urn })
    );
  }

  /**
   * Retrieves the latest media content for a specific show.
   *
   * @param {string} showUrn - The URN (Unique Resource Name) of the show.
   * @param {number} [pageSize=30] - The maximum number of episodes to retrieve.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the latest media content related to the show.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async latestByShow(showUrn, pageSize = 30) {
    const data = await this.fetch(
      `/episodeComposition/latestByShow/byUrn/${showUrn}`,
      { ...DEFAULT_QUERY_PARAMS, 'pageSize': pageSize }
    );

    return data.episodeList
      .map(({ mediaList }) => mediaList[0])
      .map(({ title, urn, mediaType, date, duration }) => ({
        title, urn, mediaType, date, duration
      }));
  }

  /**
   * Retrieves editorial media content for the specified business unit.
   *
   * @param {string} bu - The business unit for which to retrieve editorial media (rsi, rtr, rts, srf, or swi).
   * @param {number} [pageSize=30] - The maximum number of editorial media items to retrieve.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the editorial media content.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async editorial(bu, pageSize = 30) {
    const data = await this.fetch(
      `/${bu.toLowerCase()}/mediaList/video/editorial`,
      { ...DEFAULT_QUERY_PARAMS, 'pageSize': pageSize }
    );

    return data.mediaList.map(({ title, urn, mediaType, date, duration }) => ({
      title, urn, mediaType, date, duration
    }));
  }

  /**
   * Retrieves livestream media content for the specified business unit and media type.
   *
   * @param {string} bu - The business unit for which to retrieve livestreams (rsi, rtr, rts, srf, or swi).
   * @param {string} [mediaType='video'] - The media type ('video' or 'audio').
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the livestream media content.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async livestreams(bu, mediaType = 'video') {
    const data = await this.fetch(`/${bu.toLowerCase()}/mediaList/${mediaType}/livestreams`);

    return data.mediaList.map(({ title, urn, mediaType, date, duration }) => ({
      title, urn, mediaType, date, duration
    }));
  }

  /**
   * Retrieves scheduled livestream media content for the specified business unit.
   *
   * @param {string} bu - The business unit for which to retrieve scheduled livestreams (rsi, rtr, rts, srf, or swi).
   * @param {number} [pageSize=10] - The maximum number of scheduled livestreams to retrieve.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the scheduled livestream media content.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async scheduledLivestream(bu, pageSize = 10) {
    const data = await this.fetch(
      `/${bu.toLowerCase()}/mediaList/video/scheduledLivestreams`,
      { ...DEFAULT_QUERY_PARAMS, 'pageSize': pageSize }
    );

    return data.mediaList.map(({ title, urn, mediaType, date, duration }) => ({
      title, urn, mediaType, date, duration
    }));
  }

  /**
   * Retrieves media content for the livecenter for the specified business unit.
   *
   * @param {string} bu - The business unit for which to retrieve livecenter media (rsi, rtr, rts, srf, or swi).
   * @param {number} [pageSize=10] - The maximum number of livecenter media items to retrieve.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the livecenter media content.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async livecenter(bu, pageSize = 10) {
    const data = await this.fetch(
      `/${bu.toLowerCase()}/mediaList/video/scheduledLivestreams/livecenter`,
      { ...DEFAULT_QUERY_PARAMS, 'pageSize': pageSize }
    );

    return data.mediaList.map(({ title, urn, mediaType, date, duration }) => ({
      title, urn, mediaType, date, duration
    }));
  }

  /**
   * Retrieves a list of channels for the specified business unit and transmission type.
   *
   * @param {string} bu - The business unit for which to retrieve channels (rsi, rtr, rts, srf, or swi).
   * @param {string} [transmission='radio'] - The transmission type ('tv' or 'radio').
   *
   * @returns {Promise<Array<{ title: string, id: string }>>} - A promise that resolves to an array
   * of objects containing the title and ID of the channels.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async channels(bu, transmission = 'radio') {
    const data = await this.fetch(`/${bu.toLowerCase()}/channelList/${transmission}`);

    return data.channelList.map(
      ({ title, id }) => ({ title, id })
    );
  }

  /**
   * Retrieves radio shows for the specified business unit and channel.
   *
   * @param {string} bu - The business unit for which to retrieve radio shows (rsi, rtr, rts, srf, or swi).
   * @param {string} channelId - The ID of the channel.
   * @param {string} [pageSize='unlimited'] - The maximum number of radio shows to retrieve. Use 'unlimited' for all shows.
   *
   * @returns {Promise<Array<{ title: string, urn: string }>>} - A promise that resolves to an array
   * of objects containing the title and URN of the radio shows.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if the fetch request fails.
   */
  async radioShowByChannel(bu, channelId, pageSize = 'unlimited') {
    const data = await this.fetch(
      `/${bu.toLowerCase()}/showList/radio/alphabeticalByChannel/${channelId}`,
      { ...DEFAULT_QUERY_PARAMS, 'pageSize': pageSize }
    );

    return data.showList.map(
      ({ title, urn }) => ({ title, urn })
    );
  }

  async fetch(path, params = DEFAULT_QUERY_PARAMS, signal = undefined) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `https://${this.baseUrl}/${path.replace(/^\/+/, '')}?${queryParams}`;

    return fetch(url, { signal }).then(response => {
      if (!response.ok) {
        return Promise.reject(response);
      }

      return response.json();
    }).catch((reason) => {
      return Promise.reject(reason);
    });
  }
}

export default new ILProvider();
