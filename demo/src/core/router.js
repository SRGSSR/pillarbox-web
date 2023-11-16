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
 *    router.addRoute('/', () => {
 *      // Function to execute when navigating to the root path
 *      console.log('Navigated to the root path');
 *    }, () => {
 *      // Function to execute when navigating away from the root path
 *      console.log('Navigated away from the root path');
 *    });
 *    ```
 * 3. Integrate with an `<a>` tag using the `data-spa-route` attribute:
 *    ```html
 *    <a href="/" data-spa-route>Home</a>
 *    <a href="/about" data-spa-route>About</a>
 *    ```
 *    Clicking on these links will trigger the router to navigate to the specified paths.
 *
 * @class
 */
class Router extends EventTarget {
  #fallback;

  constructor() {
    super();

    this.routes = [];
    this.currentRoute = null;

    // Event listener for click events on the document
    document.addEventListener('click', (event) => {
      if (!('spaRoute' in event.target.dataset)) {
        return;
      }

      event.preventDefault();
      const path = new URL(event.target.href).pathname;

      if (!this.isActiveRoute(path)) {
        window.history.pushState({}, '', event.target.href);
        this.handleRouteChange(path);
      }
    });

    // Event listener for the popstate event
    window.addEventListener('popstate', () => this.handleRouteChange(window.location.pathname));
  }

  /**
   * Adds a route to the router.
   *
   * @param {string} pattern - The path of the route, can be a glob pattern.
   * @param {function} start - The function to be called when the route is navigated to.
   * @param {function} destroy - The function to be called when the route is navigated away from.
   */
  addRoute(pattern, start, destroy = () => {
  }) {
    const path = new Minimatch(pattern, { matchBase: true });

    this.routes.push({ path, start, destroy });
  }

  /**
   * Checks if the given path is the current active route.
   *
   * @param {string} path - The path to check.
   * @returns {boolean} - True if the given path is the current active route, false otherwise.
   */
  isActiveRoute(path) {
    return this.currentRoute &&
      this.currentRoute.path === this.findRoute(path).path;
  }

  /**
   * Finds a route based on the given path.
   *
   * @param {string} path - The path to find the route for.
   * @returns {object} - The route object if found, otherwise undefined.
   */
  findRoute(path) {
    return this.routes.find(r => r.path.match(path));
  }

  /**
   * Navigates to the specified path.
   *
   * @param {string} path - The path to navigate to.
   */
  navigateTo(path) {
    if (this.isActiveRoute(path)) {
      return;
    }

    window.history.pushState({}, '', this.base + path);
    this.handleRouteChange(path);
  }

  /**
   * Handles a change in the route.
   *
   * @param {string} path - The path of the new route.
   */
  handleRouteChange(path) {
    const route = this.findRoute(path);

    if (route) {
      route.destroy();
      this.currentRoute = route;
      route.start();
      this.dispatchEvent(new Event('routechanged'));
    } else if (this.#fallback) {
      this.handleRouteChange(this.#fallback);
    } else {
      throw Error(`No route found for '${path}'`);
    }
  }

  /**
   * Initializes the base path for the router based on the current window location pathname.
   * If the current pathname matches a route, the base is set to the pathname with the last path segment removed.
   * If there is no matching route, the base is set to the full pathname.
   */
  initBase() {
    const pathname = window.location.pathname;

    this.base = this.findRoute(pathname) ?
      pathname.replace(/\/[^/]+\/?$/, '/') :
      pathname;
  }

  /**
   * TODO Serves the purpose of having a fallback url in case of none found. We should
   *      rework this router in order to handle relative paths better.
   */
  set fallback(fallback) {
    this.#fallback = fallback;
  }
}

// Export a singleton instance of the router
export default new Router();
