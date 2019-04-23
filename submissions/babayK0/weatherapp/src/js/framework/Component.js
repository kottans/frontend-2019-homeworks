export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.init();
    this._render();
  }
  init() {}

  updateState(stateDelta) {
    this.state = Object.assign({}, this.state, stateDelta);
    this._render();
  }

  _render() {
    this.host.innerHTML = '';
    let content = this.render();

    if (!Array.isArray(content)) {
      content = [content];
    }

    content
      .map(item => this._vDomPrototypeElementToHtmlElement(item))
      .forEach(htmlElement => {
        if (Array.isArray(htmlElement)) this.host.append(...htmlElement);
        else this.host.append(htmlElement);
      });
  }

  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return 'Something goes wrong =)';
  }

  /*
  @param {string|HTMLElement|Object} element
  @private
  */
  _vDomPrototypeElementToHtmlElement(element) {
    if (typeof element === 'string') {
      let container;
      const containsHtmlTags = /[<>&]/.test(element);
      if (containsHtmlTags) {
        const dirtyTrickContainer = document.createElement('div'); // fake div, never actually used
        dirtyTrickContainer.innerHTML = element;
        container = Array.from(dirtyTrickContainer.childNodes);
      } else {
        container = document.createTextNode(element);
      }
      return container;
    } else {
      if (element.tag) {
        if (typeof element.tag === 'function') {
          const container = document.createElement(
            element.containerTag || 'div'
          );
          new element.tag(container, element.props);
          return container;
        } else {
          //string
          const container = document.createElement(element.tag);
          if (element.content !== undefined) {
            container.innerHTML = element.content;
          }

          //ensure following element properties are Array
          ['classList', 'attributes'].forEach(item => {
            if (element[item] && !Array.isArray(element[item])) {
              element[item] = [element[item]];
            }
          });
          if (element.classList) {
            container.classList.add(...element.classList);
          }
          if (element.attributes) {
            element.attributes.forEach(attributeSpec => {
              container.setAttribute(attributeSpec.name, attributeSpec.value);
            });
          }

          // process eventHandlers
          if (element.eventHandlers) {
            Object.keys(element.eventHandlers).forEach(eventType => {
              container.addEventListener(
                eventType,
                element.eventHandlers[eventType]
              );
            });
          }

          //process children
          if (element.children) {
            element.children.forEach(el => {
              const htmlElement = this._vDomPrototypeElementToHtmlElement(el);
              container.appendChild(htmlElement);
            });
          }

          return container;
        }
      }
      return element;
    }
  }
}
