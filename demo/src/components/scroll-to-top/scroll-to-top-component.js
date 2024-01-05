import { css, html, LitElement } from 'lit';
import { animations, theme } from '../../theme/theme';

/**
 * A custom web component that provides a button to scroll to the top of the page.
 *
 * @element scroll-to-top-button
 */
export class ScrollToTopComponent extends LitElement {
  static styles = [
    theme,
    animations,
    css`
      .scroll-to-top-button {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--size-7);
        height: var(--size-7);
        padding: 0;
        border: none;
        border-radius: var(--radius-round);
      }

      .scroll-to-top-button i {
        font-size: var(--size-8);
      }
  `];

  render() {
    return html`
      <button class="scroll-to-top-button" title="Scroll to top" 
              @click="${() => window.scrollTo({ top: 0, behavior: 'smooth' })}">
        <i class="material-icons-outlined">arrow_circle_up</i>
      </button>
    `;
  }
}

customElements.define('scroll-to-top-button', ScrollToTopComponent);
