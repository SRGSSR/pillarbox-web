import Pillarbox from '../pillarbox.js';
import vjsLang from 'video.js/dist/lang/en.json';
import pillarboxLang from './en.json';

Pillarbox.addLanguage('en', {
  ...vjsLang,
  ...pillarboxLang,
});
