/**
 * This script dynamically generates and appends a header element to the navigation bar.
 *
 * @module
 */
import githubLogoSvg from 'bundle-text:../../img/github-logo.svg';
import srgssrLogo from '../../img/srgssr-logo.png';
import Pillarbox from '../../../src/pillarbox';
import { parseHtml } from '../core/html-utils';

const createHeaderEl = () => parseHtml(`
  <div id="pbw-title-container">
    <h1 class="pbw-title">
      <img class="pbw-logo" src="${srgssrLogo}"/>
      <span class="version">Pillarbox @ ${Pillarbox.VERSION.pillarbox}</span>
    </h1>
    <a href="https://github.com/srgssr/pillarbox-web" class="github-link" title="Source on Github">
      ${githubLogoSvg}
    </a>
  </div>
  <div id="menu">
    <a href="examples" data-spa-route>Examples</a> |
    <a href="search" data-spa-route>Search</a>
  </div>
`);

document.querySelector('nav').append(...createHeaderEl());
