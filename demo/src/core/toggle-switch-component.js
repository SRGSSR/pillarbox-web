import { html, LitElement, unsafeCSS } from 'lit';
import { theme } from '../theme/theme';
import componentCSS from 'bundle-text:./toggle-switch-component.scss';

/**
 * Custom element representing a toggle switch.
 *
 * @element toggle-switch
 *
 * @csspart switch - The container for the toggle switch.
 * @csspart slider - The slider button of the toggle switch.
 *
 * @prop {Boolean} checked - Reflects the current state of the toggle switch.
 * @prop {Boolean} disabled - Indicates whether the toggle switch is disabled.
 *
 * @attribute {String} role - ARIA role for accessibility, set to 'switch'.
 * @attribute {String} tabindex - ARIA tabindex for accessibility, set to '0'.
 *
 * @fires ToggleSwitchComponent#change
 *
 * @example
 * <toggle-switch checked></toggle-switch>
 *
 * @customElement
 */
export class ToggleSwitchComponent extends LitElement {
  static formAssociated = true;
  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean }
  };

  constructor() {
    super();
    this.checked = false;
    this.disabled = false;
  }

  static styles = [
    theme, unsafeCSS(componentCSS)
  ];

  #onKeyDown = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      this.toggle();
    }
  };

  #onClick = () => {
    this.toggle();
  };

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'switch');
    }

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeyDown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keydown', this.#onKeyDown);
  }

  toggle(force) {
    if (!this.disabled) {
      this.checked = force ?? !this.checked;
    }
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (_changedProperties.has('checked')) {
      this.setAttribute('aria-checked', this.checked.toString());
      /**
       * Custom event dispatched when the state of the toggle switch changes.
       *
       * @event ToggleSwitchComponent#change
       * @type {CustomEvent}
       * @property {Object} detail - The event detail object.
       * @property {Boolean} detail.checked - The new state of the toggle switch.
       */
      this.dispatchEvent(new CustomEvent('change', { detail: { checked: this.checked }}));
    }

  }

  render() {
    return html`
        <div part="switch">
            <div part="slider"></div>
        </div>
    `;
  }
}


customElements.define('toggle-switch', ToggleSwitchComponent);
