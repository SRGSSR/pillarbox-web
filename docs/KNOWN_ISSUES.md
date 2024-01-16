# Known Issue

This section aims to provide insights into specific challenges integrators may encounter and offers
solutions or workarounds to address them.

* [Calling `player.reset()` disables DRM for Safari](#calling-playerreset-disables-drm-for-safari)
  * [Issue Details](#issue-details)
  * [Solutions](#solutions)
    * [Dispose of the player](#dispose-of-the-player)
    * [Reset the `videojs-contrib-eme` plugin](#reset-the-videojs-contrib-eme-plugin)
* [Setting start position on iOS safari](#setting-start-position-on-ios-safari)
  * [Issue Details](#issue-details-1)
  * [Workaround](#workaround)

## Calling `player.reset()` disables DRM for Safari

Attempts to load DRM (Digital Rights Management) protected content after calling `player.reset()`
may not trigger the `webkitneedkey` event. This prevents the initiation of the certificate retrieval
process in Safari, resulting in the inability to play DRM protected content.

### Issue Details

- **Scenario:** Calling `player.reset()` before loading a new DRM protected source.
- **Affected Browser:** Safari
- **Symptoms:** `webkitneedkey` event not fired, leading to video playback issues with DRM-protected
  content.

### Solutions

To address this issue:

#### Dispose of the player

Instead of calling `player.reset()` you can use the following approach to dispose of a player and
reuse the DOM element further down the line :

1. **Create the player with the option `restoreEL: true`** : When creating the player make sure that
   the option `restoreEl` is set to `true`. This will not delete the original DOM element from the
   DOM once the player is disposed :
   ```javascript
   const player = new Pillarbox('player-id', {
    // ---
    restoreEl: true
   });
   ```

2. **Dispose of the player** : When you no longer need the player : `player.dispose()`.
3. **Recreate the player** : Now you can initialise the player again like in step 1.

#### Reset the `videojs-contrib-eme` plugin

If you *must* call `player.reset()` then you'll have to manually restart the `videojs-contrib-eme`
plugin:

1. 🚨 **Avoid Calling `player.reset()`:** If possible, avoid using `player.reset()` unless absolutely
   necessary. In many cases, it may not be required.
2. **Reinitialize `videojs-contrib-eme` After `player.reset()`:** If you must call `player.reset()`,
   reinitialize the `videojs-contrib-eme` plugin afterward to ensure proper handling of
   DRM-protected content. Example:
    ```javascript
    // Reinitialize videojs-contrib-eme after calling player.reset() and before loading a new source
    player.eme({
        // Add your plugin configuration here
    });
    ```

## Setting start position on iOS safari

On iOS Safari, there is a bug with the `loadedmetadata` event when attempting to set the start
position of a video. This event, commonly used for this purpose on other browsers, may lead to
unexpected behavior on iOS devices.

For more details
see [Bug 261512: Changing the currentTime at loadedmetadata breaks the player][ios-bug].

### Issue Details

- **Scenario:**Calling `player.on('loadedmetadata', () => player.currentTime(startPosition))`.
- **Affected Browser:** Safari for iOS.
- **Symptoms:** The video doesn't seek to the starting position and the seeking bar becomes stuck.

### Workaround

To address this issue on iOS Safari, it is recommended to use the `loadeddata`event instead
of `loadedmetadata`. The `loadeddata` event is triggered when the frame at the current playback
position of the media has finished loading. While it might not be the preferred event, it is a
reliable alternative. See the example below:

```javascript
player.on('loadeddata', () => {
  // Set the desired start position in seconds
  player.currentTime(startTime);
});
```

[ios-bug]: https://bugs.webkit.org/show_bug.cgi?id=261512
