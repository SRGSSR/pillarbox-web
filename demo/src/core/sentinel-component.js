import { onIntersecting, parseHtml } from './html-utils';

let SENTINEL_ID = 0;

/**
 * A simple sentinel component that can be attached to a DOM element.
 * @class
 */
class SentinelComponent {
  /**
   * The sentinel element reference.
   *
   * @private
   * @type {Element}
   */
  #el;

  /**
   * Creates a new Sentinel component and attaches it to the DOM through the
   * provided attach method.
   *
   * @constructor
   * @param {(node?: Node) => void} attach - Callback function to customize
   *     how the sentinel is attached to document. Receives the sentinel
   *     HTML node as an argument.
   * @param {function} intersectCallback - This function is called when the sentinel
   *     element is intersecting the viewport.
   */
  constructor(attach, intersectCallback) {
    const id = `sentinel-${SENTINEL_ID += 1}`;

    attach(parseHtml(`<div id="${id}" class="sentinel"></div>`)[0]);

    this.#el = document.getElementById(id);

    onIntersecting(this.#el, intersectCallback);
  }

  remove() {
    this.#el.remove();
  }
}

export default SentinelComponent;
