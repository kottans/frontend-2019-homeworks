export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.state = {};
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
      .map(item => this._vDomPrototypeElementToHTMLElement(item))
      .forEach(htmlElement => {
        this.host.appendChild(htmlElement);
      });
  }

  render() {
    return 'Nothing';
  }

  _vDomPrototypeElementToHTMLElement(element) {
    if (typeof element === 'string') {
      let container;
      const containsHtmlTags = /[<>&]/.test(element);

      if (containsHtmlTags) {
        container = document.createElement('div');
        container.innerHTML = element;
      } else {
        container = document.createTextNode(element);
      }
      return container;
    } else {
      if (element.tag) {
        if (typeof element.tag === 'function') {
          const container = document.createElement('div');
          new element.tag(container, element.props);
          return container;
        } else {
          const container = document.createElement(element.tag);
          
          if (element.content !== undefined) {
            container.innerHTML = element.content;
          }

          ['classList', 'attributes', 'children'].forEach( item => {
            if (element[item] && !Array.isArray(element[item])) {
              element[item] = [ element[item] ];
            }
          });

          if (element.classList) {
            container.classList.add(...element.classList);
          }

          if (element.attributes) {
            element.attributes.forEach( attributeSpec => {
              container.setAttribute(attributeSpec.name, attributeSpec.value);
            });
          }

          if (element.eventHandlers) {
            Object.keys(element.eventHandlers).forEach(evetType => {
              container.addEventListener(evetType, element.eventHandlers[evetType]);
            });
          }

          if (element.children) {
            element.children.forEach(el => {
              const htmlElement = this._vDomPrototypeElementToHTMLElement(el);
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
