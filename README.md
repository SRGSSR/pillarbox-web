# Pillarbox Web Player

[![Pillarbox logo](docs/README-images/logo.jpg)](https://github.com/SRGSSR/pillarbox-web)

## About

The Pillarbox Web Player is a web-based video player that extends Video.js to enable playback of
SRGSSR content through a custom data provider. This player is designed to enhance the viewing
experience of SRGSSR content, making it more accessible and feature-rich.

## Quick Start

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
import pillarbox from '@srgssr/pillarbox-web';

const player = pillarbox('my-player', {/* options... */ });
player.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn' });
```

For examples of integrating Pillarbox with popular frameworks, check out this collection of
[samples][pillarbox-samples].

## CDN Integration

Pillarbox is an open-source project published as a public NPM package. You can easily include it in
your website using a public CDN that proxies NPM packages—such as [jsDelivr][js-deliver].

To integrate Pillarbox Web via CDN, you can include it in your HTML like this:

```html
<!-- It's recommended to specify an exact version in production.
     For example: https://cdn.jsdelivr.net/npm/@srgssr/pillarbox-web@{version}/dist/pillarbox.umd.min.js
     In this example, we use the latest version for simplicity. -->
<script src="https://cdn.jsdelivr.net/npm/@srgssr/pillarbox-web/dist/pillarbox.umd.min.js"></script>
<!-- Load additional plugins or extensions after Pillarbox -->
<script>
  // Example usage:
  const player = pillarbox('my-player', {/* options... */ });
  player.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn' });

  // Other classes and utilities available under `window.srgssr`:
  // DataProvider, MediaComposition, PillarboxMonitoring, Player, SRGAnalytics, SrgSsr
</script>
```

Try the sample live on StackBlitz: [Open in StackBlitz][stackblitz-umd]

You can also use a different CDN or host the file yourself.

> [!NOTE]
> When using the UMD build via CDN, video.js is already bundled with Pillarbox.
> You should not include it separately.
> The UMD bundle also exposes `video.js` as a global variable, allowing you to use both and internal
> extensions as needed.

### ESM integration from a CDN

If you’d like to load Pillarbox from a CDN while taking advantage of modern ES module packages,
check out this tutorial: [ESM and import maps][esm-tutorial]

## Documentation

For detailed information on how to use the Pillarbox Web Player, checkout
the [API Documentation](https://web.pillarbox.ch/api).

A live demo of the player is available
here: [Pillarbox Web Demo](https://demo.pillarbox.ch).

To expand the features that Pillarbox offers out of the box, visit the [Pillarbox Web
Suite](https://github.com/SRGSSR/pillarbox-web-suite). You are welcome to contribute and share your
own components there.

You can create your own theme with
the [Pillarbox Theme Editor](https://editor.pillarbox.ch).

## Pillarbox flavours

Pillarbox comes in two variants:

- `pillarbox-core`: is the core library that provides a rich set of features on top of the Video.js
  API. It does not include any SRGSSR-specific business logic, so it can be used by any developer
  who wants to customize their own video player.
- `pillarbox` is the complete package that includes the core library as well as the SRGSSR data
  provider and analytics. It is designed for SRGSSR applications that need to integrate with the
  SRGSSR media platform and tracking behavior.

## TypeScript Support

TypeScript is a language that extends JavaScript with static types and other features. It helps to
write more reliable and maintainable code. `Pillarbox` is written in plain JavaScript, but it
provides type declarations for TypeScript users. These declarations are carefully generated and
included in the bundled package.

## Contributing

If you want to contribute to this project, you are welcome to do so. Please follow the code style
and linting rules defined in this project. You can use the following commands to check and fix your
code:

Check your javascript code:

```shell
npm run eslint
```

Check your CSS and SCSS code:

```shell
npm run stylelint
```

Fix your CSS and SCSS code:

```shell
npm run stylelint:fix
```

This project also has a pre-commit hook that runs the linting check automatically before you commit
your changes. You can enable this hook by running the `prepare` script: `npm run prepare`.

Before submitting a pull request, please make sure that your code builds successfully. You can use
the following commands to build the project:

```shell
npm run build
```

If you want to enhance our demo application you can get involved
here: https://github.com/SRGSSR/pillarbox-web-demo
To contribute to the theme editor go to: https://github.com/SRGSSR/pillarbox-web-theme-editor

### Using `nvm`

This project includes an `.nvmrc` file that specifies the recommended Node.js version.

If you use `nvm`, you can automatically switch to the correct Node version by running: `nvm use`
If the required version is not installed yet, run: `nvm install`. This will install the Node.js
version defined in `.nvmrc` and switch your shell to use it.

For more details on installing and using the `.nvmrc` file see the official
[`.nvmrc` documentation][nvmrc-doc].

## License

See the [LICENSE](LICENSE) file for more information.

[js-deliver]: https://www.jsdelivr.com/package/npm/@srgssr/pillarbox-web
[stackblitz-umd]: https://stackblitz.com/github/srgssr/pillarbox-web-demo/tree/main/samples/umd
[esm-tutorial]: https://web.pillarbox.ch/api/tutorial-ESM%20and%20import%20maps.html
[pillarbox-samples]: https://github.com/SRGSSR/pillarbox-web-demo/tree/main/samples
