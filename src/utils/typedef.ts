/**
 * The specific DRM vendor keys supported by the player.
 */
export type DrmVendorKey = 'com.widevine.alpha' | 'com.apple.fps.1_0' | 'com.microsoft.playready';

/**
 * Represents the configuration for a specific DRM system used by videojs-contrib-eme.
 */
export type KeySystemConfiguration = {
  /**
   * The license URL.
   */
  url?: string;
  /**
   * The certificate URI.
   */
  certificateUri?: string;
  /**
   * Function to extract the content ID.
   */
  getContentId?: (emeOptions: any, contentId: string) => string;
  /**
   * Asynchronous function to retrieve the license for the DRM system.
   */
  getLicense?: Function;
};

/**
 * Dictionary of DRM configurations mapped by specific vendor keys.
 */
export type KeySystems = {
  [vendor in DrmVendorKey]?: KeySystemConfiguration;
};
