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

/**
 * Represents a page displaying a list of dynamically loaded examples.
 *
 * @class
 */
class ExamplePage {
  /**
   * Creates an instance of ExamplePage.
   * Initializes and sets up the necessary elements and event listeners.
   */
  constructor() {
    // Replace the content of the '.container' element with dynamically created content.
    document.querySelector('.container').replaceChildren(...this.createContentEl());

    // Add event listener for the 'click' event on the '#examples' element.
    document.querySelector('#examples').addEventListener('click', (event) => {
      const exampleEl = event.target.closest('button');

      // Check if the clicked element is a button and has the 'category' dataset attribute.
      if (!exampleEl || !('category' in exampleEl.parentNode.dataset)) {
        return;
      }

      this.onExampleClicked(exampleEl);
    });

    // Add event listener for the 'keyup' event on the '#load-bar' element.
    document.querySelector('#load-bar').addEventListener('keyup', (event) => {
      // Check if the 'Enter' key is pressed.
      if (event.key === 'Enter') {
        this.onSourceSubmitted(event.target.value);
      }
    });
  }

  /**
   * Handles the click event on an example button. A modal with a player is opened
   * and the corresponding example's content is loaded.
   *
   * @param {Element} exampleEl - The button that was clicked.
   */
  onExampleClicked(exampleEl) {
    const parent = exampleEl.parentNode;
    const category = parent.dataset.category;
    const exampleIdx = Array.from(parent.children)
      .filter(child => child.tagName.toLowerCase() === 'button')
      .indexOf(exampleEl);

    openPlayerModal(Examples[category][exampleIdx]);
  }

  /**
   * Handles the submission of a source (URL or URN).
   *
   * @param {string} src - The submitted source (URL or URN).
   */
  onSourceSubmitted(src) {
    const type = src.startsWith('urn:') ? 'srgssr/urn' : undefined;

    openPlayerModal({ src, type });
  }

  /**
   * Creates the main content element containing a load bar and a list of examples.
   *
   * @returns {NodeListOf<ChildNode>} A list of child nodes for the created element.
   */
  createContentEl() {
    return parseHtml(`
      <div class="load-bar-container fade-in">
        <i class="vjs-icon-play-circle"></i>
        <input type="text" id="load-bar" placeholder="Enter a URL or URN to play its content...">
      </div>

      <!-- List of examples -->
      <div id="examples" class="fade-in">
          ${Object.entries(Examples).map(([category, examples]) => `
          <div class="category" data-category="${category}">
            <h2>${category}</h2>
            ${examples.map(example => `
            <button class="content-btn" title="${example.description || example.title}">
              <span class="content-btn-title">${example.description || example.title}</span>
              ${example.description ? `
              <div class="content-btn-metadata-container">
                <span class="content-btn-info">${example.title}</span>
              </div>` : ''}
            </button>
            `).join('')}
          </div>
          `).join('')}
      </div>
    `);
  }
}

router.addRoute('examples', () => new ExamplePage());
