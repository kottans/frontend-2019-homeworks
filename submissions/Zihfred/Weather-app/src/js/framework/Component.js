export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this._render();
  }
  _render() {
    this.host.innerHTML = "";
    const content = this.render();

    if (typeof content === 'string') {
      this.host.innerHTML = content;
    } else {
      content.map(item => this._vDomPrototypeElementToHtmlElement(item)) // [string|HTMLElement] => [HTMLElement]
        .forEach(htmlElement => {
          this.host.appendChild(htmlElement);
        });
    }
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
      const htmlElement = document.createElement('div'); // TODO: textNode
      htmlElement.innerHTML = element;
      return htmlElement;
    } else {
      if (element.tag) {
        if (typeof element.tag === 'function') {
          let container;
          if(element.wrapperTag){
          container = document.createElement(element.wrapperTag);
          }else
          {
            container = document.createElement('div');
          }

          if(element.classList) {
            element.classList.forEach(item => {
              container.classList.add(item);
            })
          }
          new element.tag(container, element.props);
          return container;
        } else {
          // string
          const container = document.createElement(element.tag);
          if (element.content) {
            container.innerHTML = element.content;
          }

          // ensure following element properties are Array
          ['classList', 'attributes', 'children'].forEach(item => {
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
          if(element.id){
            container.id = element.id;
          }

          // process children
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
