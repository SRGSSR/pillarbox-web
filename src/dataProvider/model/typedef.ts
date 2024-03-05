/**
 * Represents a time interval metadata used to mark the beginning and ending
 * of opening or closing credits.
 */
export type TimeInterval = {
  /**
   * The type of the time interval.
   */
  type: 'OPENING_CREDITS' | 'CLOSING_CREDITS';
  /**
   * An integer representing the mark in time.
   */
  markIn: number;
  /**
   * An integer representing the mark out time.
   */
  markOut: number;
};
/**
 * Represents a media segment with detailed metadata.
 */
export type Segment = {
  /**
   * Unique identifier for the segment.
   */
  id: string;
  /**
   * Type of media.
   */
  mediaType: AudioType;
  /**
   * Vendor of the segment.
   */
  vendor: VendorType;
  /**
   * URN (Uniform Resource Name) specifying the segment details.
   */
  urn: string;
  /**
   * Title of the segment. Limited to 2000 characters.
   */
  title: string;
  /**
   * Lead information for the segment.
   */
  lead: string;
  /**
   * Description of the segment.
   */
  description: string;
  /**
   * Media description for the segment.
   */
  mediaDescription: string;
  /**
   * URL of the image associated with the segment.
   */
  imageUrl: string;
  /**
   * Title of the image associated with the segment. Limited to 2000 characters.
   */
  imageTitle: string;
  /**
   * Copyright information for the image.
   */
  imageCopyright: string;
  /**
   * Reason for blocking.
   */
  blockReason: BlockReason;
  /**
   * Youth protection color. Allowed values: 'YELLOW', 'RED'.
   */
  youthProtectionColor: 'YELLOW' | 'RED';
  /**
   * Type of the segment. Allowed values: 'EPISODE', 'EXTRACT', 'TRAILER', 'CLIP', 'LIVESTREAM', 'SCHEDULED_LIVESTREAM'.
   */
  type: 'EPISODE' | 'EXTRACT' | 'TRAILER' | 'CLIP' | 'LIVESTREAM' | 'SCHEDULED_LIVESTREAM';
  /**
   * Date and time information in ISO8601 format.
   */
  date: string;
  /**
   * Duration of the segment in seconds.
   */
  duration: number;
  /**
   * URL for the standard definition podcast.
   */
  podcastSdUrl: string;
  /**
   * URL for the high definition podcast.
   */
  podcastHdUrl: string;
  /**
   * Start date and time for the validity period in ISO8601 format.
   */
  validFrom: string;
  /**
   * End date and time for the validity period in ISO8601 format.
   */
  validTo: string;
  /**
   * Entity responsible for the assignment. Allowed values: 'EDITOR', 'TRENDING', 'RECOMMENDATION'.
   */
  assignedBy: 'EDITOR' | 'TRENDING' | 'RECOMMENDATION';
  /**
   * Indicates if the segment is playable abroad.
   */
  playableAbroad: boolean;
  /**
   * List of related content items.
   */
  relatedContentList: Array<RelatedContent>;
  /**
   * List of social count entries.
   */
  socialCountList: Array<SocialCountEntry>;
  /**
   * Indicates if the segment is displayable.
   */
  displayable: boolean;
  /**
   * Full-length URN specifying the segment details.
   */
  fullLengthUrn: string;
  /**
   * Position of the segment.
   */
  position: number;
  /**
   * Indicates if the segment should not be embedded.
   */
  noEmbed: boolean;
  /**
   * List of subtitle entries.
   */
  subtitleList: Array<Subtitle>;
  /**
   * Analytics data for the segment.
   */
  analyticsData: {
    [x: string]: string;
  };
  /**
   * Metadata for analytics purposes.
   */
  analyticsMetadata: {
    [x: string]: string;
  };
  /**
   * Event data associated with the segment.
   */
  eventData: string;
  /**
   * List of player properties.
   */
  playerProperties: Array<PlayerProperty>;
  /**
   * List of tags associated with the segment.
   */
  tagList: Array<string>;
  /**
   * Label for the segment.
   */
  label: string;
  /**
   * Integer representing the mark in time.
   */
  markIn: number;
  /**
   * Integer representing the mark out time.
   */
  markOut: number;
};
/**
 * Represents a chapter of media content.
 */
