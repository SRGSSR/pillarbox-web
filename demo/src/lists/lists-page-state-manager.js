import { toKebabCase } from '../core/string-utils';

/**
 * Manages the state of a lists page, allowing navigation and retrieval of section data.
 *
 * @class
 */
class ListsPageStateManager {
  /**
   * Creates an instance of ListsPageStateManager.
   *
   * @constructor
   * @param {Array<Section>} root - The root level of the lists page.
   */
  constructor(root) {
    /**
     * Stack to keep track of the traversal steps for navigation.
     *
     * @private
     * @type {Array<{level: Array<Section>, sectionIndex: number, nodeIndex: number}>}
     */
    this.stack = [];
    /**
     * The current level of the content tree.
     *
     * @private
     * @type {Array<Section>}
     */
    this.level = root;
  }

  /**
   * Initializes the state manager with the provided section, business unit, and nodes.
   *
   * @async
   * @param {string} section - The section to initialize.
   * @param {string} bu - The business unit associated with the section.
   * @param {string} nodes - A comma-separated string of nodes representing the initial state.
   * @returns {Promise<void>} - A promise that resolves when initialization is complete.
   *
   * @example
   * // Example Usage:
   * await stateManager.initialize("radio-shows", "rts", "a9e7621504c6959e35c3ecbe7f6bed0446cdf8da,urn:rts:show:radio:9801398");
   */
  async initialize(section, bu, nodes) {
    if (!section || !bu) {
      return;
    }

    const sectionIndex = this.#findSectionIndex(section);
    const nodeIndex = this.#findNodeIndex(this.level[sectionIndex].nodes, bu);

    await this.fetchNextState(sectionIndex, nodeIndex);


    for (const nodeStr of (nodes?.split(',') || [])) {
      const nodeIndex = this.#findNodeIndex(this.level[0].nodes, nodeStr);

      await this.fetchNextState(0, nodeIndex);
    }
  }

  /**
   * Fetches the next state based on the provided section index and node index.
   *
   * @param {number} sectionIndex - The index of the section.
   * @param {number} nodeIndex - The index of the node.
   * @returns {Promise<void>} - A promise that resolves when the state is fetched.
   */
  async fetchNextState(sectionIndex, nodeIndex) {
    const section = this.level[sectionIndex];

    this.stack.push({ level: this.level, sectionIndex, nodeIndex });
    this.level = [await section.resolve(section.nodes[nodeIndex])];
  }

  /**
   * Fetches the previous state based on the provided stack index.
   *
   * @param {number} stackIndex - The index in the stack.
   */
  fetchPreviousState(stackIndex) {
    this.level = this.stack[stackIndex].level;
    this.stack.splice(stackIndex);
  }

  /**
   * Checks if the specified section at the given index is a leaf section.
   *
   * @param {number} sectionIndex - The index of the section.
   *
   * @returns {boolean} - True if the section is a leaf section, false otherwise.
   */
  isLeafSection(sectionIndex) {
    return this.level[sectionIndex]?.isLeaf();
  }

  /**
   * Retrieves the node at the specified section and node indices.
   *
   * @param {number} sectionIndex - The index of the section.
   * @param {number} nodeIndex - The index of the node.
   *
   * @returns {any} - The retrieved node.
   */
  retrieveNode(sectionIndex, nodeIndex) {
    return this.level[sectionIndex]?.nodes[nodeIndex];
  }

  /**
   * Gets the root level of the content tree.
   *
   * @returns {Array<Section>} - The root level of the content tree.
   */
  get root() {
    return this.stack[0]?.level || this.level;
  }

  /**
   * Return the current state of this manager as query params that are parsable
   * by {@link #initialize}.
   *
   * @returns {{}|{bu: string, section: string, nodes?: string}} The current state as query params.
   */
  get params() {
    if (this.stack.length === 0) {
      return {};
    }

    const root = this.stack[0];
    const rootSection = root.level[root.sectionIndex];
    const nodes = this.stack.slice(1).map(n => {
      const node = n.level[n.sectionIndex].nodes[n.nodeIndex];

      return node.id || node.urn;
    });
    let params = {
      section: toKebabCase(rootSection.title),
      bu: rootSection.nodes[root.nodeIndex].toLowerCase()
    };

    if (nodes && nodes.length) {
      params['nodes'] = nodes.join(',');
    }

    return params;
  }


  /**
   * Finds the index of a section based on its title in kebab case.
   *
   * @private
   * @param {string} sectionStr - The section title to find.
   * @returns {number} - The index of the section.
   *
   * @example
   * const index = stateManager.#findSectionIndex("Products");
   */
  #findSectionIndex(sectionStr) {
    const normalizedSectionStr = toKebabCase(sectionStr).toLowerCase();

    return this.level
      .map(s => toKebabCase(s.title).toLowerCase())
      .findIndex(title => title === normalizedSectionStr);
  }

  /**
   * Finds the index of a node based on its string representation.
   *
   * @private
   * @param {Array<Node>} nodes - The array of nodes to search.
   * @param {string} str - The string representation of the node to find.
   *
   * @returns {number} - The index of the node.
   */
  #findNodeIndex(nodes, str) {
    const normalizedStr = str.toLowerCase();

    return nodes
      .map(n => (n.urn || n.id || n.toString()).toLowerCase())
      .findIndex(n => n === normalizedStr);
  }
}

export default ListsPageStateManager;
