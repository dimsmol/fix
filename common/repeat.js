/**
 * Provides "repeat" function which guarantees that at most one invokation is active at any point.
 * @returns Function that calls it's first arg a given number of times with the given delay between the calls.
 */
export function repeater() {
  let currentTimeout = null;

  /**
   *
   * @param {() => void} f
   * @param {number} times
   * @param {number} delay
   */
  const repeat = (f, times, delay) => {
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }
    if (times > 0) {
      f();
    }
    times--;
    if (times > 0) {
      currentTimeout = setTimeout(() => repeat(f, times, delay), delay);
    }
  };

  return repeat;
}
