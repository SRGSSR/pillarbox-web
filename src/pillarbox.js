import { version } from '../package.json';
import videojs from 'video.js';
import 'videojs-contrib-eme';
import './components/player.js';

/**
 * @namespace
 * @class Pillarbox
 *
 * @extends import('video.js').VideoJsPlayer
 *
 */
class Pillarbox extends videojs {
  static get VERSION() {
    return {
      pillarbox: version,
      videojs: videojs.VERSION,
      [videojs.VhsSourceHandler.name]: videojs.VhsSourceHandler.VERSION,
      eme: videojs.getPlugin('eme').VERSION,
    };
  }
}

Pillarbox.options.srgOptions = {
  dataProviderHost: undefined,
  tagCommanderScriptURL: undefined,
};
Pillarbox.options.trackers = {};

// TODO will be moved, see https://github.com/SRGSSR/pillarbox-web/issues/48
Pillarbox.addLanguage('en', {
  AGERATING12: 'To protect children this content is only available between 8PM and 6AM.',
  AGERATING18: 'To protect children this content is only available between 10PM and 5AM.',
  COMMERCIAL: 'This commercial content is not available.',
  ENDDATE: 'This content is not available anymore.',
  GEOBLOCK: 'This content is not available outside Switzerland.',
  LEGAL: 'This content is not available due to legal restrictions.',
  STARTDATE: 'This content is not available yet.',
  UNKNOWN: 'This content is not available.',
});

export default Pillarbox;
