The **Player Tips and Tricks** section serves as a valuable resource for users seeking guidance on optimizing their experience with Pillarbox.

## Adding or Overriding Resource Properties

There are scenarios where developers need to customize resource properties or override existing ones. This section provides insights into achieving both objectives effectively.

> This mechanism is specific to media content from SRG SSR.

### Example

Consider the following use case:

1. **Adding a Custom Property**:
   - Sometimes, you may want to introduce a custom property to a resource. This could involve adding metadata, specifying additional behavior, or enhancing the resource's functionality.

2. **Overriding an Existing Property**:
   - In other cases, you might need to modify an existing property. For instance, you could override the media source.

```javascript
const player = pillarbox('player');

// overrides the URL and adds a blocking reason
player.src({
  src: 'urn:bu:media:id',
  type: 'srgssr/urn',
  mediaData: {
    // override the media URL
    url: 'https://fake-url.com/new-media.m3u8',
    // override the MIME type. Mandatory if you switch from Dash to HLS
    mimeType: 'application/x-mpegURL',
    // add a custom property
    customProperty: 'Custom value'
  }
});
```

> It's the developer's responsibility to ensure data consistency, otherwise unexpected errors may occur, preventing the media from playing.
