/**
 * Performs an action for each element matching any of specified selectors.
 * @param {(Element, number, NodeListOf<Element>) => void} action
 * @param {string[]} selectors
 * @returns Number of lements the action was performed on.
 */
export function each(action, selectors) {
  let count = 0;
  selectors.forEach(selector =>
    document.querySelectorAll(selector).forEach(
      el => {
        action(el);
        count++;
      }));

  return count;
}

/**
 * Removes elements matching any of specified selectors.
 * @param {string[]} selectors
 * @returns Number of removed elements.
 */
export function rm(selectors) {
  return each(el => el.remove(), selectors);
}

/**
 * Hides elements matching any of specified selectors.
 * @param {string[]} selectors
 * @returns Number of hidden elements.
 */
export function hide(selectors) {
  return each(el => el.style.display = 'none', selectors);
}
