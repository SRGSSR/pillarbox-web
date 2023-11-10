/**
 * Initialized the demo player.
 *
 * @module
 */
import Pillarbox from '../../../src/pillarbox';
import '../../../src/middleware/srgssr.js';

const player = new Pillarbox('player', {
  fill: true,
  html5: {
    vhs: { useForcedSubtitles: true },
  },
  liveTracker: {
    trackingThreshold: 120,
    liveTolerance: 15,
  },
  liveui: true,
  muted: true,
  playsinline: true,
  plugins: { eme: true },
});

// Expose Pillarbox and player in the window object for debugging
window.pillarbox = Pillarbox;
window.player = player;
