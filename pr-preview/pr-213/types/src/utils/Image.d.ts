export default Image;
/**
 * @class Image
 */
declare class Image {
    /**
     * Generates the image scaling URL.
     *
     * @property {Object} image is the object representation of an image.
     * @property {String} [image.url] is the image URL.
     * @property {String} [image.width=960] is the width of the image, default value 960.
     * @property {String} [image.format=jpg] is the format of the image, default value jpg.
     * @property {String} [imageServiceUrl] Url of the image service that needs to comply with the specification defined by the IL.
     *
     * @see https://confluence.srg.beecollaboration.com/pages/viewpage.action?spaceKey=SRGPLAY&title=Project+-+Image+Service
     *
     * @returns {String|undefined} the image scaling URL.
     */
    static scale({ url, width, format }?: {
        url: any;
        width?: string;
        format?: string;
    }, imageServiceUrl?: string): string | undefined;
    static get JPG(): string;
    static get PNG(): string;
    static get WEBP(): string;
    static get WIDTH_240(): string;
    static get WIDTH_320(): string;
    static get WIDTH_480(): string;
    static get WIDTH_960(): string;
    static get WIDTH_1920(): string;
}
//# sourceMappingURL=Image.d.ts.map