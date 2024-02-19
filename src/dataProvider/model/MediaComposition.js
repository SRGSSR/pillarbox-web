/**
 * @class MediaComposition
 */
class MediaComposition {
  /**
   * Find a chapter by its URN.
   *
   * @param {String} urn
   *
   * @returns {Object} chapter
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
   * @returns {Object|undefined} main segment
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
   * @returns {Array|undefined} of resources
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
   * @returns {Array} of chapters
   */
  getChapters() {
    return this.chapterList;
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
   * @returns {Array} external text tracks
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
   * @see BlockingReason
   *
   * @returns {undefined|String} undefined if main chapter is not blocked
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
   * Get the mediaComposition's main chapter.
   *
   * @returns {Object}
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
   * @returns {Array} array of sources
   */
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
      vendor: this.getMainChapter().vendor,
      drmList: resource.drmList,
      dvr: resource.dvr,
      eventData: this.getMainChapter().eventData,
      id: this.getMainChapter().id,
      imageCopyright: this.getMainChapter().imageCopyright,
      live: resource.live,
      mediaType: this.getMainChapter().mediaType,
      mimeType: resource.mimeType,
      presentation: resource.presentation,
      quality: resource.quality,
      streaming: resource.streaming,
      streamOffset: resource.streamOffset,
      subtitles: this.getFilteredExternalSubtitles(),
      tokenType: resource.tokenType,
      url: resource.url,
      urn: this.chapterUrn
    }));
  }

  /**
   * Get segments of the main chapter ordered by markIn.
   *
   * @returns {Array} of segments
   */
  getMainSegments() {
    const mainChapter = this.getMainChapter();

    if (!this.mainSegments && mainChapter && mainChapter.segmentList) {
      this.mainSegments = mainChapter.segmentList;
    }

    return this.mainSegments || [];
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
   * @returns {Object}
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
   * @returns {Object}
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
   * @returns {Array} of resources
   */
  getResourceList() {
    const { resourceList } = this.getMainChapter();

    return resourceList || [];
  }
}

export default MediaComposition;
