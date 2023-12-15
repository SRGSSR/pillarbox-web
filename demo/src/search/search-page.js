import { html, LitElement, unsafeCSS } from 'lit';
import { animations, theme } from '../theme/theme';
import router from '../router/router';
import componentCSS from 'bundle-text:./search-page.scss';
import './search-bar-component';
import ilProvider from '../core/il-provider';
import '../spinner/spinner-component';
import '../core/intersection-observer-component';
import '../core/scroll-to-top-component';
import { map } from 'lit/directives/map.js';
import Pillarbox from '../../../src/pillarbox';
import { when } from 'lit/directives/when.js';
import { openPlayerModal } from '../player/player-dialog';
import { classMap } from 'lit/directives/class-map.js';

export class SearchPage extends LitElement {
  static properties = {
    loading: { state: true, type: Boolean },
    results: { state: true, type: Array },
    nextPage: { state: true, type: Function }
  };

  static styles = [
    theme, animations, unsafeCSS(componentCSS)
  ];

  /**
   * The abort controller for handling search cancellation.
   *
   * @private
   * @type {AbortController}
   */
  #abortController = new AbortController();
  /**
   * The reference to the query params changed event handler.
   *
   * @private
   * @type {Function}
   */
  #onQueryParamsChanged;

  constructor() {
    super();

    this.loading = false;
    this.results = null;
    this.nextPage = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#onQueryParamsChanged = async () => {
      const query = router.queryParams.query ?? '';
      const bu = router.queryParams.bu ?? 'rsi';
      const searchBar = this.renderRoot.querySelector('search-bar');

      if (searchBar.query !== query || searchBar.bu !== bu) {
        searchBar.query = query;
        searchBar.bu = bu;
        await this.#search(bu, query);
      }
    };
    router.addEventListener('queryparams', this.#onQueryParamsChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.abortSearch();
    router.removeEventListener('queryparams', this.#onQueryParamsChanged);
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);

    this.#onQueryParamsChanged();
  }

  async #onSearchBarChanged(bu, query) {
    router.updateState({ bu, ...(query ? { query } : {}) });
    await this.#search(bu, query);
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
  async #search(bu, query) {
    const signal = this.abortSearch();

    if (!query) {
      [this.results, this.nextPage] = [null, null];

      return;
    }

    this.loading = true;
    try {
      const data = await ilProvider.search(bu, query, signal);

      [this.results, this.nextPage] = [data.results, data.next];
    } finally {
      this.loading = false;
    }
  }

  /**
   * Advances to the next page of search results and updates the UI accordingly.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if
   * the fetch request for the next page fails.
   */
  async #fetchNextPage() {
    const signal = this.abortSearch();
    const data = await this.nextPage(signal);

    this.nextPage = data.next;
    this.results = [...this.results, ...data.results];
  }

  /**
   * Aborts the previous search by cancelling the associated abort signal and
   * creates a new abort controller for the next search.
   *
   * @returns {AbortSignal} - The abort signal associated with the new search.
   */
  abortSearch() {
    this.#abortController?.abort('New search launched');
    this.#abortController = new AbortController();

    return this.#abortController.signal;
  }

  #openPlayer(event) {
    const button = event.target.closest('button');

    if (!('urn' in button.dataset)) return;

    openPlayerModal({ src: button.dataset.urn, type: 'srgssr/urn' });
  }

  #renderButton(r) {
    const date = new Intl.DateTimeFormat('fr-CH').format(new Date(r.date));
    const duration = Pillarbox.formatTime(r.duration / 1000);

    return html`
      <button class="content-btn" data-urn="${r.urn}" title="${r.title}">
        <span class="content-btn-title">${r.title}</span>
        <div class="content-btn-metadata-container">
          <i
            class="material-icons-outlined">${r.mediaType === 'VIDEO' ? 'movie' : 'audiotrack'}</i>
          <span class="content-btn-info">&nbsp;| ${date} | ${duration}</span>
        </div>
      </button>
    `;
  }

  #renderResults() {
    const resultsClassMap = {
      'empty' : this.results == null,
      'no-results' : this.results && this.results.length === 0
    };

    return html`
      <div
        class="results-container material-icons fade-in ${classMap(resultsClassMap)}"
        @animationend="${e => e.target.classList.remove('fade-in')}"
        @click="${this.#openPlayer.bind(this)}">
        ${map(this.results ?? [], this.#renderButton.bind(this))}
        ${when(this.nextPage, () => html`
          <intersection-observer
            @intersecting="${this.#fetchNextPage.bind(this)}">
          </intersection-observer>
        `)}
      </div>
    `;
  }

  #renderSpinner() {
    return html`
      <loading-spinner loading class="slide-up-fade-in"
                       @animationend="${e => e.target.classList.remove('slide-up-fade-in')}">
      </loading-spinner>
    `;
  }

  #renderScrollToTopBtn() {
    return html`<scroll-to-top-button></scroll-to-top-button>`;
  }

  render() {
    return html`
      <search-bar
        @change="${(e) => this.#onSearchBarChanged(e.detail.bu, e.detail.query)}">
      </search-bar>

      <!-- Search results -->
      ${when(this.loading, this.#renderSpinner.bind(this), this.#renderResults.bind(this))}
      ${when(this.results?.length > 0, this.#renderScrollToTopBtn.bind(this))}
    `;
  }
}

customElements.define('search-page', SearchPage);
router.addRoute('search', 'search-page');