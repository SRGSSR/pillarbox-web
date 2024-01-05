import { html, LitElement } from 'lit';
import { animations } from '../../theme/theme';


const DEFAULT_INT_OPTIONS = { root: null, rootMargin: '0px', threshold: 0.1 };

/**
 * Attach an Intersection Observer to a target element and execute a callback when it becomes visible.
 *
 * @param {Element} target - The target element to observe.
 * @param {Function} callback - The callback function to execute when the target is intersecting.
 * @param {Object} options - (Optional) Options to configure the Intersection Observer.
 * @param {Element} [options.root=null] - The element that is used as the viewport for checking visibility.
 * @param {string} [options.rootMargin='0px'] - Margin around the root. Can have values similar to CSS margin property.
 * @param {number} [options.threshold=0.1] - The threshold at which the callback will be triggered.
 */
const onIntersecting = (target, callback, options = DEFAULT_INT_OPTIONS) => {
  new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback();
      }
    });
  }, options).observe(target);
};


/**
 * This web component acts as a sentinel for an Intersection Observer,
 * dispatching an 'intersecting' event when the observed element intersects
 * with the view.
 *
 * @element intersection-observer
 * @csspart sentinel - the sentinel element.
 *
 * @fires IntersectionObserverComponent#intersecting - Dispatched when the observed element intersects with the view.
 */
export class IntersectionObserverComponent extends LitElement {
  static styles = [
    animations
  ];

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    onIntersecting(
      this.renderRoot.querySelector('div'),
      () => {
        /**
         * Custom event dispatched by IntersectionObserverComponent when the observed element intersects
         * with the view.
         *
         * @event IntersectionObserverComponent#intersecting
         * @type {CustomEvent}
         * @property {Object} detail - The event detail object.
         * @property {string} detail.src - The URL or URN of the media content to be loaded.
         * @property {string | undefined} detail.type - The type of media. Undefined if the type cannot be determined.
         * @property {Object | undefined} detail.keySystems - DRM key systems for the loaded media.
         */
        this.dispatchEvent(new CustomEvent('intersecting'));
      }
    );
  }

  render() {
    return html`
      <div part="sentinel"></div>
    `;
  }
}

customElements.define('intersection-observer', IntersectionObserverComponent);
