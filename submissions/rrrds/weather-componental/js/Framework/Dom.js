export const TYPE_TEXT_NODE = 'TEXT_NODE';
export const TYPE_FRAGMENT_NODE = 'TYPE_FRAGMENT_NODE';

function removeClass(dom) {
  dom.classList.remove('div--new');
}

function blinkHtmlElemen(dom) {
  dom.classList.add('div--new');
  setTimeout(() => removeClass(dom), 1000);
}

export function createDomElement(type = TYPE_TEXT_NODE) {
  if (type === TYPE_TEXT_NODE) {
    return document.createTextNode('');
  }

  if (type === TYPE_FRAGMENT_NODE) {
    return document.createDocumentFragment();
  }

  if (typeof type === 'string') {
    return document.createElement(type);
  }

  return document.createElement('div');
}

export function updateClassList(dom, classList = []) {
  if (dom.classList) {
    blinkHtmlElemen(dom);
    if (Array.isArray(classList)) {
      dom.classList.add(...classList);
    } else {
      dom.className = classList;
    }
  }
}

export function attachEvents(dom, eventsList = []) {
  eventsList.forEach(evnt => {
    dom.addEventListener(evnt.eventType, evnt.handler);
  });
}

export function attachAttributes(dom, attrs = {}) {
  Object.keys(attrs).forEach(attrKey => {
    dom.setAttribute(attrKey, attrs[attrKey]);
  });
}

export function removeAttributes(dom, attr = null) {
  if (attr) {
    dom.removeAttribute(attr);
  }
}
