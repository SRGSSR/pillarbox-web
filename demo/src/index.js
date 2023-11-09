import Pillarbox from '../../src/pillarbox.js';
import '../../src/middleware/srgssr.js';
import { loadExamples } from './ExamplesLoader';
import { openModal } from './ExampleDialog';
import svg from 'bundle-text:../img/github-logo.svg';

// Initialize the player statically
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

// Expose the Pillarbox in the window object
window.pillarbox = Pillarbox;

// Expose the player in the window object
window.player = player;

// Set Pillarbox version
document.querySelector('.version').textContent = `Pillarbox @ ${Pillarbox.VERSION.pillarbox}`;

// Set github icon
document.querySelector('.github-link').insertAdjacentHTML('beforeend', svg);

// Allow to load any example
document
  .querySelector('#load-bar')
  .addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const src = event.target.value;
      const type = src.startsWith('urn:') ? 'srgssr/urn' : undefined;

      openModal({ src, type });
    }
  });

// Load examples from `Examples.js`
loadExamples();
