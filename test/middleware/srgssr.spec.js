import SrgSsr from '../../src/middleware/srgssr.js';
import DataProvider from '../../src/dataProvider/services/DataProvider.js';
import Image from '../../src/utils/Image.js';
import MediaComposition from '../../src/dataProvider/model/MediaComposition.js';
import urnCredits from '../__mocks__/urn:rts:video:10313496-credits.json';
import urnRtsAudio from '../__mocks__/urn:rts:audio:3262320.json';
import urnGeoblockAndUndefinedResourceList from '../__mocks__/urn:geoblock:and:undefined:resourcelist.json';
import srcMediaObj from '../__mocks__/srcMediaObj.json';
import mainResource from '../__mocks__/mainResource.json';
import Pillarbox from '../../src/pillarbox.js';
import AkamaiTokenService from '../../src/utils/AkamaiTokenService.js';

jest.mock('../../src/dataProvider/services/DataProvider.js');
jest.mock('../../src/utils/Image.js');
jest.mock('../../src/pillarbox.js');

window.MediaError = jest.fn().mockRejectedValue({ MEDIA_ERR_ABORTED: 1 });

describe('SrgSsr', () => {
  let player;

  beforeAll(() => {
    Pillarbox.obj.merge.mockImplementation((...params) => {
      // does not handle video.js deep merge
      return Object.assign(...params);
    });

    DataProvider.mockImplementation(() => {
      return {
        handleRequest: (fn) => {
          return (urn) => {
            if (fn) fn(urn);
            if (!urn) throw new Error('Error');

            return Promise.resolve(Object.assign(new MediaComposition(), urnCredits));
          };
        },
      };
    });
    AkamaiTokenService.tokenize = jest.fn((source) => Promise.resolve(source));

    Image.scale = jest.fn(({ url }) => `https://mock-scale.ch/${url}`);

    player = {
      addRemoteTextTrack: jest.fn(),
      currentTime: jest.fn(),
      debug: jest.fn(),
      error: jest.fn(),
      localize: jest.fn(),
      on: jest.fn(),
      one: jest.fn(),
      options: jest.fn().mockReturnValue({ srgOptions: {}, trackers: {}}),
      poster: (url) => url,
      src: jest.fn(),
      tech: jest.fn(),
      textTracks: jest.fn().mockReturnValue({ getTrackById: jest.fn(), removeTrack: jest.fn(), addTrack: jest.fn(), on: jest.fn() }),
      titleBar: {
        update: ({ title, description }) => ({ title, description }),
      },
      trigger: jest.fn(),
    };
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   *****************************************************************************
   * addBlockedSegments ********************************************************
   *****************************************************************************
   */
  describe('addBlockedSegments', () => {
    it('should create track when blocked segments is missing or empty', async () => {
      const spyOnAddTrack = jest.spyOn(player.textTracks(), 'addTrack');

      await SrgSsr.addBlockedSegments(player, []);

      expect(spyOnAddTrack).toHaveBeenCalledWith(
        expect.any(Pillarbox.TextTrack)
      );
    });

    it('should not call addTextTrackCue if the segments parameter is not an array or if the array is empty', async () => {
      const spyOnAddTextTrackCue = jest.spyOn(SrgSsr, 'addTextTrackCue');

      await SrgSsr.addBlockedSegments(player, true);
      await SrgSsr.addBlockedSegments(player, null);
      await SrgSsr.addBlockedSegments(player, '');
      await SrgSsr.addBlockedSegments(player, undefined);

      expect(spyOnAddTextTrackCue).not.toHaveBeenCalled();
    });

    it('should remove blocked segments track if any', async () => {
      const spyOnRemoveTrack = jest.spyOn(player.textTracks(), 'removeTrack');

      player.textTracks().getTrackById.mockReturnValueOnce({});
      SrgSsr.addBlockedSegments(player);

      expect(spyOnRemoveTrack).toHaveBeenCalled();
    });

    it('Should not add blocked segments if none exist', async () => {
      jest.useFakeTimers();

      const result = [];

      Pillarbox.TextTrack
        .prototype
        .addCue
        .mockImplementation((cue) => result.push(cue));

      SrgSsr.addBlockedSegments(player, [{}, {}]);

      jest.advanceTimersByTime(100);

      expect(await result).toHaveLength(0);
    });

    it('Should add 2 blocked segments', async () => {
      const result = [];

      Pillarbox.TextTrack
        .prototype
        .addCue
        .mockImplementation((cue) => result.push(cue));

      await SrgSsr.addBlockedSegments(player, [{
        blockReason: 'GEOBLOCK',
        markIn: 10_0000,
        markOut: 25_0000
      }, {
        markIn: 25_0000,
        markOut: 50_0000
      }, {

        blockReason: 'ENDDATE',
        markIn: 50_0000,
        markOut: 60_0000
      }, {
        markIn: 60_0000,
        markOut: 70_0000
      }]);

      expect(result).toHaveLength(2);
    });
  });

  /**
   *****************************************************************************
   * addChapters ***************************************************************
   *****************************************************************************
   */
  describe('addChapters', () => {
    it('should create track when chapters is missing or empty', async () => {
      const spyOnAddTrack = jest.spyOn(player.textTracks(), 'addTrack');
      const chapterUrn = 'urn:full:length';

      await SrgSsr.addChapters(player, chapterUrn, []);

      expect(spyOnAddTrack).toHaveBeenCalledWith(
        expect.any(Pillarbox.TextTrack)
      );
    });

    it('should not call addTextTrackCue if the chapters parameter is not an array or if the array is empty', async () => {
      const spyOnAddTextTrackCue = jest.spyOn(SrgSsr, 'addTextTrackCue');

      await SrgSsr.addChapters(player, true);
      await SrgSsr.addChapters(player, null);
      await SrgSsr.addChapters(player, '');
      await SrgSsr.addChapters(player, undefined);

      expect(spyOnAddTextTrackCue).not.toHaveBeenCalled();
    });

    it('should remove chapters track if any', async () => {
      const spyOnRemoveTrack = jest.spyOn(player.textTracks(), 'removeTrack');

      player.textTracks().getTrackById.mockReturnValueOnce({});
      SrgSsr.addChapters(player);

      expect(spyOnRemoveTrack).toHaveBeenCalled();
    });

    it('should not add the chapter if the only available chapter is the main chapter', async () => {
      jest.useFakeTimers();

      const chapterUrn = 'urn:full:length';
      const result = [];

      Pillarbox.TextTrack
        .prototype
        .addCue
        .mockImplementation((cue) => result.push(cue));

      SrgSsr.addChapters(player, chapterUrn, [{
        fullLengthMarkIn: 0,
        fullLengthMarkOut: 10000
      }]);

      jest.advanceTimersByTime(100);

      expect(await result).toHaveLength(0);
    });

    it('should add all chapters that are not the main chapter', async () => {
      const chapterUrn = 'urn:full:length';
      const result = [];

      Pillarbox.TextTrack
        .prototype
        .addCue
        .mockImplementation((cue) => result.push(cue));

      await SrgSsr.addChapters(player, chapterUrn, [{
        fullLengthMarkIn: 0,
        fullLengthMarkOut: 10000
      }, {
        fullLengthUrn: chapterUrn,
        fullLengthMarkIn: 2500,
        fullLengthMarkOut: 5000
      }, {
        fullLengthUrn: chapterUrn,
        fullLengthMarkIn: 6000,
        fullLengthMarkOut: 9500
      }]);

      expect(result).toHaveLength(2);
      expect(result[0].startTime).toBe(2.5);
      expect(result[0].endTime).toBe(5);
      expect(result[1].startTime).toBe(6);
      expect(result[1].endTime).toBe(9.5);
    });
  });

  /**
   *****************************************************************************
   * addIntervals **************************************************************
   *****************************************************************************
   */
  describe('addIntervals', () => {
    it('should create track when intervals is missing or empty', async () => {
      const spyOnAddTrack = jest.spyOn(player.textTracks(), 'addTrack');

      await SrgSsr.addIntervals(player, []);

      expect(spyOnAddTrack).toHaveBeenCalledWith(
        expect.any(Pillarbox.TextTrack)
      );
    });

    it('should not call addTextTrackCue if the intervals parameter is not an array or if the array is empty', async () => {
      const spyOnAddTextTrackCue = jest.spyOn(SrgSsr, 'addTextTrackCue');

      await SrgSsr.addIntervals(player, true);
      await SrgSsr.addIntervals(player, null);
      await SrgSsr.addIntervals(player, '');
      await SrgSsr.addIntervals(player, undefined);

      expect(spyOnAddTextTrackCue).not.toHaveBeenCalled();
    });

    it('should remove intervals track if any', async () => {
      const spyOnRemoveTrack = jest.spyOn(player.textTracks(), 'removeTrack');

      player.textTracks().getTrackById.mockReturnValueOnce({});
      SrgSsr.addIntervals(player);

      expect(spyOnRemoveTrack).toHaveBeenCalled();
    });

    it('should add intervals to the player', async () => {
      const result = [];

      Pillarbox.TextTrack
        .prototype
        .addCue
        .mockImplementation((cue) => result.push(cue));

      await SrgSsr.addIntervals(player, [{
        markIn: 1_000,
        markOut: 2_000,
        type: 'OPENING_CREDITS'
      }, {
        markIn: 10_000,
        markOut: 15_000,
        type: 'CLOSING_CREDITS'
      }]);

      expect(result).toHaveLength(2);
      expect(JSON.parse(result[0].text).type).toBe('OPENING_CREDITS');
      expect(JSON.parse(result[1].text).type).toBe('CLOSING_CREDITS');
    });
  });

  /**
   *****************************************************************************
   * addRemoteTextTracks *******************************************************
   *****************************************************************************
   */
  describe('addRemoteTextTracks', () => {
    it('should not call addRemoteTextTracks if subtitles variable is not an array or if the array is empty', async () => {
      const spyOnAddRemoteTextTracks = jest.spyOn(player, 'addRemoteTextTrack');

      SrgSsr.addRemoteTextTracks(player, true);
      SrgSsr.addRemoteTextTracks(player, null);
      SrgSsr.addRemoteTextTracks(player, '');
      SrgSsr.addRemoteTextTracks(player, undefined);

      expect(spyOnAddRemoteTextTracks).not.toHaveBeenCalled();
    });

    it('should add a captions-type text track', async () => {
      const spyOnAddRemoteTextTracks = jest.spyOn(player, 'addRemoteTextTrack');

      SrgSsr.addRemoteTextTracks(player, [{
        type: 'SDH',
        language: 'English',
        locale: 'EN',
        url: 'https://url.com/en.vtt'
      }]);

      expect(spyOnAddRemoteTextTracks).toHaveBeenCalledWith({
        kind: 'captions',
        label: 'English',
        language: 'EN',
        src: 'https://url.com/en.vtt'
      });
    });

    it('should add a subtitles text track if the type is different from SDH', async () => {
      const spyOnAddRemoteTextTracks = jest.spyOn(player, 'addRemoteTextTrack');

      SrgSsr.addRemoteTextTracks(player, [{
        type: 'something-else',
        language: 'English',
        locale: 'EN',
        url: 'https://url.com/en.vtt'
      }]);

      expect(spyOnAddRemoteTextTracks).toHaveBeenCalledWith({
        kind: 'subtitles',
        label: 'English',
        language: 'EN',
        src: 'https://url.com/en.vtt'
      });
    });
  });

  /**
   *****************************************************************************
   * blockingReason ************************************************************
   *****************************************************************************
   */
  describe('blockingReason', () => {
    it('should return undefined if the block reason is undefined', async () => {
      const spyOnLocalize = jest.spyOn(player, 'localize');

      expect(SrgSsr.blockingReason(player, { mediaData: {}})).toBeUndefined();
      expect(spyOnLocalize).not.toHaveBeenCalled();
    });

    it('should return true and generate an error', async () => {
      const spyOnLocalize = jest.spyOn(player, 'localize');
      const spyOnPlayerError = jest.spyOn(player, 'error');
      const spyOnError = jest.spyOn(SrgSsr, 'error');

      expect(SrgSsr.blockingReason(player, { mediaData: { blockReason: 'STARTDATE' }})).toBe(true);
      expect(spyOnLocalize).toHaveBeenCalled();
      expect(spyOnError).toHaveBeenCalledWith(player, expect.any(Object));
      expect(spyOnPlayerError.mock.calls[1]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ metadata: { errorType: 'STARTDATE', src: expect.any(Object) }})
        ])
      );
    });
  });

  /**
   *****************************************************************************
   * composeAkamaiResources ****************************************************
   *****************************************************************************
   */
  describe('composeAkamaiResources', () => {
    it('should return an empty array if the resources are not defined or if the array is empty', async () => {
      expect(await SrgSsr.composeAkamaiResources()).toHaveLength(0);
      expect(await SrgSsr.composeAkamaiResources([])).toHaveLength(0);
    });

    it('should not tokenize a resource', () => {
      const spyOnTokenizeSources = jest.spyOn(AkamaiTokenService, 'tokenizeSources');
      const resources = [
        {
          streaming: 'HLS',
          tokenType: 'NONE',
        }
      ];

      SrgSsr.composeAkamaiResources(resources);

      expect(spyOnTokenizeSources).not.toHaveBeenCalled();
    });

    it('should return an array of resources', async () => {
      const resources = [
        {
          streaming: 'HLS',
          tokenType: 'AKAMAI',
        }
      ];

      expect(await SrgSsr.composeAkamaiResources(resources)).toHaveLength(1);
    });
  });

  /**
   *****************************************************************************
   * composeKeySystemsResources ************************************************
   *****************************************************************************
   */
  describe('composeKeySystemsResources', () => {
    it('should return an empty array if the resources are not defined or if the array is empty', () => {
      expect(SrgSsr.composeKeySystemsResources()).toHaveLength(0);
      expect(SrgSsr.composeKeySystemsResources([])).toHaveLength(0);
    });

    it('should not add the keySystems property if no resource has DRM', () => {
      const resources = [
        {
          src: 'https://fake-url.com/resource.m3u8',
          type: 'application/x-mpegURL',
        }, {
          src: 'https://fake-url.com/resource.mpd',
          type: 'application/dash+xml',
        }
      ];
      const resourcesNoKeySystems =
        SrgSsr.composeKeySystemsResources(resources);

      expect(resourcesNoKeySystems).toEqual(resources);
    });

    it('should add the keySystems property if at least one resource has DRM', () => {
      const resources = [
        {
          streaming: 'DASH',
          drmList: [{ type: 'WIDEVINE', licenseUrl: 'https://license.url' }],
        },
        {
          streaming: 'DASH',
        },
        {
          streaming: 'HLS',
          drmList: [
            {
              type: 'FAIRPLAY',
              licenseUrl: 'https://license.url',
              certificateUrl: 'https://certificate.url',
            }
          ],
        },
        {
          streaming: 'HLS',
        }
      ];

      const expectedResources = [
        {
          streaming: 'DASH',
          drmList: [{ type: 'WIDEVINE', licenseUrl: 'https://license.url' }],
          keySystems: { 'com.widevine.alpha': 'https://license.url' },
        },
        {
          streaming: 'DASH',
          keySystems: {},
        },
        {
          streaming: 'HLS',
          drmList: [
            {
              type: 'FAIRPLAY',
              licenseUrl: 'https://license.url',
              certificateUrl: 'https://certificate.url',
            }
          ],
          keySystems: {
            'com.apple.fps.1_0': {
              certificateUri: 'https://certificate.url',
              licenseUri: 'https://license.url',
            },
          },
        },
        {
          streaming: 'HLS',
          keySystems: {},
        }
      ];

      const resourcesWithKeySystems =
        SrgSsr.composeKeySystemsResources(resources);

      expect(resourcesWithKeySystems).toMatchObject(expectedResources);
    });
  });

  /**
   *****************************************************************************
   * composeSrcMediaData *******************************************************
   *****************************************************************************
   */
  describe('composeSrcMediaData', () => {
    it('should return a source object', async () => {
      expect(SrgSsr.composeSrcMediaData({}, mainResource)).toMatchObject({
        src: mainResource.url,
        type: mainResource.mimeType,
        keySystems: undefined,
        disableTrackers: undefined,
        mediaData: expect.any(Object),
      });
    });

    it('should override the resource URL', async () => {
      const url = 'https://fake-url.com/resource.m3u8';

      expect(SrgSsr.composeSrcMediaData({
        mediaData: {
          url
        }
      }, mainResource)).toMatchObject({
        src: url,
        type: mainResource.mimeType,
        keySystems: undefined,
        disableTrackers: undefined,
        mediaData: expect.any(Object),
      });
    });
  });

  /**
   *****************************************************************************
   * cuechangeEventProxy *******************************************************
   *****************************************************************************
   */
  describe('cuechangeEventProxy', () => {
    it('should add an event listener to the addtrack event', async () => {
      SrgSsr.cuechangeEventProxy(player);

      player.addRemoteTextTrack({
        type: 'SDH',
        language: 'English',
        locale: 'EN',
        url: 'https://url.com/en.vtt'
      });

      expect(player.textTracks().on).toHaveBeenCalledWith('addtrack', expect.any(Function));
    });

    it('should not add a cuechange listener if the track does not match the condition', () => {
      SrgSsr.cuechangeEventProxy(player);

      const metadataCue = {
        startTime: 10,
        endTime: 20,
        text: 'metadata 1',
      };
      const metadataTrack = {
        id: 'metadata',
        activeCues: [metadataCue],
        on: jest.fn(),
      };
      const addTrackCallback = player.textTracks().on.mock.calls[0][1];

      addTrackCallback({ track: metadataTrack });

      expect(metadataTrack.on).not.toHaveBeenCalled();
    });

    it('should trigger a srgssr/chapter event when cue changes', () => {
      SrgSsr.cuechangeEventProxy(player);

      const chapterCue = {
        startTime: 10,
        endTime: 20,
        text: 'chapter 1',
      };
      const chaptersTrack = {
        id: 'srgssr-chapters',
        activeCues: [chapterCue],
        on: jest.fn(),
      };
      const addTrack = player.textTracks().on.mock.calls[0][1];

      addTrack({ track: chaptersTrack });

      const cueChange = chaptersTrack.on.mock.calls[0][1];

      cueChange();

      expect(player.trigger).toHaveBeenCalledWith({
        type: 'srgssr/chapter',
        data: chapterCue,
      });
    });

    it('should trigger a srgssr-intervals event when cue changes', () => {
      SrgSsr.cuechangeEventProxy(player);

      const intervalCue = {
        startTime: 10,
        endTime: 20,
        text: 'interval 1',
      };
      const intervalsTrack = {
        id: 'srgssr-intervals',
        activeCues: [intervalCue],
        on: jest.fn(),
      };
      const addTrack = player.textTracks().on.mock.calls[0][1];

      addTrack({ track: intervalsTrack });

      const cueChange = intervalsTrack.on.mock.calls[0][1];

      cueChange();

      expect(player.trigger).toHaveBeenCalledWith({
        type: 'srgssr/interval',
        data: intervalCue,
      });
    });
  });

  /**
   *****************************************************************************
   * dataProvider **************************************************************
   *****************************************************************************
   */
  describe('dataProvider', () => {
    it('should return the dataProvider if the property is not undefined', () => {
      player.options().srgOptions = {
        dataProvider: Function
      };

      const dataProvider = SrgSsr.dataProvider(player);

      expect(dataProvider).toBe(Function);

      player.options().srgOptions = {};
    });

    it('should instantiate the dataProvider if it is undefined', () => {
      SrgSsr.dataProvider(player);

      expect(DataProvider).toHaveBeenCalledTimes(1);
    });
  });

  /**
   *****************************************************************************
   * dataProviderError *********************************************************
   *****************************************************************************
   */
  describe('dataProviderError', () => {
    it('should not generate an error if the error parameter is undefined', async () => {
      const spyOnError = jest.spyOn(SrgSsr, 'error');

      expect(SrgSsr.dataProviderError(player, undefined)).toBeUndefined();
      expect(spyOnError).not.toHaveBeenCalled();
    });

    it('should generate an error', async () => {
      const spyOnError = jest.spyOn(SrgSsr, 'error');

      expect(
        SrgSsr.dataProviderError(player, {
          url: 'http://mock.url.ch',
          status: 404,
          statusText: 'Not Found',
        })
      ).toBe(true);
      expect(spyOnError).toHaveBeenCalledWith(player, expect.any(Object));
    });
  });

  /**
   *****************************************************************************
   * getBlockedSegment *********************************************************
   *****************************************************************************
   */
  describe('getBlockedSegment', () => {
    it('should return undefined if not blocked segments track is found', () => {
      player.textTracks().getTrackById.mockReturnValueOnce(undefined);

      expect(SrgSsr.getBlockedSegment(player)).toBeUndefined();
    });

    it('should return undefined if activeCues is an empty array', () => {
      player.textTracks().getTrackById.mockReturnValueOnce({
        activeCues: []
      });

      expect(SrgSsr.getBlockedSegment(player)).toBeUndefined();
    });

    it('should return a blocked segment', () => {
      const blockedSegmentCue = {
        startTime: 10,
        endTime: 20
      };

      player.textTracks().getTrackById.mockReturnValueOnce({
        activeCues: [blockedSegmentCue]
      });

      expect(SrgSsr.getBlockedSegment(player)).toEqual(blockedSegmentCue);
    });
  });

  /**
   *****************************************************************************
   * getBlockedSegmentEndTime **************************************************
   *****************************************************************************
   */
  describe('getBlockedSegmentEndTime', () => {
    it('should return undefined if there is no blocked segment', () => {
      const currentTime = 10;

      expect(SrgSsr.getBlockedSegmentByTime(player, currentTime)).toBeUndefined();
    });

    it('should return undefined if the current time is smaller than the start time of a blocked segment', () => {
      const currentTime = 9;
      const blockedSegmentCue = {
        startTime: 10,
        endTime: 20
      };

      player.textTracks().getTrackById.mockReturnValueOnce({
        activeCues: [blockedSegmentCue]
      });

      expect(SrgSsr.getBlockedSegmentByTime(player, currentTime)).toBeUndefined();
    });

    it('should return undefined if the current time is greater than the end time of a blocked segment', () => {
      const currentTime = 21;
      const blockedSegmentCue = {
        startTime: 10,
        endTime: 20
      };

      player.textTracks().getTrackById.mockReturnValueOnce({
        activeCues: [blockedSegmentCue]
      });

      expect(SrgSsr.getBlockedSegmentByTime(player, currentTime)).toBeUndefined();
    });

    it('should return the blocked segment end time if the current time lies between the start and end of a blocked segment', () => {
      const currentTime = 13;
      const blockedSegmentCue = {
        startTime: 10,
        endTime: 20
      };

      player.textTracks().getTrackById.mockReturnValueOnce({
        activeCues: [blockedSegmentCue]
      });

      expect(SrgSsr.getBlockedSegmentByTime(player, currentTime).endTime).toBe(blockedSegmentCue.endTime);
    });
  });

  /**
   *****************************************************************************
   * getMediaComposition *******************************************************
   *****************************************************************************
   */
  describe('getMediaComposition', () => {
    it('should use the default request handler', async () => {
      const mediaComposition = await SrgSsr.getMediaComposition('urn:fake');

      expect(mediaComposition).toBeInstanceOf(MediaComposition);
    });

    it('should call the request handler', async () => {
      const mockDataProvider = new DataProvider();
      const spyOnHandleRequest = jest.spyOn(
        mockDataProvider,
        'handleRequest'
      ).mockReturnValueOnce(jest.fn(urn => urn));

      await SrgSsr.getMediaComposition(
        'urn:fake',
        spyOnHandleRequest
      );

      expect(spyOnHandleRequest).toHaveBeenCalledWith('urn:fake');
    });
  });

  /**
   *****************************************************************************
   * getMediaData **************************************************************
   *****************************************************************************
   */
  describe('getMediaData', () => {
    it('should return the first resource when there is a tokenType', () => {
      const resources = [
        { streaming: 'HLS', tokenType: 'AKAMAI', isFirst: true },
        { streaming: 'HLS', tokenType: 'AKAMAI', isFirst: false }
      ];
      const resource = SrgSsr.getMediaData(resources);

      expect(resource).toMatchObject({
        streaming: 'HLS',
        tokenType: 'AKAMAI',
        isFirst: true,
      });
    });

    it('should return an HLS resource if available for any Safari browser', () => {
      const mockIsAnySafari = jest.replaceProperty(Pillarbox, 'browser', {
        IS_ANY_SAFARI: true,
      });
      const resources = [{ streaming: 'DASH' }, { streaming: 'HLS' }];
      const resource = SrgSsr.getMediaData(resources);

      expect(resource).toMatchObject({ streaming: 'HLS' });
      mockIsAnySafari.restore();
    });

    it('should return a DASH resource if available for any browser other than Safari', () => {
      const resources = [{ streaming: 'HLS' }, { streaming: 'DASH' }];
      const resource = SrgSsr.getMediaData(resources);

      expect(resource).toMatchObject({ streaming: 'DASH' });
    });

    it('should default to the first available resource if no better resource is available', () => {
      const resources = [
        { streaming: 'HLS', isFirst: true },
        { streaming: 'HLS', isFirst: false }
      ];
      const resource = SrgSsr.getMediaData(resources);

      expect(resource).toMatchObject({ streaming: 'HLS', isFirst: true });
    });

    it('should return undefined if the resources are not defined or if the array is empty', () => {
      expect(SrgSsr.getMediaData([])).toBeUndefined();
      expect(SrgSsr.getMediaData()).toBeUndefined();
    });
  });

  /**
   *****************************************************************************
   * getSrcMediaObj ************************************************************
   *****************************************************************************
   */
  describe('getSrcMediaObj', () => {
    it('should return a value', async () => {
      const result = await SrgSsr.getSrcMediaObj(player, { src: 'urn:fake' });

      expect(result).toEqual(expect.any(Object));
    });

    it('should return an empty src and a mediaData containing a blocking reason and a poster when the mediaComposition does not contain a resourceList', async () => {
      jest.spyOn(SrgSsr, 'getMediaComposition')
        .mockResolvedValueOnce(
          Object.assign(
            new MediaComposition(),
            urnGeoblockAndUndefinedResourceList
          )
        );
      const result = await SrgSsr.getSrcMediaObj(
        player,
        { src: 'urn:geoblock:and:undefined:resourcelist' }
      );

      expect(result).toEqual({
        src: undefined,
        type: undefined,
        keySystems: undefined,
        disableTrackers: undefined,
        mediaData: {
          blockReason: 'GEOBLOCK',
          imageUrl: 'https://img.rts.ch/medias/2023/image/y2zvzo-26927888.image/16x9'
        }
      });
    });
  });
  /**
   *****************************************************************************
   * error *************************************************************
   *****************************************************************************
   */

  describe('error', () => {
    it('should generate an error', async () => {
      const spyOnPlayerError = jest.spyOn(player, 'error');
      const error = {
        code: 1,
        message: 'error message',
        metadata: { errorType: 'error metadata' },
      };

      SrgSsr.error(player, error);

      expect(spyOnPlayerError).toHaveBeenNthCalledWith(1, null);
      expect(spyOnPlayerError).toHaveBeenNthCalledWith(2, error);
    });
  });

  /**
   *****************************************************************************
   * filterIncompatibleResources ***********************************************
   *****************************************************************************
   */

  describe('filterIncompatibleResources', () => {
    it('should filter incompatible resources', async () => {
      const resources = urnRtsAudio.chapterList[0].resourceList;
      const filteredResources = SrgSsr.filterIncompatibleResources(resources);

      expect(filteredResources).toHaveLength(2);
    });

    it('should return an empty array if no source is compatible', async () => {
      const incompatibleResources = [
        { streaming: 'HDS' },
        { streaming: 'RTMP' }
      ];
      const filteredResources = SrgSsr.filterIncompatibleResources(
        incompatibleResources
      );

      expect(filteredResources).toHaveLength(0);
    });

    it('should return an empty array the resource is undefined', async () => {
      expect(SrgSsr.filterIncompatibleResources()).toHaveLength(0);
    });
  });

  /**
   *****************************************************************************
   * srgAnalytics **************************************************************
   *****************************************************************************
   */
  describe('srgAnalytics', () => {
    it('should not initialize the srgAnalytics', () => {
      player.options().trackers.srgAnalytics = false;

      const spyOnOptions = jest.spyOn(player, 'options');

      SrgSsr.srgAnalytics(player);

      expect(player.options().trackers.srgAnalytics).toBe(false);
      expect(spyOnOptions).not.toHaveBeenLastCalledWith(expect.objectContaining({ trackers: { srgAnalytics: expect.any(Object) }}));
    });

    it('should initialize the srgAnalytics', () => {
      player.options().trackers.srgAnalytics = undefined;

      const spyOnOptions = jest.spyOn(player, 'options');

      SrgSsr.srgAnalytics(player);

      expect(spyOnOptions).toHaveBeenLastCalledWith(expect.objectContaining({ trackers: { srgAnalytics: expect.any(Object) }}));
    });

    it('should not reinitialize the srgAnalytics', () => {
      player.options().trackers.srgAnalytics = {};

      const spyOnOptions = jest.spyOn(player, 'options');

      SrgSsr.srgAnalytics(player);

      expect(spyOnOptions).not.toHaveBeenLastCalledWith(expect.objectContaining({ trackers: { srgAnalytics: expect.any(Object) }}));
    });
  });

  /**
   *****************************************************************************
   * pillarboxMonitoring *******************************************************
   *****************************************************************************
   */
  describe('pillarboxMonitoring', () => {
    it('should not initialize the pillarboxMonitoring', () => {
      player.options().trackers.pillarboxMonitoring = false;

      const spyOnOptions = jest.spyOn(player, 'options');

      SrgSsr.pillarboxMonitoring(player);

      expect(player.options().trackers.pillarboxMonitoring).toBe(false);
      expect(spyOnOptions).not.toHaveBeenLastCalledWith(expect.objectContaining({ trackers: { pillarboxMonitoring: expect.any(Object) }}));
    });

    it('should initialize the pillarboxMonitoring', () => {
      player.options().trackers.pillarboxMonitoring = undefined;

      const spyOnOptions = jest.spyOn(player, 'options');

      SrgSsr.pillarboxMonitoring(player);

      expect(spyOnOptions).toHaveBeenNthCalledWith(4, expect.objectContaining({ trackers: { pillarboxMonitoring: expect.any(Object) }}));
    });

    it('should not reinitialize the pillarboxMonitoring', () => {
      player.options().trackers.pillarboxMonitoring = {};

      const spyOnOptions = jest.spyOn(player, 'options');

      SrgSsr.pillarboxMonitoring(player);

      expect(spyOnOptions).not.toHaveBeenLastCalledWith(expect.objectContaining({ trackers: { pillarboxMonitoring: expect.any(Object) }}));
    });
  });

  /**
   *****************************************************************************
   * updatePoster **************************************************************
   *****************************************************************************
   */
  describe('updatePoster', () => {
    it('should use the default Image class', async () => {
      const imageUrl = 'https://image.to.scale.ch/chapter.jpg';
      const imageUrlResult = `https://mock-scale.ch/${imageUrl}`;

      const spyOnScale = jest.spyOn(Image, 'scale');
      const spyOnPoster = jest.spyOn(player, 'poster');

      SrgSsr.updatePoster(player, {
        mediaData: {
          imageUrl: imageUrl
        }
      });

      // Image
      expect(spyOnScale).toHaveBeenCalledWith({ url: imageUrl });
      expect(spyOnScale.mock.results[0].value).toBe(imageUrlResult);

      // Poster
      expect(spyOnPoster).toHaveBeenCalledWith(imageUrlResult);
      expect(spyOnPoster.mock.results[0].value).toBe(imageUrlResult);
    });

    it('should update the player\'s poster', async () => {
      const imageUrl = 'https://image.to.scale.ch/chapter.jpg';
      const imageUrlResult = `https://mock-scale.ch/${imageUrl}`;

      const spyOnScale = jest.spyOn(Image, 'scale');
      const spyOnPoster = jest.spyOn(player, 'poster');

      SrgSsr.updatePoster(player, {
        mediaData: {
          imageUrl: imageUrl
        }
      }, Image);

      // Image
      expect(spyOnScale).toHaveBeenCalledWith({ url: imageUrl });
      expect(spyOnScale.mock.results[0].value).toBe(imageUrlResult);

      // Poster
      expect(spyOnPoster).toHaveBeenCalledWith(imageUrlResult);
      expect(spyOnPoster.mock.results[0].value).toBe(imageUrlResult);
    });
  });

  /**
   *****************************************************************************
   * updateTitleBar ************************************************************
   *****************************************************************************
   */
  describe('updateTitleBar', () => {
    it('should do nothing if titleBar is undefined', async () => {
      const srcObj = {
        mediaData: {
          vendor: 'BU',
          title: 'Media Title'
        }
      };
      const cacheTitleBar = player.titleBar;

      delete player.titleBar;

      SrgSsr.updateTitleBar(player, srcObj);

      expect(player).not.toHaveProperty('titleBar');

      player.titleBar = cacheTitleBar;
    });

    it('should update the player\'s title bar', async () => {
      const srcObj = {
        mediaData: {
          vendor: 'BU',
          title: 'Media Title'
        }
      };
      const result = {
        title: srcObj.mediaData.vendor,
        description: srcObj.mediaData.title
      };
      const spyOnUpate = jest.spyOn(player.titleBar, 'update');

      SrgSsr.updateTitleBar(player, srcObj);

      expect(spyOnUpate).toHaveBeenCalledWith(result);
      expect(spyOnUpate.mock.results[0].value).toMatchObject(result);
    });
  });

  /**
   *****************************************************************************
   * middleware ****************************************************************
   *****************************************************************************
   */
  describe('middleware', () => {
    describe('currentTime', () => {
      it('should return the same value if there is no blocked segment', () => {
        const middleware = SrgSsr.middleware(player);
        const currentTime = 10;

        expect(middleware.currentTime(currentTime)).toBe(currentTime);
      });

      it('should return the blocked segment end time with a 0.1 second tolerance', () => {
        const spyOnPlayerCurrentTime = jest.spyOn(player, 'currentTime');
        const spyOnPlayerTrigger = jest.spyOn(player, 'trigger');
        const middleware = SrgSsr.middleware(player);
        const currentTime = 13;
        const blockedSegmentCue = {
          startTime: 10,
          endTime: 20,
          text: JSON.stringify('data')
        };
        const endTimeWithTolerance = blockedSegmentCue.endTime + 0.1;

        player.textTracks().getTrackById.mockReturnValueOnce({
          activeCues: [blockedSegmentCue]
        });

        expect(middleware.currentTime(currentTime)).toBe(endTimeWithTolerance);
        expect(spyOnPlayerCurrentTime).toHaveBeenCalledWith(endTimeWithTolerance);
        expect(spyOnPlayerTrigger).toHaveBeenCalledWith({ 'data': blockedSegmentCue, 'type': 'srgssr/blocked-segment' });
      });
    });

    describe('setCurrentTime', () => {
      it('should return the same value if there is no blocked segment', () => {
        const middleware = SrgSsr.middleware(player);
        const currentTime = 10;

        expect(middleware.setCurrentTime(currentTime)).toBe(currentTime);
      });

      it('should return the blocked segment end time', () => {
        const middleware = SrgSsr.middleware(player);
        const currentTime = 13;
        const blockedSegmentCue = {
          startTime: 10,
          endTime: 20
        };

        player.textTracks().getTrackById.mockReturnValueOnce({
          activeCues: [blockedSegmentCue]
        });

        expect(middleware.setCurrentTime(currentTime)).toBe(blockedSegmentCue.endTime);
      });
    });

    describe('setSource', () => {
      it('Should call handle set source', async () => {
        const spyOnHandleSetSource = jest.spyOn(
          SrgSsr,
          'handleSetSource'
        );

        jest.spyOn(
          SrgSsr,
          'getSrcMediaObj'
        ).mockResolvedValueOnce(srcMediaObj);
        const middleware = SrgSsr.middleware(player);
        const srcObj = { src: 'urn:fake' };
        const next = async (_err, _srcObj) => { };

        await middleware.setSource({ src: 'urn:fake' }, next);

        expect(spyOnHandleSetSource).toHaveBeenCalledWith(player, srcObj, next);
      });

      it('Should call the next middleware without error', async () => {
        jest.spyOn(
          SrgSsr,
          'getSrcMediaObj'
        ).mockResolvedValueOnce(srcMediaObj);

        const middleware = SrgSsr.middleware(player);

        await middleware.setSource({ src: 'urn:fake' }, async (err, srcObj) => {
          expect(err).toBeNull();
          expect(srcObj).toEqual(expect.any(Object));
        });

        expect(middleware).toMatchObject({
          setSource: expect.any(Function),
        });
      });

      it('Should catch and error if the source is not defined', async () => {
        const spyOnComposeAkamaiResources = jest.spyOn(
          SrgSsr,
          'composeAkamaiResources'
        );
        const spyOnComposeKeySystemsResources = jest.spyOn(
          SrgSsr,
          'composeKeySystemsResources'
        );
        const spyOnGetMediaComposition = jest.spyOn(
          SrgSsr,
          'getMediaComposition'
        );
        const spyOnGetMediaData = jest.spyOn(SrgSsr, 'getMediaData');
        const spyOnComposeSrcMediaData = jest.spyOn(
          SrgSsr,
          'composeSrcMediaData'
        );
        const spyOnUpdateTitleBar = jest.spyOn(SrgSsr, 'updateTitleBar');
        const spyOnUpdatePoster = jest.spyOn(SrgSsr, 'updatePoster');
        const middleware = SrgSsr.middleware(player, Image);

        await middleware.setSource(undefined, async (err) => {
          expect(err).toEqual(expect.any(Error));
        });

        expect(middleware).toMatchObject({
          setSource: expect.any(Function),
        });
        expect(spyOnGetMediaComposition).not.toHaveBeenCalled();
        expect(spyOnComposeKeySystemsResources).not.toHaveBeenCalled();
        expect(spyOnComposeAkamaiResources).not.toHaveBeenCalled();
        expect(spyOnGetMediaData).not.toHaveBeenCalled();
        expect(spyOnComposeSrcMediaData).not.toHaveBeenCalled();
        expect(spyOnUpdateTitleBar).not.toHaveBeenCalled();
        expect(spyOnUpdatePoster).not.toHaveBeenCalled();
      });

      it('Should return undefined and generate an error if the media has a block reason', async () => {
        srcMediaObj.mediaData.blockReason = 'STARTDATE';

        jest.spyOn(
          SrgSsr,
          'getSrcMediaObj'
        ).mockResolvedValueOnce(srcMediaObj);

        const spyOnBlockingReason = jest.spyOn(SrgSsr, 'blockingReason');
        const result = await SrgSsr.middleware(player).setSource(
          { src: 'urn:fake' },
          jest.fn().mockResolvedValue(true)
        );

        expect(result).toBeUndefined();
        expect(spyOnBlockingReason).toHaveBeenCalledWith(
          player,
          srcMediaObj
        );
      });

      it('Should return undefined and generate an error the URN doest not exist', async () => {
        const spyOnDataProvider = jest
          .spyOn(SrgSsr, 'dataProvider')
          .mockReturnValue({
            baseUrl: 'http://mock.url.ch',
          });
        const spyOnError = jest.spyOn(SrgSsr, 'error');
        const spyOnDataProviderError = jest.spyOn(SrgSsr, 'dataProviderError');

        jest.spyOn(SrgSsr, 'getMediaComposition').mockRejectedValueOnce({
          status: '404',
          statusText: 'Not Found',
          url: 'http://mock.url.ch',
        });

        const result = await SrgSsr.middleware(player).setSource(
          { src: 'urn:fake' },
          jest.fn().mockResolvedValue(true)
        );

        expect(result).toBeUndefined();
        expect(spyOnDataProviderError.mock.results[0].value).toBe(true);
        expect(spyOnError).toHaveBeenCalledWith(player, expect.any(Object));

        spyOnDataProvider.mockReset();
      });
    });
  });
});
