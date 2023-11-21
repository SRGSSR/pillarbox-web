/**
 * This script dynamically generates and appends a header element to the navigation bar.
 *
 * @module
 */
import githubLogoSvg from 'bundle-text:../../img/github-logo.svg';
import srgssrLogo from '../../img/srgssr-logo.png';
import Pillarbox from '../../../src/pillarbox';
import { parseHtml } from '../core/html-utils';
import router from '../core/router';

const createHeaderEl = () => parseHtml(`
  <div class="pbw-title-container">
    <h1>
      <img class="pbw-logo" src="${srgssrLogo}"/>
      <span>Pillarbox</span>
      <span class="version-txt">${Pillarbox.VERSION.pillarbox}</span>
    </h1>
    <a href="https://github.com/srgssr/pillarbox-web" class="github-link" title="Source on Github">
      ${githubLogoSvg}
    </a>
  </div>
  <div id="pbw-menu" class="pbw-menu">
    <a href="examples" data-spa-route>Examples</a>
    <a href="search" data-spa-route>Search</a>
    <a href="lists" data-spa-route>Lists</a>
  </div>
`);

document.querySelector('nav').append(...createHeaderEl());

router.addEventListener('routechanged', () => {
  document.querySelectorAll('#pbw-menu a').forEach(a => {
    const path = new URL(a.href).pathname;
    const isActive = router.isActiveRoute(path);

    a.classList.toggle('selected', isActive);
    a.ariaDisabled = isActive;
  });
});
