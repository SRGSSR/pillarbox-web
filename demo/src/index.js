/**
 * Main module to import and initialize the demo as a single page application.
 *
 * @module
 */
import './player/player';
import './layout/header-component';
import './router/route-outlet-component';
import './examples/examples-page';
import './search/search-page';
import './lists/lists-page';
import router from './router/router';

// Initialize the router with the current path or 'examples' if none is found
router.start({ defaultPath: 'examples' });
