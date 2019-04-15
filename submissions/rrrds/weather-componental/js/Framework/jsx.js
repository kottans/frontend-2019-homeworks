export function createElement(type, attr, ...args) {
  const props = Object.assign({}, attr);

  const children = [].concat(...args);
  const classList = props['class'] || [];

  const events = Object.keys(props)
    .filter(key => key.startsWith('on'))
    .map(key => {
      const event = {
        eventType: key.substr(2).toLowerCase(),
        handler: props[key]
      };

      delete props[key];

      return event;
    });

  const element = {
    tag: type,
    props,
    classList,
    children,
    events
  };

  return element;
}

export function createVDom(component = null, element, dom, children = []) {
  const vDom = {
    component,
    element,
    dom,
    children
  };

  if (component) {
    component._vDom = vDom;
  }

  return vDom;
}