export type Chapter = {
  /**
   * Unique identifier for the chapter.
   */
  id: string;
  /**
   * Type of media content (AUDIO or VIDEO).
   */
  mediaType: AudioType;
  /**
   * Vendor associated with the chapter.
   */
  vendor: VendorType;
  /**
   * URN (Uniform Resource Name) for the chapter.
   */
  urn: string;
  /**
   * Title of the chapter.
   */
  title: string;
  /**
   * Lead information for the chapter.
   */
  lead: string;
  /**
   * Description of the chapter.
   */
  description: string;
  /**
   * Media description of the chapter.
   */
  mediaDescription: string;
  /**
   * URL of the image associated with the chapter.
   */
  imageUrl: string;
  /**
   * Title of the image associated with the chapter.
   */
  imageTitle: string;
  /**
   * Copyright information for the image.
   */
  imageCopyright: string;
  /**
   * Reason for blocking the chapter.
   */
  blockReason: BlockReason;
  /**
   * Youth protection color code.
   */
  youthProtectionColor: 'YELLOW' | 'RED';
  /**
   * Type of the chapter.
   */
  type: 'EPISODE' | 'EXTRACT' | 'TRAILER' | 'CLIP' | 'LIVESTREAM' | 'SCHEDULED_LIVESTREAM';
  /**
   * Date and time information for the chapter.
   */
  date: string;
  /**
   * Duration of the chapter in seconds.
   */
  duration: number;
  /**
   * URL for the standard-definition podcast.
   */
  podcastSdUrl: string;
  /**
   * URL for the high-definition podcast.
   */
  podcastHdUrl: string;
  /**
   * Validity start date and time for the chapter.
   */
  validFrom: string;
  /**
   * Validity end date and time for the chapter.
   */
  validTo: string;
  /**
   * User who assigned the chapter.
   */
  assignedBy: 'EDITOR' | 'TRENDING' | 'RECOMMENDATION';
  /**
   * Indicates if the chapter is playable abroad.
   */
  playableAbroad: boolean;
  /**
   * List of related content for the chapter.
   */
  relatedContentList: Array<RelatedContent>;
  /**
   * List of social media counts for the chapter.
   */
  socialCountList: Array<SocialCountEntry>;
  /**
   * Indicates if the chapter is displayable.
   */
  displayable: boolean;
  /**
   * URN for the full-length version of the chapter.
   */
  fullLengthUrn: string;
  /**
   * Position of the chapter.
   */
  position: number;
  /**
   * Indicates if the chapter can be embedded.
   */
  noEmbed: boolean;
  /**
   * List of subtitles for the chapter.
   */
  subtitleList: Array<Subtitle>;
  /**
   * Analytics data for the chapter.
   */
  analyticsData: {
    [x: string]: string;
  };
  /**
   * Metadata for analytics associated with the chapter.
   */
  analyticsMetadata: {
    [x: string]: string;
  };
  /**
   * Event data associated with the chapter.
   */
  eventData: string;
  /**
   * List of player properties for the chapter.
   */
  playerProperties: Array<PlayerProperty>;
  /**
   * List of tags associated with the chapter.
   */
  tagList: Array<string>;
  /**
   * Label information for the chapter.
   */
  label: string;
  /**
   * Mark in time for the full-length version of the chapter.
   */
  fullLengthMarkIn: number;
  /**
   * Mark out time for the full-length version of the chapter.
   */
  fullLengthMarkOut: number;
  /**
   * List of resources associated with the chapter.
   */
  resourceList: Array<Resource>;
  /**
   * List of segments associated with the chapter.
   */
  segmentList: Array<Segment>;
  /**
   * Start time for the pre-trailer content.
   */
  preTrailerStart: string;
  /**
   * Stop time for the post-trailer content.
   */
  postTrailerStop: string;
  /**
   * CESIM (Content, Episode, Segment, Image, Module) identifier for the chapter.
   */
  cesimId: string;
  /**
   * List of HbbtvProperties for the chapter.
   */
  hbbtvProperties: Array<HbbtvProperties>;
  /**
   * Name of the creator of the chapter.
   */
  creatorName: string;
  /**
   * User associated with the creator of the chapter.
   */
  creatorUser: string;
  /**
   * Aspect ratio of the chapter.
   */
  aspectRatio: '1:1' | '4:5' | '4:3' | '9:16' | '16:9';
  /**
   * DVR reference date and time for the chapter.
   */
  dvrReferenceDate: string;
  /**
   * List of time intervals associated with the chapter.
   */
  timeIntervalList: Array<TimeInterval>;
  /**
   * Sprite sheet information for the chapter.
   */
  spriteSheet: SpriteSheet;
};
/**
 * Represents a resource associated with a media segment.
 */
