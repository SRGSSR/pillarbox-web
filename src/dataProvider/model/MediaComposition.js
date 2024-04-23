/**
 * Represents the composition of media content.
 *
 * @class MediaComposition
 * @property {string} chapterUrn URN (Uniform Resource Name) of the associated chapter.
 * @property {string} segmentUrn URN of the associated segment.
 * @property {Episode} episode Associated episode.
 * @property {Show} show Associated show.
 * @property {Channel} channel Associated channel.
 * @property {Array.<Chapter>} chapterList List of associated chapters.
 * @property {Array.<Topic>} topicList List of associated topics.
 * @property {Object.<String, String>} analyticsData Analytics data associated with the media composition.
 * @property {Object.<String, String>} analyticsMetadata Metadata associated with analytics for the media composition.
 */
class MediaComposition {
  /**
   * Find a chapter by its URN.
   *
   * @param {String} urn
   *
   * @returns {Chapter} chapter
   */
  findChapterByUrn(urn) {
    if (this.chapterList) {
      const [chapter] = this.chapterList.filter(
        (element) => element.urn === urn
      );

      return chapter;
    }

    return undefined;
  }

  /**
   * Return a segment from main chapter following segmentUrn in mediaComposition.
   *
   * @returns {Segment|undefined} main segment
   */
  findMainSegment() {
    if (!this.segmentUrn) {
      return undefined;
    }

    const segmentList = this.getMainSegments();
    const [segment] = segmentList.filter(
      (element) => element.urn === this.segmentUrn
    );

    return segment;
  }

  /**
   * Find resource list by URN.
   *
   * @param {String} urn
   * @returns {Array.<Resource>|undefined} of resources
   */
  findResourceListByUrn(urn) {
    const chapterByUrn = this.findChapterByUrn(urn);

    if (chapterByUrn) {
      return chapterByUrn.resourceList || [];
    }

    return undefined;
  }

  /**
   * A list of chapters.
   *
   * @returns {Array.<Chapter>} of chapters
   */
  getChapters() {
    const AUDIO = 'AUDIO';

    if (this.getMainChapter().mediaType === AUDIO) return [];

    return this.chapterList.filter(({ mediaType }) => mediaType !== AUDIO);
  }

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
   * @returns {Array.<Subtitle>} external text tracks
   */
  getFilteredExternalSubtitles() {
    const { subtitleList } = this.getMainChapter();
    const [{ subtitleInformationList } = {}] = this.getResourceList().filter(
      ({ subtitleInformationList }) => subtitleInformationList
    );
    const onlyHasExternalSubtitles = subtitleList && !subtitleInformationList;

    if (!subtitleList) {
      return [];
    }

    // TTML format is not supported
    const subtitles = subtitleList.filter(
      (subtitle) => subtitle.format !== 'TTML'
    );

    if (onlyHasExternalSubtitles) {
      return subtitles;
    }

    return subtitles.filter((subtitle) => {
      const addSubtitle = !subtitleInformationList.find(
        (subtitleInformation) =>
          subtitleInformation.locale === subtitle.locale &&
          subtitle.type === subtitleInformation.type
      );

      return addSubtitle;
    });
  }

  /**
   * Block reason for main chapter. This also uses current date for STARTDATE.
   *
   * @see BlockReason
   *
   * @returns {string | undefined} undefined if main chapter is not blocked
   */
  getMainBlockReason() {
    const mainChapter = this.getMainChapter();

    if (!mainChapter) {
      return undefined;
    }

    let { blockReason } = mainChapter;

    if (!blockReason && new Date() < this.getMainValidFromDate()) {
      blockReason = 'STARTDATE';
    }

    return blockReason;
  }

  /**
   * Get blocked segments from the main chapter.
   *
   * @returns {Array.<Segment>} of blocked segments
   */
  getMainBlockedSegments() {
    return this.getMainSegments().filter(segment => segment.blockReason);
  }

  /**
   * Get the mediaComposition's main chapter.
   *
   * @returns {Chapter}
   */
  getMainChapter() {
    if (!this.mainChapter) {
      this.mainChapter = this.findChapterByUrn(this.chapterUrn);
    }

    if (!this.mainChapter && this.chapterList && this.chapterList.length > 0) {
      [this.mainChapter] = this.chapterList;
    }

    return this.mainChapter;
  }

