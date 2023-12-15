import router from './router';
import { html, LitElement } from 'lit';
import { theme, animations } from '../theme/theme';

export class RouteLinkCompenent extends LitElement {
  static properties = {
    href: {},
    selected: { state: true },
  };

  static styles = [theme, animations];

  constructor() {
    super();

    router.addEventListener('routechanged', ({ detail: { route }}) => {
      this.selected = route.path.match(this.href);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this.selected = router.isActiveRoute(this.href);
    this.renderRoot.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigateTo(this.href);
    });
  }


  render() {
    return html`
      <a href="${this.href}"
         aria-disabled="${this.selected}"
         part="a ${this.selected ? 'active' : ''}">
        <slot></slot>
      </a>
    `;
  }
}

customElements.define('route-link', RouteLinkCompenent);
