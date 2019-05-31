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

    // console.log(content);

    content
      .map(item => this._vDomPrototypeElementToHtmlElement(item)) // [string|HTMLElement] => [HTMLElement]
      .forEach((htmlElement) => {
        this.host.appendChild(htmlElement);
      });
  }

  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return 'OMG! They wanna see me!!!!!! Aaaaaa';
  }

  /**
   *
   * @param {string|HTMLElement|Object} element
   * @private
   */
  _vDomPrototypeElementToHtmlElement(element) {
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
    }
    if (element.tag) {
      if (typeof element.tag === 'function') {
        const container = document.createElement('div');
        if (element.classList) {
          container.classList.add(...element.classList);
        }
        if (element.attributes) {
          element.attributes.forEach((attributeSpec) => {
            container.setAttribute(attributeSpec.name, attributeSpec.value);
          });
        }
        new element.tag(container, element.props);

        return container;
      }
      // string
      const container = document.createElement(element.tag);
      if (element.content !== undefined) {
        container.innerHTML = element.content;
      }

      // ensure following element properties are Array
      ['classList', 'attributes', 'children'].forEach((item) => {
        if (element[item] && !Array.isArray(element[item])) {
          element[item] = [element[item]];
        }
      });
      if (element.classList) {
        container.classList.add(...element.classList);
      }
      if (element.attributes) {
        element.attributes.forEach((attributeSpec) => {
          container.setAttribute(attributeSpec.name, attributeSpec.value);
        });
      }

      // process eventHandlers
      if (element.eventHandlers) {
        Object.keys(element.eventHandlers).forEach((eventType) => {
          container.addEventListener(eventType, element.eventHandlers[eventType]);
        });
      }

      // process children
      if (element.children) {
        element.children.forEach((el) => {
          const htmlElement = this._vDomPrototypeElementToHtmlElement(el);
          container.appendChild(htmlElement);
        });
      }

      return container;
    }
    return element;
  }
}
