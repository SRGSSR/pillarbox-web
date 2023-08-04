const DRM_VENDORS = {
  WIDEVINE: 'com.widevine.alpha',
  FAIRPLAY: 'com.apple.fps.1_0',
  PLAYREADY: 'com.microsoft.playready',
};

class Drm {
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

  static buildKeySystemOptions(drmList = []) {
    const keySystemOptions = [];

    drmList.forEach((drmVendor) => {
      const type = Drm.vendors[drmVendor.type];
      const keySystemOption = {};

      keySystemOption.name = type;
      keySystemOption.options = {
        serverURL: drmVendor.licenseUrl,
      };

      keySystemOptions.push(keySystemOption);
    });

    return keySystemOptions;
  }

  static hasDrm(resources) {
    return resources.some(
      ({ keySystemOptions }) => keySystemOptions && keySystemOptions.length > 0
    );
  }

  static get vendors() {
    return DRM_VENDORS;
  }
}

export default Drm;
