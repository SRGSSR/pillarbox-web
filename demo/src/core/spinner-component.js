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
  #spinnerEl;

  /**
   * Creates a new Spinner component and attaches it to the provided parent element.
   *
   * @constructor
   * @param {Element} parentEl - The target DOM element where the new spinner will be attached
   */
  constructor(parentEl) {
    const id = `spinner-${SPINNER_ID += 1}`;

    parentEl.appendChild(parseHtml(`
      <div id="${id}" class="spinner-container hidden">
        <div class="spinner"></div>
      </div>
    `)[0]);

    this.#spinnerEl = document.getElementById(id);

    this.#spinnerEl.addEventListener('animationend', (event) => {
      event.target.classList.remove('slide-fade');
    });
  }

  /**
   * Show the spinner.
   */
  show() {
    if (this.hidden) {
      this.#spinnerEl.classList.remove('hidden');
      this.#spinnerEl.classList.add('slide-fade');
      this.#hidden = false;
    }
  }

  /**
   * Hide the spinner.
   */
  hide() {
    if (!this.hidden) {
      this.#spinnerEl.classList.add('hidden');
      this.#spinnerEl.classList.remove('slide-fade');

      this.#hidden = true;
    }
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
}

export default SpinnerComponent;
