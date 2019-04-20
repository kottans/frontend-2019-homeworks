import {
  clearDomChildren,
  appendDomFragment,
  buildDomFragment
} from "../utils";
import ComponentFactory from "../framework/ComponentFactory";

export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props || {};
    this.state = {};
    this.init();
    this._render();
  }

  updateState(partState) {
    this.state = Object.assign({}, this.state, partState);
    this._render();
  }

  init() {}

  _render(dataR) {
    this.host.innerHTML = "";
    let content = this.render(dataR);

    if (!Array.isArray(content)) {
      content = [content];
    }

    content
      .map(item => this._vDomPrototypeElementToHtmlElement(item)) // [string|HTMLElement] => [HTMLElement]
      .forEach(htmlElement => {
        this.host.appendChild(htmlElement);
      });
  }

  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return "OMG! They wanna see me!!!!!! Aaaaaa";
  }

  /**
   *
   * @param {string|HTMLElement|Object} element
   * @private
   */
  _vDomPrototypeElementToHtmlElement(element) {
    if (typeof element === "string") {
      element = this._createDomFragment(element);
      return element;
    } else {
      if (element.tag) {
        if (typeof element.tag === "function") {
          const container = document.createElement("div");
          new element.tag(container, element.props);

          return container;
        } else {
          // string
          const container = document.createElement(element.tag);
          if (element.content) {
            container.innerHTML = element.content;
          }
          // ensure following element properties are Array
          ["classList", "attributes", "children"].forEach(item => {
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

  _createDomFragment(string) {
    const template = document.createElement("template");
    let componentCount = 0;
    let idBase = new Date().getTime();
    let componentMap = {};

    string = string
      .trim()
      .replace(/<([A-Z][a-zA-Z]*)(.*)\/>/g, (match, p1, p2, offset) => {
        const id = "z" + idBase + componentCount++;

        // extract props
        let props = {};
        let parsingResults;
        p2 = p2.trim();
        if (p2.length) {
          const paramsRegex = /(\S+)=['"]?((?:(?!\/>|>|"|'|\s).)+)/g;
          while ((parsingResults = paramsRegex.exec(p2)) !== null) {
            let objectPropertyName = parsingResults[2].match(/{(.*)}/);
            const propValue = objectPropertyName
              ? this[
                  objectPropertyName[1]
                    .split(".")
                    .filter(segment => segment !== "this")
                    .join(".")
                ]
              : parsingResults[2];
            props[parsingResults[1]] = propValue;
          }
        }

        componentMap[id] = {
          name: p1,
          props: props
        };
        return `<div id="${id}"></div>`;
      });
    template.innerHTML = string;

    // manage event handlers
    const eventTypes = [
      "click",
      "mouseup",
      "mousedown",
      "mouseover",
      "mousein",
      "mouseout",
      "change",
      "input",
      "keyup",
      "keydown",
      "focus",
      "blur",
      "div.wt-row",
      "div.unit-switch"
    ];
    const elementsWithListeners = template.content.querySelectorAll(
      [eventTypes].map(eventType => "on-" + eventType)
    );
    elementsWithListeners.forEach(element => {
      eventTypes.forEach(eventType => {
        if (element.hasAttribute("on-" + eventType)) {
          let handlerName = element
            .getAttribute("on-" + eventType)
            .match(/{(.*)}/)[1];
          handlerName = handlerName
            .split(".")
            .filter(segment => segment !== "this")
            .join(".");
          element.addEventListener(eventType, this[handlerName].bind(this));
        }
      });
    });

    // render mapped components
    Object.keys(componentMap).forEach(id => {
      let host = template.content.querySelector("#" + id);
      const cls = ComponentFactory.get(componentMap[id].name);
      new cls(host, componentMap[id].props);
    });

    return template.content;
  }
}
