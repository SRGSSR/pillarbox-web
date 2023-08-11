import { version } from '../package.json';
import videojs from 'video.js';
import 'videojs-contrib-eme';

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
      [videojs.getPlugin('eme').name]: videojs.getPlugin('eme').VERSION,
    };
  }
}

export default Pillarbox;
