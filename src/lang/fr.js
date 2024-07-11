import Pillarbox from '../pillarbox.js';
import vjsLang from 'video.js/dist/lang/fr.json';
import pillarboxLang from './fr.json';

Pillarbox.addLanguage('fr', {
  ...vjsLang,
  ...pillarboxLang,
});
