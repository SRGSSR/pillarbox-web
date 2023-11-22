/**
 * Defines a route for the root path ('/') that replaces the main content of the
 * page with a list of dynamically loaded examples.
 *
 * @module
 */
import router from '../core/router';
import { parseHtml } from '../core/html-utils';
import Examples from './examples';
import { openPlayerModal } from '../player/player-dialog';

/**
 * Represents a page displaying a list of dynamically loaded examples.
 *
 * @class
 */
class ExamplePage {
  /**
   * The DRM vendor selection element.
   *
   * @private
   * @type {Element}
   */
  #drmVendorEl;
  /**
   * The certificate url input element.
   *
   * @private
   * @type {Element}
   */
  #certificateUrlEl;
  /**
   * The license url input element.
   *
   * @private
   * @type {Element}
   */
  #licenseUrlEl;
  /**
   * The load bar input element.
   *
   * @private
   * @type {Element}
   */
  #loadBarEl;
  /**
   * The play button element on the load bar.
   *
   * @private
   * @type {Element}
   */
  #playContentBtnEl;

  /**
   * Creates an instance of ExamplePage.
   * Initializes and sets up the necessary elements and event listeners.
   */
  constructor() {
    // Replace the content of the '#pbw-container' element with the examples.
    document.querySelector('#pbw-container').replaceChildren(...this.createContentEl());

    this.#drmVendorEl = document.querySelector('#drm-vendor');
    this.#certificateUrlEl = document.querySelector('#certificate-url-input');
    this.#licenseUrlEl = document.querySelector('#license-url-input');
    this.#loadBarEl = document.querySelector('#load-bar');
    this.#playContentBtnEl = document.querySelector('#play-content-btn');

    this.initExamples();
    this.initLoadBar();
    this.initDrmSettings();
  }


  /**
   * Initializes the examples listeners. Whenever an example button is clicked,
   * a modal with a player is opened and the corresponding example's content is loaded.
   */
  initExamples() {
    // Listen for example's click
    document.querySelector('#examples').addEventListener('click', event => {
      const exampleEl = event.target.closest('button');

      // Check if the clicked element is a button and has the 'section' dataset attribute.
      if (!exampleEl || !('section' in exampleEl.parentNode.dataset)) return;


      const parent = exampleEl.parentNode;
      const section = parent.dataset.section;
      const exampleIdx = Array.from(parent.children)
        .filter(child => child.tagName.toLowerCase() === 'button')
        .indexOf(exampleEl);

      openPlayerModal(Examples[section][exampleIdx]);
    });
  }

  /**
   * Initializes the load bar element.
   */
  initLoadBar() {
    this.#playContentBtnEl.addEventListener('click', () => this.playCustomUrl());

    this.#loadBarEl.addEventListener('keyup', event => {
      const src = this.customSrc;

      this.#playContentBtnEl.disabled = !src;
      // Check if the 'Enter' key is pressed.
      if (event.key === 'Enter' && src) {
        this.playCustomUrl();
      }
    });
  }

  /**
   * Get the currently configured key systems in the DRM settings of the load bar.
   *
   * @returns {{}|undefined} the key systems configured by the user.
   */
  get keySystems() {
    const vendor = this.#drmVendorEl.value;

    if (!vendor) {
      return undefined;
    }

    const keySystems = {};
    const certificateUrl = this.#certificateUrlEl.value;
    const licenseUrl = this.#licenseUrlEl.value;

    if ('com.apple.fps.1_0' === vendor) {
      keySystems[vendor] = { certificateUrl, licenseUrl };
    } else {
      keySystems[vendor] = licenseUrl;
    }

    return keySystems;
  }

  /**
   * Get the source configured in the load bar.
   *
   * @returns {string} The source configured by the user.
   */
  get customSrc() {
    return this.#loadBarEl.value;
  }

  /**
   * Play the currently configured source and DRM settings in the player modal.
   */
  playCustomUrl() {
    const src = this.customSrc;
    const type = src.startsWith('urn:') ? 'srgssr/urn' : undefined;
    const keySystems = this.keySystems;

    openPlayerModal({ src, type, keySystems });
  }

  /**
   * Initializes the DRM settings element.
   */
  initDrmSettings() {
    const settingsEl = document.querySelector('#load-bar-settings');
    const settingsBtnEl = document.querySelector('#open-settings-btn');
    const settingsIconEl = settingsBtnEl.querySelector('span');

    settingsEl.addEventListener('animationend', () => {
      settingsEl.classList.toggle('fade-in', false);
    });

    settingsIconEl.addEventListener('animationend', () => {
      settingsIconEl.classList.toggle('spin', false);
      settingsIconEl.classList.toggle('spin-back', false);
    });

    // Add event listener for the 'click' event on the '#open-settings-btn' element.
    settingsBtnEl.addEventListener('click', () => {
      settingsEl.classList.toggle('hidden');
      const isHidden = settingsEl.classList.contains('hidden');

      settingsEl.classList.toggle('fade-in', !isHidden);
      settingsIconEl.classList.toggle('spin', !isHidden);
      settingsIconEl.classList.toggle('spin-back', isHidden);
      settingsEl.ariaHidden = isHidden.toString();
    });
  }

  /**
   * The HTML template of the load bar.
   */
  loadBarTemplate() {
    return `
      <div class="fade-in">
        <div class="load-bar-container">
          <span class="material-icons-outlined">insert_link</span>
          <input type="text" id="load-bar" placeholder="Enter a URL or URN to play its content...">
          <button id="open-settings-btn" title="Open DRM Settings"><span class="material-icons-outlined">settings</span></button>
        </div>
        
        <form id="load-bar-settings" class="drm-settings-container hidden" aria-hidden="true">
          <h3>DRM Settings</h3>
          <select id="drm-vendor" aria-label="Select a DRM vendor" required>
            <option value="" disabled selected hidden>Select a DRM vendor</option>
            <option value="com.widevine.alpha">Widevine</option>
            <option value="com.apple.fps.1_0">Fairplay</option>
            <option value="com.microsoft.playready">PlayReady</option>
          </select>
          <input type="text" id="license-url-input" placeholder="Enter the license url...">
          <input type="text" id="certificate-url-input" placeholder="Enter the certificate url...">
          <button id="clear-settings-btn" class="icon-btn warning-text" type="reset"><span class="material-icons-outlined">delete</span>Clear Settings</button>
          <hr>
        </form>
  
         <button class="icon-btn load-bar-action" id="play-content-btn" disabled="true">
           <span class="material-icons-outlined">play_circle</span> Play content
         </button>
      </div>`;
  }

  /**
   * Creates the main content element containing a load bar and a list of examples.
   *
   * @returns {NodeListOf<ChildNode>} A list of child nodes for the created element.
   */
  createContentEl() {
    return parseHtml(`
      ${this.loadBarTemplate()}

      <!-- List of examples -->
      <div id="examples" class="fade-in">
          ${Object.entries(Examples).map(([section, examples]) => `
          <div class="example-section" data-section="${section}">
            <h2 class="sticky">${section}</h2>
            ${examples.map(example => `
            <button class="content-btn" title="${example.description || example.title}">
              <span class="content-btn-title">${example.description || example.title}</span>
              ${example.description ? `
              <div class="content-btn-metadata-container">
                <span class="content-btn-info">${example.title}</span>
              </div>` : ''}
            </button>
            `).join('')}
          </div>
          `).join('')}
      </div>
    `);
  }
}

router.addRoute('examples', () => new ExamplePage());
