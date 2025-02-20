import SrgSsr from './src/middleware/srgssr.js';
import Player from './src/components/player.js';
import Pillarbox from './src/pillarbox.js';
import DataProvider from './src/dataProvider/services/DataProvider.js';
import MediaComposition from './src/dataProvider/model/MediaComposition.js';
import PillarboxMonitoring from './src/trackers/PillarboxMonitoring.js';
import SRGAnalytics from './src/trackers/SRGAnalytics.js';

export {
  Pillarbox as default,
  DataProvider,
  MediaComposition,
  PillarboxMonitoring,
  Player,
  SRGAnalytics,
  SrgSsr
};