export type Resource = {
  /**
   * URL of the resource.
   */
  url: string;
  /**
   * List of Digital Rights Management (DRM) information for the resource.
   */
  drmList: Array<DrmMetadata>;
  /**
   * Quality of the resource.
   */
  quality: QualityType;
  /**
   * Protocol used for streaming the resource.
   */
  protocol: 'HLS' | 'HLS-DVR' | 'HDS' | 'HDS-DVR' | 'RTMP' | 'HTTP' | 'HTTPS' | 'HTTP-M3U' | 'HTTP-MP3-STREAM' | 'DASH' | 'DASH-DVR';
  /**
   * Encoding used for the resource.
   */
  encoding: 'H264' | 'VP6F' | 'MPEG2' | 'WMV3' | 'AAC' | 'AAC-HE' | 'MP3' | 'MP2' | 'WMAV2';
  /**
   * MIME type of the resource.
   */
  mimeType: string;
  /**
   * Presentation mode of the resource.
   */
  presentation: PresentationType;
  /**
   * Streaming type of the resource.
   */
  streaming: StreamingType;
  /**
   * Indicates if the resource supports Digital Video Recorder (DVR).
   */
  dvr: boolean;
  /**
   * Indicates if the resource is a live stream.
   */
  live: boolean;
  /**
   * Media container type of the resource.
   */
  mediaContainer: 'MP4' | 'MKV' | 'MPEG2_TS' | 'FMP4' | 'NONE' | 'UNKNOWN';
  /**
   * Audio codec used for the resource.
   */
  audioCodec: 'AAC' | 'AAC-HE' | 'MP3' | 'MP2' | 'WMAV2' | 'UNKNOWN';
  /**
   * Video codec used for the resource.
   */
  videoCodec: 'H264' | 'VP6F' | 'MPEG2' | 'WMV3' | 'NONE' | 'UNKNOWN';
  /**
   * Token type used for the resource.
   */
  tokenType: TokenType;
  /**
   * List of audio tracks associated with the resource.
   */
  audioTrackList: Array<AudioTrack>;
  /**
   * List of subtitle information associated with the resource.
   */
  subtitleInformationList: Array<SubtitleInformation>;
  /**
   * Analytics data for the resource.
   */
  analyticsData: {
    [x: string]: string;
  };
  /**
   * Metadata for analytics purposes.
   */
  analyticsMetadata: {
    [x: string]: string;
  };
  /**
   * Stream offset for the resource.
   */
  streamOffset: number;
};
/**
 * Represents related content associated with a media segment.
 */
export type RelatedContent = {
  /**
   * Unique identifier for the related content.
   */
  id: string;
  /**
   * Title of the related content. Limited to 2000 characters.
   */
  title: string;
  /**
   * Lead information for the related content.
   */
  lead: string;
  /**
   * Description of the related content.
   */
  description: string;
  /**
   * URL of the related content.
   */
  url: string;
  /**
   * Type of content.
   */
  contentType: string;
  /**
   * Indicates if the related content is external.
   */
  isExternal: boolean;
};
/**
 * Represents subtitle information for a media segment.
 */
