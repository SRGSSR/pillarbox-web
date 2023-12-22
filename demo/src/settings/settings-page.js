import router from '../router/router';
import { html, LitElement, unsafeCSS } from 'lit';
import { animations, theme } from '../theme/theme';
import '../core/toggle-switch-component.js';
import PreferencesProvider from './preferences-provider';
import componentCss from 'bundle-text:./settings-page.scss';

/**
 * A web component that represents the settings page.
 *
 * @element settings-page
 */
export class SettingsPage extends LitElement {
  static properties = {
    autoplay: { type: Boolean, state: true },
    muted: { type: Boolean, state: true },
    debug: { type: Boolean, state: true }
  };

  static styles = [theme, animations, unsafeCSS(componentCss)];

  constructor() {
    super();
    const preferences = PreferencesProvider.loadPreferences();

    this.autoplay = preferences.autoplay ?? false;
    this.muted = preferences.muted ?? true;
    this.debug = preferences.debug ?? false;
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);

    const preferences = PreferencesProvider.loadPreferences();

    [..._changedProperties.keys()]
      .filter(property => ['autoplay', 'muted', 'debug'].includes(property))
      .forEach((property) => preferences[property] = this[property]);

    PreferencesProvider.savePreferences(preferences);

    if (_changedProperties.has('debug')) {
      router.replaceState(this.debug ? { debug: 'true' } : {});
    }
  }

  #renderToggle(property, label) {
    return html`
      <div part="toggle-container">
        <label for="${property}-switch" part="label">${label}</label>
        <toggle-switch id="${property}-switch"
                       part="toggle-switch"
                       exportparts="slider, switch"
                       ?checked="${this[property]}"
                       @change="${(e) => this[property] = e.detail.checked}">
        </toggle-switch>
      </div>
    `;
  }
  render() {
    return html`
      <div class="fade-in" @animationend="${e => e.target.classList.remove('fade-in')}">
        <h2 part="title">Player Settings</h2>
        ${this.#renderToggle('autoplay', 'Autoplay')}
        ${this.#renderToggle('muted', 'Player starts muted')}
        ${this.#renderToggle('debug', 'Enable debug mode')}
      </div>
    `;
  }
}

customElements.define('settings-page', SettingsPage);
router.addRoute('settings', 'settings-page');
