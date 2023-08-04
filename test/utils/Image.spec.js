import Image from '../../src/utils/Image.js';
import urn from '../__mocks__/urn:srf:video:c4927fcf-e1a0-0001-7edd-1ef01d441651.json';

describe('Image', () => {
  describe('scale', () => {
    it('should return a url starting with the schema of the IL image service', () => {
      const url = Image.scale();

      expect(url.startsWith('https://il.srgssr.ch/images/?imageUrl=')).toBe(
        true
      );
    });

    it('should apply the default image width and format', () => {
      const imageUrl = new URL(Image.scale());

      expect(imageUrl.searchParams.get('width')).toEqual(Image.WIDTH_960);
      expect(imageUrl.searchParams.get('format')).toEqual(Image.JPG);
    });

    it('should set the image width to 1920', () => {
      const imageUrl = new URL(
        Image.scale({
          width: Image.WIDTH_1920,
        })
      );

      expect(imageUrl.searchParams.get('width')).toEqual(Image.WIDTH_1920);
    });

    it('should set the image format to webp', () => {
      const imageUrl = new URL(
        Image.scale({
          format: Image.WEBP,
        })
      );

      expect(imageUrl.searchParams.get('format')).toEqual(Image.WEBP);
    });

    it('should generate an image URL with a width of 240 and a format of PNG', () => {
      const imageUrl = new URL(
        Image.scale({
          url: urn.chapterList[0].imageUrl,
          width: Image.WIDTH_240,
          format: Image.PNG,
        })
      );

      expect(imageUrl.searchParams.get('imageUrl')).toEqual(
        urn.chapterList[0].imageUrl
      );
      expect(imageUrl.searchParams.get('width')).toEqual(Image.WIDTH_240);
      expect(imageUrl.searchParams.get('format')).toEqual(Image.PNG);
    });

    it('should decode encoded image url', () => {
      const url = 'https://web.com:444/?param=1234';
      const imageUrl = new URL(
        Image.scale({
          url: encodeURIComponent(url),
        })
      );

      expect(imageUrl.searchParams.get('imageUrl')).toEqual(url);
    });
  });

  it('WIDTH_240', () => {
    expect(Image.WIDTH_240).toEqual('240');
  });

  it('WIDTH_320', () => {
    expect(Image.WIDTH_320).toEqual('320');
  });

  it('WIDTH_480', () => {
    expect(Image.WIDTH_480).toEqual('480');
  });

  it('WIDTH_960', () => {
    expect(Image.WIDTH_960).toEqual('960');
  });

  it('WIDTH_1920', () => {
    expect(Image.WIDTH_1920).toEqual('1920');
  });
});
