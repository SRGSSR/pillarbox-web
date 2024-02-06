# [pillarbox-web](https://github.com/SRGSSR/pillarbox-web) API

Welcome to the documentation for the Pillarbox Web Player, a web-based video player built on top of
Video.js.

## Quick Guide

To get started with Pillarbox, you can install it through `npm` using the following command:

```bash
npm install --save @srgssr/pillarbox
```

In your HTML file, add the following code to initialize Pillarbox:

```html
<video-js id="my-player" class="pillarbox-js" controls crossorigin="anonymous"></video-js>
```

Import the CSS file in your HTML to apply Pillarbox default theme:

```html
<link rel="stylesheet" href="node_modules/pillarbox/pillarbox.min.css">
```

Finally, import Pillarbox and set up the player:

```javascript
import Pillarbox from 'pillarbox';

const player = new Pillarbox('my-player', {// Options... });
player.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn' });
```

## Player workflows

For a comprehensive guide on player workflows, refer to the
official [Video.js Player Workflows Guide](https://videojs.com/guides/player-workflows/). More
showcases and examples ara available in
the [Pillarbox Demo Application](https://srgssr.github.io/pillarbox-web-demo/showcase).

## Further Reading

Pillarbox serves as a superset of video.js, making all the available API features from video.js
accessible without any modification. The most useful doc tu start is the [Player](./Player.html)
class.

To learn more about video.js, you can visit the [Video.js Guides](https://videojs.com/guides) and
the [Video.js API docs](https://docs.videojs.com/).

Keep track of our [Known Issues](./tutorial-Known%20Issues.html) section.
