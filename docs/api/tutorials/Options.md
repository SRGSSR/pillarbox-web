## Default Options

Pillarbox deviates from the default configuration provided
by [Video.js](https://videojs.com/guides/options/) on the following key options:

### `enableSmoothSeeking=true`

This option enables smooth seeking for Pillarbox, which means that the player will not pause or
stutter when seeking to a different position in the video.

See [Video.js enableSmoothSeeking Option](https://videojs.com/guides/options/#enablesmoothseeking).

### `fill=true`

This mode allows the player to expand to fill its container.

See [Video.js fill mode](https://videojs.com/guides/layout/#fill-mode).


#### `html5.vhs.useForcedSubtitles=true`

This property enables the player to display forced subtitles by default. Forced subtitles are pieces
of information intended for display when no other text representation is selected. They are used to
clarify dialogue, provide alternate languages, display texted graphics, or present location/person
IDs that are not otherwise covered in the dubbed/localized audio.

See [VHS useForcedSubtitles Option](https://github.com/videojs/http-streaming/blob/main/README.md#useforcedsubtitles).

### `liveTracker.trackingThreshold=120`

This property defines a threshold that controls when the live UI should be shown. The live UI will
be shown if the live edge is within this number of seconds from the current time.

See [Video.js trackingThreshold Option](https://videojs.com/guides/options/#livetrackertrackingthreshold).

### `liveTracker.liveTolerance=15`

This property defines an option that controls how far from the seekable end should be considered
live playback. The player will consider itself live if the current time is within this number of
seconds from the live edge.

See [Video.js liveTolerance Option](https://videojs.com/guides/options/#livetrackerlivetolerance).

### `liveui=true`

This option allows the player to use the live UI that includes: A progress bar for seeking within
the live window and a button that can be clicked to seek to the live edge with a circle indicating
if you are at the live edge or not.

See [Video.js liveui Option](https://videojs.com/guides/options/#liveui).

### `playsinline=true`

This option indicates that the video is to be played "inline", that is within the element's playback
area. This can be useful for mobile devices, where fullscreen playback may not be desired.

See [Video element playsinline attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#playsinline).

### `plugins.eme=true`

This property enables the EME plugin, which allows the player to handle encrypted media content
using a Content Decryption Module (CDM). The CDM is responsible for decrypting the media and
enforcing the license policy.

See [Pillarbox DRM Support](https://github.com/SRGSSR/pillarbox-web/wiki/Supported-Media-Types#drm-support)
and [Video.js Plugins Option](https://videojs.com/guides/options/#plugins).

### `responsive=true`

This option enables responsive mode, which will cause the player to customize itself based on
responsive breakpoints. This means that the player will adjust its size and layout according to the
screen size and orientation.

See [Video.js Responsive Option](https://videojs.com/guides/options/#responsive).

## Custom Options

The options in this section complement those of video.js, further customizing the player experience.

### `srgOptions.dataProvider`

***Specific to media content from SRG SSR.***

Specifies a custom function returning an object representing an SRG SSR media content. This function
takes a single parameter: the string initially passed as the player's source, and return a JSON
object representing the mediaComposition.

#### Usage

```javascript
const player = pillarbox('player', {
  srgOptions: {
    // Defines the custom data provider
    dataProvider: (data) => JSON.parse(data)
  }
});

// A stringified object representing the mediaComposition
const mediaCompositionStringifiedObject = JSON.stringify({
  // ...
});

// Load the source with type 'srgssr/urn'
player.src({ src: mediaCompositionStringifiedObject, type: 'srgssr/urn' });
```

The returned object must conform to the [Media Composition](./MediaComposition.html) structure to
ensure proper media playback.

> The absence of a conforming object may lead to unexpected errors, affecting video playback.

### `srgOptions.dataProviderHost`

***Specific to media content from SRG SSR.***

Specifies the host URL for the SRG SSR media content data provider. It is used to define a base URL
for fetching media content metadata.

#### Usage

```javascript
const player = pillarbox('player', {
  srgOptions: {
    // Defines the alternative host
    dataProviderHost: 'il-stage.srgssr.ch'
  }
});

// Load the source with type 'srgssr/urn'
player.src({ src: 'my-content-id', type: 'srgssr/urn' });
```

### `srgOptions.dataProviderUrlHandler`

***Specific to media content from SRG SSR.***

Specifies a custom function to generate URLs for SRG SSR media content queries. The function accepts
a content identifier and returns a string URL to query the back-end. It enables custom integration
with various back-end systems while using SRG SSR's media playing capabilities.

#### Usage

```javascript
const player = pillarbox('player', {
  srgOptions: {
    // Defines the custom URL handler
    dataProviderUrlHandler: (id) => `https://my-domain.com/content/${id}`
  }
});

// Load the source with type 'srgssr/urn'
player.src({ src: 'my-content-id', type: 'srgssr/urn' });
```

The custom URL handler constructs request URLs based on a content identifier. The returned URL must
lead to a response conforming to the [Media Composition](./MediaComposition.html) structure to
ensure proper media playback.

> The absence of a conforming object from the server may lead to unexpected errors, affecting video
> playback.

### `srgOptions.analyticsEnvironment`

***Specific to analytics of SRG SSR.***

Specifies the environment use for SRG analytics/tracking. Is internally mapped to `navigation_environment` variable for the TagCommander data layer. If not set, `prod` is used.

#### Usage

```javascript
const player = pillarbox('player', {
  srgOptions: {
    // Defines the analytics environment name
    analyticsEnvironment: 'dev'
  }
});
```