import { Minimatch } from 'minimatch';

/**
 * Router class for managing client-side navigation in a Single Page Application (SPA).
 * This class enables the creation of a simple client-side router to handle navigation within an SPA,
 * allowing developers to define routes and associated actions.
 *
 * ## Usage:
 * 1. Import the router in your project:
 *    ```javascript
 *    import router from './path/to/Router';
 *    ```
 * 2. Define routes by using the `addRoute` method:
 *    ```javascript
 *    router.addRoute('/', 'home-component', () => {
 *      // Function to execute when navigating to the root path
 *      console.log('Navigated to the root path');
 *    }, () => {
 *      // Function to execute when navigating away from the root path
 *      console.log('Navigated away from the root path');
 *    });
 *    ```
 * 3. Integrate with an `<route-link>` tag using the `href` attribute:
 *    ```html
 *    <route-link href="/">Home</route-link>
 *    <route-link href="/about">About</route-link>
 *    ```
 *    Clicking on these links will trigger the router to navigate to the specified paths.
 * 4. Define a route outlet where the component associated with the route will be rendered :
 *    ```html
 *    <route-outlet></route-outlet>
 *    ``
 * @class
 */
class Router extends EventTarget {
  /**
   * The fallback route to be used in case no matching route is found.
   * @private
   * @type {string|null}
   */
  #defaultPath = null;

  /**
   * The currently active route.
   * @private
   * @type {{ path: Minimatch, start: function, destroy: function }|null}
   */
  #currentRoute = null;

  /**
   * The query parameters associated with the current route.
   * @private
   * @type {object}
   */
  #currentQueryParams = {};

  /**
   * An array containing registered route objects with their patterns and associated actions.
   * @private
   * @type {Array<{ path: Minimatch, start: function, destroy: function }>}
   */
  #routes = [];


  constructor() {
    super();

    // Event listener for the popstate event
    window.addEventListener('popstate', () => {
      const entries = new URL(window.location.href).searchParams.entries();
      const queryParams = Object.fromEntries(entries);

      this.#handleRouteChange(window.location.pathname, queryParams, true);
    });
  }

  /**
   * Adds a route to the router.
   *
   * @param {string} pattern - The path of the route, can be a glob pattern.
   * @param {string} component - The component to be rendered when the route is navigated to.
   * @param {function} start - The function to be called when the route is navigated to.
   * @param {function} destroy - The function to be called when the route is navigated away from.
   */
  addRoute(pattern, component = null, start = () => {
  }, destroy = () => {
  }) {
    const path = new Minimatch(pattern, { matchBase: true });

    this.#routes.push({ path, start, component, destroy });
  }

  /**
   * Checks if the given path is the current active route.
   *
   * @param {string} path - The path to check.
   * @returns {boolean} - True if the given path is the current active route, false otherwise.
   */
  isActiveRoute(path) {
    return this.#currentRoute &&
      this.#currentRoute.path === this.findRoute(path)?.path;
  }

  /**
   * Finds a route based on the given path.
   *
   * @param {string} path - The path to find the route for.
   * @returns {object} - The route object if found, otherwise undefined.
   */
  findRoute(path) {
    return this.#routes.find(r => r.path.match(path));
  }

  /**
   * Navigates to the specified path.
   *
   * @param {string} path - The path to navigate to.
   * @param {object} [queryParams={}] - (Optional) query parameters to be associated with the route.
   */
  navigateTo(path, queryParams = {}) {
    const url = new URL(window.location.href);
    const normalizedPath = '/' + path.trim().replace(/^\/+/, '');

    url.pathname = normalizedPath.startsWith(this.base) ?
      normalizedPath :
      this.base + normalizedPath;
    url.search = new URLSearchParams(queryParams).toString();

    window.history.pushState({}, '', url.href);
    this.#handleRouteChange(path, queryParams);
  }

  /**
   * Updates the state by navigating to the current path with the provided query parameters.
   *
   * @param {Object} queryParams - The new query parameters to be merged with the current ones.
   */
  updateState(queryParams, keysToRemove = []) {
    const filteredParams = Object.fromEntries(
      Object.entries(this.#currentQueryParams)
        .filter(([key]) => !keysToRemove.includes(key))
    );

    this.navigateTo(
      window.location.pathname,
      { ...filteredParams, ...queryParams }
    );
  }

  /**
   * Replaces the current state by navigating to the current path with the provided query parameters,
   * discarding the current query parameters.
   *
   * @param {Object} newParams - The new query parameters to replace the current ones.
   */
  replaceState(newParams) {
    this.navigateTo(window.location.pathname, newParams);
  }

  /**
   * Handles a change in the route.
   *
   * @private
   * @param {string} path - The path of the new route.
   * @param {object} [queryParams={}] - (Optional) The query parameters associated with the route.
   * @param {boolean} [popstate=false] - (Optional) if a popstate is at the origin of this route change.
   */
  #handleRouteChange(path, queryParams = {}, popstate = false) {
    if (this.isActiveRoute(path)) {
      if (!this.#matchCurrentParams(queryParams)) {
        this.#currentQueryParams = queryParams;
        this.dispatchEvent(new CustomEvent('queryparams', {
          detail: {
            route: this.#currentRoute,
            popstate,
            queryParams
          }
        }));
      }

      return;
    }

    const route = this.findRoute(path);

    if (route)
      this.#updateCurrentRoute(route, queryParams, popstate);
    else if (this.#defaultPath)
      this.#handleRouteChange(this.#defaultPath, queryParams, popstate);
    else
      throw Error(`No route found for '${path}'`);
  }

  /**
   * Checks if the given query parameters match the current query parameters.
   *
   * @private
   * @param {object} params - The query parameters to compare.
   * @returns {boolean} - True if the given parameters match the current query parameters, false otherwise.
   */
  #matchCurrentParams(params) {
    const paramsKeys = Object.keys(params);

    if (paramsKeys.length !== Object.keys(this.#currentQueryParams).length)
      return false;

    return paramsKeys.every(k => this.#currentQueryParams[k] === params[k]);
  }

  /**
   * Updates the current route and dispatches the 'routechanged' event.
   *
   * @private
   * @param {object} route - The route object.
   * @param {object} queryParams - The query parameters associated with the route.
   * @param {boolean} [popstate=false] - (Optional) if a popstate is at the origin of this route change.
   */
  #updateCurrentRoute(route, queryParams, popstate = false) {
    this.#currentRoute?.destroy();
    this.#currentRoute = route;
    this.#currentQueryParams = queryParams;
    route.start(queryParams);
    this.dispatchEvent(new CustomEvent('routechanged', {
      detail: {
        route,
        popstate,
        queryParams
      }
    }));
  }

  /**
   * Initiates the router based on the current window location.
   *
   * @param defaultPath - The fallback path when no path is found during route resolving.
   */
  start({ defaultPath }) {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const queryParams = Object.fromEntries(url.searchParams.entries());

    this.#defaultPath = defaultPath;
    this.base = this.findRoute(path) ?
      path.replace(/\/[^/]+\/?$/, '/') :
      path;

    this.base = this.base.replace(/\/+$/, '');

    this.#handleRouteChange(path, queryParams);
  }

  get queryParams() {
    return this.#currentQueryParams;
  }

  get currentRoute() {
    return this.#currentRoute;
  }
}

// Export a singleton instance of the router
export default new Router();
