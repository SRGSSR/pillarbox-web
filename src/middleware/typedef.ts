import { MainResource } from '../dataProvider/model/typedef';
import { KeySystems } from '../utils/typedef';


/**
 * A {@link MainResource} that can contain {@link KeySystems} information.
 */
export interface MainResourceWithKeySystems extends MainResource, KeySystems {

}

/**
 * Represents the result of composing source media data.
 */
export type ComposedSrcMediaData = {
  /**
   * The URL of the source media.
   */
  src: string;
  /**
   * The MIME type of the source media.
   */
  type: string;
  /**
   * A mapping of DRM types to their corresponding key systems information.
   */
  keySystems: KeySystems,
  /**
   * Indicates whether trackers are disabled for the source media.
   */
  disableTrackers: boolean;
  /**
   * The merged media data from the source and additional media data.
   */
  mediaData: MainResource;
};

/**
 * Represents a set of options specific to the SRG SSR.
 *
 * __Note__:
 *
 * - All these options have a default value and can therefore be undefined.
 * - DataProvider options cannot be combined with each other.
 */
export type SrgOptions = {
  /**
   * A function returning an object representing a mediaComposition.
   *
   * @example
   * // Must match the following signature
   * (data: string) => any
   */
  dataProvider: undefined | Function;
  /**
   * A specific host for a different IL environment.
   */
  dataProviderHost: undefined | string;
  /**
   * A function for handling a custom data source.
   *
   * @example
   * // Must match the following signature
   * (contentId: string) => string
   */
  dataProviderUrlHandler: undefined | Function;
  /**
   * The URL of the TagCommander script.
   */
  tagCommanderScriptURL: undefined | string;
}

/**
 * The projection format for the video content.
 */
export type ViewportType = 'STANDARD' | 'MONOSCOPIC';

/**
 * The type of media stream.
 */
export type SourceType = 'ON-DEMAND' | 'LIVE' | 'DVR';

/**
 * Digital Rights Management (DRM) system identifiers.
 */
export type DrmKeySystem = 'WIDEVINE' | 'FAIRPLAY' | 'CLEAR_KEY' | 'PLAY_READY';

/**
 * The role or purpose of the text track.
 */
export type SubtitleKind = 'subtitles' | 'description' | 'captions' | 'chapters' | 'metadata' | string;

/**
 * The specific segment category within the timeline.
 */
export type TimeRangeType = 'BLOCKED' | 'OPENING_CREDITS' | 'CLOSING_CREDITS';

/**
 * Information about the media stream location and format.
 */
export interface MediaSource {
  url: string;
  type?: SourceType;
  mimeType?: string;
  videoFragmentFormat?: string;
  audioFragmentsFormat?: string;
}

/**
 * DRM configuration details for protected content.
 */
export interface DrmConfig {
  /** The identifier of the DRM system to use. */
  keySystem: DrmKeySystem;
  /** The URL to the license server. */
  licenseUrl: string;
  /** The URL to the certificate server (mostly for FairPlay). */
  certificateUrl?: string;
  /** Whether the session should be kept alive for multiple requests. */
  multisession?: boolean;
}

/**
 * Configuration for an external subtitle or caption track.
 */
export interface Subtitle {
  /** User-friendly label for selection. */
  label: string;
  /** The category of the track. */
  kind: SubtitleKind;
  /** BCP-47 language tag (e.g., "en-US"). */
  language: string;
  /** The URL of the subtitle file (VTT, SRT, etc.). */
  url: string;
}

/**
 * Information about a specific section or chapter in the video.
 */
export interface Chapter {
  identifier?: string;
  title: string;
  posterUrl?: string;
  /** Start time in milliseconds. */
  startTime: number;
  /** End time in milliseconds. */
  endTime: number;
}

/**
 * A labeled segment of time within the content, used for UI or playback restriction.
 */
export interface TimeRange {
  /** Start time in milliseconds. */
  startTime: number;
  /** End time in milliseconds. */
  endTime: number;
  type: TimeRangeType;
}

/**
 * Represents a set of options specific to the Standard Metadata Connector.
 */
export interface StandardMetadata {
  /** Unique identifier for the asset. */
  identifier?: string;
  /** Main title of the content. */
  title?: string;
  /** Secondary title or subtitle. */
  subtitle?: string;
  /** Long form description of the content. */
  description?: string;
  /** URL for the thumbnail image or poster. */
  posterUrl?: string;
  /** Season number for TV shows. */
  seasonNumber?: number;
  /** Episode number for TV shows. */
  episodeNumber?: number;
  /** Video projection type. */
  viewport?: ViewportType;
  /** Stream source configuration. */
  source?: MediaSource;
  /** DRM configuration if the content is protected. */
  drm?: DrmConfig;
  /** List of available subtitle tracks. */
  subtitles?: Subtitle[];
  /** List of chapters for navigation. */
  chapters?: Chapter[];
  /** Specific time segments (e.g., skip credits). */
  timeRanges?: TimeRange[];
  /** Additional custom key-value pairs. */
  customData?: Record<string, any>;
}
