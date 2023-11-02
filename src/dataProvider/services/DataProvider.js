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
   * @param {String} urn urn:rts:video:9800629
   * @param {Boolean} onlyChapters
   *
   * @returns {Object} media composition json object
   */
  getMediaCompositionByUrn(urn, onlyChapters = false) {
    const url = `https://${this.baseUrl}mediaComposition/byUrn/${urn}?onlyChapters=${onlyChapters}&vector=portalplay`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json().then((data) => {
          const mediaComposition = Object.assign(new MediaComposition(), data, {
            onlyChapters,
          });

          return {
            mediaComposition,
          };
        });
      })
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }
}

export default DataProvider;
