import {MainResource} from '../dataProvider/model/typedef';
import {KeySystems} from '../utils/typedef';


/**
 * A {@link MainResource} that can contain {@link KeySystems} information.
 */
export interface MainResourceWithKeySystems extends MainResource, KeySystems {

}

/**
 * Represents the result of composing source media data.
 */
export type ComposedSrcMediaData = {
  /**
   * The URL of the source media.
   */
  src: string;
  /**
   * The MIME type of the source media.
   */
  type: string;
  /**
   * A mapping of DRM types to their corresponding key systems information.
   */
  keySystems: KeySystems,
  /**
   * Indicates whether trackers are disabled for the source media.
   */
  disableTrackers: boolean;
  /**
   * The merged media data from the source and additional media data.
   */
  mediaData: MainResource;
};
