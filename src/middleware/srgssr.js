import Pillarbox from '../../src/pillarbox.js';
import DataProviderService from '../dataProvider/services/DataProviderService.js';
import Image from '../utils/Image.js';

class SrgSsr {
  static async getMediaComposition(
    urn,
    dataProvider = new DataProviderService()
  ) {
    return dataProvider.getMediaCompositionByUrn(urn);
  }

  static getSource({ url, mimeType }) {
    return {
      src: url,
      type: mimeType,
    };
  }

  static updatePoster(player, mediaComposition, imageService = Image) {
    player.poster(
      imageService.scale({
        url: mediaComposition.getMainChapterImageUrl(),
      })
    );
  }

  static updateTitleBar(player, mediaComposition) {
    player.titleBar.update({
      title: mediaComposition.getMainChapter().vendor,
      description: mediaComposition.getMainChapter().title,
    });
  }

  static middleware(
    player,
    dataProvider = new DataProviderService(
      player.options()?.srgOptions?.dataProviderHost
    ),
    imageService = Image
  ) {
    return {
      setSource: async (srcObj, next) => {
        try {
          const { mediaComposition } = await SrgSsr.getMediaComposition(
            srcObj.src,
            dataProvider
          );
          const [mediaInfo] = mediaComposition.getMainResources();
          const mediaSrc = SrgSsr.getSource(mediaInfo);
          const srcMediaObj = Pillarbox.obj.merge({}, mediaInfo, mediaSrc);

          SrgSsr.updateTitleBar(player, mediaComposition);
          SrgSsr.updatePoster(player, mediaComposition, imageService);

          return next(null, srcMediaObj);
        } catch (error) {
          return next(error);
        }
      },
    };
  }
}

Pillarbox.use('srgssr/urn', SrgSsr.middleware);

export default SrgSsr;
