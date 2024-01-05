import githubLogoSvg from 'bundle-text:../../../img/github-logo.svg';
import srgssrLogo from '../../../img/srgssr-logo.png';
import Pillarbox from '../../../../src/pillarbox';
import { html, LitElement, unsafeCSS } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../../router/route-link-component';
import { theme } from '../../theme/theme';
import headerCSS from 'bundle-text:./header-component.scss';
import router from '../../router/router';

/**
 * A web component that represents the header element of the demo page.
 *
 * @element pbw-header
 */
export class DemoHeaderElement extends LitElement {
  static properties = {
    debug: { type: Boolean, state: true }
  };
  static styles = [theme, unsafeCSS(headerCSS)];

  #onRouteUpdated = ({ detail: { queryParams }}) => {
    this.debug = queryParams.debug === 'true';
  };

  connectedCallback() {
    super.connectedCallback();

    this.debug = router.queryParams.debug === 'true';
    router.addEventListener('routechanged', this.#onRouteUpdated);
    router.addEventListener('queryparams', this.#onRouteUpdated);
  }

  disconnectedCallback() {
    router.removeEventListener('routechanged', this.#onRouteUpdated);
    router.removeEventListener('queryparams', this.#onRouteUpdated);
  }

  render() {
    return html`
      <header>
        <h1>
          <img class="pbw-logo" src="${srgssrLogo}"/>
          <span>Pillarbox</span>
          <span class="version-txt">${Pillarbox.VERSION.pillarbox}</span>
        </h1>
        <a href="https://github.com/srgssr/pillarbox-web" class="github-link" title="Source on Github">
          ${unsafeSVG(githubLogoSvg)}
        </a>
      </header>
      <nav>
        <ul>
          <li>
            <route-link href="examples${this.debug ? '?debug=true' : ''}">Examples</route-link>
          </li>
          <li>
            <route-link href="search${this.debug ? '?debug=true' : ''}">Search</route-link>
          </li>
          <li>
            <route-link href="lists${this.debug ? '?debug=true' : ''}">Lists</route-link>
          </li>
          <li>
            <route-link href="settings${this.debug ? '?debug=true' : ''}">Settings</route-link>
          </li>
        </ul>
      </nav>
    `;
  }
}

customElements.define('demo-header', DemoHeaderElement);
