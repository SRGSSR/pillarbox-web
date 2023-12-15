import { html, LitElement, unsafeCSS } from 'lit';
import { animations, theme } from '../theme/theme';
import componentCSS from 'bundle-text:./load-media-form-component.scss';
import { classMap } from 'lit/directives/class-map.js';

/**
 * LoadMediaFormComponent is a LitElement that provides a user interface for loading media content.
 *
 * @element load-media-form
 *
 * @fires LoadMediaFormComponent#submit-media - Dispatched when the user submits media with the specified details.
 *
 * @prop {String} src - The URL or URN of the media content to be loaded.
 * @prop {{vendor: String, certificateUrl: String, licenseUrl: String}} drmSettings - DRM settings for the loaded media.
 */
export class LoadMediaFormComponent extends LitElement {
  static properties = {
    src: { type: String },
    drmSettings: { type: Object },
    drmSettingsShown: { state: true, type: Boolean }
  };

  static styles = [theme, animations, unsafeCSS(componentCSS)];

  constructor() {
    super();

    this.src = '';
    this.#initDrmSettings();
  }

  #initDrmSettings() {
    this.drmSettings = {
      vendor: '',
      certificateUrl: '',
      licenseUrl: ''
    };
  }

  #submitMedia() {
    const src = this.src;
    const type = src.startsWith('urn:') ? 'srgssr/urn' : undefined;
    const keySystems = this.#keySystems;

    /**
     * Custom event dispatched by LoadMediaFormComponent when the user submits media.
     *
     * @event LoadMediaFormComponent#submit-media
     * @type {CustomEvent}
     * @property {Object} detail - The event detail object.
     * @property {string} detail.src - The URL or URN of the media content to be loaded.
     * @property {string | undefined} detail.type - The type of media. Undefined if the type cannot be determined.
     * @property {Object | undefined} detail.keySystems - DRM key systems for the loaded media.
     */
    this.dispatchEvent(new CustomEvent('submit-media', {
      detail: { src, type, keySystems }
    }));
  }

  #handleLoadBarKeyUp(event) {
    this.src = event.target.value;

    if (event.key === 'Enter' && this.src) {
      this.#submitMedia();
    }
  }

  get #keySystems() {
    if (!this.drmSettings?.vendor) {
      return undefined;
    }

    const certificateUrl = this.drmSettings.certificateUrl;
    const licenseUrl = this.drmSettings.licenseUrl;

    if ('com.apple.fps.1_0' === this.drmSettings.vendor) {
      return { [this.drmSettings.vendor]: { certificateUrl, licenseUrl }};
    }

    return { [this.drmSettings.vendor]: { licenseUrl }};
  }

  render() {
    const btnSettingsClassMap = {
      'spin': this.drmSettingsShown === true,
      'spin-back': this.drmSettingsShown === false,
    };

    return html`
      <div class="fade-in">
        <div class="load-bar-container">
          <i class="material-icons-outlined">insert_link</i>
          <input type="text"
                 placeholder="Enter a URL or URN to play its content..."
                 @keyup="${this.#handleLoadBarKeyUp}"
                 .value="${this.src ?? ''}">
          <button title="Open DRM Settings"
                  @click="${() => this.drmSettingsShown = !this.drmSettingsShown}">
            <i class="material-icons-outlined ${classMap(btnSettingsClassMap)}"
               @animationend="${e => e.target.classList.remove('spin', 'spin-back')}">
              settings
            </i>
          </button>
        </div>
        
        ${this.#drmSettingsTemplate()}

        <button class="icon-btn load-bar-action"
                ?disabled="${!this.src}"
                @click="${this.#submitMedia}">
          <i class="material-icons-outlined">play_circle</i> Play content
        </button>
      </div>
    `;
  }

  #drmSettingsTemplate() {
    return html`
      <form class="drm-settings-container ${this.drmSettingsShown ? 'fade-in' : 'hidden'}"
            aria-hidden="${this.drmSettingsShown}"
            @reset="${this.#initDrmSettings}"
            @animationend="${e => e.target.classList.remove('fade-in')}">
        <h3>DRM Settings</h3>
        <select aria-label="Select a DRM vendor" required
                .value="${this.drmSettings.vendor}"
                @change="${e => this.drmSettings.vendor = e.target.value}">
          <option value="" disabled selected hidden>Select a DRM vendor
          </option>
          <option value="com.widevine.alpha">Widevine</option>
          <option value="com.apple.fps.1_0">Fairplay</option>
          <option value="com.microsoft.playready">PlayReady</option>
        </select>
        <input type="text"
               placeholder="Enter the license url..."
               .value="${this.drmSettings.licenseUrl}"
               @input="${e => this.drmSettings.licenseUrl = e.target.value}">
        <input type="text"
               placeholder="Enter the certificate url..."
               .value="${this.drmSettings.certificateUrl}"
               @input="${e => this.drmSettings.certificateUrl = e.target.value}">
        <button class="icon-btn warning-text" type="reset">
          <i class="material-icons-outlined">delete</i>Clear Settings
        </button>
        <hr>
      </form>
    `;
  }
}

customElements.define('load-media-form', LoadMediaFormComponent);

