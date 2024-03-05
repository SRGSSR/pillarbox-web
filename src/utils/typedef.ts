
/**
 * Represents the result of building key systems.
 */
export interface KeySystems {
  /**
   *   A mapping of DRM types to their corresponding key systems information.
   *   For "FAIRPLAY" type, it includes a structure with certificate and license URIs;
   *   for other types, it's a string representing the license URL.
   */
  keySystems: {
    [x: string]: {
      certificateUri: string;
      licenseUri: string;
    } | string;
  };
}
