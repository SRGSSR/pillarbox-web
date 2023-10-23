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

export default Pillarbox;
