import Pillarbox from '../../src/pillarbox.js';
import DataProvider from '../dataProvider/services/DataProvider.js';
import Image from '../utils/Image.js';
import Drm from '../utils/Drm.js';
import AkamaiTokenService from '../utils/AkamaiTokenService.js';

class SrgSsr {
  /**
   * Add the Akamai token to all resources
   * if at least one of them has tokenType
   * set to Akamai.
   *
   * @param {Array.<Object>} resources
   *
   * @returns {Promise<Array.<Object>>}
   */
  static async composeAkamaiResources(resources = []) {
    if (!AkamaiTokenService.hasToken(resources)) Promise.resolve(resources);

    return AkamaiTokenService.tokenizeSources(resources);
  }

  /**
   * Add the keySystems property to all resources
   * if at least one of them has DRM.
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
   * Compose source options with media data.
   * MediaData properties from source options overwrite mediaData from IL.
   *
   * @param {Object} srcOptions - provided by player.src
   * @param {Object} mediaData - provided by mediaComposition
   *
   * @returns {Object}
   */
  static composeSrcMediaData(
    { mediaData: srcMediaData } = {},
    { url, mimeType, keySystems, ...mediaData }
  ) {
    return {
      src: url,
      type: mimeType,
      keySystems,
      mediaData: Pillarbox.obj.merge(mediaData, srcMediaData),
    };
  }

  /**
   * SRG SSR data provider singleton.
   *
   * @param {VideoJsPlayer} player
   *
   * @returns {DataProvider}
   */
  static dataProvider(player) {
    if (!player.options().srgOptions.dataProvider) {
      const { dataProviderHost } = player.options().srgOptions;
      const dataProvider = new DataProvider(dataProviderHost);

      player.options({
        srgOptions: {
          dataProvider,
        },
      });
    }

    return player.options().srgOptions.dataProvider;
  }

  /**
   * Get mediaComposition from an URN.
   *
   * @param {String} urn
   * @param {DataProvider} dataProvider
   *
   * @returns {MediaComposition}
   */
  static async getMediaComposition(urn, dataProvider = new DataProvider()) {
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
    if (AkamaiTokenService.hasToken(resources)) return resources[0];

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
    if (!player.titleBar) return;

    player.titleBar.update({
      title: mediaComposition.getMainChapter().vendor,
      description: mediaComposition.getMainChapter().title,
    });
  }

  /**
   * Middleware to resolve SRG SSR URNs into playable media.
   *
   * @param {VideojsPlayer} player
   * @param {Image} imageService
   *
   * @returns {Object}
   */
  static middleware(
    player,
    imageService = Image
  ) {
    return {
      setSource: async (srcObj, next) => {
        try {
          const { src: urn, ...srcOptions } = srcObj;
          const { mediaComposition } = await SrgSsr.getMediaComposition(
            urn,
            SrgSsr.dataProvider(player)
          );
          const mainResources = await SrgSsr.composeAkamaiResources(
            SrgSsr.composeKeySystemsResources(
              mediaComposition.getMainResources()
            )
          );
          const mediaData = SrgSsr.getMediaData(mainResources);
          const srcMediaObj = SrgSsr.composeSrcMediaData(srcOptions, mediaData);

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
