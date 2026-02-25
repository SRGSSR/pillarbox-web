import { MainResource } from '../dataProvider/model/typedef';
import { KeySystems } from '../utils/typedef';


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

/**
 * Represents a set of options specific to the SRG SSR.
 *
 * __Note__:
 *
 * - All these options have a default value and can therefore be undefined.
 * - DataProvider options cannot be combined with each other.
 */
export type SrgOptions = {
  /**
   * A function returning an object representing a mediaComposition.
   *
   * @example
   * // Must match the following signature
   * (data: string) => any
   */
  dataProvider: undefined | Function;
  /**
   * A specific host for a different IL environment.
   */
  dataProviderHost: undefined | string;
  /**
   * A function for handling a custom data source.
   *
   * @example
   * // Must match the following signature
   * (contentId: string) => string
   */
  dataProviderUrlHandler: undefined | Function;
  /**
   * The environment to use for SRG Analytics
   *
   * @defaultValue "prod"
   */
  analyticsEnvironment: undefined | string;
  /**
   * The URL of the TagCommander script.
   */
  tagCommanderScriptURL: undefined | string;
}
