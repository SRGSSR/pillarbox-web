/**
 * Initialized the demo player.
 *
 * @module
 */
import '../dialog/demo-dialog-component';
import Pillarbox from '../../../../src/pillarbox.js';
import '../../../../src/middleware/srgssr.js';
import PreferencesProvider
  from '../../layout/content/settings/preferences-provider';
import router from '../../router/router';

const DEMO_PLAYER_ID = 'player';
const DEFAULT_OPTIONS = {
  fill: true,
  restoreEl: true
};

/**
 * Creates and configures a Pillarbox player.
 *
 * @param {Object} options - (Optional) options to customize the player behaviour.
 *
 * @returns {Object} The configured Pillarbox player instance.
 */
const createPlayer = (options = {}) => {
  const preferences = PreferencesProvider.loadPreferences();

  window.player = new Pillarbox(DEMO_PLAYER_ID, {
    ...DEFAULT_OPTIONS,
    ...{
      muted: preferences.muted ?? true,
      autoplay: preferences.autoplay ?? false,
      debug: preferences.debug ?? false,
    },
    ...options
  });

  return window.player;
};

/**
 * Disposes of the Pillarbox video player instance.
 */
const destroyPlayer = () => {
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

// Configure the dialog
const playerDialog = document.querySelector('demo-dialog');

const toParams = (keySystems) => {
  const vendor = Object.keys(keySystems ?? {})[0];

  if (!vendor) {
    return {};
  }

  return {
    vendor: vendor,
    ...keySystems[vendor]
  };
};

const toKeySystem = (params) => {
  if (!params.vendor) {
    return undefined;
  }

  const keySystem = {};
  const { certificateUrl, licenseUrl } = params;

  keySystem[params.vendor] = { certificateUrl, licenseUrl };

  return keySystem;
};

export const asQueryParams = ({ src, type, keySystems }) => {
  return new URLSearchParams({ src, type, ...toParams(keySystems) }).toString();
};

playerDialog.addEventListener('close', () => {
  destroyPlayer();
  router.updateState({}, ['src', 'type', 'vendor', 'certificateUrl', 'licenseUrl']);
});

const loadPlayerFromRouter = (e) => {
  const params = e.detail.queryParams;

  if ('src' in params) {
    const { src, type } = params;
    const keySystems = toKeySystem(params);

    openPlayerModal({ src, type, keySystems });
  }
};

router.addEventListener('routechanged', loadPlayerFromRouter);
router.addEventListener('queryparams', loadPlayerFromRouter);


/**
 * Opens a modal containing a video player with specified source and type. Can only
 * load URN if the type 'srgssr/urn`is explicitly provided, otherwise the created
 * Pillarbox player tries to guess the type.
 *
 * @param {object} options - An object containing the source and type of the video to be played.
 * @param {string} options.src - The source URL of the video.
 * @param {string} [options.type] - (Optional) The type/format of the video (e.g., 'video/mp4').
 * @param {object} [options.keySystems] - (Optional) The DRM configuration for DRM protected sources.
 * @param {object} [options.playerOptions] - (Optional) Additional configuration for the player.
 * @param {Boolean} shouldUpdateRouter - Whether the router should be updated or not (Default: true).
 *
 * @returns {Object} The configured Pillarbox player instance.
 */
export const openPlayerModal = (
  { src, type, keySystems, playerOptions },
  shouldUpdateRouter = true
) => {
  const player = createPlayer(playerOptions ?? {});

  playerDialog.open = true;
  player.src({ src, type, keySystems });

  if (shouldUpdateRouter) {
    router.updateState({ src, type, ...toParams(keySystems) });
  }

  return player;
};
