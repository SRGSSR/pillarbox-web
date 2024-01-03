/**
 * Initialized the demo player.
 *
 * @module
 */
import Pillarbox from '../../../src/pillarbox.js';
import '../../../src/middleware/srgssr.js';
import PreferencesProvider from '../settings/preferences-provider';

const DEMO_PLAYER_ID = 'player';
const DEFAULT_OPTIONS = {
  fill: true,
  html5: {
    vhs: { useForcedSubtitles: true },
  },
  liveTracker: {
    trackingThreshold: 120,
    liveTolerance: 15,
  },
  liveui: true,
  playsinline: true,
  plugins: { eme: true },
  responsive: true,
  restoreEl: true
};

/**
 * Creates and configures a Pillarbox video player.
 *
 * @returns {Object} The configured Pillarbox video player instance.
 */
export const createPlayer = () => {
  const preferences = PreferencesProvider.loadPreferences();

  window.player = new Pillarbox(DEMO_PLAYER_ID, {
    ...DEFAULT_OPTIONS,
    ...{
      muted: preferences.muted ?? true,
      autoplay: preferences.autoplay ?? false,
      debug: preferences.debug ?? false,
    }
  });

  return window.player;
};

/**
 * Disposes of the Pillarbox video player instance.
 */
export const destroyPlayer = () => {
  Pillarbox.getPlayer(DEMO_PLAYER_ID).dispose();
  window.player = null;
};


// Expose Pillarbox and player in the window object for debugging
window.pillarbox = Pillarbox;
// TODO must be remove once tagCommander is pillarbox ready
//
// Allows to track comscore events
//
// This is necessary because a tagCommander script uses videojs directly for some
// unknown reason. Pillarbox does not expose videojs, because pillarbox
// is a superset of videojs, this causes an error preventing comscore
// from initializing correctly.
window.videojs = Pillarbox;