export type Subtitle = {
  /**
   * Locale information for the subtitle.
   */
  locale: string;
  /**
   * Language of the subtitle.
   */
  language: string;
  /**
   * Source of the subtitle.
   */
  source: 'EXTERNAL' | TrackSourceType;
  /**
   * Type of the subtitle.
   */
  type: 'SDH';
  /**
   * URL of the subtitle.
   */
  url: string;
  /**
   * Format of the subtitle.
   */
  format: 'TTML' | 'VTT';
};
/**
 * Represents a social media count entry associated with a media segment.
 */
export type SocialCountEntry = {
  /**
   * Key identifying the type of social media count.
   */
  key: 'srgView' | 'srgLike' | 'fbShare' | 'googleShare' | 'twitterShare' | 'whatsAppShare';
  /**
   * Count value for the social media entry.
   */
  value: number;
};
/**
 * Represents a player property associated with a media segment.
 */
export type PlayerProperty = {
  /**
   * Key identifying the type of player property.
   */
  key: 'iFrameUrl' | 'playerUrl' | 'playerRelativeIconImageUrl' | 'playerWidth' | 'playerHeight';
  /**
   * Value of the player property.
   */
  value: string;
};
/**
 * Represents Digital Rights Management (DRM) information associated with a media resource.
 */
export type DrmMetadata = {
  /**
   * Type of DRM used for the resource.
   */
  type: 'FAIRPLAY' | 'WIDEVINE' | 'PLAYREADY';
  /**
   * URL for the DRM license.
   */
  licenseUrl: string;
  /**
   * URL for the DRM certificate.
   */
  certificateUrl: string;
};
/**
 * Represents audio track information associated with a media resource.
 */
export type AudioTrack = {
  /**
   * Locale information for the audio track.
   */
  locale: string;
  /**
   * Language of the audio track.
   */
  language: string;
  /**
   * Source of the audio track.
   */
  source: TrackSourceType;
  /**
   * Type of the audio track.
   */
  type: 'AUDIO_DESCRIPTION';
};
/**
 * Represents subtitle information associated with a media resource.
 */
export type SubtitleInformation = {
  /**
   * Locale information for the subtitle.
   */
  locale: string;
  /**
   * Language of the subtitle.
   */
  language: string;
  /**
   * Source of the subtitle information.
   */
  source: 'EXTERNAL' | TrackSourceType;
  /**
   * Type of the subtitle information.
   */
  type: 'SDH';
};
/**
 * Represents HbbTV properties associated with a chapter.
 */
export type HbbtvProperties = {
  /**
   * Indicates the availability of the red button feature.
   */
  redButton: boolean;
  /**
   * URL link associated with the image for HbbTV.
   */
  imageLink: string;
};
/**
 * Represents a sprite sheet associated with a chapter.
 */
export type SpriteSheet = {
  /**
   * URN (Uniform Resource Name) for the sprite sheet.
   */
  urn: string;
  /**
   * Number of rows in the sprite sheet.
   */
  rows: number;
  /**
   * Number of columns in the sprite sheet.
   */
  columns: number;
  /**
   * Height of each thumbnail in the sprite sheet.
   */
  thumbnailHeight: number;
  /**
   * Width of each thumbnail in the sprite sheet.
   */
  thumbnailWidth: number;
  /**
   * Interval between frames in milliseconds.
   */
  interval: number;
  /**
   * URL link to the sprite sheet.
   */
  url: string;
};
/**
 * Represents an episode of media content.
 */
export type Episode = {
  /**
   * Unique identifier for the episode.
   */
  id: string;
  /**
   * Title of the episode.
   */
  title: string;
  /**
   * Lead description of the episode.
   */
  lead: string;
  /**
   * Detailed description of the episode.
   */
  description: string;
  /**
   * Date and time when the episode was published.
   */
  publishedDate: string;
  /**
   * URL of the image associated with the episode.
   */
  imageUrl: string;
  /**
   * Title of the image associated with the episode.
   */
  imageTitle: string;
  /**
   * Copyright information for the episode image.
   */
  imageCopyright: string;
  /**
   * URN (Uniform Resource Name) for the full-length version of the episode.
   */
  fullLengthUrn: string;
  /**
   * Season number to which the episode belongs.
   */
  seasonNumber: number;
  /**
   * Episode number.
   */
  number: number;
  /**
   * Social count entry for the episode.
   */
  socialCount: SocialCountEntry;
};
/**
 * Represents a show.
 */
