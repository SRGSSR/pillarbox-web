import { onIntersecting, parseHtml } from './html-utils';

let INTERSECTION_OBSERVER_ID = 0;

/**
 * A simple intersection observer component that can be attached to a DOM element. This
 * component triggers a callback whenever it comes into view.
 *
 * @class
 */
class IntersectionObserverComponent {
  /**
   * The intersection observer component element reference.
   *
   * @private
   * @type {Element}
   */
  #el;

  /**
   * Creates a new intersection observer component and attaches it to the DOM through the
   * provided attach method.
   *
   * @constructor
   * @param {(node?: Node) => void} attach - Callback function to customize
   *     how the intersection observer is attached to document. Receives the intersection observer
   *     HTML node as an argument.
   * @param {function} intersectCallback - This function is called when the intersection observer
   *     element is intersecting the viewport.
   */
  constructor(attach, intersectCallback) {
    const id = `intersection-observer-${INTERSECTION_OBSERVER_ID += 1}`;

    attach(parseHtml(`<div id="${id}" class="intersection-observer"></div>`)[0]);

    this.#el = document.getElementById(id);

    onIntersecting(this.#el, intersectCallback);
  }

  remove() {
    this.#el.remove();
  }
}

export default IntersectionObserverComponent;
