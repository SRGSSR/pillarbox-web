export default MediaComposition;
/**
 * @class MediaComposition
 */
declare class MediaComposition {
    /**
     * Find a chapter by its URN.
     *
     * @param {String} urn
     *
     * @returns {Object} chapter
     */
    findChapterByUrn(urn: string): any;
    /**
     * Return a segment from main chapter following segmentUrn in mediaComposition.
     *
     * @returns {Object|undefined} main segment
     */
    findMainSegment(): any | undefined;
    /**
     * Find resource list by URN.
     *
     * @param {String} urn
     * @returns {Array|undefined} of resources
     */
    findResourceListByUrn(urn: string): any[] | undefined;
    /**
     * A list of chapters.
     *
     * @returns {Array} of chapters
     */
    getChapters(): any[];
    /**
     * Filter external text tracks that are already available internally.
     *
     * __Rules:__
     * 1. TTML format is filtered
     *
     * 2. If both are empty that means only internal text tracks will be displayed
     * to the user as they are automatically loaded by the player.
     *
     * 3. If subtitleInformationList is missing from the MediaComposition and subtitleList
     * is available but the media contains internal text tracks that are also available internally.
     * It will result on a duplication client side.
     *
     * 4. If subtitleList and subtitleInformationList a merge between both will be operated,
     * removing the external text tracks already available internally.
     *
     *
     * @returns {Array} external text tracks
     */
    getFilteredExternalSubtitles(): any[];
    /**
     * Block reason for main chapter. This also uses current date for STARTDATE.
     *
     * @see BlockingReason
     *
     * @returns {undefined|String} undefined if main chapter is not blocked
     */
    getMainBlockReason(): undefined | string;
    /**
     * Get the mediaComposition's main chapter.
     *
     * @returns {Object}
     */
    getMainChapter(): any;
    mainChapter: any;
    /**
     * Get the main chapter's image URL decorated with default width and format.
     *
     * @returns {String|undefined} image URL
     */
    getMainChapterImageUrl(): string | undefined;
    /**
     * Get main resources.
     *
     * @returns {Array} array of sources
     */
    getMainResources(): any[];
    /**
     * Get segments of the main chapter ordered by markIn.
     *
     * @returns {Array} of segments
     */
    getMainSegments(): any[];
    mainSegments: any;
    /**
     * Compute a date from which this content is valid. Always return a date object.
     *
     * @returns {Date} date specified in media composition or EPOCH when no date present.
     */
    getMainValidFromDate(): Date;
    /**
     * Get merged analytics data.
     *
     * @returns {Object}
     */
    getMergedAnalyticsData(analyticsData: any): any;
    /**
     * Get merged analytics metadata.
     *
     * @returns {Object}
     */
    getMergedAnalyticsMetadata(analyticsMetadata: any): any;
    /**
     * Get the chapter's resource list
     * @returns {Array} of resources
     */
    getResourceList(): any[];
}
//# sourceMappingURL=MediaComposition.d.ts.map