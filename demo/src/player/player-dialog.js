/**
 * Defines the behaviour of the player dialog and provides a function to open the
 * dialog and reload the player's content.
 *
 * @module
 */
import { createPlayer, destroyPlayer } from './player';

const dialog = document.getElementById('pbw-dialog');

// Pauses de video once the modal is closed.
dialog.addEventListener('close', () => {
  document.documentElement.style.overflowY = 'scroll';
  destroyPlayer();
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
  dialog.showModal();
  dialog.classList.toggle('slide-up-fade-in', true);
};
