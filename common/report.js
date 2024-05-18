/**
 * Prints a nicely prefixed message to the console.
 * @param {string} msg
 */
export function report(msg) {
  console.info('%c[fix] %c' + msg, 'color: green; font-weight: bold', '');
}
