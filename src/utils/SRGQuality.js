export const list = ['SD', 'HD', 'HQ'];
export const types = {
  HD: list[1],
  HQ: list[2],
  SD: list[0],
};
/**
 * Checks if a resource list contains valid qualities.
 * @ignore
 *
 * @param {Array} resources
 * @param {Array} qualities default SD and HD
 *
 * @returns {Boolean}
 */
export function containQualities(resources, qualities = [types.SD, types.HD]) {
  if (
    qualities.length < 1 ||
    qualities.some((quality) => !list.includes(quality))
  ) {
    return false;
  }

  const filteredResources = resources
    .filter((resource) => qualities.includes(resource.quality))
    .filter(
      (resource, index, resourceList) =>
        resourceList.findIndex((fi) => fi.quality === resource.quality) ===
        index
    );

  return filteredResources.length === qualities.length;
}

/**
 * Check if the source is HD.
 * @ignore
 *
 * @param {Object} source
 *
 * @returns {Boolean}
 */
export function isSourceHD({ quality }) {
  return types.SD !== quality;
}