export type Show = {
  /**
   * Unique identifier for the show.
   */
  id: string;
  /**
   * Vendor of the show.
   */
  vendor: VendorType;
  /**
   * Type of transmission for the show.
   */
  transmission: TransmissionType;
  /**
   * URN (Uniform Resource Name) for the show.
   */
  urn: string;
  /**
   * Title of the show.
   */
  title: string;
  /**
   * Lead description of the show.
   */
  lead: string;
  /**
   * Detailed description of the show.
   */
  description: string;
  /**
   * URL of the image associated with the show.
   */
  imageUrl: string;
  /**
   * Title of the image associated with the show.
   */
  imageTitle: string;
  /**
   * Copyright information for the show image.
   */
  imageCopyright: string;
  /**
   * URL of the banner image for the show.
   */
  bannerImageUrl: string;
  /**
   * URL of the poster image for the show.
   */
  posterImageUrl: string;
  /**
   * Indicates if the poster image is a fallback URL.
   */
  posterImageIsFallbackUrl: boolean;
  /**
   * URL of the podcast image for the show.
   */
  podcastImageUrl: string;
  /**
   * Indicates if the podcast image is a fallback URL.
   */
  podcastImageIsFallbackUrl: boolean;
  /**
   * URL of the show's homepage.
   */
  homepageUrl: string;
  /**
   * URL for podcast subscription.
   */
  podcastSubscriptionUrl: string;
  /**
   * URL for podcast feed (SD).
   */
  podcastFeedSdUrl: string;
  /**
   * URL for podcast feed (HD).
   */
  podcastFeedHdUrl: string;
  /**
   * URL for podcast on Deezer.
   */
  podcastDeezerUrl: string;
  /**
   * URL for podcast on Spotify.
   */
  podcastSpotifyUrl: string;
  /**
   * URL for the show's timetable.
   */
  timeTableUrl: string;
  /**
   * List of links associated with the show.
   */
  links: Array<Link>;
  /**
   * ID of the primary channel for the show.
   */
  primaryChannelId: string;
  /**
   * Number of times the show has been viewed.
   */
  viewedMedias: number;
  /**
   * Number of episodes available for the show.
   */
  numberOfEpisodes: number;
  /**
   * List of available audio languages for the show.
   */
  availableAudioLanguageList: Array<Language>;
  /**
   * List of available subtitle languages for the show.
   */
  availableSubtitleLanguageList: Array<Language>;
  /**
   * List of available video quality options for the show.
   */
  availableVideoQualityList: Array<QualityType>;
  /**
   * Indicates if audio description is available for the show.
   */
  audioDescriptionAvailable: boolean;
  /**
   * Indicates if subtitles are available for the show.
   */
  subtitlesAvailable: boolean;
  /**
   * Indicates if multiple audio languages are available for the show.
   */
  multiAudioLanguagesAvailable: boolean;
  /**
   * List of topics associated with the show.
   */
  topicList: Array<Topic>;
  /**
   * Information about the show's broadcast.
   */
  broadcastInformation: BroadcastInformation;
  /**
   * Indicates if the show is allowed to be indexed.
   */
  allowIndexing: boolean;
  /**
   * Information about the next scheduled broadcast for the show.
   */
  nextScheduledBroadcast: ScheduledBroadcast;
  /**
   * List of programs for the next scheduled broadcasts.
   */
  nextScheduledBroadcastList: Array<Program>;
  /**
   * URN of the primary channel for the show.
   */
  primaryChannelUrn: string;
};
/**
 * Represents a channel.
 */
