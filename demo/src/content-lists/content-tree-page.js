/**
 * Defines a route for the path ('lists') that replaces the main content of the
 * page with a navigable tree of SRG SSR content.
 *
 * @module
 */
import { parseHtml } from '../core/html-utils';
import router from '../core/router';
import { openPlayerModal } from '../player/player-dialog';
import { contentTreeRootSections } from './content-tree-root-sections';
import SpinnerComponent from '../core/spinner-component';

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
    const containerEl = document.querySelector('.container');

    containerEl.replaceChildren(...parseHtml(`
        <div id="tree-navigation"></div>
        <div id="sections"></div>
    `));

    this.#spinner = new SpinnerComponent(containerEl);
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
      if (!this.#spinner.hidden || event.target.tagName.toLowerCase() !== 'button') {
        return;
      }

      this.#spinner.show();
      const sectionIndex = event.target.parentNode.dataset.sectionIdx;
      const nodeIndex = event.target.dataset.nodeIdx;

      try {
        await this.navigateTo(sectionIndex, nodeIndex);
      } finally {
        this.#spinner.hide();
      }
    });

    // Attach navigation listener
    this.#treeNavigationEl.addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() !== 'button') {
        return;
      }

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
    this.#sectionsEl.replaceChildren(
      ...parseHtml(this.#currentLevel.map((section, idx) => `
      <div data-section-idx="${idx}" class="section">
          <h2>${section.title}</h2>
          ${section.nodes.map((node, idx) => `
          <button class="content-tree-btn" data-node-idx="${idx}">${typeof node === 'string' ? node : node.title}</button>
          `).join('')}
      </div>
    `).join(''))
    );
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
router.addRoute('lists', () => new ListsPage(contentTreeRootSections).init());
