import { css, html, LitElement } from 'lit';
import { theme } from '../../../theme/theme';
import exampleTxt from 'bundle-text:./starttime-example.txt';
import './showcase-component';
import { openPlayerModal } from '../../../components/player/player';

/**
 * This component allows to showcase videos with a specified start time.
 *
 * @element starttime-showcase
 *
 * @prop {Number} starttime - The start time of the video playback in seconds. Default value: 300.
 *
 * @prop {String} src - The source URL of the video. Default value: 'urn:swi:video:48115940'.
 *
 * @prop {String} type - The MIME type of the video. It defines the media type of the video file
 * specified in the `src` property. Default value: 'srsgssr/urn'.
 *
 * @example
 * ```html
 * <show-case-page starttime="30" src="urn:swi:video:48115940" type="srsgssr/urn"></show-case-page>
 * ```
 *
 * @customElement
 */
export class StartTimeShowcase extends LitElement {
  static styles = [theme, css`button { 
    width: 100%;
    margin: var(--size-1) 0;
    padding: var(--size-4) var(--size-3);
    border-radius: var(--radius-2);
  }`];
  static properties = {
    starttime: { type: Number },
    src: { type: String },
    type: { type: String }
  };
  constructor(props) {
    super(props);
    this.starttime = 300;
    this.src = 'urn:swi:video:48115940';
    this.type = 'srgssr/urn';
  }

  #openDemo() {
    const player = openPlayerModal({
      src: this.src,
      type: this.type,
      playerOptions: { trackers: { srgAnalytics: false }}
    }, false);

    player.on('loadeddata', () => player.currentTime(this.starttime));
  }

  render() {
    return html`
      <showcase-component>
        <h2 slot="title">Start the player at a given position</h2>
        <p slot="description">
          In this showcase, we'll demonstrate how to load a video source and
          start playback at a specific position using Pillarbox. This can be
          useful when you want to provide users with the option to begin
          watching a video from a predefined timestamp. To achieve this
          functionality, follow the code snippet below:
        </p>
        <code-block slot="code" language="javascript">${exampleTxt}</code-block>
      </showcase-component>
      <button @click="${() => this.#openDemo()}">Run the demo</button>
    `;
  }
}

customElements.define('starttime-showcase', StartTimeShowcase);
