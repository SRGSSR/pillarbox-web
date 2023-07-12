import { version } from '../package.json';
import videojs from 'video.js';

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
    };
  }
}

export default Pillarbox;
