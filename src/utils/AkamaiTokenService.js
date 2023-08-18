const TOKEN_TYPES = {
  AKAMAI: 'AKAMAI',
  NONE: 'NONE',
};

class AkamaiTokenService {
  /**
   * Get the acl path.
   *
   * @param {URL} streamUrl
   *
   * @returns {String}
   */
  static aclPath(streamUrl) {
    const path = streamUrl.pathname;

    return `${path.substring(0, path.lastIndexOf('/') + 1)}*`;
  }

  /**
   * AKAMAI
   *
   * @type {String}
   */
  static get AKAMAI() {
    return TOKEN_TYPES.AKAMAI;
  }

  /**
   * Check if the resources are protected by an Akamai token.
   * Keep in mind, as we are using the some function,
   * if the resources have at least one resource
   * protected by a token it returns true!
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Boolean}
   */
  static hasToken(resources) {
    return resources.some((resource) =>
      AkamaiTokenService.isAkamai(resource.tokenType));
  }

  /**
   * Check if the token type is AKAMAI.
   *
   * @param {String} tokentype
   *
   * @returns {Boolean}
   */
  static isAkamai(tokentype) {
    return TOKEN_TYPES.AKAMAI === tokentype;
  }

  /**
   * Check if the token type is NONE.
   *
   * @param {String} tokentype
   *
   * @returns {Boolean}
   */
  static isNone(tokentype) {
    return TOKEN_TYPES.NONE === tokentype;
  }

  /**
   * NONE
   *
   * @type {String}
   */
  static get NONE() {
    return TOKEN_TYPES.NONE;
  }

  /**
   * Generate the stream URL with the akamai token.
   *
   * @param {String} source
   * @param {String} tokenServerUrl
   *
   * @returns {Promise.<Object>}
   */
  static tokenize(source, tokenServerUrl) {
    const streamUrlToTokenize = new URL(`${source.url}`);
    const acl = AkamaiTokenService.aclPath(streamUrlToTokenize);
    const url = `${tokenServerUrl}${encodeURIComponent(acl)}`;

    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
        });
      })
      .then(({ token: { authparams }}) => {
        const akamaiAuthParams = new URLSearchParams(authparams);

        akamaiAuthParams.forEach((v, k) =>
          streamUrlToTokenize.searchParams.set(k, v));

        return Object.assign({}, source, {
          url: streamUrlToTokenize.toString(),
        });
      })
      .catch((reason) => {
        return Promise.reject(reason);
      });
  }

  /**
   * Generate a token for each source
   *
   * @param {Array} sources
   * @param {String} tokenServerUrl
   *
   * @returns {Promise.<Array.<Object>>}
   */
  static tokenizeSources(
    sources,
    tokenServerUrl = 'https://tp.srgssr.ch/akahd/token?acl='
  ) {
    const tokenizedSources = [];

    sources.forEach((source) => {
      const tokenizedSource = AkamaiTokenService.tokenize(
        source,
        tokenServerUrl
      );

      tokenizedSources.push(tokenizedSource);
    });

    return Promise.all(tokenizedSources)
      .then((values) => values)
      .catch((reason) => Promise.reject(reason));
  }
}

export default AkamaiTokenService;
