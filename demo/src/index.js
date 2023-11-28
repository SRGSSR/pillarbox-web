/**
 * Main module to import and initialize the demo as a single page application.
 *
 * @module
 */
import './player/player';
import './header/header-component';
import './example/example-page';
import './search/search-page';
import './lists/lists-page';
import router from './core/router';

// Initialize the router with the current path or 'examples' if none is found
router.initBase();
router.fallback = 'examples';

const url = new URL(window.location.href);
const path = url.pathname;
const queryParams = Object.fromEntries(url.searchParams.entries());

router.handleRouteChange(path, queryParams);
