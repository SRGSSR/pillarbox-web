import Pillarbox from '../pillarbox.js';
import * as vjsLang from 'video.js/dist/lang/it.json';
import * as pillarboxLang from './it.json';

Pillarbox.addLanguage('it', {
  ...vjsLang,
  ...pillarboxLang,
});
