import MediaComposition from '../../../src/dataProvider/model/MediaComposition.js';

import * as emptyMediaComposition from '../../__mocks__/urn:empty:media:composition.json';
import * as urnAnalyticsData from '../../__mocks__/urn:analytics:data.json';
import * as urnRts1Drm from '../../__mocks__/urn:rts:video:3608506.json';
import * as urnVideo360 from '../../__mocks__/urn:rts:video:8414077.json';
import * as urnChapterBadOrder from '../../__mocks__/urn:rts:video:10272382.json';
import * as urn12h45Segment from '../../__mocks__/urn:rts:video:10764846.json';
import * as urnEmptyChapters from '../../__mocks__/urn:empty:chapters.json';
import * as urnMainChapterNoImageUrl from '../../__mocks__/urn:main:chapter:no:image:url.json';
import * as urnSegmentsWithSameMarkIn from '../../__mocks__/urn:segments:with:same:mark:in.json';
import * as urnOnlyChaptersFalse from '../../__mocks__/urn:rts:video:10342901.json';
import * as urnOnlyOneChapter from '../../__mocks__/urn:only:one:chapter.json';
import * as urnOnlyOneSegment from '../../__mocks__/urn:only:one:segment.json';
import * as urnSubdivisionsMany from '../../__mocks__/urn:subdivisions:many.json';
import * as urnBlockedChapter from '../../__mocks__/urn:blocked:chapter.json';
import * as urnNoSubtitles from '../../__mocks__/urn:rts:video:1967124.json';
import * as urnOneExternalSubtitle from '../../__mocks__/urn:rts:video:10373456.json';
import * as urnOneTTMLSubtitle from '../../__mocks__/urn:rts:video:6735513.json';
import * as urnInternalExternalAndTTMLSubtitles from '../../__mocks__/urn:srf:internal:and:external:subtitles.json';
import * as urnInternalSubtitles from '../../__mocks__/urn:srf:only:internal:subtitles.json';
import * as urnMultipleExternalSubtitles from '../../__mocks__/urn:swi:multiple:external:subtitles.json';
import * as urnMixedInternalExternalSubtitles from '../../__mocks__/urn:mixed:internal:external:subtitles.json';
import * as urnUndefinedResourcelist from '../../__mocks__/urn:undefined:resourcelist.json';

