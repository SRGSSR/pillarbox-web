import Pillarbox from '../../src/pillarbox';

const dialog = document.getElementById('pbw-dialog');

// Pauses de video once the modal is closed.
dialog.addEventListener('close', () => Pillarbox.getPlayer('player').pause());

// Close the dialog on close button clicked
dialog.querySelector('#pbw-dialog-close-btn').addEventListener('click', () => dialog.close());

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
export const openModal = async ({ src, type, keySystems }) => {
  const player = Pillarbox.getPlayer('player');

  if (player.currentSrc() !== src) {
    player.src({ src, type, keySystems });
  }

  dialog.showModal();
};
