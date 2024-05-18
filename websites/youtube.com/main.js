(async () => {
  const { getPath, isSameDocPath, preventNavTo } = await import('../../common/nav.js');
  const { report } = await import('../../common/report.js');

  const shortsPath = '/shorts/';

  preventNavTo(dest => isSameDocPath(dest, isShortsPath), reportNoShorts);

  if (isShortsPath(getPath(location.href))) {
    reportNoShorts();
    location.replace('/');
  }

  function reportNoShorts() {
    report('no shorts!');
  }

  /**
   *
   * @param {string} path
   * @returns
   */
  function isShortsPath(path) {
    return path.startsWith(shortsPath);
  }
})();