  /**
   * Get the main chapter's image URL decorated with default width and format.
   *
   * @returns {String|undefined} image URL
   */
  getMainChapterImageUrl() {
    const mainChapter = this.getMainChapter();

    if (!mainChapter || !mainChapter.imageUrl) {
      return undefined;
    }

    return mainChapter.imageUrl;
  }

  /**
   * Get main resources.
   *
   * @returns {Array.<MainResource>} array of sources.
   */
  // eslint-disable-next-line max-lines-per-function
  getMainResources() {
    const resourceList = this.getResourceList();

    if (!resourceList || !resourceList.length) {
      return undefined;
    }

    return resourceList.map((resource) => ({
      analyticsData: this.getMergedAnalyticsData(resource.analyticsData),
      analyticsMetadata: this.getMergedAnalyticsMetadata(
        resource.analyticsMetadata
      ),
      blockReason: this.getMainChapter().blockReason,
      blockedSegments: this.getMainBlockedSegments(),
      imageUrl: this.getMainChapterImageUrl(),
      chapters: this.getChapters(),
      drmList: resource.drmList,
      dvr: resource.dvr,
      eventData: this.getMainChapter().eventData,
      id: this.getMainChapter().id,
      imageCopyright: this.getMainChapter().imageCopyright,
      intervals: this.getMainTimeIntervals(),
      live: resource.live,
      mediaType: this.getMainChapter().mediaType,
      mimeType: resource.mimeType,
      presentation: resource.presentation,
      quality: resource.quality,
      streaming: resource.streaming,
      streamOffset: resource.streamOffset,
      subtitles: this.getFilteredExternalSubtitles(),
      title: this.getMainChapter().title,
      tokenType: resource.tokenType,
      url: resource.url,
      urn: this.chapterUrn,
      vendor: this.getMainChapter().vendor,
    }));
  }

  /**
   * Get segments of the main chapter ordered by markIn.
   *
   * @returns {Array.<Segment>} of segments
   */
  getMainSegments() {
    const mainChapter = this.getMainChapter();

    if (!this.mainSegments && mainChapter && mainChapter.segmentList) {
      this.mainSegments = mainChapter.segmentList;
    }

    return this.mainSegments || [];
  }

  /**
   * Retrieves an array of time intervals associated with the main chapter.
   *
   * @returns {Array.<TimeInterval>} An array of time intervals.
   */
  getMainTimeIntervals() {
    const {
      timeIntervalList = []
    } = this.getMainChapter() || {};

    return timeIntervalList;
  }

  /**
   * Compute a date from which this content is valid. Always return a date object.
   *
   * @returns {Date} date specified in media composition or EPOCH when no date present.
   */
  getMainValidFromDate() {
    const mainChapter = this.getMainChapter();

    if (!mainChapter) {
      return new Date(0);
    }

    const { validFrom } = mainChapter;

    if (validFrom) {
      return new Date(validFrom);
    }
  }

  /**
   * Get merged analytics data.
   *
   * @param {Object.<string, string>} analyticsData
   * @returns {Object.<string, string>} Merged analytics data.
   */
  getMergedAnalyticsData(analyticsData) {
    return {
      ...this.analyticsData,
      ...this.getMainChapter().analyticsData,
      ...analyticsData,
    };
  }

  /**
   * Get merged analytics metadata.
   *
   * @param {Object.<string, string>} analyticsMetadata
   * @returns {Object.<string, string>} Merged analytics metadata.
   */
  getMergedAnalyticsMetadata(analyticsMetadata) {
    return {
      ...this.analyticsMetadata,
      ...this.getMainChapter().analyticsMetadata,
      ...analyticsMetadata,
    };
  }

  /**
   * Get the chapter's resource list
   * @returns {Array.<Resource>} of resources
   */
  getResourceList() {
    const { resourceList } = this.getMainChapter();

    return resourceList || [];
  }
}

export default MediaComposition;


/**
 * @typedef {import('./typedef').Channel} Channel
 * @typedef {import('./typedef').Chapter} Chapter
 * @typedef {import('./typedef').Episode} Episode
 * @typedef {import('./typedef').Resource} Resource
 * @typedef {import('./typedef').Segment} Segment
 * @typedef {import('./typedef').Show} Show
 * @typedef {import('./typedef').Subtitle} Subtitle
 * @typedef {import('./typedef').TimeInterval} TimeInterval
 * @typedef {import('./typedef').Topic} Topic
 * @typedef {import('./typedef').MainResource} MainResource
 */
