import ComponentFactory from "../framework/ComponentFactory";

export default function parseJsx(string) {
    const template = document.createElement('template');

    let componentCount = 0;
    let idBase = new Date().getTime();
    let componentMap = {};

    string = string.trim().replace(/<([A-Z][a-zA-Z]*)(.*)\/>/g, (match, p1, p2, offset) => {
        const id = 'z' + idBase + (componentCount++);

        // extract props
        let props = {};
        let parsingResults;
        p2 = p2.trim();
        if (p2.length) {
            const paramsRegex = /(\S+)=['"]?((?:(?!\/>|>|"|'|\s).)+)/g;
            while ((parsingResults = paramsRegex.exec(p2)) !== null) {
                let objectPropertyName = parsingResults[2].match(/{(.*)}/);
                props[parsingResults[1]] = objectPropertyName
                    ? this[objectPropertyName[1].split('.').filter(segment => segment !== 'this').join('.')]
                    : parsingResults[2];
            }
        }

        componentMap[id] = {
            name: p1,
            props: props,
        };
        return `<div id="${id}"></div>`;
    });
    template.innerHTML = string;

    // manage event handlers
    const eventTypes = ['click', 'mouseup', 'mousedown', 'mouseover', 'mousein', 'mouseout',
        'change', 'input', 'keyup', 'keydown',
        'focus', 'blur'
    ];
    const elementsWithListeners = template.content.querySelectorAll([eventTypes].map(eventType => 'on-' + eventType));
    elementsWithListeners.forEach(element => {
        eventTypes.forEach(eventType => {
            if (element.hasAttribute('on-' + eventType)) {
                let handlerName = element.getAttribute('on-' + eventType).match(/{(.*)}/)[1];
                handlerName = handlerName.split('.').filter(segment => segment !== 'this').join('.');
                element.addEventListener(eventType, this[handlerName].bind(this));
            }
        });
    });

    // render mapped components
    Object.keys(componentMap).forEach(id => {
        let host = template.content.querySelector('#' + id);
        const cls = ComponentFactory.get(componentMap[id].name);
        new cls(host, componentMap[id].props);
    });

    return template.content;
}