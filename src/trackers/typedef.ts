/**
 * SRG Analytics configuration options.
 */
export type SRGAnalyticsOptions = {
  /** Enables debug mode if set to true */
  debug: boolean;

  /** The environment in which the player is running */
  environment: string;

  /** The version of the player */
  playerVersion: string;

  /** The URL for the Tag Commander script */
  tagCommanderScriptURL: string;
};

/**
 * Pillarbox Monitoring configuration options.
 */
export type PillarboxMonitoringOptions = {
  /** The name of the player */
  playerName: string;

  /** The version of the player */
  playerVersion: string;

  /** The platform on which the player is running */
  platform: string;

  /** The version of the schema used for monitoring */
  schemaVersion: number;

  /** The interval in milliseconds for sending heartbeat signals */
  heartbeatInterval: number;

  /** The URL for the monitoring beacon */
  beaconUrl: string;
};
