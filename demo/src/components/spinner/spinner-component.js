import { html, LitElement, unsafeCSS } from 'lit';
import spinnerCss from 'bundle-text:./spinner-component.scss';
import { animations } from '../../theme/theme';

/**
 * A spinner component.
 *
 * @element loading-spinner
 */
export class SpinnerComponent extends LitElement {
  static properties = {
    loading: { type: Boolean, reflect: true },
  };

  static styles = [animations, unsafeCSS(spinnerCss)];

  constructor() {
    super();
    this.loading = false;
  }

  render() {
    return html`
      <div class="spinner-container ${!this.loading ? 'hidden' : ''}">
        <div class="spinner"></div>
      </div>
    `;
  }
}

customElements.define('loading-spinner', SpinnerComponent);
