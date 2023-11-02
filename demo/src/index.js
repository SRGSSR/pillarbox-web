import Pillarbox from '../../src/pillarbox.js';
import '../../src/middleware/srgssr.js';
import { loadExamples } from './ExamplesLoader';
import { openModal } from './ExampleDialog';

// Initialize the player statically
const player = new Pillarbox('player', {
  playsinline: true,
  liveui: true,
  muted: true,
  fill: true,
  plugins: { eme: true },
  html5: {
    vhs: { useForcedSubtitles: true }
  }
});

// Expose the Pillarbox in the window object
window.pillarbox = Pillarbox;

// Expose the player in the window object
window.player = player;

// Set Pillarbox version
document.querySelector('.version').textContent = Pillarbox.VERSION.pillarbox;

// Allow to load any example
document
  .querySelector('#search-bar')
  .addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const src = event.target.value;
      const type = src.startsWith('urn:') ? 'srgssr/urn' : undefined;

      openModal({ src, type });
    }
  });

// Load examples from `Examples.js`
loadExamples();
