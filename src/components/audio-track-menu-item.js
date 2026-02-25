import videojs from 'video.js';

/** @import VJSAudioTrackButton from 'video.js/dist/types/control-bar/audio-track-controls/audio-track-button' */
/** @import MenuItem from 'video.js/dist/types/menu/menu-item' */

/**
 * @ignore
 * @type {typeof VJSAudioTrackButton}
 */
const VJSAudioTrackButton = videojs.getComponent('AudioTrackButton');

/**
 * @ignore
 * @type {typeof MenuItem}
 */
const MenuItem = videojs.getComponent('MenuItem');

/**
 * An {@link AudioTrack} {@link MenuItem}
 *
 * This is a temporary workaround.
 *
 * @extends MenuItem
 */
class AudioTrackMenuItem extends MenuItem {

  /**
   * Creates an instance of this class.
   *
   * @param {Player} player
   *        The `Player` that this class should be attached to.
   *
   * @param {Object} [options]
   *        The key/value store of player options.
   */
  constructor(player, options) {
    const track = options.track;
    const tracks = player.audioTracks();

    // Modify options for parent MenuItem class's init.
    options.label = track.label || track.language || 'Unknown';
    options.selected = track.enabled;

    super(player, options);

    this.track = track;

    this.addClass(`vjs-${track.kind}-menu-item`);

    const changeHandler = (...args) => {
      this.handleTracksChange.apply(this, args);
    };

    tracks.addEventListener('change', changeHandler);
    this.on('dispose', () => {
      tracks.removeEventListener('change', changeHandler);
    });
  }

  createEl(type, props, attrs) {
    const el = super.createEl(type, props, attrs);
    const parentSpan = el.querySelector('.vjs-menu-item-text');

    if (['main-desc', 'descriptions', 'description'].indexOf(this.options_.track.kind) >= 0) {
      parentSpan.appendChild(videojs.dom.createEl('span', {
        className: 'vjs-icon-placeholder'
      }, {
        'aria-hidden': true
      }));
      parentSpan.appendChild(videojs.dom.createEl('span', {
        className: 'vjs-control-text',
        textContent: ' ' + this.localize('Descriptions')
      }));
    }

    return el;
  }

  /**
   * This gets called when an `AudioTrackMenuItem is "clicked". See {@link ClickableComponent}
   * for more detailed information on what a click can be.
   *
   * @param {Event} [event]
   *        The `keydown`, `tap`, or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */
  handleClick(event) {
    super.handleClick(event);

    // the audio track list will automatically toggle other tracks
    // off for us.
    this.track.enabled = true;

    if (!this.player_.tech_.featuresNativeAudioTracks) return;

    // when native audio tracks are used, we want to make sure that other tracks are turned off
    const tracks = this.player_.audioTracks();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];

      // skip the current track since we enabled it above
      if (track === this.track) {
        continue;
      }

      track.enabled = track === this.track;
    }

  }

  /**
   * Handle any {@link AudioTrack} change.
   *
   * @param {Event} [event]
   *        The {@link AudioTrackList#change} event that caused this to run.
   *
   * @listens AudioTrackList#change
   */
  handleTracksChange() {
    this.selected(this.track.enabled);
  }
}

/**
 * The base class for buttons that toggle specific {@link AudioTrack} types.
 *
 * @extends VJSAudioTrackButton
 */
class AudioTrackButton extends VJSAudioTrackButton {


  /**
   * Create a menu item for each audio track
   *
   * @param {AudioTrackMenuItem[]} [items=[]]
   *        An array of existing menu items to use.
   *
   * @return {AudioTrackMenuItem[]}
   *         An array of menu items
   */
  createItems(items = []) {
    // if there's only one audio track, there no point in showing it
    this.hideThreshold_ = 1;

    const tracks = this.player_.audioTracks();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];

      items.push(new AudioTrackMenuItem(this.player_, {
        track,
        // MenuItem is selectable
        selectable: true,
        // MenuItem is NOT multiSelectable (i.e. only one can be marked "selected" at a time)
        multiSelectable: false
      }));
    }

    return items;
  }
}

videojs.registerComponent('AudioTrackMenuItem', AudioTrackMenuItem);
videojs.registerComponent('AudioTrackButton', AudioTrackButton);
