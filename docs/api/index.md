# [pillarbox-web](https://github.com/SRGSSR/pillarbox-web) API

Welcome to the documentation for the Pillarbox Web Player, a web-based video player built on top of
Video.js.

## Quick Guide


To get started with Pillarbox, install it along with `video.js` using the following command:

```bash
npm install --save @srgssr/pillarbox-web video.js@8.21.0
```

> [!NOTE]
> `video.js` is now a peer dependency and must be installed by the project that bundles Pillarbox.
> Version 8.21.0 is the version we use to test the player and is the one we recommend.
>
> This approach is more flexible and consistent with the fact that integrators are responsible for
> providing their own UI components.

In your HTML file, add the following code to initialize Pillarbox:

```html
<video-js id="my-player" class="pillarbox-js" controls></video-js>
```

Import the CSS file in your HTML to apply Pillarbox default theme:

```html

<link rel="stylesheet" href="node_modules/@srgssr/pillarbox-web/dist/pillarbox.min.css"/>
```

Finally, import Pillarbox and set up the player:

```javascript
import Pillarbox from '@srgssr/pillarbox-web';

const player = new Pillarbox('my-player', {/* options... */ });
player.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn' });
```

## Player workflows

For a comprehensive guide on player workflows, refer to the
official [Video.js Player Workflows Guide](https://videojs.com/guides/player-workflows/).

More showcases and examples ara available in
the [Pillarbox Demo Application](https://demo.pillarbox.ch/showcase).

## Further Reading

Pillarbox serves as a superset of video.js, making all the available API features from video.js
accessible without any modification. The most useful doc tu start is the [Player](./Player.html)
class.

To learn more about video.js, you can visit the [Video.js Guides](https://videojs.com/guides) and
the [Video.js API docs](https://docs.videojs.com/).

To expand the features that Pillarbox offers out of the box, visit the [Pillarbox Web
Suite](https://github.com/SRGSSR/pillarbox-web-suite). You are welcome to contribute and share your
own components there.

Keep track of our [Known Issues](./tutorial-Known%20Issues.html) section.

You can learn more about themes and create your own with
the [Pillarbox Theme Editor](https://editor.pillarbox.ch).


[token-settings]: https://github.com/settings/tokens

[token-guide]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token
