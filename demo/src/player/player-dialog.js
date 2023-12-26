/**
 * Defines the behaviour of the player dialog and provides a function to open the
 * dialog and reload the player's content.
 *
 * @module
 */
import { createPlayer, destroyPlayer } from './player';
import router from '../router/router';

const dialog = document.getElementById('pbw-dialog');

// Pauses de video once the modal is closed.
dialog.addEventListener('close', () => {
  document.documentElement.style.overflowY = 'scroll';
  destroyPlayer();

  const params = router.queryParams;
  const keysToRemove = ['src', 'type', 'vendor', 'certificateUrl', 'licenseUrl'];
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key]) => !keysToRemove.includes(key))
  );

  router.replaceState(filteredParams);
});

// Close the dialog on close button clicked
dialog.querySelector('#pbw-dialog-close-btn').addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('animationend', () => {
  dialog.classList.toggle('slide-up-fade-in', false);
});

// Close the dialog when the backdrop is clicked
dialog.addEventListener('click', (e) => {
  if (dialog !== e.target) return;

  dialog.close();
});

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

/**
 * Opens a modal containing a video player with specified source and type. Can only
 * load URN if the type 'srgssr/urn`is explicitly provided, otherwise the created
 * Pillarbox player tries to guess the type.
 *
 * @param {object} options - An object containing the source and type of the video to be played.
 * @param {string} options.src - The source URL of the video.
 * @param {string} [options.type] - (Optional) The type/format of the video (e.g., 'video/mp4').
 * @param {object} [options.keySystems] - (Optional) The DRM configuration for DRM protected sources.
 */
export const openPlayerModal = ({ src, type, keySystems }) => {
  const player = createPlayer();

  document.documentElement.style.overflowY = 'hidden';
  player.src({ src, type, keySystems });

  router.updateState({ src, type, ...toParams(keySystems) });

  dialog.showModal();
  dialog.classList.toggle('slide-up-fade-in', true);
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

// Only listen for 'routechanged' events since opening the modal in this fashion is only useful on the first load of the page.
router.addEventListener('routechanged', (e) => {
  const params = e.detail.queryParams;

  if ('src' in params) {
    const { src, type } = params;
    const keySystems = toKeySystem(params);

    openPlayerModal({ src, type, keySystems });
  }
});
