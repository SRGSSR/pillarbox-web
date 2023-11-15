/**
 * Defines a route for the '/search' path that replaces the main content of the
 * page with a search bar to find srgssr content.
 *
 * @module
 */
import router from '../core/router';
import { parseHtml } from '../core/html-utils';
import { openPlayerModal } from '../player/player-dialog';
import ilProvider from '../core/il-provider';

const createContentEl = () => {
  return parseHtml(`
    <div class="search-bar-container">
      <select id="bu-dropdown" aria-label="Select a business unit">
          <option value="rsi" selected>RSI</option>
          <option value="rtr">RTR</option>
          <option value="rts">RTS</option>
          <option value="srf">SRF</option>
          <option value="swi">SWI</option>
      </select>
      <input type="text" id="search-bar" placeholder="Search for content...">
    </div>

    <!-- Search results -->
    <div id="results"></div>
  `);
};

const createResultsEl = (results) => {
  return parseHtml(results.map(
    r => `<button class="result-btn" data-urn="${r.urn}">${r.title}</button>`
  ).join(''));
};

router.addRoute('search', () => {
  document.querySelector('.container').replaceChildren(...createContentEl());
  document.querySelector('#search-bar').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      const bu = document.querySelector('#bu-dropdown').value;
      const query = event.target.value;

      ilProvider.search(bu, query).then(results => {
        document.querySelector('#results').replaceChildren(...createResultsEl(results));
      });
    }
  });

  document.querySelector('#results').addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() !== 'button') {
      return;
    }

    openPlayerModal({ src: event.target.dataset.urn, type: 'srgssr/urn' });
  });
});
