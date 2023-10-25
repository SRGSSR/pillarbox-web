import Pillarbox from '../pillarbox.js';
import * as vjsLang from 'video.js/dist/lang/en.json';
import * as pillarboxLang from './en.json';

Pillarbox.addLanguage('en', {
  ...vjsLang,
  ...pillarboxLang,
});
