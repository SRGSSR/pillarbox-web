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
