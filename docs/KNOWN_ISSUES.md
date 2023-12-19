# Known Issue

Attempts to load DRM (Digital Rights Management) protected content after calling `player.reset()` may not trigger
the `webkitneedkey` event. This prevents the initiation of the certificate retrieval process in Safari, resulting in the
inability to play DRM protected content.

### Issue Details

- **Scenario:** Calling `player.reset()` before loading a new DRM protected source.
- **Affected Browser:** Safari
- **Symptoms:** `webkitneedkey` event not fired, leading to video playback issues with DRM-protected content.

### Solutions

To address this issue:

#### Dispose of the player

Instead of calling `player.reset()` you can use the following approach to dispose of a player and reuse the DOM
element further down the line :

1. **Create the player with the option `restoreEL: true`** : When creating the player make sure that the
   option `restoreEl` is set to `true`. This will not delete the original DOM element from the DOM once the player is
   disposed :

   ```javascript
   const player = new Pillarbox('player-id', {
    // ---
    restoreEl: true
   });
   ```

2. **Dispose of the player** : When you no longer need the player : `player.dispose()`.
3. **Recreate the player** : Now you can initialise the player again like in step 1.

#### Reset the `videojs-contrib-eme` plugin

If you *must* call `player.reset()` then you'll have to manually restart the `videojs-contrib-eme` plugin:

1. **Avoid Calling `player.reset()`:** If possible, avoid using `player.reset()` unless absolutely necessary. In many
   cases, it may not be required.

2. **Reinitialize `videojs-contrib-eme` After `player.reset()`:** If you must call `player.reset()`, reinitialize
   the `videojs-contrib-eme` plugin afterward to ensure proper handling of DRM-protected content. Example:

    ```javascript
    // Reinitialize videojs-contrib-eme after calling player.reset() and before loading a new source
    player.eme({
        // Add your plugin configuration here
    });
    ```
