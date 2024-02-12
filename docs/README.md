# Pillarbox Web Player

[![Pillarbox logo](README-images/logo.jpg)](https://github.com/SRGSSR/pillarbox-web)

## About

The Pillarbox Web Player is a web-based video player that extends Video.js to enable playback of
SRGSSR content through a custom data provider. This player is designed to enhance the viewing
experience of SRGSSR content, making it more accessible and feature-rich.

## Quick Start

To get started with Pillarbox, add the `@srgssr` registry in your `.npmrc` file:

```text
//npm.pkg.github.com/:_authToken=TOKEN
@srgssr:registry=https://npm.pkg.github.com
```

To generate an authentication token follow this
guide: [Authenticating with a personal access token](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)

You can now install it through `npm` the following command:

```bash
npm install --save @srgssr/pillarbox
```

In your HTML file, add the following code to initialize Pillarbox:

```html

<video-js id="my-player" class="pillarbox-js" controls crossorigin="anonymous"></video-js>
```

Import the CSS file in your HTML to apply Pillarbox default theme:

```html

<link rel="stylesheet" href="node_modules/@srgssr/pillarbox-web/dist/pillarbox.min.css">
```

Finally, import Pillarbox and set up the player:

```javascript
import Pillarbox from '@srgssr/pillarbox-web';

const player = new Pillarbox('my-player', {// Options... });
  player.src({ src: 'urn:swi:video:48115940', type: 'srgssr/urn' });
```

## Documentation

For detailed information on how to use the Pillarbox Web Player, checkout
the [API Documentation](https://srgssr.github.io/pillarbox-web/api). A live demo of the player is
available here: [Pillarbox Web Demo](https://srgssr.github.io/pillarbox-web-demo/)

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

## License

See the [LICENSE](../LICENSE) file for more information.
