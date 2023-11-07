import { EXAMPLES } from './Examples';
import { openModal } from './ExampleDialog';

/**
 * Loads a list of video examples into the specified HTML container and sets
 * up a click event to open modals for each video.
 */
export const loadExamples = () => {
  const examplesList = document.getElementById('examples');

  Object.entries(EXAMPLES).forEach(([category, examples]) =>
    examplesList.insertAdjacentHTML('beforeend', `
    <div class="category" data-category="${category}">
        <h2>${category}</h2>
        ${examples.map(example => `
          ${example.description != null ? `<p>${example.description}</p>` : ''}
          <button class="btn example-btn">${example.title}</button>
        `).join('')}
    </div>`));

  examplesList.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() !== 'button') {
      return;
    }

    const parent = event.target.parentNode;
    const category = parent.dataset.category;
    const exampleIdx = Array.from(parent.children)
      .filter(child => child.tagName.toLowerCase() === 'button')
      .indexOf(event.target);

    openModal(EXAMPLES[category][exampleIdx]);
  });
};
