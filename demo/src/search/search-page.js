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
import IntersectionObserverComponent
  from '../core/intersection-observer-component';
import ScrollToTopButton from '../core/scroll-to-top-btn';

/**
 * Represents the search page.
 *
 * @class
 */
class SearchPage {

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
  #abortController = new AbortController();

  /**
   * The search bar element.
   *
   * @private
   * @type {Element}
   */
  #searchBarEl;

  /**
   * The component that triggers the next page fetching when in view.
   *
   * @private
   * @type {IntersectionObserverComponent}
   */
  #intersectionObserverComponent;

  /**
   * The button allowing to scroll to the top of the page.
   *
   * @priate
   * @type {ScrollToTopButton}
   */
  #scrollToTopBtn;

  /**
   * The function that triggers the fetching of the next page data.
   *
   * @private
   * @type {(signal?: AbortSignal) => Promise<{ results: any, next: function }>}
   */
  #fetchNextPage;

  /**
   * The last performed query.
   *
   * @type {string}
   */
  #lastQuery;

  /**
   * Creates an instance of SearchPage.
   * Initializes and sets up the necessary elements and event listeners.
   */
  constructor() {
    const containerEl = document.querySelector('#pbw-container');

    containerEl.replaceChildren(...this.createContentEl());
    this.#resultsEl = document.querySelector('#results');
    this.#dropdownEl = document.querySelector('#bu-dropdown');
    this.#searchBarEl = document.querySelector('#search-bar');

    this.initListeners();
  }

