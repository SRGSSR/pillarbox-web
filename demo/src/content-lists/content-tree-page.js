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

/**
 * Creates the main content elements for this page : the navigation container and the
 * sections container.
 *
 * @returns {HTMLElement} The created content element.
 */
const createContentEl = () => {
  return parseHtml(`
    <div id="tree-navigation"></div>
    <div id="sections"></div>
  `);
};

/**
 * Represents the Lists page.
 *
 * @class
 */
class ListsPage {
  /**
   * Creates an instance of ListsPage.
   *
   * @constructor
   * @param {Array} contentRoot - The root of the content tree.
   */
  constructor(contentRoot) {
    /**
     * The current level of the content tree.
     * @type {Array}
     */
    this.currentLevel = contentRoot;
    /**
     * Stack to keep track of the traversal steps for navigation.
     * @type {Array}
     */
    this.traversalStack = [];
    /**
     * Flag indicating whether content is currently being loaded.
     * @type {boolean}
     */
    this.loading = false;
  }

  /**
   * Initializes the content tree page.
   */
  init() {
    // Create the view
    document.querySelector('.container').replaceChildren(...createContentEl());
    this.updateView(this.currentLevel);

    // Attach content selection listener
    document.querySelector('#sections').addEventListener('click', async (event) => {
      if (this.loading || event.target.tagName.toLowerCase() !== 'button') {
        return;
      }

      this.loading = true;
      const sectionIndex = event.target.parentNode.dataset.sectionIdx;
      const nodeIndex = event.target.dataset.nodeIdx;

      try {
        await this.navigateTo(sectionIndex, nodeIndex);
      } finally {
        this.loading = false;
      }
    });

    // Attach navigation listener
    document.querySelector('#tree-navigation').addEventListener('click', (event) => {
      if (event.target.tagName.toLowerCase() !== 'button') {
        return;
      }

      const navigationIdx = event.target.dataset.navigationIdx;

      this.currentLevel = this.traversalStack[navigationIdx].level;
      this.traversalStack.splice(navigationIdx);
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
    const selectedSection = this.currentLevel[sectionIndex];
    const selectedNode = selectedSection.nodes[nodeIndex];

    if (selectedSection.isLeaf()) {
      openPlayerModal({ src: selectedNode.urn, type: 'srgssr/urn' });
    } else {
      const nextLevel = [await selectedSection.resolve(selectedNode)];

      this.traversalStack.push({
        level: this.currentLevel,
        sectionIndex,
        nodeIndex
      });
      this.currentLevel = nextLevel;
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
    document.querySelector('#sections').replaceChildren(
      ...parseHtml(this.currentLevel.map((section, idx) => `
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
    if (this.traversalStack.length > 0) {
      document.querySelector('#tree-navigation').replaceChildren(...parseHtml(`
      <button data-navigation-idx="0">Home</button>
      ${this.traversalStack.slice(1).map((step, idx) => `
      &gt;  <button data-navigation-idx="${idx + 1}">${step.level[step.sectionIndex].title}</button>
      `).join('')}
    `));
    } else {
      document.querySelector('#tree-navigation').replaceChildren();
    }
  }
}

// Add route for 'content-tree' path
router.addRoute('lists', () => {
  new ListsPage(contentTreeRootSections).init();
});