export type Channel = {
  /**
   * Unique identifier for the channel.
   */
  id: string;
  /**
   * Vendor of the channel.
   */
  vendor: VendorType;
  /**
   * Title of the channel.
   */
  title: string;
  /**
   * Lead description of the channel.
   */
  lead: string;
  /**
   * Detailed description of the channel.
   */
  description: string;
  /**
   * URL of the image associated with the channel.
   */
  imageUrl: string;
  /**
   * Raw URL of the image associated with the channel.
   */
  imageUrlRaw: string;
  /**
   * Title of the image associated with the channel.
   */
  imageTitle: string;
  /**
   * Copyright information for the channel image.
   */
  imageCopyright: string;
  /**
   * Type of transmission for the channel.
   */
  transmission: TransmissionType;
  /**
   * URL for the channel's timetable.
   */
  timeTableUrl: string;
  /**
   * Information about the presenter associated with the channel.
   */
  presenter: Presenter;
  /**
   * Information about the currently airing program on the channel.
   */
  now: Program;
  /**
   * Information about the next scheduled program on the channel.
   */
  next: Program;
  /**
   * URN (Uniform Resource Name) for the channel.
   */
  urn: string;
};
/**
 * Represents a topic.
 */
export type Topic = {
  /**
   * Unique identifier for the topic.
   */
  id: string;
  /**
   * Vendor of the topic.
   */
  vendor: VendorType;
  /**
   * Type of transmission for the topic.
   */
  transmission: TransmissionType;
  /**
   * URN (Uniform Resource Name) for the topic.
   */
  urn: string;
  /**
   * Title of the topic.
   */
  title: string;
  /**
   * Lead description of the topic.
   */
  lead: string;
  /**
   * Detailed description of the topic.
   */
  description: string;
  /**
   * Number of viewed medias related to the topic.
   */
  viewedMedias: number;
  /**
   * URL of the image associated with the topic.
   */
  imageUrl: string;
  /**
   * Title of the image associated with the topic.
   */
  imageTitle: string;
  /**
   * Copyright information for the topic image.
   */
  imageCopyright: string;
  /**
   * List of subtopics associated with the main topic.
   */
  subTopicList: Array<SubTopic>;
};
/**
 * Represents a link.
 */
export type Link = {
  /**
   * The title of the link.
   */
  title: string;
  /**
   * The URL link.
   */
  link: string;
};
/**
 * Represents a language.
 */
export type Language = {
  /**
   * The locale of the language.
   */
  locale: string;
  /**
   * The language code.
   */
  language: string;
};
/**
 * Represents a subtopic.
 */
export type SubTopic = {
  /**
   * The unique identifier for the subtopic.
   */
  id: string;
  /**
   * The vendor of the subtopic.
   */
  vendor: VendorType;
  /**
   * The transmission type of the subtopic.
   */
  transmission: TransmissionType;
  /**
   * The URN of the subtopic.
   */
  urn: string;
  /**
   * The title of the subtopic.
   */
  title: string;
  /**
   * The lead information for the subtopic.
   */
  lead: string;
  /**
   * The description of the subtopic.
   */
  description: string;
  /**
   * The number of viewed medias for the subtopic.
   */
  viewedMedias: number;
  /**
   * The URL of the image associated with the subtopic.
   */
  imageUrl: string;
  /**
   * The title of the image associated with the subtopic.
   */
  imageTitle: string;
  /**
   * The copyright information of the image associated with the subtopic.
   */
  imageCopyright: string;
};
/**
 * Represents a presenter.
 */
export type Presenter = {
  /**
   * The name of the presenter.
   */
  name: string;
  /**
   * The URL associated with the presenter.
   */
  url: string;
  /**
   * The URL of the image associated with the presenter.
   */
  imageUrl: string;
  /**
   * The title of the image associated with the presenter.
   */
  imageTitle: string;
  /**
   * The copyright information of the image associated with the presenter.
   */
  imageCopyright: string;
};
/**
 * Represents broadcast information.
 */
export type BroadcastInformation = {
  /**
   * The hint text associated with the broadcast.
   */
  hintText: string;
  /**
   * The URL associated with the broadcast.
   */
  url: string;
  /**
   * The start date and time of the broadcast in ISO 8601 format.
   */
  startDate: string;
  /**
   * The end date and time of the broadcast in ISO 8601 format.
   */
  endDate: string;
};
/**
 * Represents a scheduled broadcast.
 */
