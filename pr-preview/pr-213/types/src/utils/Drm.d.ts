export default Drm;
/**
 * @class Drm
 */
declare class Drm {
    /**
     * Build the keySystems object according to the DRM vendor.
     *
     * @param {Array.<Object>} drmList
     *
     * @returns {Object}
     */
    static buildKeySystems(drmList?: Array<any>): any;
    /**
     * Check if some of the resources have DRM.
     */
    static hasDrm(resources: any): any;
    /**
     * Get DRM vendors.
     */
    static get vendors(): {
        WIDEVINE: string;
        FAIRPLAY: string;
        PLAYREADY: string;
    };
}
//# sourceMappingURL=Drm.d.ts.map