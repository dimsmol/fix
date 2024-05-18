import { report } from '../common/report.js';
import { createAction, installActions } from './action.js';

// Note: Cannot use functions using any bindings here (e.g. vars or calling other functions) since action functions get serialized/deserialized before execution and loose any bindings.
// Can use chrome.runtime.getURL() to obtain paths to the modules exposed with "web_accessible_resources" and dynamically import them within the passed action function, though.
installActions([
  createAction('habr.com', report, ['hi there!'])
]);
