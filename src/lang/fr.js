import Pillarbox from '../pillarbox.js';
import * as vjsLang from 'video.js/dist/lang/fr.json';
import * as pillarboxLang from './fr.json';

Pillarbox.addLanguage('fr', {
  ...vjsLang,
  ...pillarboxLang,
});
