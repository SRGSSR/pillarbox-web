import Pillarbox from '../../src/pillarbox.js';
import '../../src/middleware/srgssr.js';

// Get pillarbox version
document.querySelector('.version').textContent = Pillarbox.VERSION.pillarbox;

// Initialize the player
const player = new Pillarbox('player', {
  /** @see https://docs.videojs.com/html5#playsinline */
  playsinline: true,
  /** @see https://videojs.com/guides/options/#liveui */
  liveui: true,
  muted: true,
  fill: true,
  /** @see https://videojs.com/guides/options/#plugins */
  plugins: {
    eme: true,
  },
  html5: {
    vhs : {
      useForcedSubtitles: true
    }
  }
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
  appleAtmos : {
    src: 'https://devstreaming-cdn.apple.com/videos/streaming/examples/adv_dv_atmos/main.m3u8',
    type: 'application/x-mpegURL',
  },
  urn: {
    src: 'urn:rts:video:14160770',
    type: 'srgssr/urn',
  },
  rts1: {
    src: 'urn:rts:video:3608506',
    type: 'srgssr/urn',
  },
  token: {
    src: 'urn:rts:video:1967124',
    type: 'srgssr/urn',
  }
};

// Load the source
player.src(window.sourceExamples.bipbop);
