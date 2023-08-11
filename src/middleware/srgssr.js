import Pillarbox from '../../src/pillarbox.js';
import DataProviderService from '../dataProvider/services/DataProviderService.js';
import Image from '../utils/Image.js';
import Drm from '../utils/Drm.js';

class SrgSsr {
  /**
   * Add the keySystems property to all resources if at least one of them has DRM.
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Array.<Object>}
   */
  static composeKeySystemsResources(resources = []) {
    if (!Drm.hasDrm(resources)) resources;

    return resources.map((resource) => ({
      ...resource,
      ...Drm.buildKeySystems(resource.drmList),
    }));
  }

  /**
   * Add src object to the mediaData.
   *
   * @param {Object} mediaData
   *
   * @returns {Object}
   */
  static composeSrcMediaData({ url, mimeType, ...rest }) {
    const src = {
      src: url,
      type: mimeType,
    };

    return { ...src, ...rest };
  }

  /**
   * Get mediaComposition from an URN.
   *
   * @param {String} urn
   * @param {DataProviderService} dataProvider
   *
   * @returns {MediaComposition}
   *
  */
  static async getMediaComposition(
    urn,
    dataProvider = new DataProviderService()
  ) {
    return dataProvider.getMediaCompositionByUrn(urn);
  }

  /**
   * Get the mediaData most likely to be compatible depending on the browser.
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Object} By default, the first entry is used if none is compatible.
   */
  static getMediaData(resources = []) {
    const type = Pillarbox.browser.IS_ANY_SAFARI ? 'HLS' : 'DASH';

    const resource = resources.find(({ streaming }) => streaming === type);

    return resource || resources[0];
  }

  /**
   * Update player's poster.
   *
   * @param {VideojsPlayer} player
   * @param {MediaComposition} mediaComposition
   * @param {Image} imageService
   */
  static updatePoster(player, mediaComposition, imageService = Image) {
    player.poster(
      imageService.scale({
        url: mediaComposition.getMainChapterImageUrl(),
      })
    );
  }

  /**
   * Update player titleBar with title and description.
   *
   * @param {VideojsPlayer} player
   * @param {MediaComposition} mediaComposition
   */
  static updateTitleBar(player, mediaComposition) {
    player.titleBar.update({
      title: mediaComposition.getMainChapter().vendor,
      description: mediaComposition.getMainChapter().title,
    });
  }

  /**
   * Middleware to resolve SRG SSR URNs into playable media.
   *
   * @param {VideojsPlayer} player
   * @param {DataProviderService} dataProvider
   * @param {Image} imageService
   *
   * @returns {Object}
   */
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
          const mainResources = SrgSsr.composeKeySystemsResources(
            mediaComposition.getMainResources()
          );
          const mediaData = SrgSsr.getMediaData(mainResources);
          const srcMediaObj = SrgSsr.composeSrcMediaData(mediaData);

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
