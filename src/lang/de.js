import Pillarbox from '../pillarbox.js';
import * as vjsLang from 'video.js/dist/lang/de.json';
import * as pillarboxLang from './de.json';

Pillarbox.addLanguage('de', {
  ...vjsLang,
  ...pillarboxLang,
});
