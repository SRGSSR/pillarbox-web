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
import './settings/settings-page';
import './lists/lists-page';
import router from './router/router';
import PreferencesProvider from './settings/preferences-provider';

const preferences = PreferencesProvider.loadPreferences();

// Initialize the router with the current path or 'examples' if none is found
router.start({ defaultPath: 'examples' });

if (router.queryParams.debug) {
  preferences.debug = router.queryParams.debug === 'true';
  PreferencesProvider.savePreferences(preferences);
} else if (preferences.debug) {
  router.updateState({ debug: 'true' });
}
