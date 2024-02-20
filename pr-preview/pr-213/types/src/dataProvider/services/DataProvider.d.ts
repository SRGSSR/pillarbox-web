export default DataProvider;
/**
 * @ignore
 */
declare class DataProvider {
    constructor(hostName?: string);
    setIlHost(hostName: any): void;
    baseUrl: string;
    /**
     * Get media composition by URN.
     *
     * @param {String} urn URN of the media composition.
     * @param {Boolean} [onlyChapters=true] Whether to retrieve only chapters or not.
     *
     * @returns {Promise<{mediaComposition: MediaComposition}>} Promise that resolves with the `mediaComposition` object.
     * @throws {Promise<Response>} If the response is not ok.
     */
    getMediaCompositionByUrn(urn: string, onlyChapters?: boolean): Promise<{
        mediaComposition: MediaComposition;
    }>;
}
import MediaComposition from '../model/MediaComposition.js';
//# sourceMappingURL=DataProvider.d.ts.map