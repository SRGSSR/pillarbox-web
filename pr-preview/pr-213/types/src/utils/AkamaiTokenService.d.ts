export default AkamaiTokenService;
/**
 * @class AkamaiTokenService
 */
declare class AkamaiTokenService {
    /**
     * Get the acl path.
     *
     * @param {URL} streamUrl
     *
     * @returns {String}
     */
    static aclPath(streamUrl: URL): string;
    /**
     * AKAMAI
     *
     * @type {String}
     */
    static get AKAMAI(): string;
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
    static hasToken(resources: Array<any>): boolean;
    /**
     * Check if the token type is AKAMAI.
     *
     * @param {String} tokentype
     *
     * @returns {Boolean}
     */
    static isAkamai(tokentype: string): boolean;
    /**
     * Check if the token type is NONE.
     *
     * @param {String} tokentype
     *
     * @returns {Boolean}
     */
    static isNone(tokentype: string): boolean;
    /**
     * NONE
     *
     * @type {String}
     */
    static get NONE(): string;
    /**
     * Generate the stream URL with the akamai token.
     *
     * @param {String} source
     * @param {String} tokenServerUrl
     *
     * @returns {Promise.<Object>}
     */
    static tokenize(source: string, tokenServerUrl: string): Promise<any>;
    /**
     * Generate a token for each source
     *
     * @param {Array} sources
     * @param {String} tokenServerUrl
     *
     * @returns {Promise.<Array.<Object>>}
     */
    static tokenizeSources(sources: any[], tokenServerUrl?: string): Promise<Array<any>>;
}
//# sourceMappingURL=AkamaiTokenService.d.ts.map