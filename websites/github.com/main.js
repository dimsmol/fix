(async () => {
  const { repeater } = await import('../../common/repeat.js');

  const repeat = repeater();

  document.body.addEventListener('click', fixTreeLinks);
  navigation.addEventListener('navigate', () => repeat(fixTreeLinks, 5, 1000));

  fixTreeLinks();

  // Replaces tree elements with links to enable opening them in new tabs.
  function fixTreeLinks() {
    const treeItemsSelector = 'li[role="treeitem"]';
    const subItemsSelector = 'span > span';
    const combinedSelector = treeItemsSelector + ' ' + subItemsSelector;

    if (!document.querySelector(combinedSelector)) {
      return;
    }

    const els = document.querySelectorAll(treeItemsSelector);
    els.forEach(el => {
      const path = el.getAttribute('id')?.replace(/-item$/, '');
      const itemToReplace = el.querySelector(subItemsSelector);

      if (!path || !itemToReplace) {
        return;
      }

      // sections are: '', username, repo name, 'tree', branch name
      const baseSectionCount = 5;
      const pathSeparator = '/';
      const basePath = document.location.pathname.split(pathSeparator).slice(0, baseSectionCount).join(pathSeparator);

      const link = document.createElement('a');
      link.textContent = itemToReplace.textContent;
      link.setAttribute('href', basePath + pathSeparator + path);
      link.setAttribute('class', 'Link--primary')

      itemToReplace.replaceWith(link);
    });
  }
})();
