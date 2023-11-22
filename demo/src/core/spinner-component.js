import { parseHtml } from './html-utils';

let SPINNER_ID = 0;

/**
 * A simple spinner component that can be attached to a DOM element.
 * @class
 */
class SpinnerComponent {
  /**
   * A private property to track the visibility state of the spinner.
   *
   * @private
   * @member {boolean}
   */
  #hidden = true;
  /**
   * The spinner element reference.
   *
   * @private
   * @type {Element}
   */
  #el;

  /**
   * Creates a new Spinner component and attaches it to the provided parent element.
   * The spinner start hidden unless specified otherwise,
   *
   * @constructor
   * @param {(node?: Node) => void} attach - Callback function
   *     to customize how the spinner is attached to document. Receives the spinner
   *     HTML node as an argument.
   * @param {boolean} [hidden=true] - Whether the spinner starts hidden or not.
   */
  constructor(attach, hidden = true) {
    const id = `spinner-${SPINNER_ID += 1}`;

    attach(parseHtml(`
      <div id="${id}" class="spinner-container hidden">
        <div class="spinner"></div>
      </div>
    `)[0]);

    this.#el = document.getElementById(id);

    this.#el.addEventListener('animationend', (event) => {
      event.target.classList.remove('slide-up-fade-in');
    });

    if (!hidden) {
      this.show();
    }
  }

  /**
   * Toggle the display state of the spinner.
   *
   * @param {boolean} show - if the spinner will be shown or hidden.
   */
  toggle(show) {
    this.#el.classList.toggle('hidden', !show);
    this.#el.classList.toggle('slide-up-fade-in', show);
    this.#hidden = !show;
  }

  /**
   * Show the spinner.
   */
  show() {
    this.toggle(true);
  }

  /**
   * Hide the spinner.
   */
  hide() {
    this.toggle(false);
  }

  /**
   * Get the visibility state of the spinner.
   *
   * @readonly
   * @member {boolean}
   */
  get hidden() {
    return this.#hidden;
  }

  remove() {
    this.#el.remove();
  }
}

export default SpinnerComponent;
