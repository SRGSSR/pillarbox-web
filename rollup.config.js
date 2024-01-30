import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

/**
 * Rollup build configurations for the Pillarbox library.
 *
 * This configuration produces 2 main builds :
 *
 * - Pillarbox Core: This build includes only the superset of function of video.js,
 *   it does not include analytics or data providers that are specific to SRG/SSR.
 * - Pillarbox: This build includes both the core and the specific business logic for SRG/SSR content.
 */
export default [
  /**
   * Rollup build configuration for the Core ESModule build.
   *
   * Outputs:
   * - 'dist/pillarbox-core.es.min.js': Minified ESModule version with sourcemaps.
   * - 'dist/pillarbox-core.es.js': Non-minified ESModule.
   *
   * @example
   * ```javascript
   * import Pillarbox from 'pillarbox-core.es.js';
   * ```
   */
  {
    input: 'src/pillarbox.js',
    output: [
      {
        file: 'dist/pillarbox-core.es.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()],
      },
      {
        file: 'dist/pillarbox-core.es.js',
        format: 'es',
        plugins: [filesize()]
      }
    ],
    external: ['video.js', 'videojs-contrib-eme'],
    plugins: [json(), resolve()]
  },
  /**
   * Rollup build configuration for the Pillarbox UMD build.
   *
   * Outputs:
   * - 'dist/pillarbox-core.umd.min.js': Minified UMD version with sourcemaps.
   * - 'dist/pillarbox-core.umd.js': Non-minified UMD.
   *
   * @example
   * ```html
   * <script src="pillarbox-core.umd.min.js"></script>
   * ```
   *
   * @type {import('rollup').RollupOptions}
   */
  {
    input: 'src/pillarbox.js',
    output: [
      {
        name: 'Pillarbox',
        file: 'dist/pillarbox-core.umd.min.js',
        format: 'umd',
        sourcemap: true,
        plugins: [terser()]
      },
      {
        name: 'Pillarbox',
        file: 'dist/pillarbox-core.umd.js',
        format: 'umd',
        plugins: [filesize()]
      }
    ],
    plugins: [commonjs(), json(), resolve()]
  },
  /**
   * Rollup build configuration for the Pillarbox ESModule build.
   *
   * Outputs:
   * - 'dist/pillarbox.es.min.js': Minified ESModule version with sourcemaps.
   * - 'dist/pillarbox.es.js': Non-minified ESModule.
   *
   * @example
   * ```javascript
   * import Pillarbox from 'pillarbox.es.js';
   * ```
   */
  {
    input: 'build.es.js',
    output: [
      {
        file: 'dist/pillarbox.es.min.js',
        format: 'es',
        sourcemap: true,
        plugins: [terser()]
      },
      {
        file: 'dist/pillarbox.es.js',
        format: 'es',
        plugins: [filesize()]
      }
    ],
    external: ['video.js', 'videojs-contrib-eme'],
    plugins: [json(), resolve()]
  },

  /**
   * Rollup build configuration for the Pillarbox UMD build.
   *
   * Outputs:
   * - 'dist/pillarbox.umd.min.js': Minified UMD version with sourcemaps.
   * - 'dist/pillarbox.umd.js': Non-minified UMD.
   *
   * @example
   * ```html
   * <script src="pillarbox.umd.min.js"></script>
   * <script>
   *   // Your additional code using Pillarbox as needed
   * </script>
   * ```
   */
  {
    input: 'build.umd.js',
    output: [
      {
        name: 'Pillarbox',
        file: 'dist/pillarbox.umd.min.js',
        format: 'umd',
        sourcemap: true,
        plugins: [terser()]
      },
      {
        name: 'Pillarbox',
        file: 'dist/pillarbox.umd.js',
        format: 'umd',
        plugins: [filesize()]
      }
    ],
    plugins: [commonjs(), json(), resolve()]
  },
];
