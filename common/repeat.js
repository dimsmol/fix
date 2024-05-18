/**
 * Provides "repeat" function which guarantees that at most one invokation is active at any point.
 * @returns {(() => void, number, number) => void} Function that calls it's first arg a number of times with the specified delay between the calls.
 */
export function repeater() {
  let currentTimeout = null;

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
