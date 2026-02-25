const SCALE = {
  WIDTH_240: '240',
  WIDTH_320: '320',
  WIDTH_480: '480',
  WIDTH_960: '960',
  WIDTH_1920: '1920',
};

const FORMAT = {
  JPG: 'jpg',
  WEBP: 'webp',
  PNG: 'png',
};

const IMAGE_SERVICE_URL = 'https://il.srgssr.ch/images/';

/**
 * @class Image
 */
class Image {
  /**
   * Generates the image scaling URL.
   *
   * @property {Object} image is the object representation of an image.
   * @property {String} [image.url] is the image URL.
   * @property {String} [image.width=960] is the width of the image, default value 960.
   * @property {String} [image.format=jpg] is the format of the image, default value jpg.
   * @property {String} [imageServiceUrl] Url of the image service that needs to comply with the specification defined by the IL.
   *
   * @see https://srgssr-ch.atlassian.net/wiki/spaces/SRGPLAY/pages/799082429/Project+-+Image+Service
   *
   * @returns {String|undefined} the image scaling URL.
   */
  static scale(
    { url, width = SCALE.WIDTH_960, format = FORMAT.JPG } = {},
    imageServiceUrl = IMAGE_SERVICE_URL
  ) {
    if (!url) return;

    const scaleUrl = new URL(imageServiceUrl);

    scaleUrl.searchParams.set('imageUrl', url);
    scaleUrl.searchParams.set('format', format);
    scaleUrl.searchParams.set('width', width);

    return decodeURIComponent(scaleUrl.href);
  }

  static get JPG() {
    return FORMAT.JPG;
  }

  static get PNG() {
    return FORMAT.PNG;
  }

  static get WEBP() {
    return FORMAT.WEBP;
  }

  static get WIDTH_240() {
    return SCALE.WIDTH_240;
  }

  static get WIDTH_320() {
    return SCALE.WIDTH_320;
  }

  static get WIDTH_480() {
    return SCALE.WIDTH_480;
  }

  static get WIDTH_960() {
    return SCALE.WIDTH_960;
  }

  static get WIDTH_1920() {
    return SCALE.WIDTH_1920;
  }
}

export default Image;
