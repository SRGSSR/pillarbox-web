import router from '../../../router/router';
import { css, html, LitElement } from 'lit';
import { animations, theme } from '../../../theme/theme';
import './load-media-form-component';
import '../../../components/content-link/content-link-component';
import Examples from './examples';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { asQueryParams, openPlayerModal } from '../../../components/player/player';

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

  render() {
    return html`
      <load-media-form @submit-media="${e => openPlayerModal(e.detail)}">
      </load-media-form>

      <!-- List of examples -->
      <div class="fade-in"
           @animationend="${e => e.target.classList.remove('fade-in')}">
        ${map(Object.entries(Examples), ([section, examples]) => html`
          <section class="example-section" data-section="${section}">
            <h2 class="sticky">${section}</h2>
            ${map(examples, example => html`
              <content-link title="${example.description || example.title}"
                            href="examples?${asQueryParams(example)}">
                ${when(example.description, () => html`
                    <span slot="description">${example.title}</span>
                `)}
              </content-link>
            `)}
          </section>
        `)}
      </div>
    `;
  }
}

customElements.define('examples-page', ExamplesPage);
router.addRoute('examples', 'examples-page');
