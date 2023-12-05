/**
 * Converts a given string to kebab case, spaces are replaced with hyphens
 * and all letters are converted to lowercase.
 *
 * @param {string} str - The input string to be converted to kebab case.
 * @returns {string} - The input string converted to kebab case.
 *
 * @example
 * const result = toKebabCase("Hello World");
 * console.log(result); // Output: "hello-world"
 *
 * @example
 * const result = toKebabCase("CamelCase Example");
 * console.log(result); // Output: "camelcase-example"
 */
export const toKebabCase = (str) => str.replace(/\s+/g, '-').toLowerCase();
