/**
 * Defines a route for the root path ('/') that replaces the main content of the
 * page with a list of dynamically loaded examples.
 *
 * @module
 */
import router from '../core/router';
import { parseHtml } from '../core/html-utils';
import Examples from './examples';
import { openPlayerModal } from '../player/player-dialog';

const createContentEl = () => parseHtml(`
  <div class="load-bar-container">
    <i class="vjs-icon-play-circle"></i>
    <input type="text" id="load-bar" placeholder="Enter a URL or URN to play its content...">
  </div>

  <!-- List of examples -->
  <div id="examples">
      ${Object.entries(Examples).map(([category, examples]) => `
      <div class="category" data-category="${category}">
        <h2>${category}</h2>
        ${examples.map(example => `
        <button class="btn example-btn">
          ${
            example.description != null
            ? `
              <span class="example-description">${example.description}</span>
              <span class="example-title">${example.title}</span>
              `
            : `${example.title}`
          }
        </button>
        `).join('')}
      </div>
      `).join('')}
  </div>
`);

router.addRoute('examples', () => {
  document.querySelector('.container').replaceChildren(...createContentEl());

  document.querySelector('#examples').addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() !== 'button') {
      return;
    }

    const parent = event.target.parentNode;
    const category = parent.dataset.category;
    const exampleIdx = Array.from(parent.children)
      .filter(child => child.tagName.toLowerCase() === 'button')
      .indexOf(event.target);

    openPlayerModal(Examples[category][exampleIdx]);
  });

  document.querySelector('#load-bar').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const src = event.target.value;
      const type = src.startsWith('urn:') ? 'srgssr/urn' : undefined;

      openPlayerModal({ src, type });
    }
  });
});
