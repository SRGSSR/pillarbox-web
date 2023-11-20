/**
 * Main module to import and initialize the demo as a single page application.
 *
 * @module
 */
import './player/player';
import './header/header-component';
import './example/example-page';
import './search/search-page';
import './content-lists/content-tree-page';
import router from './core/router';

// Initialize the router with the current path or 'examples' if none is found
router.initBase();
router.fallback = 'examples';
router.handleRouteChange(window.location.pathname);