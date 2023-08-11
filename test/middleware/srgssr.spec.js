import SrgSsr from '../../src/middleware/srgssr.js';
import DataProviderService from '../../src/dataProvider/services/DataProviderService.js';
import Image from '../../src/utils/Image.js';
import MediaComposition from '../../src/dataProvider/model/MediaComposition.js';
import urnCredits from '../__mocks__/urn:rts:video:10313496-credits.json';
import Pillarbox from '../../src/pillarbox.js';

jest.mock('../../src/dataProvider/services/DataProviderService.js');
jest.mock('../../src/utils/Image.js');
jest.mock('../../src/pillarbox.js');

describe('SrgSsr', () => {
  let player;

  beforeAll(() => {
    DataProviderService.mockImplementation(() => {
      return {
        getMediaCompositionByUrn: (urn, _onlyChapters = false) => {
          if (!urn) throw new Error('Error');

          return Promise.resolve({
            mediaComposition: Object.assign(new MediaComposition(), urnCredits),
          });
        },
      };
    });

    Image.scale = jest.fn(({ url }) => `https://mock-scale.ch/${url}`);

    player = {
      options: () => {},
      poster: (url) => url,
      titleBar: {
        update: ({ title, description }) => ({ title, description }),
      },
    };
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
          streaming: 'DASH',
        },
        {
          streaming: 'HLS',
        }
      ];
      const resourcesNoKeySystems = SrgSsr.composeKeySystemsResources(resources);

      expect(resourcesNoKeySystems).toMatchObject(resources);
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

      const resourcesWithKeySystems = SrgSsr.composeKeySystemsResources(resources);

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
      const mockDataProvider = new DataProviderService();
      const { mediaComposition } =
        await mockDataProvider.getMediaCompositionByUrn('urn:fake');
      const [mainSource] = mediaComposition.getMainResources();

      expect(SrgSsr.composeSrcMediaData(mainSource)).toMatchObject({
        src: mainSource.url,
        type: mainSource.mimeType,
      });
    });
  });

  /**
   *****************************************************************************
   * getMediaComposition *******************************************************
   *****************************************************************************
   */
  describe('getMediaComposition', () => {
    it('should use the default DataProvider', async () => {
      const { mediaComposition } = await SrgSsr.getMediaComposition('urn:fake');

      expect(mediaComposition).toBeInstanceOf(MediaComposition);
    });

    it('should return an instance of MediaComposition', async () => {
      const mockDataProvider = new DataProviderService();
      const spyOnGetMediaCompositionByUrn = jest.spyOn(
        mockDataProvider,
        'getMediaCompositionByUrn'
      );

      const { mediaComposition } = await SrgSsr.getMediaComposition(
        'urn:fake',
        mockDataProvider
      );

      expect(spyOnGetMediaCompositionByUrn).toHaveBeenCalledWith('urn:fake');
      expect(mediaComposition).toBeInstanceOf(MediaComposition);
    });
  });

  /**
   *****************************************************************************
   * getMediaData **************************************************************
   *****************************************************************************
   */
  describe('getMediaData', () => {
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
   * updatePoster **************************************************************
   *****************************************************************************
   */
  describe('updatePoster', () => {
    it('should use the default Image class', async () => {
      const mockDataProvider = new DataProviderService();
      const { mediaComposition } =
        await mockDataProvider.getMediaCompositionByUrn('urn:fake');
      const imageUrl = mediaComposition.getMainChapterImageUrl();
      const imageUrlResult = `https://mock-scale.ch/${imageUrl}`;

      const spyOnScale = jest.spyOn(Image, 'scale');
      const spyOnPoster = jest.spyOn(player, 'poster');

      SrgSsr.updatePoster(player, mediaComposition);

      // Image
      expect(spyOnScale).toHaveBeenCalledWith({ url: imageUrl });
      expect(spyOnScale.mock.results[0].value).toBe(imageUrlResult);

      // Poster
      expect(spyOnPoster).toHaveBeenCalledWith(imageUrlResult);
      expect(spyOnPoster.mock.results[0].value).toBe(imageUrlResult);
    });

    it('should update the player\'s poster', async () => {
      const mockDataProvider = new DataProviderService();
      const { mediaComposition } =
        await mockDataProvider.getMediaCompositionByUrn('urn:fake');
      const imageUrl = mediaComposition.getMainChapterImageUrl();
      const imageUrlResult = `https://mock-scale.ch/${imageUrl}`;

      const spyOnScale = jest.spyOn(Image, 'scale');
      const spyOnPoster = jest.spyOn(player, 'poster');

      SrgSsr.updatePoster(player, mediaComposition, Image);

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
    it('should update the player\'s title bar', async () => {
      const mockDataProvider = new DataProviderService();
      const { mediaComposition } =
        await mockDataProvider.getMediaCompositionByUrn('urn:fake');

      const spyOnUpate = jest.spyOn(player.titleBar, 'update');

      SrgSsr.updateTitleBar(player, mediaComposition);

      const result = {
        title: mediaComposition.getMainChapter().vendor,
        description: mediaComposition.getMainChapter().title,
      };

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
    it('Should use the default DataProvider and Image class', async () => {
      const spyOnComposeKeySystemsResources = jest.spyOn(SrgSsr, 'composeKeySystemsResources');
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
      const middleware = SrgSsr.middleware(player);

      await middleware.setSource({ src: 'urn:fake' }, async (err, srcObj) => {
        expect(err).toBeNull();
        expect(srcObj).toEqual(expect.any(Object));
      });

      expect(middleware).toMatchObject({
        setSource: expect.any(Function),
      });
      expect(spyOnGetMediaComposition).toHaveBeenCalled();
      expect(spyOnComposeKeySystemsResources).toHaveBeenCalled();
      expect(spyOnGetMediaData).toHaveBeenCalled();
      expect(spyOnComposeSrcMediaData).toHaveBeenCalled();
      expect(spyOnUpdateTitleBar).toHaveBeenCalled();
      expect(spyOnUpdatePoster).toHaveBeenCalled();
    });

    it('Should call the next middleware without error', async () => {
      const spyOnComposeKeySystemsResources = jest.spyOn(SrgSsr, 'composeKeySystemsResources');
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
      const middleware = SrgSsr.middleware(
        player,
        new DataProviderService(),
        Image
      );

      await middleware.setSource({ src: 'urn:fake' }, async (err, srcObj) => {
        expect(err).toBeNull();
        expect(srcObj).toEqual(expect.any(Object));
      });

      expect(middleware).toMatchObject({
        setSource: expect.any(Function),
      });
      expect(spyOnGetMediaComposition).toHaveBeenCalled();
      expect(spyOnComposeKeySystemsResources).toHaveBeenCalled();
      expect(spyOnGetMediaData).toHaveBeenCalled();
      expect(spyOnComposeSrcMediaData).toHaveBeenCalled();
      expect(spyOnUpdateTitleBar).toHaveBeenCalled();
      expect(spyOnUpdatePoster).toHaveBeenCalled();
    });

    it('Should catch and error if the source is not defined', async () => {
      const spyOnComposeKeySystemsResources = jest.spyOn(SrgSsr, 'composeKeySystemsResources');
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
      const middleware = SrgSsr.middleware(
        player,
        new DataProviderService(),
        Image
      );

      await middleware.setSource(undefined, async (err) => {
        expect(err).toEqual(expect.any(Error));
      });

      expect(middleware).toMatchObject({
        setSource: expect.any(Function),
      });
      expect(spyOnGetMediaComposition).not.toHaveBeenCalled();
      expect(spyOnComposeKeySystemsResources).not.toHaveBeenCalled();
      expect(spyOnGetMediaData).not.toHaveBeenCalled();
      expect(spyOnComposeSrcMediaData).not.toHaveBeenCalled();
      expect(spyOnUpdateTitleBar).not.toHaveBeenCalled();
      expect(spyOnUpdatePoster).not.toHaveBeenCalled();
    });
  });
});