  async onStateChanged({ query, bu }) {
    this.#searchBarEl.value = query || '';
    this.#dropdownEl.value = bu || 'rsi';

    if (query)
      await this.search(this.#dropdownEl.value, this.#searchBarEl.value);
    else
      this.#clearSearchResults();
  }

  /**
   * Initializes the event listeners for the search bar and search results :
   *
   * - Listens for 'Enter' key press to trigger a search.
   * - Listens for clicks on search results to open the player modal.
   */
  initListeners() {

    document
      .querySelector('#clear-search-btn')
      .addEventListener('click', () => this.#clearSearchInput());

    this.#searchBarEl.addEventListener('keyup', Pillarbox.fn.debounce((event) => {
      const query = event.target.value.trim();

      if (query === this.#lastQuery) return;
      this.#updateSearch(query);
    }, 500));

    this.#dropdownEl.addEventListener('change', () => {
      const query = this.#searchBarEl.value.trim();

      this.#updateSearch(query);
    });

    this.#resultsEl.addEventListener('click', (event) => {
      const button = event.target.closest('button');

      if (!('urn' in button.dataset)) return;

      openPlayerModal({ src: button.dataset.urn, type: 'srgssr/urn' });
    });

    this.#resultsEl.addEventListener('animationend', () => this.#resultsEl.classList.remove('fade-in'));
  }

  /**
   * Clears the search input and updates the query params accordingly.
   *
   * @private
   */
  #clearSearchInput() {
    const bu = this.#dropdownEl.value;

    this.#searchBarEl.value = '';
    router.updateState({ bu });
    this.#lastQuery = '';
  }

  /**
   * Updates the search parameters and updates the query parameters accordingly.
   *
   * @private
   * @param query the new query.
   */
  #updateSearch(query) {
    if (!query) return;

    const bu = this.#dropdownEl.value;

    router.updateState({ query, bu });
    this.#lastQuery = query;
  }

  /**
   * Performs a search based on the specified business unit and query. Performing
   * a new search will abort the previous search if it's ongoing and display a
   * loading spinner for the asynchronous operation.
   *
   * @param {string} bu - The selected business unit.
   * @param {string} query - The search query.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if
   * the fetch request for the search results fails.
   */
  async search(bu, query) {
    const signal = this.#clearSearchResults();
    const spinner = new SpinnerComponent(
      (node) => this.#resultsEl.replaceChildren(node),
      false
    );

    try {
      const data = await ilProvider.search(bu, query, signal);

      this.#fetchNextPage = data.next;
      this.#resultsEl.replaceChildren(...this.createResultsEl(data.results));
      this.#resultsEl.classList.add('fade-in');
      this.initIntersectionObserver();
      this.initScrollToTopButton();
    } finally {
      spinner.remove();
    }
  }

  /**
   * Clear the search results and intersection observer and aborts any ongoing search query.
   *
   * @private
   *
   * @returns {AbortSignal} - The abort signal associated with a new search.
   */
  #clearSearchResults() {
    const signal = this.abortPreviousSearch();

    this.#scrollToTopBtn?.remove();
    this.#scrollToTopBtn = null;
    this.#intersectionObserverComponent?.remove();
    this.#intersectionObserverComponent = null;
    this.#resultsEl.replaceChildren();

    return signal;
  }

  /**
   * Initializes the {@link ScrollToTopButton}.
   *
   * This function creates and attaches a component to the DOM allowing to
   * immediately scroll to the top of the page on click. The component
   * is only attached if more than a page exists on the search result.
   */
  initScrollToTopButton() {
    if (!this.#fetchNextPage) return;

    this.#scrollToTopBtn = new ScrollToTopButton(
      (n) => this.#resultsEl.insertAdjacentElement('afterend', n)
    );
  }

  /**
   * Initializes the {@link IntersectionObserverComponent} for infinite scrolling.
   *
   * This function creates and attaches a component to the DOM, enabling
   * infinite scrolling behavior. The component triggers the {@link nextPage}
   * method when it comes into view, allowing the loading of the next set of search results.
   */
  initIntersectionObserver() {
    if (!this.#fetchNextPage) return;

    this.#intersectionObserverComponent = new IntersectionObserverComponent(
      (n) => this.#resultsEl.insertAdjacentElement('afterend', n),
      () => this.nextPage()
    );
  }

  /**
   * Advances to the next page of search results and updates the UI accordingly.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if
   * the fetch request for the next page fails.
   */
  async nextPage() {
    const signal = this.abortPreviousSearch();
    const data = await this.#fetchNextPage(signal);

    this.#fetchNextPage = data.next;
    this.#resultsEl.append(...this.createResultsEl(data.results));
  }

  /**
   * Aborts the previous search by cancelling the associated abort signal and
   * creates a new abort controller for the next search.
   *
   * @returns {AbortSignal} - The abort signal associated with the new search.
   */
  abortPreviousSearch() {
    this.#abortController?.abort('New search launched');
    this.#abortController = new AbortController();

    return this.#abortController.signal;
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
      <button id="clear-search-btn" title="Clear search"><i class="material-icons-outlined">close</i></button>
    </div>

    <!-- Search results -->
    <div id="results" class="results-container material-icons"></div>
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
    return parseHtml(results.map((r) => {
      const date = new Intl.DateTimeFormat('fr-CH').format(new Date(r.date));
      const duration = Pillarbox.formatTime(r.duration / 1000);

      return `
        <button class="content-btn" data-urn="${r.urn}" title="${r.title}">
            <span class="content-btn-title">${r.title}</span>
            <div class="content-btn-metadata-container">
                <i class="material-icons-outlined">${r.mediaType === 'VIDEO' ? 'movie' : 'audiotrack'}</i>
                <span class="content-btn-info">&nbsp;| ${date} | ${duration}</span>
            </div>
        </button>`;
    }).join(''));
  }
}


let searchPage;
let onStateChangedListener;

router.addRoute('search', async (queryParams) => {
  searchPage = new SearchPage();

  onStateChangedListener = async () => {
    await searchPage.onStateChanged(router.queryParams);
  };

  router.addEventListener('queryparams', onStateChangedListener);
  await searchPage.onStateChanged(queryParams);
}, () => {
  router.removeEventListener('queryparams', onStateChangedListener);
  searchPage.abortPreviousSearch();
  searchPage = null;
});
