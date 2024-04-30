import Pillarbox from '../pillarbox.js';
import vjsLang from 'video.js/dist/lang/it.json';
import pillarboxLang from './it.json';

Pillarbox.addLanguage('it', {
  ...vjsLang,
  ...pillarboxLang,
});