export type ScheduledBroadcast = {
  /**
   * The title of the scheduled broadcast.
   */
  title: string;
  /**
   * The start time of the scheduled broadcast in ISO 8601 format.
   */
  startTime: string;
  /**
   * The end time of the scheduled broadcast in ISO 8601 format.
   */
  endTime: string;
  /**
   * The title of the channel associated with the scheduled broadcast.
   */
  channelTitle: string;
  /**
   * The URN (Uniform Resource Name) associated with the channel.
   */
  channelUrn: string;
};
/**
 * Represents a program.
 */
export type Program = {
  /**
   * The title of the program.
   */
  title: string;
  /**
   * The start time of the program in ISO 8601 format.
   */
  startTime: string;
  /**
   * The end time of the program in ISO 8601 format.
   */
  endTime: string;
  /**
   * The lead information of the program.
   */
  lead: string;
  /**
   * The description of the program.
   */
  description: string;
  /**
   * The URL of the image associated with the program.
   */
  imageUrl: string;
  /**
   * Indicates whether the image is a fallback URL.
   */
  imageIsFallbackUrl: boolean;
  /**
   * The title of the image associated with the program.
   */
  imageTitle: string;
  /**
   * The copyright information of the image associated with the program.
   */
  imageCopyright: string;
  /**
   * The URL associated with the program.
   */
  url: string;
  /**
   * The show associated with the program.
   */
  show: Show;
  /**
   * The title of the program.
   */
  programTitle: string;
  /**
   * The URL associated with the program.
   */
  programUrl: string;
  /**
   * The title of the episode.
   */
  episodeTitle: string;
  /**
   * The URL associated with the episode.
   */
  episodeUrl: string;
  /**
   * The title of the image associated with the episode.
   */
  episodeImageTitle: string;
  /**
   * The URL of the image associated with the episode.
   */
  episodeImageUrl: string;
  /**
   * The URN (Uniform Resource Name) associated with the media.
   */
  mediaUrn: string;
  /**
   * The genre of the program.
   */
  genre: string;
  /**
   * The season number of the program.
   */
  seasonNumber: number;
  /**
   * The episode number of the program.
   */
  episodeNumber: number;
  /**
   * The total number of episodes.
   */
  episodesTotal: number;
  /**
   * The production year of the program.
   */
  productionYear: number;
  /**
   * The production country of the program.
   */
  productionCountry: string;
  /**
   * The color code for youth protection.
   */
  youthProtectionColor: string;
  /**
   * The subtitle information of the program.
   */
  subtitle: string;
  /**
   * The title of the block associated with the program.
   */
  blockTitle: string;
  /**
   * The original title of the program.
   */
  originalTitle: string;
  /**
   * The list of credits associated with the program.
   */
  creditList: Array<Credit>;
  /**
   * The list of sub-programs associated with the program.
   */
  subProgramList: Array<Program>;
  /**
   * Indicates whether subtitles are available.
   */
  subtitlesAvailable: boolean;
  /**
   * Indicates whether the program is live.
   */
  isLive: boolean;
  /**
   * Indicates whether the program has two languages.
   */
  hasTwoLanguages: boolean;
  /**
   * Indicates whether the program has sign language.
   */
  hasSignLanguage: boolean;
  /**
   * Indicates whether the program has visual description.
   */
  hasVisualDescription: boolean;
  /**
   * Indicates whether the program is a follow-up.
   */
  isFollowUp: boolean;
  /**
   * Indicates whether the program is in Dolby Digital.
   */
  isDolbyDigital: boolean;
  /**
   * Indicates whether the program is a repetition.
   */
  isRepetition: boolean;
  /**
   * The description of the repetition.
   */
  repetitionDescription: string;
  /**
   * The broadcast information associated with the program.
   */
  broadcastInfo: string;
  /**
   * The title of the channel associated with the program.
   */
  channelTitle: string;
  /**
   * The URN (Uniform Resource Name) associated with the channel.
   */
  channelUrn: string;
  /**
   * The list of headlines associated with the program.
   */
  headlineList: Array<Headline>;
};
/**
 * Represents credit information.
 */
