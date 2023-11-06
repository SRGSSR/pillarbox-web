# Pillarbox Web Player

[![Pillarbox logo](README-images/logo.jpg)](https://github.com/SRGSSR/pillarbox-web)

## Table of Contents

- [About](#about)
- [Quick Start](#quick-start)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)

## About

The Pillarbox Web Player is a web-based video player that extends Video.js to enable playback of SRGSSR content through
a custom data provider. This player is designed to enhance the viewing experience of SRGSSR content, making it more
accessible and feature-rich.

## Quick Start

To get started you'll need Node.js and npm installed on your system. Follow these steps to set up and run the player.

First add the player to your project dependencies:

```shell
npm install @srgssr/pillarbox-web --save
```

Then add a `video-js` tag in your page :

```html
<video-js id="player" controls crossorigin="anonymous"></video-js>
```

Initialize the video using the Pillarbox constructor and specify the source and its type :

```js
const player = new Pillarbox('player', {/* Options go here */ });
player.src({ src: 'urn:rts:video:6820736', type: 'srgssr/urn' });
```

## Contributing

If you want to contribute to the project have a look at our [contributing guide](CONTRIBUTING.md).

Make sur you enable pre-commit checks through Husky before sharing your code, to do so execute the following command:

```bash
npx husky install
```

## Documentation

For detailed information on how to use the Pillarbox Web Player, please refer to the documentation included with the
project (**To be defined**).

## License

See the [LICENSE](../LICENSE) file for more information.
