import router from '../../router/router';
import { html, LitElement, unsafeCSS } from 'lit';
import componentCSS from 'bundle-text:./content-link-component.scss';

/**
 * A component for rendering a content link.
 *
 * @prop {string} href - The URL to navigate to.
 * @prop {string} title - The title attribute for the link.
 *
 * @csspart a - The anchor element.
 * @csspart title - The title span within the anchor.
 * @csspart description - The slot for additional description content within the anchor.
 *
 * @example
 * <content-link href="/example" title="Example Link">
 *   Additional Description Content
 * </content-link>
 */
export class ContentLinkComponent extends LitElement {
  static properties = {
    href: {}
  };

  static styles = unsafeCSS(componentCSS);

  #onClick = (event) => {
    event.preventDefault();

    const url = new URL(`${window.location.origin}/${this.href}`);
    const queryParams = Object.fromEntries(url.searchParams.entries());

    router.navigateTo(url.pathname, queryParams);
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
  }

  render() {
    return html`
      <a href="${this.href}" title="${this.title}" part="a">
        <span part="title">${this.title}</span>
        <slot part="description" name="description"></slot>
      </a>
    `;
  }
}

customElements.define('content-link', ContentLinkComponent);
