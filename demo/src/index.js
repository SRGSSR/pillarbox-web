/**
 * Main module to import and initialize the demo as a single page application.
 *
 * @module
 */
import './components/dialog/demo-dialog-component';
import './components/player/player';
import './layout/content/examples/examples-page';
import './layout/content/lists/lists-page';
import './layout/content/search/search-page';
import './layout/content/settings/settings-page';
import './layout/content/showcase/showcase-page';
import './layout/header/header-component';
import './router/route-outlet-component';
import router from './router/router';
import PreferencesProvider from './layout/content/settings/preferences-provider';

const preferences = PreferencesProvider.loadPreferences();


// Initialize the router with the current path or 'examples' if none is found
router.start({ defaultPath: 'examples' });

if (router.queryParams.debug) {
  preferences.debug = router.queryParams.debug === 'true';
  PreferencesProvider.savePreferences(preferences);
} else if (preferences.debug) {
  router.updateState({ debug: 'true' });
}
