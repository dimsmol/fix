/**
 * Gets path part of the given url.
 * @param {string} url
 * @returns
 */
export function getPath(url) {
  return new URL(url).pathname;
}

/**
 * Conditionally prevents navigation by immediately navigating back or navigating to "/" instead.
 * @param {NavigationDestination => boolean} shouldPrevent
 * @param {NavigationDestination => void | null} optOnPrevented
 */
export function preventNavTo(shouldPrevent, optOnPrevented) {
  navigation.addEventListener('navigate', ev => {
    if (!shouldPrevent(ev.destination)) {
      return;
    }

    setTimeout(() => {
      if (ev.navigationType === 'replace') {
        location.replace('/');
      } else {
        history.back();
      }

      if (optOnPrevented) {
        optOnPrevented(ev.destination);
      }
    }, 0);
  });
}

/**
 * Checks if navigation destination is in the same document and the path satisfies pathFunc.
 * @param {NavigationDestination} dest
 * @param {string => boolean} pathFunc
 * @returns
 */
export function isSameDocPath(dest, pathFunc) {
  return dest.sameDocument && pathFunc(getPath(dest.url));
}
