import router from '../router/router';
import { css, html, LitElement } from 'lit';
import { animations, theme } from '../theme/theme';
import './load-media-form-component';
import Examples from './examples';
import { openPlayerModal } from '../player/player-dialog';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

/**
 * A web component that represents the examples page.
 *
 * @element examples-page
 */
export class ExamplesPage extends LitElement {
  static styles = [
    theme, animations, css`
      .example-section p {
        margin-bottom: 0;
        color: var(--color-5);
        font-size: var(--size-3);
        text-align: left;
      }`
  ];

  #openExample(event) {
    const exampleEl = event.target.closest('button');

    // Check if the clicked element is a button and has the 'section' dataset attribute.
    if (!exampleEl || !('section' in exampleEl.parentNode.dataset)) return;


    const parent = exampleEl.parentNode;
    const section = parent.dataset.section;
    const exampleIdx = Array.from(parent.children)
      .filter(child => child.tagName.toLowerCase() === 'button')
      .indexOf(exampleEl);

    openPlayerModal(Examples[section][exampleIdx]);
  }

  render() {
    return html`
      <load-media-form @submit-media="${e => openPlayerModal(e.detail)}">
      </load-media-form>

      <!-- List of examples -->
      <div class="fade-in"
           @animationend="${e => e.target.classList.remove('fade-in')}"
           @click="${this.#openExample.bind(this)}">
        ${map(Object.entries(Examples), ([section, examples]) => html`
          <div class="example-section" data-section="${section}">
            <h2 class="sticky">${section}</h2>
            ${map(examples, example => html`
              <button class="content-btn"
                      title="${example.description || example.title}">
                <span class="content-btn-title">
                  ${example.description || example.title}
                </span>
                ${when(example.description, () => html`
                  <div class="content-btn-metadata-container">
                    <span class="content-btn-info">${example.title}</span>
                  </div>`)}
              </button>
            `)}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('examples-page', ExamplesPage);
router.addRoute('examples', 'examples-page');
