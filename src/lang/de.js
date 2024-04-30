import Pillarbox from '../pillarbox.js';
import vjsLang from 'video.js/dist/lang/de.json';
import pillarboxLang from './de.json';

Pillarbox.addLanguage('de', {
  ...vjsLang,
  ...pillarboxLang,
});
