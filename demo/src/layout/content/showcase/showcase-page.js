import router from '../../../router/router';
import { html, LitElement } from 'lit';
import { animations, theme } from '../../../theme/theme';
import './start-time-showcase';

export class ShowCasePage extends LitElement {
  static styles = [theme, animations];

  render() {
    return html`
      <!-- List of showcases -->
      <div class="fade-in"
           @animationend="${e => e.target.classList.remove('fade-in')}">
        <starttime-showcase></starttime-showcase>
      </div>
    `;
  }
}

customElements.define('showcase-page', ShowCasePage);
router.addRoute('showcase', 'showcase-page');
