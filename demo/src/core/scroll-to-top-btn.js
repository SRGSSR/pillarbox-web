import { parseHtml } from './html-utils';

let SCROLL_TO_TOP_BTN_ID = 0;

/**
 * A simple button component that, when clicked, scrolls the page to the top.
 * @class
 */
class ScrollToTopButton {
  /**
   * The button element reference.
   *
   * @private
   * @type {HTMLButtonElement}
   */
  #el;

  /**
   * Creates a new ScrollToTopButton component and attaches it to the provided parent element.
   *
   * @constructor
   * @param {(node?: Node) => void} attach - Callback function
   *     to customize how the button is attached to the document. Receives the button
   *     HTML node as an argument.
   */
  constructor(attach) {
    const id = `scroll-to-top-button-${SCROLL_TO_TOP_BTN_ID += 1}`;

    attach(parseHtml(`
      <button id="${id}" class="scroll-to-top-button" title="Scroll to top">
          <i class="material-icons-outlined">arrow_circle_up</i>
      </button>
    `)[0]);

    this.#el = document.getElementById(id);

    this.#el.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Removes the button from the DOM.
   */
  remove() {
    this.#el.remove();
  }
}

export default ScrollToTopButton;
