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
   * Stack to keep track of the traversal steps for navigation.
   *
   * @private
   * @type {Array<Array<Section>>}
   */
  #traversalStack = [];
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
   * The current level of the content tree.
   *
   * @private
   * @type {Array<Section>}
   */
  #currentLevel;
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
   * Creates an instance of ListsPage.
   *
   * @constructor
   * @param {Array} contentRoot - The root of the content tree.
   */
  constructor(contentRoot) {
    this.#currentLevel = contentRoot;
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

    this.updateView(this.#currentLevel);
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
      } finally {
        this.#spinner.hide();
      }
    });

    // Attach navigation listener
    this.#treeNavigationEl.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() !== 'button') return;

      const navigationIdx = event.target.dataset.navigationIdx;

      this.#currentLevel = this.#traversalStack[navigationIdx].level;
      this.#traversalStack.splice(navigationIdx);
      this.updateView();
    });
  }

  /**
   * Navigates to the specified section and node in the content tree.
   *
   * @param {number} sectionIndex - The index of the section.
   * @param {number} nodeIndex - The index of the node.
   */
  async navigateTo(sectionIndex, nodeIndex) {
    const selectedSection = this.#currentLevel[sectionIndex];
    const selectedNode = selectedSection.nodes[nodeIndex];

    if (selectedSection.isLeaf()) {
      openPlayerModal({ src: selectedNode.urn, type: 'srgssr/urn' });
    } else {
      this.#sectionsEl.replaceChildren();
      const nextLevel = [await selectedSection.resolve(selectedNode)];

      this.#traversalStack.push({
        level: this.#currentLevel,
        sectionIndex,
        nodeIndex
      });
      this.#currentLevel = nextLevel;
      this.updateView();
    }
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
    this.#sectionsEl.replaceChildren(
      ...parseHtml(this.#currentLevel.map((section, idx) => `
      <div data-section-idx="${idx}" class="section fade-in">
          <h2 class="sticky">${section.title}</h2>
          ${this.createNodesHtml(section.nodes)}
      </div>
    `).join(''))
    );
    this.initIntersectionObserver();
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
   * Initializes the {@link IntersectionObserverComponent} for infinite scrolling.
   *
   * This function creates and attaches a component to the DOM, enabling
   * infinite scrolling behavior. This component triggers the {@link nextPage}
   * method when it comes into view, allowing the loading of the next set of nodes.
   */
  initIntersectionObserver() {
    const firstSection = this.#currentLevel[0];

    if (this.#currentLevel.length !== 1 || !firstSection.next) return;

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

    this.#sectionsEl.append(...parseHtml(this.createNodesHtml(nodes)));
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
                <span class="material-icons-outlined">${node.mediaType === 'VIDEO' ? 'movie' : 'audiotrack'}</span>
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
    if (this.#traversalStack.length > 0) {
      this.#treeNavigationEl.replaceChildren(...parseHtml(`
      <button data-navigation-idx="0">Home</button>
      ${this.#traversalStack.slice(1).map((step, idx) => `
      <span>&gt;</span>
      <button data-navigation-idx="${idx + 1}">${step.level[step.sectionIndex].title}</button>
      `).join('')}
    `));
    } else {
      this.#treeNavigationEl.replaceChildren();
    }
  }
}

// Add route for 'content-tree' path
router.addRoute('lists', () => new ListsPage(listsSections).init());
