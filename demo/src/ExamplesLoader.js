import { openModal } from './ExampleDialog';
import { EXAMPLES } from './Examples';

/**
 * Loads a list of video examples into the specified HTML container and sets
 * up a click event to open modals for each video.
 */
export const loadExamples = () => {
  const examplesList = document.getElementById('examples');

  EXAMPLES.forEach((example) => {
    const exampleEl = document.createElement('a');

    exampleEl.classList.add('btn-link', 'example-btn');
    exampleEl.href = '#';
    exampleEl.textContent = example.title;

    examplesList.appendChild(exampleEl);
  });

  examplesList.addEventListener('click', (event) => {
    const exampleIdx = Array
      .from(event.target.parentNode.children)
      .indexOf(event.target);

    openModal(EXAMPLES[exampleIdx]);
  });
};
