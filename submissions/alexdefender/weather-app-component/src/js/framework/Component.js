export default class Component {
    constructor(host, props = {}) {
        this.host = host;
        this.props = props;
        this.init();
        this._render();
    }

    init() {

    }

    updateState(state) {
        this.state = Object.assign({}, this.state, state);
        this._render();
    }

    _render() {
        this.host.innerHTML = "";
        const content = this.render();

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
            const htmlElement = document.createElement("div"); // TODO: textNode
            htmlElement.innerHTML = element;
            return htmlElement;
        } else {
            if (element.tag) {
                if (typeof element.tag === "function") {
                    const container = document.createElement("div");
                    new element.tag(container, element.props);
                    this._checkPrototypeElement(element, container);
                    return container;
                } else {
                    // string
                    const container = document.createElement(element.tag);
                    if (element.content) {
                        container.innerHTML = element.content;
                    }
                    this._checkPrototypeElement(element, container);
                    return container;
                }
            }
            return element;
        }
    }

    _checkPrototypeElement(element, container) {
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
                if (attributeSpec.value === undefined) {
                    container.setAttribute(attributeSpec.name, "");
                } else {
                    container.setAttribute(attributeSpec.name, attributeSpec.value);
                }
            });
        }

        if (element.eventHandlers) {
            Object.keys(element.eventHandlers).forEach(eventType => {
                container.addEventListener(eventType, element.eventHandlers[eventType]);
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