export type Credit = {
  /**
   * The real name associated with the credit.
   */
  realName: string;
  /**
   * The role of the individual associated with the credit.
   */
  role: string;
  /**
   * The name associated with the credit.
   */
  name: string;
};
/**
 * Represents headline information.
 */
export type Headline = {
  /**
   * The title of the headline.
   */
  title: string;
  /**
   * The description of the headline.
   */
  description: string;
};
/**
 * Broadcasting organizations
 */
export type VendorType = 'SRF' | 'RTR' | 'RTS' | 'RSI' | 'SWI' | 'SSATR';
/**
 * Audio-only or includes video
 */
export type AudioType = 'AUDIO' | 'VIDEO';
/**
 * Reasons for content blocking
 */
export type BlockReason =
  'GEOBLOCK'
  | 'LEGAL'
  | 'COMMERCIAL'
  | 'AGERATING18'
  | 'AGERATING12'
  | 'STARTDATE'
  | 'ENDDATE'
  | 'UNKNOWN';
/**
 * Medium of transmission
 */
export type TransmissionType = 'TV' | 'RADIO' | 'ONLINE';
/**
 * Content quality
 */
export type QualityType = 'SD' | 'HD' | 'HQ';
/**
 * Source type for audio/video tracks
 */
export type TrackSourceType = 'HLS' | 'HDS' | 'DASH';
/**
 * Presentation format
 */
export type PresentationType = 'DEFAULT' | 'VIDEO_360';
/**
 * Enumerates various streaming methods
 */
export type StreamingType = 'PROGRESSIVE' | 'M3UPLAYLIST' | 'HLS' | 'HDS' | 'RTMP' | 'DASH' | 'UNKNOWN';
/**
 * Represents different token types for authentication
 */
export type TokenType = 'AKAMAI' | 'NONE';


/**
 * Represents the transformed format of a resource.
 */
export interface MainResource {
  /**
   * Merged analytics data.
   */
  analyticsData: {
    [x: string]: string;
  };
  /**
   * Merged analytics metadata.
   */
  analyticsMetadata: {
    [x: string]: string;
  };
  /**
   * Block reason from the main chapter.
   */
  blockReason: BlockReason;
  /**
   * Blocked segments from the main chapter.
   */
  blockedSegments: Array<Segment>;
  /**
   * Chapters from the main chapter.
   */
  chapters: Array<Chapter>;
  /**
   * Vendor from the main chapter.
   */
  vendor: VendorType;
  /**
   * List of DRM information from the resource.
   */
  drmList: Array<DrmMetadata>;
  /**
   * DVR information from the resource.
   */
  dvr: boolean;
  /**
   * Event data from the main chapter.
   */
  eventData: string;
  /**
   * ID from the main chapter.
   */
  id: string;
  /**
   * The url of the copyright image copyright from the main chapter.
   */
  imageCopyright: string;
  /**
   * The url of the image from the main chapter.
   */
  imageUrl: string;
  /**
   * Live status from the resource.
   */
  live: boolean;
  /**
   * Media type from the main chapter.
   */
  mediaType: AudioType;
  /**
   * MIME type from the resource.
   */
  mimeType: string;
  /**
   * Presentation information from the resource.
   */
  presentation: PresentationType;
  /**
   * Quality information from the resource.
   */
  quality: QualityType;
  /**
   * Streaming information from the resource.
   */
  streaming: StreamingType;
  /**
   * Stream offset from the resource.
   */
  streamOffset: number;
  /**
   * Filtered external subtitles.
   */
  subtitles: Array<Subtitle>;
  /**
   * The title of this resource.
   */
  title: string;
  /**
   * Time intervals from the main chapter.
   */
  intervals: Array<TimeInterval>;
  /**
   * Token type from the resource.
   */
  tokenType: TokenType;
  /**
   * URL from the resource.
   */
  url: string;
  /**
   * Chapter URN.
   */
  urn: string;
}