describe('MediaComposition', () => {
  const mediaCompositionUrnAnalyticsData = Object.assign(
    new MediaComposition(),
    urnAnalyticsData
  );
  const mediaCompositionUrnRts1Drm = Object.assign(
    new MediaComposition(),
    urnRts1Drm
  );

  const mediaCompositionUrnVideo360 = Object.assign(
    new MediaComposition(),
    urnVideo360
  );

  const mediaCompositionUrnChapterBadOrder = Object.assign(
    new MediaComposition(),
    urnChapterBadOrder
  );

  const mediaCompositionUrnEmptyChapters = Object.assign(
    new MediaComposition(),
    urnEmptyChapters
  );

  const mediaCompositionUrnMainChapterNoImageUrl = Object.assign(
    new MediaComposition(),
    urnMainChapterNoImageUrl
  );

  const mediaCompositionUrnSegmentsWithSameMarkIn = Object.assign(
    new MediaComposition(),
    urnSegmentsWithSameMarkIn
  );

  const mediaCompositionEmpty = Object.assign(
    new MediaComposition(),
    emptyMediaComposition
  );

  const mediaCompositionUrnOnlyChaptersFalse = Object.assign(
    new MediaComposition(),
    urnOnlyChaptersFalse
  );

  const mediaCompositionUrnOnlyOneChapter = Object.assign(
    new MediaComposition(),
    urnOnlyOneChapter
  );

  const mediaCompositionUrnOnlyOneSegment = Object.assign(
    new MediaComposition(),
    urnOnlyOneSegment
  );

  // eslint-disable-next-line camelcase
  const mediaCompositionUrnSubdivisionsMany_A = Object.assign(
    new MediaComposition(),
    urnSubdivisionsMany
  );

  // eslint-disable-next-line camelcase
  const mediaCompositionUrnSubdivisionsMany_B = Object.assign(
    new MediaComposition(),
    urnSubdivisionsMany
  );

  mediaCompositionUrnSubdivisionsMany_B.chapterUrn = 'B';

  // eslint-disable-next-line camelcase
  const mediaCompositionUrnSubdivisionsMany_C = Object.assign(
    new MediaComposition(),
    urnSubdivisionsMany
  );

  mediaCompositionUrnSubdivisionsMany_C.chapterUrn = 'C';

  const mediaCompositionUrn12h45Segment = Object.assign(
    new MediaComposition(),
    urn12h45Segment
  );

  const mediaCompositionUrnBlockedChapter = Object.assign(
    new MediaComposition(),
    urnBlockedChapter
  );

  const mediaCompositionUrnNoSubtitles = Object.assign(
    new MediaComposition(),
    urnNoSubtitles
  );

  const mediaCompositionUrnOneExternalSubtitle = Object.assign(
    new MediaComposition(),
    urnOneExternalSubtitle
  );

  const mediaCompositionUrnOneTTMLSubtitle = Object.assign(
    new MediaComposition(),
    urnOneTTMLSubtitle
  );

  const mediaCompositionUrnInternalExternalAndTTMLSubtitles = Object.assign(
    new MediaComposition(),
    urnInternalExternalAndTTMLSubtitles
  );

  const mediaCompositionUrnInternalSubtitles = Object.assign(
    new MediaComposition(),
    urnInternalSubtitles
  );

  const mediaCompositionUrnMultipleExternalSubtitles = Object.assign(
    new MediaComposition(),
    urnMultipleExternalSubtitles
  );

  const mediaCompositionUrnMixedInternalExternalSubtitles = Object.assign(
    new MediaComposition(),
    urnMixedInternalExternalSubtitles
  );

  const mediaCompositionUrnUndefinedResourcelist = Object.assign(
    new MediaComposition(),
    urnUndefinedResourcelist
  );

  const DRMLIST = {
    drmList: [
      {
        type: 'PLAYREADY',
        licenseUrl: 'https://license.url.com',
      },
      {
        type: 'WIDEVINE',
        licenseUrl: 'https://license.url.com',
      }
    ],
  };

  it('should match the json object chapterUrn property', () => {
    expect(mediaCompositionUrnRts1Drm.chapterUrn).toBe(urnRts1Drm.chapterUrn);
  });

  /**
   *****************************************************************************
   * findChapterByUrn **********************************************************
   *****************************************************************************
   */
  describe('findChapterByUrn', () => {
    it('should return the correct chapter by its URN', () => {
      expect(
        mediaCompositionUrnChapterBadOrder.findChapterByUrn(
          'urn:rts:video:10272360'
        )
      ).toBeTruthy();

      expect(
        mediaCompositionUrnChapterBadOrder.findChapterByUrn(
          'urn:rts:video:10272360'
        ).urn
      ).toBe('urn:rts:video:10272360');
    });

    it('should return undefined when URN not exist', () => {
      expect(
        mediaCompositionUrnChapterBadOrder.findChapterByUrn(
          'urn:rts:video:wrongId'
        )
      ).toBeUndefined();

      expect(
        mediaCompositionEmpty.findChapterByUrn('urn:rts:video:wrongId')
      ).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * findMainSegment ***********************************************************
   *****************************************************************************
   */
  describe('findMainSegment', () => {
    it('should return the correct main segment', () => {
      expect(mediaCompositionUrn12h45Segment.findMainSegment().urn).toBe(
        'urn:rts:video:10764846'
      );
    });

    it('should return undefined when URN not exist', () => {
      expect(
        mediaCompositionUrnOnlyOneSegment.findMainSegment()
      ).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * findResourceListByUrn *****************************************************
   *****************************************************************************
   */
  describe('findResourceListByUrn', () => {
    it('should return a resource list for an existing URN', () => {
      expect(
        mediaCompositionUrnChapterBadOrder.findResourceListByUrn(
          'urn:rts:video:10272382'
        )
      ).toBeTruthy();
      expect(
        mediaCompositionUrnChapterBadOrder.findResourceListByUrn(
          'urn:rts:video:10272382'
        )
      ).toHaveLength(4);

      expect(
        mediaCompositionUrnChapterBadOrder.findResourceListByUrn(
          'urn:rts:video:10272360'
        )
      ).toBeTruthy();
      expect(
        mediaCompositionUrnChapterBadOrder.findResourceListByUrn(
          'urn:rts:video:10272360'
        )
      ).toHaveLength(4);
    });

    it('should return undefined for an non existing URN', () => {
      expect(
        mediaCompositionUrnChapterBadOrder.findResourceListByUrn('urn:unvalid')
      ).toBeFalsy();
      expect(
        mediaCompositionUrnChapterBadOrder.findResourceListByUrn('urn:unvalid')
      ).toBeUndefined();
    });

    it('should return an empty array when the chapter does have an undefined property resourceList', () => {
      expect(
        mediaCompositionUrnUndefinedResourcelist.findResourceListByUrn(
          'urn:srf:video:6f1a0035-dc8c-4f71-8e79-1bd99f47ea12'
        )
      ).toEqual([]);
    });
  });

  /**
   *****************************************************************************
   * getChapterImageUrl ********************************************************
   *****************************************************************************
   */
  describe('getChapterImageUrl', () => {
    it('should return the main chapter\'s image URL', () => {
      expect(
        mediaCompositionUrnChapterBadOrder.getMainChapterImageUrl()
      ).toBeTruthy();
      expect(
        mediaCompositionUrnChapterBadOrder.getMainChapterImageUrl()
      ).toEqual(
        expect.stringContaining(
          'https://www.rts.ch/2019/03/08/12/59/10272381.image/16x9'
        )
      );
    });

    it('should return undefined when the main chapter doesn\'t contain an image URL', () => {
      expect(
        mediaCompositionUrnMainChapterNoImageUrl.getMainChapterImageUrl()
      ).toBeFalsy();
      expect(
        mediaCompositionUrnMainChapterNoImageUrl.getMainChapterImageUrl()
      ).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * getChapters ***************************************************************
   *****************************************************************************
   */
  describe('getChapters', () => {
    it('should return chapters array', () => {
      // The destructuring creates a new memory reference
      // that isn't updated when getChapters is called
      const [...unsorted] = mediaCompositionUrnChapterBadOrder.chapterList;

      expect(mediaCompositionUrnChapterBadOrder.getChapters()).toBeTruthy();
      expect(mediaCompositionUrnChapterBadOrder.getChapters()).toHaveLength(14);
      expect(mediaCompositionUrnChapterBadOrder.getChapters()).toEqual(
        expect.arrayContaining(unsorted)
      );
    });

    it('should return an empty array', () => {
      expect(mediaCompositionUrnEmptyChapters.getChapters()).toBeTruthy();
      expect(mediaCompositionUrnEmptyChapters.getChapters()).toHaveLength(0);
    });
  });

  /**
   *****************************************************************************
   * getFilteredExternalSubtitles **********************************************
   *****************************************************************************
   */
  describe('getFilteredExternalSubtitles', () => {
    it('should return an empty array when there is neither subtitleList nor subtitleInformationList', () => {
      expect(
        mediaCompositionUrnNoSubtitles.getFilteredExternalSubtitles()
      ).toHaveLength(0);
    });

    it('should return an array with a French VTT subtitle file', () => {
      const subtitles =
        mediaCompositionUrnOneExternalSubtitle.getFilteredExternalSubtitles();
      const [subtitle] = subtitles;

      expect(subtitles).toHaveLength(1);
      expect(subtitle.locale).toEqual('fr');
      expect(subtitle.format).toEqual('VTT');
    });

    it('should return an empty array when subtitleList only contains TTML files', () => {
      const subtitles =
        mediaCompositionUrnOneTTMLSubtitle.getFilteredExternalSubtitles();

      expect(subtitles).toHaveLength(0);
    });

    it('should return an empty array as TTML subtitles are filtered and all external subtitles already exist in internal subtitles', () => {
      const subtitles =
        mediaCompositionUrnInternalExternalAndTTMLSubtitles.getFilteredExternalSubtitles();

      expect(subtitles).toHaveLength(0);
    });

    it('should return an empty array as no external subtitles are provided', () => {
      const subtitles =
        mediaCompositionUrnInternalSubtitles.getFilteredExternalSubtitles();

      expect(subtitles).toHaveLength(0);
    });

    it('should return an array with four different subtitles', () => {
      const subtitles =
        mediaCompositionUrnMultipleExternalSubtitles.getFilteredExternalSubtitles();

      expect(subtitles).toHaveLength(4);

      subtitles.forEach((subtitle, i) => {
        expect(subtitle.locale).toBe(['ar', 'en', 'ja', 'ru'][i]);
        expect(subtitle.format).toBe(['VTT', 'VTT', 'VTT', 'VTT'][i]);
      });
    });

    it('should return an array with two different subtitles when some internal and external subtitles are duplicated', () => {
      const subtitles =
        mediaCompositionUrnMixedInternalExternalSubtitles.getFilteredExternalSubtitles();

      expect(subtitles).toHaveLength(2);

      subtitles.forEach((subtitle, i) => {
        expect(subtitle.locale).toBe(['ru', 'ja'][i]);
        expect(subtitle.format).toBe(['VTT', 'VTT'][i]);
      });
    });
  });

  /**
   *****************************************************************************
   * getMainChapter ************************************************************
   *****************************************************************************
   */
  describe('getMainChapter', () => {
    it('should return the urn\'s main chapter', () => {
      expect(mediaCompositionUrnChapterBadOrder.getMainChapter()).toBeTruthy();
      expect(mediaCompositionUrnChapterBadOrder.getMainChapter().urn).toEqual(
        urnChapterBadOrder.chapterUrn
      );
    });

    it('should return undefined with empty mediacomposition', () => {
      expect(mediaCompositionEmpty.getMainChapter()).toBe(undefined);
    });
  });

  /**
   *****************************************************************************
   * getMainChapterImageUrl ****************************************************
   *****************************************************************************
   */
  describe('getMainChapterImageUrl', () => {
    it('should return a the image url', () => {
      const imageUrl =
        mediaCompositionUrnOnlyOneChapter.getMainChapterImageUrl();

      expect(imageUrl).toBe('http://image.url/image');
    });

    it('should return undefined with empty mediacomposition', () => {
      expect(mediaCompositionEmpty.getMainChapterImageUrl()).toBe(undefined);
    });
  });

  /**
   *****************************************************************************
   * getMainBlockReason ********************************************************
   *****************************************************************************
   */
  describe('getMainBlockReason', () => {
    it('should return a valid block reason when present', () => {
      expect(mediaCompositionUrnBlockedChapter.getMainBlockReason()).toBe(
        'GEOBLOCK'
      );
    });
    it('should return a STARTDATE block reason when the validity start date is set in the future', () => {
      const getMainValidFromDate = jest.spyOn(
        mediaCompositionUrnOnlyOneChapter,
        'getMainValidFromDate'
      );
      const currentDatePlus30Minutes = new Date(Date.now() + 1000 * 60 * 30);

      getMainValidFromDate.mockReturnValue(currentDatePlus30Minutes);

      expect(mediaCompositionUrnOnlyOneChapter.getMainBlockReason()).toBe(
        'STARTDATE'
      );
      expect(getMainValidFromDate).toHaveBeenCalledTimes(1);

      getMainValidFromDate.mockRestore();
    });

    it('should return a valid block reason when not present', () => {
      expect(
        mediaCompositionUrnOnlyOneChapter.getMainBlockReason()
      ).toBeUndefined();
    });

    it('should return undefined with empty mediacomposition', () => {
      expect(mediaCompositionEmpty.getMainBlockReason()).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * getMainValidDate **********************************************************
   *****************************************************************************
   */
  describe('getMainValidFromDate', () => {
    it('should return a validfrom date', () => {
      expect(mediaCompositionUrnOnlyOneChapter.getMainValidFromDate()).toEqual(
        new Date('2019-03-07T19:09:00.000Z')
      );
    });

    it('should return a currently valid date with empty mediaComposition', () => {
      expect(
        mediaCompositionEmpty.getMainValidFromDate().getMilliseconds()
      ).toBeLessThanOrEqual(new Date().getMilliseconds());
    });

    it('should return undefined if the mediaComposition does not contain a validFrom property', () => {
      expect(
        mediaCompositionUrnAnalyticsData.getMainValidFromDate()
      ).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * getMainResources **********************************************************
   *****************************************************************************
   */
  describe('getMainResources', () => {
    it('should return undefined if the mediaComposition does not contain a resourceList', () => {
      expect(
        mediaCompositionUrnUndefinedResourcelist.getMainResources()
      ).toBeUndefined();
    });
    it('should validate the first object format', () => {
      const [resource] = mediaCompositionUrnChapterBadOrder.getMainResources();

      expect(resource).toHaveProperty('analyticsData');
      expect(resource).toHaveProperty('analyticsMetadata');
      expect(resource).toHaveProperty('bu');
      expect(resource).toHaveProperty('dvr');
      expect(resource).toHaveProperty('drmList');
      expect(resource).toHaveProperty('eventData');
      expect(resource).toHaveProperty('id');
      expect(resource).toHaveProperty('imageCopyright');
      expect(resource).toHaveProperty('live');
      expect(resource).toHaveProperty('mediaType');
      expect(resource).toHaveProperty('mimeType');
      expect(resource).toHaveProperty('presentation');
      expect(resource).toHaveProperty('quality');
      expect(resource).toHaveProperty('streaming');
      expect(resource).toHaveProperty('streamOffset');
      expect(resource).toHaveProperty('tokenType');
      expect(resource).toHaveProperty('url');
    });

    it('should return the main resources for an on demand video', () => {
      const resources = mediaCompositionUrnChapterBadOrder.getMainResources();
      const [firstResource] = resources;

      expect(resources).toBeTruthy();
      expect(resources).toHaveLength(4);
      expect(firstResource.presentation).toEqual('DEFAULT');
      expect(firstResource.quality).toEqual('HD');
      expect(firstResource.dvr).toEqual(false);
      expect(firstResource.live).toEqual(false);
    });

    it('should return VIDEO_360 for the presentation property', () => {
      const resources = mediaCompositionUrnVideo360.getMainResources();
      const [firstResource] = resources;

      expect(firstResource.presentation).toEqual('VIDEO_360');
    });
  });

  /**
   *****************************************************************************
   * getMergedAnalyticsData ****************************************************
   *****************************************************************************
   */
  describe('getMergedAnalyticsData', () => {
    it('should contain the show id and the chapter id', () => {
      const mergedAnalyticsData =
        mediaCompositionUrnChapterBadOrder.getMergedAnalyticsData();

      expect(mergedAnalyticsData).toBeTruthy();
      expect(mergedAnalyticsData).toHaveProperty('ns_st_ci', '10272382');
      expect(mergedAnalyticsData).toHaveProperty('srg_plid', '105932');
    });
  });

  /**
   *****************************************************************************
   * getResourceList ***********************************************************
   *****************************************************************************
   */
  describe('getResourceList', () => {
    it('should return the main chapter\'s resource list', () => {
      const resourceList = mediaCompositionUrnChapterBadOrder.getResourceList();

      expect(resourceList).toBeTruthy();
      expect(resourceList).toEqual(expect.any(Array));
      expect(resourceList).toHaveLength(4);
    });

    it('should return an empty array when the chapter does have an undefined property resourceList', () => {
      expect(
        mediaCompositionUrnUndefinedResourcelist.getResourceList(
          'urn:srf:video:6f1a0035-dc8c-4f71-8e79-1bd99f47ea12'
        )
      ).toEqual([]);
    });
  });

  /**
   *****************************************************************************
   * getMainSegments ***********************************************************
   *****************************************************************************
   */
  describe('getMainSegments', () => {
    it('should return all segments the order shouldn\'t change', () => {
      const jsonSegments = urnOnlyChaptersFalse.chapterList[0].segmentList;
      const segments = mediaCompositionUrnOnlyChaptersFalse.getMainSegments();

      expect(segments).toBeTruthy();
      expect(segments).toHaveLength(14);
      expect(segments).toEqual(expect.arrayContaining(jsonSegments));
      expect(mediaCompositionUrnOnlyChaptersFalse.getMainSegments()).toEqual(
        jsonSegments
      );
    });

    it('shouldn\'t flip elements when it\'s not needed', () => {
      const segments =
        mediaCompositionUrnSegmentsWithSameMarkIn.getMainSegments();

      expect(segments[2].urn).toEqual('2');
    });

    it('should return an empty array when segmentList is undefined', () => {
      expect(mediaCompositionUrnChapterBadOrder.getMainSegments()).toBeTruthy();
      expect(mediaCompositionUrnChapterBadOrder.getMainSegments()).toHaveLength(
        0
      );
    });
  });
});
