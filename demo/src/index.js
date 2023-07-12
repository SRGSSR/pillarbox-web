import Pillarbox from '../../src/pillarbox.js';

// Get pillarbox version
document.querySelector('.version').textContent = Pillarbox.VERSION.pillarbox;

// Initialize the player
const player = new Pillarbox('player', {
  muted: true,
  fill: true,
});

// Expose the Pillarbox in the window object
window.pillarbox = Pillarbox;

// Expose the player in the window object
window.player = player;

// Load the source
player.src({
  src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
  type: 'application/x-mpegURL',
});
