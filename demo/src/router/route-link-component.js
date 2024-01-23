import router from './router';
import { html, LitElement } from 'lit';
import { animations, theme } from '../theme/theme';

export class RouteLinkCompenent extends LitElement {
  static properties = {
    href: { type: String },
    title: { type: String },
    selected: { type: Boolean, state: true },
  };

  static styles = [theme, animations];

  #updateSelected() {
    const url = new URL(`${window.location.origin}/${this.href}`);

    this.selected = router.isActiveRoute(url.pathname);
  }

  constructor() {
    super();

    router.addEventListener('routechanged', () => {
      this.#updateSelected();
    });
  }

  #onClick = (event) => {
    event.preventDefault();

    const url = new URL(`${window.location.origin}/${this.href}`);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    router.navigateTo(url.pathname, queryParams);
  };

  connectedCallback() {
    super.connectedCallback();

    this.#updateSelected();
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
  }

  render() {
    return html`
        <a href="${this.href}"
           aria-disabled="${this.selected}"
           title="${this.title}"
           part="a ${this.selected ? 'active' : ''}">
            <slot></slot>
        </a>
    `;
  }
}

customElements.define('route-link', RouteLinkCompenent);
