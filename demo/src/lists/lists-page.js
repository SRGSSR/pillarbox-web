/**
 * Defines a route for the path ('lists') that replaces the main content of the
 * page with a navigable tree of SRG SSR content.
 *
 * @module
 */
import { parseHtml } from '../core/html-utils';
import router from '../core/router';
import { openPlayerModal } from '../player/player-dialog';
import { listsSections } from './lists-sections';
import SpinnerComponent from '../core/spinner-component';
import Pillarbox from '../../../src/pillarbox';
import IntersectionObserverComponent
  from '../core/intersection-observer-component';
import ListsPageStateManager from './lists-page-state-manager';
import ScrollToTopButton from '../core/scroll-to-top-btn';

/**
 * Represents the Lists page.
 *
 * @class
 */
class ListsPage {
  /**
   * The spinner component of this page.
   *
   * @private
   * @type {SpinnerComponent}
   */
  #spinner;
  /**
   * The DOM element that contains the sections.
   *
   * @private
   * @type {Element}
   */
  #sectionsEl;
  /**
   * The DOM element that contains the navigation.
   *
   * @private
   * @type {Element}
   */
  #treeNavigationEl;
  /**
   * The abort controller for handling search cancellation.
   *
   * @private
   * @type {AbortController}
   */
  #abortController;
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
   * Keeps track of the state of the list page : the current level in display, as
   * well as the traversal stack.
   *
   * @private
   * @type {ListsPageStateManager}
   */
  #stateManager;

  /**
   * Creates an instance of ListsPage.
   *
   * @constructor
   * @param {Array} contentRoot - The root of the content tree.
   */
  constructor(contentRoot) {
    this.#stateManager = new ListsPageStateManager(contentRoot);
  }

  /**
   * Initializes the content tree page.
   */
  init() {
    // Create the view
    const containerEl = document.querySelector('#pbw-container');

    containerEl.replaceChildren(...parseHtml(`
        <div id="tree-navigation" class="tree-navigation-container"></div>
        <div id="sections"></div>
    `));

    this.#spinner = new SpinnerComponent(
      (node) => containerEl.appendChild(node)
    );
    this.#sectionsEl = document.querySelector('#sections');
    this.#treeNavigationEl = document.querySelector('#tree-navigation');

