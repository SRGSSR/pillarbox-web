import { html, LitElement, unsafeCSS } from 'lit';
import componentCss from 'bundle-text:./code-block.scss';
import hljs from 'highlight.js';
import { unsafeHTML } from 'lit/directives/unsafe-html';

export class CodeBlock extends LitElement {
  static styles = [unsafeCSS(componentCss)];
  static properties = {
    language: { type: String },
    code: { tyoe: String, state: true }
  };

  constructor(props) {
    super(props);
    this.language = 'javascript';
  }

  #onCodeChanged() {
    const slottedElements = this.shadowRoot.querySelector('slot').assignedNodes();
    const codeStr = slottedElements[0].textContent;

    this.code = hljs.highlight(codeStr, { language: this.language }).value;
  }

  render() {
    return html`
      <pre part="container"><code>${unsafeHTML(this.code)}</code></pre>
      <slot @slotchange="${() => this.#onCodeChanged()}"></slot>
    `;
  }
}

customElements.define('code-block', CodeBlock);
