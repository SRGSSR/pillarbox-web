/**
 * Defines the behaviour of the demo dialog.
 *
 * @module
 */
import { html, LitElement, unsafeCSS } from 'lit';
import { animations, theme } from '../../theme/theme';
import componentCSS from 'bundle-text:./demo-dialog-component.scss';

export class DemoDialog extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true }
  };

  static styles = [
    theme, animations, unsafeCSS(componentCSS)
  ];

  #dialog;

  constructor() {
    super();
    this.open = false;
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    if (_changedProperties.has('open')) {
      if (this.open) {
        this.#dialog.showModal();
        this.#dialog.classList.toggle('slide-up-fade-in', true);
      } else {
        this.#dialog.close();
      }
    }
  }

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.#dialog = this.shadowRoot.querySelector('dialog');
  }

  #onDialogClosed() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  #onDialogClicked(e) {
    if (this.#dialog !== e.target) return;
    this.open = false;
  }

  render() {
    return html`
      <dialog part="container"
              @click="${this.#onDialogClicked.bind(this)}"
              @close="${this.#onDialogClosed.bind(this)}"
              @animationend="${e => e.target.classList.remove('slide-up-fade-in')}">
        <button part="close-btn"
                @click="${() => this.open = false}"
                title="Close player dialog">&times;</button>
        <slot></slot>
      </dialog>
    `;
  }
}

customElements.define('demo-dialog', DemoDialog);
