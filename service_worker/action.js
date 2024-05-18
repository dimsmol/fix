/**
 * Creates an object describing a Chrome Extension Action for a specified host.
 * @param {string} host
 * @param {() => void} f
 * @param {any[]} args
 * @returns
 */
export function createAction(host, f, args) {
  return {
    host,
    matcher: new chrome.declarativeContent.PageStateMatcher({ pageUrl: { hostEquals: host } }),
    shouldApply: tab => isHost(tab.url, host),
    f,
    args
  };
}

/**
 * Installs Chrome Extension Actions described by objects created with "createAction".
 * @param {any[]} actions
 */
export function installActions(actions) {
  chrome.runtime.onInstalled.addListener(details => {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
      chrome.action.disable();
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: actions.map(v => v.matcher),
        actions: [new chrome.declarativeContent.ShowAction()]
      }]);
    });
  });

  chrome.action.onClicked.addListener(tab => {
    actions.filter(v => v.shouldApply(tab)).forEach(v =>
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: v.f,
        args: v.args
      }));
  });
}

/**
 * Checks if the given url belongs to the given host.
 * @param {string} url
 * @param {string} host
 * @returns
 */
function isHost(url, host) {
  // Note: Trailing slash is ok (always present in url).
  return url?.startsWith(`https://${host}/`);
}
