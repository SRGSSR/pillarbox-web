export default SrgSsr;
/**
 * @class SrgSsr
 */
declare class SrgSsr {
    /**
     * Set a blocking reason according to the block reason returned
     * by mediaData.
     *
     * @param {import('video.js/dist/types/player').default} player
     * @param {String} blockReason
     * @param {Object} srcMediaObj
     *
     * @returns {undefined|Boolean}
     */
    static blockingReason(player: import('video.js/dist/types/player').default, blockReason: string, srcMediaObj: any): undefined | boolean;
    /**
     * Add the Akamai token to all resources
     * if at least one of them has tokenType
     * set to Akamai.
     *
     * @param {Array.<Object>} resources
     *
     * @returns {Promise<Array.<Object>>}
     */
    static composeAkamaiResources(resources?: Array<any>): Promise<Array<any>>;
    /**
     * Add the keySystems property to all resources
     * if at least one of them has DRM.
     *
     * @param {Array.<Object>} resources
     *
     * @returns {Array.<Object>}
     */
    static composeKeySystemsResources(resources?: Array<any>): Array<any>;
    /**
     * Get the main resources from a mediaComposition.
     * May add an Akamai token or key systems if required by the resource.
     *
     * @param {import('../dataProvider/model/MediaComposition.js').default} mediaComposition
     *
     * @returns {Promise<Array.<Object>>}
     */
    static composeMainResources(mediaComposition: import('../dataProvider/model/MediaComposition.js').default): Promise<Array<any>>;
    /**
     * Compose source options with media data.
     * MediaData properties from source options overwrite mediaData from IL.
     *
     * @param {Object} srcOptions - provided by player.src
     * @param {Object} mediaData - provided by mediaComposition
     *
     * @returns {Object}
     */
    static composeSrcMediaData({ mediaData: srcMediaData, disableTrackers }: any, { url, mimeType, keySystems, ...mediaData }: any): any;
    /**
     * SRG SSR data provider singleton.
     *
     * @param {import('video.js/dist/types/player').default} player
     *
     * @returns {DataProvider}
     */
    static dataProvider(player: import('video.js/dist/types/player').default): DataProvider;
    /**
     * Set an error if something goes wrong with the data provider.
     *
     * @param {import('video.js/dist/types/player').default} player
     * @param {Object} error
     *
     * @returns {undefined|true}
     */
    static dataProviderError(player: import('video.js/dist/types/player').default, error: any): undefined | true;
    /**
     * Set player error.
     *
     * @param {import('video.js/dist/types/player').default} player
     * @param {Object} error
     */
    static error(player: import('video.js/dist/types/player').default, { code, message, metadata }: any): void;
    /**
     * Filter out incompatible resources such as `RTMP` and `HDS`.
     *
     * @param {Array.<Object>} resources Resources to filter
     *
     * @returns {Array.<Object>} The filtered resources
     */
    static filterIncompatibleResources(resources?: Array<any>): Array<any>;
    /**
     * Get mediaComposition from an URN.
     *
     * @param {String} urn
     * @param {DataProvider} dataProvider
     *
     * @returns {Promise<{mediaComposition: import('../dataProvider/model/MediaComposition.js').default}>}
     */
    static getMediaComposition(urn: string, dataProvider?: DataProvider): Promise<{
        mediaComposition: import('../dataProvider/model/MediaComposition.js').default;
    }>;
    /**
     * Get the mediaData most likely to be compatible depending on the browser.
     *
     * @param {Array.<Object>} resources
     *
     * @returns {Object} By default, the first entry is used if none is compatible.
     */
    static getMediaData(resources?: Array<any>): any;
    /**
     * SRG SSR analytics singleton.
     *
     * @param {import('video.js/dist/types/player').default} player
     */
    static srgAnalytics(player: import('video.js/dist/types/player').default): void;
    /**
     * Update player's poster.
     *
     * @param {import('video.js/dist/types/player').default} player
     * @param {import('../dataProvider/model/MediaComposition.js').default} mediaComposition
     * @param {Image} imageService
     */
    static updatePoster(player: import('video.js/dist/types/player').default, mediaComposition: import('../dataProvider/model/MediaComposition.js').default, imageService?: Image): void;
    /**
     * Update player titleBar with title and description.
     *
     * @param {import('video.js/dist/types/player').default} player
     * @param {import('../dataProvider/model/MediaComposition.js').default} mediaComposition
     */
    static updateTitleBar(player: import('video.js/dist/types/player').default, mediaComposition: import('../dataProvider/model/MediaComposition.js').default): void;
    /**
     * Middleware to resolve SRG SSR URNs into playable media.
     *
     * @param {import('video.js/dist/types/player').default} player
     * @param {Image} imageService
     *
     * @returns {Object}
     */
    static middleware(player: import('video.js/dist/types/player').default, imageService?: Image): any;
}
import DataProvider from '../dataProvider/services/DataProvider.js';
import Image from '../utils/Image.js';
//# sourceMappingURL=srgssr.d.ts.map