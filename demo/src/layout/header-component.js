import githubLogoSvg from 'bundle-text:../../img/github-logo.svg';
import srgssrLogo from '../../img/srgssr-logo.png';
import Pillarbox from '../../../src/pillarbox';
import { html, LitElement, unsafeCSS } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import '../router/route-link-component';
import { theme } from '../theme/theme';
import headerCSS from 'bundle-text:./header-component.scss';
import router from '../router/router';

/**
 * A web component that represents the header element of the demo page.
 *
 * @element pbw-header
 */
export class HeaderElement extends LitElement {
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
        <nav>
            <div class="pbw-title-container">
                <h1>
                    <img class="pbw-logo" src="${srgssrLogo}"/>
                    <span>Pillarbox</span>
                    <span class="version-txt">${Pillarbox.VERSION.pillarbox}</span>
                </h1>
                <a href="https://github.com/srgssr/pillarbox-web"
                   class="github-link"
                   title="Source on Github">
                    ${unsafeSVG(githubLogoSvg)}
                </a>
            </div>
            <div id="pbw-menu" class="pbw-menu">
                <route-link href="examples${this.debug ? '?debug=true' : ''}">
                    Examples
                </route-link>
                <route-link href="search${this.debug ? '?debug=true' : ''}">
                    Search
                </route-link>
                <route-link href="lists${this.debug ? '?debug=true' : ''}">
                    Lists
                </route-link>
                <route-link href="settings${this.debug ? '?debug=true' : ''}">
                    Settings
                </route-link>
            </div>
        </nav>
    `;
  }
}

customElements.define('pbw-header', HeaderElement);
