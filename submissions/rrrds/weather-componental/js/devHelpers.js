const boxShadow = '0 0 5px 2px red';

export function showChanges(root) {
  const targetNode = root;
  const config = {
    characterData: true,
    attributes: true,
    childList: false,
    subtree: true,
    attributeFilter: ['class', 'value', 'data-height', 'data-temp', 'title']
  };

  function callback(mutationsList) {
    blinkAll(mutationsList);
  }

  function toggleAll(mutationList) {
    mutationList.forEach(mutation => {
      const dom =
        mutation.type === 'characterData'
          ? mutation.target.parentElement
          : mutation.target;

      dom.style.boxShadow = boxShadow;
    });
  }

  function removeAll(mutationList) {
    mutationList.forEach(mutation => {
      const dom =
        mutation.type === 'characterData'
          ? mutation.target.parentElement
          : mutation.target;

      dom.style.boxShadow = '';
    });
  }

  function blinkAll(domList) {
    toggleAll(domList);

    setTimeout(function() {
      removeAll(domList);
    }, 500);
  }

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}
