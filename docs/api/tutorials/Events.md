> The events detailed in this guide are specific to media content from SRG SSR. For information
> about video.js events, refer to the [Video.js API documentation][vjs-doc].

Pillarbox introduces custom events designed to enrich the video playback experience. By convention,
these events are prefixed with `srgssr/`.

In this tutorial, we'll explore these custom events, explaining their triggers and demonstrating how
to utilize them effectively.

### `srgssr/blocked-segment` event

This event notifies the application when a blocked segment (e.g., restricted content) is skipped,
allowing for appropriate responses such as user notifications.

**Handling the Event:**

```javascript
player.on('srgssr/blocked-segment', function ({ data }) {
  // Parsing metadata of the blocked segment
  const metadata = JSON.parse(data.text);

  // Log or handle the skipped segment information
  console.log(`Skipped blocked segment from ${data.startTime} to ${data.endTime}`, metadata);
});
```

A showcase displaying a notification when a blocked segment is skipped is available
here: [Showcase: Detect blocked segment][blocked-segments]

### `srgssr/chapter` event

Triggered when the playback navigates into or out of a chapter's range, this event enables
developers to update the UI dynamically to reflect current chapter information.

**Handling the Event:**

```javascript
player.on('srgssr/chapter', function ({ data }) {
  if (!data) {
    console.log("Entering a range without chapters");
    return;
  }

  // Parsing metadata of the chapter
  const metadata = JSON.parse(data.text);

  // Log or handle the chapter information
  console.log(`Entering chapter from ${data.startTime} to ${data.endTime}`, metadata);
});
```

A showcase displaying the current chapter is available
here: [Showcase: Display current chapter][chapters]

### `srgssr/interval` event

Activated upon entering or exiting a skippable section (like opening credits), this event enables
developers to provide a skip option.

**Handling the Event:**

```javascript
player.on('srgssr/interval', function ({ data }) {
  if (!data) {
    console.log('Entering a range without a skippable section');
    return;
  }

  // Parsing metadata of the skippable interval
  const metadata = JSON.parse(data.text);

  // Log or handle the skippable interval information
  console.log(`Entering a skippable section from ${data.startTime} to ${data.endTime}`, metadata);
});
```

A showcase displaying a button to skip the end credits is available
here: [Showcase: Skip Credits][intervals]

[blocked-segments]: https://demo.pillarbox.ch/static/showcases/blocked-segment.html

[chapters]: https://demo.pillarbox.ch/static/showcases/chapters.html

[intervals]: https://demo.pillarbox.ch/static/showcases/skip-credits.html

[vjs-doc]: https://docs.videojs.com/
