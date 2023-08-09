import Pillarbox from '../../src/pillarbox.js';
import '../../src/middleware/srgssr.js';

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

// Source examples
window.sourceExamples = {
  bipbop: {
    src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/bipbop_16x9/bipbop_16x9_variant.m3u8',
    type: 'application/x-mpegURL',
  },
  urn: {
    src: 'urn:rts:video:14160770',
    type: 'srgssr/urn',
  },
};

// Load the source
player.src(window.sourceExamples.bipbop);
