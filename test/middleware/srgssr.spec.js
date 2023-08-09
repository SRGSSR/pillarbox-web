import SrgSsr from '../../src/middleware/srgssr.js';
import DataProviderService from '../../src/dataProvider/services/DataProviderService.js';
import Image from '../../src/utils/Image.js';
import MediaComposition from '../../src/dataProvider/model/MediaComposition.js';
import urnCredits from '../__mocks__/urn:rts:video:10313496-credits.json';

jest.mock('../../src/dataProvider/services/DataProviderService.js');
jest.mock('../../src/utils/Image.js');

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
  describe('getSource', () => {
    it('should return a source object', async () => {
      const mockDataProvider = new DataProviderService();
      const { mediaComposition } =
        await mockDataProvider.getMediaCompositionByUrn('urn:fake');
      const [mainSource] = mediaComposition.getMainResources();

      expect(SrgSsr.getSource(mainSource)).toMatchObject({
        src: mainSource.url,
        type: mainSource.mimeType,
      });
    });
  });
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
  describe('middleware', () => {
    it('Should use the default DataProvider and Image class', async () => {
      const spyOnGetMediaComposition = jest.spyOn(
        SrgSsr,
        'getMediaComposition'
      );
      const spyOnGetSource = jest.spyOn(SrgSsr, 'getSource');
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
      expect(spyOnGetSource).toHaveBeenCalled();
      expect(spyOnUpdateTitleBar).toHaveBeenCalled();
      expect(spyOnUpdatePoster).toHaveBeenCalled();
    });
    it('Should call the next middleware without error', async () => {
      const spyOnGetMediaComposition = jest.spyOn(
        SrgSsr,
        'getMediaComposition'
      );
      const spyOnGetSource = jest.spyOn(SrgSsr, 'getSource');
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
      expect(spyOnGetSource).toHaveBeenCalled();
      expect(spyOnUpdateTitleBar).toHaveBeenCalled();
      expect(spyOnUpdatePoster).toHaveBeenCalled();
    });

    it('Should catch and error if the source is not defined', async () => {
      const spyOnGetMediaComposition = jest.spyOn(
        SrgSsr,
        'getMediaComposition'
      );
      const spyOnGetSource = jest.spyOn(SrgSsr, 'getSource');
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
      expect(spyOnGetSource).not.toHaveBeenCalled();
      expect(spyOnUpdateTitleBar).not.toHaveBeenCalled();
      expect(spyOnUpdatePoster).not.toHaveBeenCalled();
    });
  });
});
