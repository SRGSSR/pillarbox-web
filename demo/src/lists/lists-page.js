import { html, LitElement, unsafeCSS } from 'lit';
import { animations, theme } from '../theme/theme';
import router from '../router/router';
import componentCSS from 'bundle-text:./lists-page.scss';
import '../spinner/spinner-component';
import '../core/intersection-observer-component';
import '../core/scroll-to-top-component';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { openPlayerModal } from '../player/player-dialog';
import ListsPageStateManager from './lists-page-state-manager';
import { listsSections } from './lists-sections';
import Pillarbox from '../../../src/pillarbox';

export class ListsPage extends LitElement {
  static properties = {
    loading: { state: true, type: Boolean },
    stack: { state: true, type: Array },
    level: { state: true, type: Object },
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
   * Keeps track of the state of the list page : the current level in display, as
   * well as the traversal stack.
   *
   * @private
   * @type {ListsPageStateManager}
   */
  #stateManager;
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
    this.#stateManager = new ListsPageStateManager(listsSections);
    this.stack = this.#stateManager.stack;
    this.level = this.#stateManager.level;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#onQueryParamsChanged = async (event) => {
      if (!event.detail.popstate) {
        return;
      }

      this.abortFetch();
      const manager = new ListsPageStateManager(this.#stateManager.root),
        { section, bu, nodes } = event.detail.queryParams;

      this.loading = true;
      try {
        await manager.initialize(section, bu, nodes);
        this.#stateManager = manager;
        this.#updateState();
      } finally {
        this.loading = false;
      }
    };
    router.addEventListener('queryparams', this.#onQueryParamsChanged);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.abortFetch();
    router.removeEventListener('queryparams', this.#onQueryParamsChanged);
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.#onQueryParamsChanged(
      { detail: { popstate: true, queryParams: router.queryParams }}
    );
  }

  #updateState() {
    this.stack = [...this.#stateManager.stack];
    this.level = [...this.#stateManager.level];
  }

  /**
   * Navigates to the specified section and node in the content tree.
   *
   * @param {number} sectionIndex - The index of the section.
   * @param {number} nodeIndex - The index of the node.
   */
  async navigateTo(sectionIndex, nodeIndex) {
    if (this.#stateManager.isLeafSection(sectionIndex)) {
      const node = this.#stateManager.retrieveNode(sectionIndex, nodeIndex);

      openPlayerModal({ src: node.urn, type: 'srgssr/urn' });
    } else {
      this.abortFetch();
      this.loading = true;
      try {
        await this.#stateManager.fetchNextState(sectionIndex, nodeIndex);
        this.#updateState();
      } finally {
        this.loading = false;
      }
    }
  }

  /**
   * Aborts the previous fetch by cancelling the associated abort signal and
   * creates a new abort controller for the next fetch.
   *
   * @returns {AbortSignal} - The abort signal associated with the new fetch.
   */
  abortFetch() {
    this.#abortController?.abort('New search launched');
    this.#abortController = new AbortController();

    return this.#abortController.signal;
  }

  #openPlayer(event) {
    const button = event.target.closest('button');

    if (!('urn' in button.dataset)) return;

    openPlayerModal({ src: button.dataset.urn, type: 'srgssr/urn' });
  }

  #renderMediaButton(node, idx) {
    const date = new Intl.DateTimeFormat('fr-CH').format(new Date(node.date));
    const duration = Pillarbox.formatTime(node.duration / 1000);

    return html`
        <button class="content-btn" data-node-idx="${idx}"
                title="${node.title}">
            <span class="content-btn-title">${node.title}</span>
            <div class="content-btn-metadata-container">
                <i class="material-icons-outlined">${node.mediaType === 'VIDEO' ? 'movie' : 'audiotrack'}</i>
                <span class="content-btn-info">&nbsp;| ${date} | ${duration}</span>
            </div>
        </button>
    `;
  }

  #renderLevelButton(node, idx) {
    return html`
        <button class="content-btn" data-node-idx="${idx}">
            <span class="content-btn-title">${typeof node === 'string' ? node : node.title}</span>
        </button>
    `;
  }

  async #nextPage(section) {
    const signal = this.abortFetch();

    await section.fetchNext(signal);
    this.#updateState();
  }

  #renderNodes(nodes) {
    const firstSection = this.level[0];
    const hasIntesectionObserver = this.level.length === 1 && firstSection.next;

    return html`
        ${map(nodes, (node, idx) => html`
            ${when(node.mediaType, () => this.#renderMediaButton(node, idx), () => this.#renderLevelButton(node, idx))}
        `)}
        ${when(hasIntesectionObserver, () => html`
            <intersection-observer
                    @intersecting="${() => this.#nextPage(firstSection)}">
            </intersection-observer>
        `)}
    `;
  }

  async #onSectionsClicked(e) {
    const button = e.target.closest('button');

    if (this.loading || !('nodeIdx' in button.dataset)) return;

    const sectionIndex = button.parentNode.dataset.sectionIdx;
    const nodeIndex = button.dataset.nodeIdx;

    await this.navigateTo(sectionIndex, nodeIndex);
    router.updateState(this.#stateManager.params);
  }

  #renderResults() {
    return html`
        <div class="sections fade-in"
             @animationend="${e => e.target.classList.remove('fade-in')}"
             @click="${this.#onSectionsClicked.bind(this)}">
            ${map(this.level, (section, idx) => html`
                <div data-section-idx="${idx}" class="section">
                    <h2 class="sticky">${section.title}</h2>
                    ${this.#renderNodes(section.nodes)}
                </div>
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
    return html`
        <scroll-to-top-button></scroll-to-top-button>`;
  }

  #onNavigationClicked(e) {
    if (e.target.tagName.toLowerCase() !== 'button') return;
    this.abortFetch();
    this.#stateManager.fetchPreviousState(e.target.dataset.navigationIdx);
    this.#updateState();
    router.updateState(this.#stateManager.params);
  }

  #renderNavigation() {
    return html`
        <div class="tree-navigation-container"
             @click="${this.#onNavigationClicked.bind(this)}">
            ${when(this.stack.length > 0, () => html`
                <button data-navigation-idx="0">Home</button>
            `)}
            ${map(this.stack.slice(1), (step, idx) => html`
                <i class="material-icons-outlined">chevron_right</i>
                <button data-navigation-idx="${idx + 1}">
                    ${step.level[step.sectionIndex].title}
                </button>
            `)}
        </div>
    `;
  }

  render() {
    const renderScrollBtn = this.level.length === 1 && this.level[0].next;

    return html`
        ${this.#renderNavigation()}
        ${when(this.loading, this.#renderSpinner.bind(this), this.#renderResults.bind(this))}
        ${when(renderScrollBtn, this.#renderScrollToTopBtn.bind(this))}
    `;
  }
}

customElements.define('lists-page', ListsPage);
router.addRoute('lists', 'lists-page');
