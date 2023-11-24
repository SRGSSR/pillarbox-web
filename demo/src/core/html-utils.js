/**
 * Parses an HTML string and returns an array of its child nodes.
 *
 * @param {string} htmlString - The HTML string to be parsed.
 * @returns {NodeListOf<ChildNode>} A list of child nodes parsed from the HTML string.
 */
export const parseHtml = (htmlString) => {
  const el = new DOMParser().parseFromString(htmlString, 'text/html');

  return el.body.childNodes;
};

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
export const onIntersecting =
  (target, callback, options = DEFAULT_INT_OPTIONS) => {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
          // observer.unobserve(entry.target);
        }
      });
    }, options).observe(target);
  };
