import { css, html, LitElement } from 'lit';
import '../../../components/code-block/code-block';
import { theme } from '../../../theme/theme';

export class ShowcaseComponent extends LitElement {
  static styles = [theme, css`
    ::slotted([slot='demo']) {
      aspect-ratio: var(--ratio-widescreen);
    }

    ::slotted([slot='description']) {
      font-size: var(--font-size-1);
      border-left: 3px solid var(--color-5);
      padding-left: var(--size-2);
      text-align: justify;
      color: var(--color-4);
      font-weight: var(--font-weight-1);
    }

    .hidden {
      display: none;
    }
  `];

  static properties = {
    hasCodeExample: { type: Boolean, state: true },
    exampleLanguage: { type: String }
  };

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('slotchange', () => {
      this.hasCodeExample = this.#hasSlot('code');
    });
  }

  #hasSlot(name) {
    return this.shadowRoot.querySelector(`slot[name="${name}"]`).assignedNodes().length > 0;
  }

  render() {
    return html`
      <slot name="title"></slot>
      <slot name="description"></slot>

      <div class="${!this.hasCodeExample ? 'hidden' : ''}">
        <h3>Implementation</h3>
        <slot name="code"></slot>
      </div>
    `;
  }
}


customElements.define('showcase-component', ShowcaseComponent);
