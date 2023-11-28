import MediaComposition from '../model/MediaComposition.js';

/**
 * @ignore
 */
class DataProvider {
  constructor(hostName = 'il.srgssr.ch') {
    this.setIlHost(hostName);
  }

  setIlHost(hostName) {
    this.baseUrl = `${hostName}/integrationlayer/2.1/`;
  }

  /**
   * Get media composition by URN.
   *
   * @param {String} urn URN of the media composition.
   * @param {Boolean} [onlyChapters=true] Whether to retrieve only chapters or not.
   *
   * @returns {Promise<{mediaComposition: MediaComposition}>} Promise that resolves with the `mediaComposition` object.
   * @throws {Promise<Response>} If the response is not ok.
   */
  async getMediaCompositionByUrn(urn, onlyChapters = true) {
    const url = `https://${this.baseUrl}mediaComposition/byUrn/${urn}?onlyChapters=${onlyChapters}&vector=portalplay`;
    const response = await fetch(url);

    if (!response.ok) {
      throw response;
    }

    const data = await response.json();
    const mediaComposition = Object.assign(new MediaComposition(), data, {
      onlyChapters,
    });

    return {
      mediaComposition,
    };
  }
}

export default DataProvider;
