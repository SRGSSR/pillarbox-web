This section aims to provide insights into specific challenges integrators may encounter and offers
solutions or workarounds to address them.

### Calling `player.reset()` disables DRM for Safari

Attempts to load DRM (Digital Rights Management) protected content after calling `player.reset()`
may not trigger the `webkitneedkey` event. This prevents the initiation of the certificate retrieval
process in Safari, resulting in the inability to play DRM protected content.

#### Issue Details

- **Scenario:** Calling `player.reset()` before loading a new DRM protected source.
- **Affected Browser:** Safari
- **Symptoms:** `webkitneedkey` event not fired, leading to video playback issues with DRM-protected
  content.

#### Solutions

To address this issue:

##### Dispose of the player

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

##### Reset the `videojs-contrib-eme` plugin

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

### Setting start position on iOS safari

On iOS Safari, there is a bug with the `loadedmetadata` event when attempting to set the start
position of a video. This event, commonly used for this purpose on other browsers, may lead to
unexpected behavior on iOS devices.

For more details
see [Bug 261512: Changing the currentTime at loadedmetadata breaks the player][ios-bug].

#### Issue Details

- **Scenario:** Calling `player.on('loadedmetadata', () => player.currentTime(startPosition))`.
- **Affected Browser:** Safari for iOS.
- **Symptoms:** The video doesn't seek to the starting position and the seeking bar becomes stuck.

#### Workaround

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

### Analytics Tracking Limitation

> This issue is limited to the SRG SSR Analytics module.

There is a limitation related to analytics tracking when attempting to load multiple players on the
same page.

The current implementation of TagComander uses a global variable to persist labels needed
for tracking, loading multiple players overrides labels with those from the latest loaded source.

#### Issue Details

- **Scenario:** Instantiating multiple players on the same page.
- **Symptoms:** Only the latest loaded source labels are sent.

#### Workaround

To address this limitation, only one player should have tracking enabled at a time, while all other
players need to disable it using the `disableTrackers` property during source loading:

```javascript
const player = pillarbox('my-player');
player.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn', disableTrackers: true });
```

> 🚨 **DO NOT toggle this flag again if tracking has been disabled this way.**
>
> Since labels are set on the `loadstart` event, disabling the tracking this way prevents any label
> conflicts. However, Re-enabling tracking for the same source after the player is ready will not
> update labels.

##### Additional Considerations

1. To check if any player is already tracking analytics, use the following code:
   ```javascript
   pillarbox.getAllPlayers().some(player => player.currentSource().disableTrackers)
   ```

2. Before tracking a new player, disable tracking on the currently tracking player:
   ```javascript
   const newPlayer = pillarbox('new-player');
   // Find the currently tracking player
   const trackedPlayer = pillarbox.getAllPlayers().find(player => player.currentSource().disableTrackers);

   // If the ready event has already been fired, this callback is triggered immediately.
   // Otherwise, it acts like an event listener.
   trackedPlayer.ready(() => {
     trackedPlayer.currentSource().disableTrackers = true;
     // Tracking has been disabled for the previous player; it is safe to switch the tracking now.
     newPlayer.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn' });
   });
   ```
   Again, in this scenario you MUST NOT re-enable the tracking for `trackedPlayer`.

### Yarn Deduplication Issue

This section highlights a known issue with Yarn leading to multiple versions of `video.js` being
installed in a project, contrary to npm's deduplication to a single version.

#### Issue Details

- **Scenario**: Cyclic dependencies involving `video.js` result in conflicting versions being
  installed via Yarn.
- **Symptoms**: This causes compatibility issues, such as the `eme` plugin loading in only
  one `video.js` instance, leading to errors.

#### Workaround

To mitigate this issue, force Yarn to resolve `video.js` to a single version (`8.11.8`) by adding
the following to your project's `package.json`:

```json
"resolutions": {
  "video.js": "8.11.8"
}
```

See [Yarn's Manifest Resolutions][yarn-resolutions].

[yarn-resolutions]: https://yarnpkg.com/configuration/manifest#resolutions

[ios-bug]: https://bugs.webkit.org/show_bug.cgi?id=261512