    this.updateView();
    this.initListeners();
  }

  /**
   * Initializes the DOM event listeners.
   */
  initListeners() {
    // Attach content selection listener
    this.#sectionsEl.addEventListener('click', async (event) => {
      const button = event.target.closest('button');

      if (!this.#spinner.hidden || !('nodeIdx' in button.dataset)) return;

      this.#spinner.show();
      const sectionIndex = button.parentNode.dataset.sectionIdx;
      const nodeIndex = button.dataset.nodeIdx;

      try {
        await this.navigateTo(sectionIndex, nodeIndex);
        this.#updateRouterState();
      } finally {
        this.#spinner.hide();
      }
    });

    // Attach navigation listener
    this.#treeNavigationEl.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() !== 'button') return;
      this.#stateManager.fetchPreviousState(event.target.dataset.navigationIdx);
      this.updateView();
      this.#updateRouterState();
    });
  }

  /**
   * Navigates to the specified section and node in the content tree.
   *
   * @param {number} sectionIndex - The index of the section.
   * @param {number} nodeIndex - The index of the node.
   */
  async navigateTo(sectionIndex, nodeIndex) {
    if (this.#stateManager.isLeafSection(sectionIndex)) {
      const selectedNode = this.#stateManager
        .retrieveNode(sectionIndex, nodeIndex);

      openPlayerModal({ src: selectedNode.urn, type: 'srgssr/urn' });
    } else {
      this.#sectionsEl.replaceChildren();
      await this.#stateManager.fetchNextState(sectionIndex, nodeIndex);
      this.updateView();
    }
  }

  /**
   * Handles the state change event by navigating to the specified section and
   * nodes in the content tree based on the provided parameters.
   *
   * This method updates the ListsPage instance's state, triggering navigation
   * and ensuring the view is in sync with the new state.
   *
   * @param {object} options - Options related to the state change event.
   * @param {string} options.section - The section to navigate to.
   * @param {string} options.bu - The business unit (node) to navigate to.
   * @param {string} options.nodes - A comma-separated list of node identifiers indicating additional nodes to navigate to.
   */
  async onStateChanged({ section, bu, nodes }) {
    const manager = new ListsPageStateManager(
      this.#stateManager.root
    );

    await manager.initialize(section, bu, nodes);
    this.#stateManager = manager;

    this.updateView();
  }


  /**
   * Updates the state of the router based on the current traversal stack.
   * This method is responsible for updating the router's state with the current navigation information,
   * ensuring that the browser's URL reflects the current state of the ListsPage instance.
   */
  #updateRouterState() {
    router.updateState(this.#stateManager.params);
  }

  /**
   * Updates the view of the content tree page.
   */
  updateView() {
    this.updateNavigation();
    this.updateSections();
  }

  /**
   * Updates the sections in the content tree page.
   */
  updateSections() {
    this.#intersectionObserverComponent?.remove();
    this.#scrollToTopBtn?.remove();
    this.#sectionsEl.replaceChildren(
      ...parseHtml(this.#stateManager.level.map((section, idx) => `
      <div data-section-idx="${idx}" class="section fade-in">
          <h2 class="sticky">${section.title}</h2>
          ${this.createNodesHtml(section.nodes)}
      </div>
    `).join(''))
    );
    this.initIntersectionObserver();
    this.initScrollToTopButton();
  }

  /**
   * Creates the HTML content for all the nodes in a section.
   *
   * @param nodes the nodes which content has to be created.
   *
   * @returns {string} the HTML as a string.
   */
  createNodesHtml(nodes) {
    return nodes.map((node, idx) => this.createButtonEl(node, idx)).join('');
  }

  /**
   * Initializes the {@link ScrollToTopButton}.
   *
   * This function creates and attaches a component to the DOM allowing to
   * immediately scroll to the top of the page on click. The component
   * is only attached if more than a page exists on the search result.
   */
  initScrollToTopButton() {
    const firstSection = this.#stateManager.level[0];

    if (this.#stateManager.level.length !== 1 || !firstSection.next) return;

    this.#scrollToTopBtn = new ScrollToTopButton(
      (n) => this.#sectionsEl.insertAdjacentElement('afterend', n)
    );
  }

  /**
   * Initializes the {@link IntersectionObserverComponent} for infinite scrolling.
   *
   * This function creates and attaches a component to the DOM, enabling
   * infinite scrolling behavior. This component triggers the {@link nextPage}
   * method when it comes into view, allowing the loading of the next set of nodes.
   */
  initIntersectionObserver() {
    const firstSection = this.#stateManager.level[0];

    if (this.#stateManager.level.length !== 1 || !firstSection.next) return;

    this.#intersectionObserverComponent = new IntersectionObserverComponent(
      (n) => this.#sectionsEl.insertAdjacentElement('afterend', n),
      () => this.nextPage(firstSection)
    );
  }

  /**
   * Advances to the next page of nodes  and updates the UI accordingly.
   *
   * @throws {Promise<Response>} - A rejected promise with the response object if
   * the fetch request for the next page fails.
   */
  async nextPage(section) {
    const signal = this.abortCurrentFetch();
    const nodes = await section.fetchNext(signal);

    this.#sectionsEl
      .querySelector('.section')
      .append(...parseHtml(this.createNodesHtml(nodes)));
  }

  /**
   * Aborts the previous search by cancelling the associated abort signal and
   * creates a new abort controller for the next search.
   *
   * @returns {AbortSignal} - The abort signal associated with the new search.
   */
  abortCurrentFetch() {
    this.#abortController?.abort('New fetch launched');
    this.#abortController = new AbortController();

    return this.#abortController.signal;
  }

  /**
   * Creates the html content of a button for a node.
   *
   * @param node the node.
   * @param idx the index of the node in the section.
   *
   * @returns {string} the HTML as a string.
   */
  createButtonEl(node, idx) {
    if (node.mediaType) {
      const date = new Intl.DateTimeFormat('fr-CH').format(new Date(node.date));
      const duration = Pillarbox.formatTime(node.duration / 1000);

      return `
        <button class="content-btn"data-node-idx="${idx}" title="${node.title}">
            <span class="content-btn-title">${node.title}</span>
            <div class="content-btn-metadata-container">
                <i class="material-icons-outlined">${node.mediaType === 'VIDEO' ? 'movie' : 'audiotrack'}</i>
                <span class="content-btn-info">&nbsp;| ${date} | ${duration}</span>
            </div>
        </button>`;
    } else {
      return `
        <button class="content-btn" data-node-idx="${idx}">
            <span class="content-btn-title">${typeof node === 'string' ? node : node.title}</span>
        </button>`;
    }
  }

  /**
   * Updates the navigation in the content tree page.
   */
  updateNavigation() {
    if (this.#stateManager.stack.length > 0) {
      this.#treeNavigationEl.replaceChildren(...parseHtml(`
      <button data-navigation-idx="0">Home</button>
      ${this.#stateManager.stack.slice(1).map((step, idx) => `
      <i class="material-icons-outlined">chevron_right</i>
      <button data-navigation-idx="${idx + 1}">${step.level[step.sectionIndex].title}</button>
      `).join('')}
    `));
    } else {
      this.#treeNavigationEl.replaceChildren();
    }
  }
}

let listsPage;
let onStateChangedListener;

// Add route for 'lists' path
router.addRoute('lists', async (queryParams) => {
  listsPage = new ListsPage(listsSections);

  listsPage.init();

  onStateChangedListener = async (event) => {
    if (event.detail.popstate) {
      // If the state change is triggered externally we force the update,
      // otherwise the page is already aware of the change.
      await listsPage.onStateChanged(event.detail.queryParams);
    }
  };

  router.addEventListener('queryparams', onStateChangedListener);
  await listsPage.onStateChanged(queryParams);
}, () => {
  router.removeEventListener('queryparams', onStateChangedListener);
  listsPage.abortCurrentFetch();
  listsPage = null;
});
