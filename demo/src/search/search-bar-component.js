import { html, LitElement, unsafeCSS } from 'lit';
import { animations, theme } from '../theme/theme';
import componentCSS from 'bundle-text:./search-bar-component.scss';
import Pillarbox from '../../../src/pillarbox';

const DEFAULT_BU = 'rsi';

/**
 * A search bar component for filtering content based on a query and business unit.
 *
 * @element search-bar
 *
 * @fires SearchBarComponent#change - Dispatched when the value of the search bar changes.
 */
export class SearchBarComponent extends LitElement {
  static properties = {
    bu: { type: String },
    query: { type: String }
  };

  static styles = [theme, animations, unsafeCSS(componentCSS)];

  constructor() {
    super();
    this.bu = DEFAULT_BU;
    this.query = '';
  }

  #change() {
    const query = this.query ?? '';
    const bu = this.bu ?? DEFAULT_BU;

    /**
     * Custom event dispatched by SearchBarComponent when the value of the bar changes.
     *
     * @event SearchBarComponent#change
     * @type {CustomEvent}
     * @property {Object} detail - The event detail object.
     * @property {string} detail.query - The query on the search bar.a
     * @property {string} detail.bu - The selected bu.
     */
    this.dispatchEvent(new CustomEvent('change', {
      detail: { query, bu }
    }));
  }

  #handleSearchBarKeyUp() {
    const query = this.renderRoot.querySelector('input').value;

    if (query !== this.query) {
      this.query = query;
      this.#change();
    }
  }

  #handleSelectChange(e) {
    const bu = e.target.value;

    if (bu !== this.bu) {
      this.bu = bu;
      this.#change();
    }
  }

  #clearSearchBar() {
    if (this.query !== '') {
      this.query = '';
      this.renderRoot.querySelector('input').value = '';
      this.#change();
    }
  }

  render() {
    return html`
      <div class="search-bar-container fade-in"
           @animationend="${e => e.target.classList.remove('fade-in')}">
        <select aria-label="Select a business unit"
                .value="${this.bu ?? DEFAULT_BU}"
                @change="${this.#handleSelectChange}">
          <option value="rsi" selected>RSI</option>
          <option value="rtr">RTR</option>
          <option value="rts">RTS</option>
          <option value="srf">SRF</option>
          <option value="swi">SWI</option>
        </select>
        <input type="text"
               placeholder="Search for content..."
               @keyup="${Pillarbox.fn.debounce(this.#handleSearchBarKeyUp, 500)}"
               .value="${this.query ?? ''}">
        <button title="Clear search"
                @click="${this.#clearSearchBar}">
          <i class="material-icons-outlined">close</i>
        </button>
      </div>
    `;
  }
}

customElements.define('search-bar', SearchBarComponent);
