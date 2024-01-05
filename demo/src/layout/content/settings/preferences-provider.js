/**
 * Utility class for loading and saving preferences to local storage.
 *
 * @class PreferencesProvider
 */
class PreferencesProvider {
  /**
   * Load preferences from local storage.
   *
   * @static
   * @returns {Object} An object representing the loaded preferences.
   */
  static loadPreferences() {
    return JSON.parse(localStorage.getItem('preferences')) || {};
  }

  /**
   * Save preferences to local storage.
   *
   * @static
   * @param {Object} preferences - An object representing the preferences to be saved.
   * @returns {void}
   */
  static savePreferences(preferences) {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }
}

export default PreferencesProvider;
