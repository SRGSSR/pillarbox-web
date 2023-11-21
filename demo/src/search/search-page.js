/**
 * Defines a route for the '/search' path that replaces the main content of the
 * page with a search bar to find srgssr content.
 *
 * @module
 */
import router from '../core/router';
import { parseHtml } from '../core/html-utils';
import { openPlayerModal } from '../player/player-dialog';
import ilProvider from '../core/il-provider';
import SpinnerComponent from '../core/spinner-component';
import Pillarbox from '../../../src/pillarbox';

/**
 * Represents the search page.
 *
 * @class
 */
class SearchPage {
  /**
   * The spinner component for displaying loading state.
   *
   * @private
   * @type {SpinnerComponent}
   */
  #spinner;

  /**
   * The element to display search results.
   *
   * @private
   * @type {Element}
   */
  #resultsEl;

  /**
   * The dropdown element for selecting a business unit.
   *
   * @private
   * @type {Element}
   */
  #dropdownEl;

  /**
   * The abort controller for handling search cancellation.
   *
   * @private
   * @type {AbortController}
   */
  #abortController;

  /**
   * Creates an instance of SearchPage.
   * Initializes and sets up the necessary elements and event listeners.
   */
  constructor() {
    const containerEl = document.querySelector('#pbw-container');

    containerEl.replaceChildren(...this.createContentEl());
    this.#spinner = new SpinnerComponent(containerEl);
    this.#resultsEl = document.querySelector('#results');
    this.#dropdownEl = document.querySelector('#bu-dropdown');
    this.#abortController = new AbortController();
    this.initListeners();
  }

  /**
   * Initializes the event listeners for the search bar and search results :
   *
   * - Listens for 'Enter' key press to trigger a search.
   * - Listens for clicks on search results to open the player modal.
   */
  initListeners() {
    document.querySelector('#search-bar').addEventListener('keyup', async (event) => {
      if (event.key === 'Enter') {
        const bu = this.#dropdownEl.value;

        await this.search(bu, event.target.value);
      }
    });

    this.#resultsEl.addEventListener('click', (event) => {
      const button = event.target.closest('button');

      if (!('urn' in button.dataset)) {
        return;
      }

      openPlayerModal({ src: button.dataset.urn, type: 'srgssr/urn' });
    });

    this.#resultsEl.addEventListener('animationend', () => this.#resultsEl.classList.remove('fade-in'));
  }

  /**
   * Performs a search based on the specified business unit and query. Performing
   * a new search will abort the previous search if it's ongoing and display a
   * loading spinner for the asynchronous operation.
   *
   * @param {string} bu - The selected business unit.
   * @param {string} query - The search query.
   */
  async search(bu, query) {
    // Abort previous search and creates a new abort controller
    this.#abortController?.abort('New search launched');
    this.#abortController = new AbortController();

    const signal = this.#abortController.signal;

    this.#resultsEl.replaceChildren();
    this.#spinner.show();

    try {
      const results = await ilProvider.search(bu, query, signal);

      this.#resultsEl.replaceChildren(...this.createResultsEl(results));
      this.#resultsEl.classList.add('fade-in');
    } finally {
      this.#spinner.hide();
    }
  }

  /**
   * Creates and returns the HTML elements for the search page content.
   *
   * @returns {HTMLElement[]} - An array of HTML elements representing the search page content.
   */
  createContentEl() {
    return parseHtml(`
    <div class="search-bar-container fade-in">
      <select id="bu-dropdown" aria-label="Select a business unit">
          <option value="rsi" selected>RSI</option>
          <option value="rtr">RTR</option>
          <option value="rts">RTS</option>
          <option value="srf">SRF</option>
          <option value="swi">SWI</option>
      </select>
      <input type="text" id="search-bar" placeholder="Search for content...">
    </div>

    <!-- Search results -->
    <div id="results" class="results-container"></div>
  `);
  }

  /**
   * Creates and returns HTML elements for the search results based on the provided results data.
   *
   * @param {Object[]} results - An array of search results.
   *
   * @returns {HTMLElement[]} - An array of HTML elements representing the search results.
   */
  createResultsEl(results) {
    return parseHtml(results.map(r => {
      const date = new Intl.DateTimeFormat('fr-CH').format(new Date(r.date));
      const duration = Pillarbox.formatTime(r.duration / 1000);

      return `
        <button class="content-btn" data-urn="${r.urn}" title="${r.title}">
            <span class="content-btn-title">${r.title}</span>
            <div class="content-btn-metadata-container">
                <span class="material-icons-outlined">${r.mediaType === 'VIDEO' ? 'movie' : 'audiotrack'}</span>
                <span class="content-btn-info">&nbsp;| ${date} | ${duration}</span>
            </div>
        </button>`;
    }).join(''));
  }
}


router.addRoute('search', () => new SearchPage());
