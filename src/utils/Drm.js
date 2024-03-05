const DRM_VENDORS = {
  WIDEVINE: 'com.widevine.alpha',
  FAIRPLAY: 'com.apple.fps.1_0',
  PLAYREADY: 'com.microsoft.playready',
};

/**
 * @class Drm
 */
class Drm {
  /**
   * Build the keySystems object according to the DRM vendor.
   *
   * @param {Array.<import('../dataProvider/model/typedef').DrmMetadata>} drmList The DRM list from the media composition.
   *
   * @returns {import('./typedef').KeySystems} The resulting keySystems.
   */
  static buildKeySystems(drmList = []) {
    const keySystems = {};

    drmList.forEach((drmVendor) => {
      const type = Drm.vendors[drmVendor.type];

      if (Drm.vendors.FAIRPLAY === type) {
        const { certificateUrl: certificateUri, licenseUrl: licenseUri } =
          drmVendor;

        keySystems[type] = {
          certificateUri,
          licenseUri,
        };
      } else {
        keySystems[type] = drmVendor.licenseUrl;
      }
    });

    return {
      keySystems,
    };
  }

  /**
   * Check if some of the resources have DRM.
   *
   * @param {Array.<import('../dataProvider/model/typedef').MainResource>} resources
   *
   * @returns {boolean} true if some of the resources have DRM, false otherwise.
   */
  static hasDrm(resources) {
    return resources.some(({ drmList }) => drmList && drmList.length > 0);
  }

  /**
   * Get DRM vendors.
   */
  static get vendors() {
    return DRM_VENDORS;
  }
}

export default Drm;
