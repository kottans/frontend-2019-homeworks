const content = [
    {
        h1: 'HTML',
        img: 'img/html.png',
        p: 'Hypertext Markup Language (HTML) is the standard markup language for creating web pages and web ' +
            'applications. With Cascading Style Sheets (CSS) and JavaScript, it forms a triad of cornerstone ' +
            'technologies for the World Wide Web.'
    },
    {
        h1: 'CSS',
        img: 'img/css.png',
        p: 'CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.' +
            ' This separation can improve content accessibility, provide more flexibility and control in the ' +
            'specification of presentation characteristics, enable multiple web pages to share formatting by specifying' +
            ' the relevant CSS in a separate .css file, and reduce complexity and repetition in the structural content.'
    },
    {
        h1: 'JavaScript',
        img: 'img/JavaScript.png',
        p: 'JavaScript (JS) is a lightweight, interpreted or JIT compiled programming language with first-class ' +
            'functions. Most well-known as the scripting language for Web pages, many non-browser environments also use' +
            ' it, such as node.js and Apache CouchDB. JS is a prototype-based, multi-paradigm, dynamic scripting' +
            ' language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.'

    },
    {
        h1: 'DOM',
        img: 'img/dom.png',
        p:  'The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the' +
            ' page so that programs can change the document structure, style, and content. The DOM represents the' +
            ' document as nodes and objects.'
    }
];

let fillTheContent = function() {
    const divs = document.querySelectorAll('.content');
    for (let i = 0; i < divs.length; i++) {

        let div = divs[i];
        let elem;

        let createTextElem = function(elem) {
            let element = document.createElement(elem);
            let node = document.createTextNode(content[i][elem]);
            element.appendChild(node);
            div.appendChild(element);
        };

        let createImgElem = function(elem) {
            let element = document.createElement(elem);
            element.setAttribute('src', content[i][elem]);
            div.appendChild(element);
        };

        for (elem in content[i]) {
            if (content[i].hasOwnProperty(elem)) {
                if (elem !== 'img') {
                    createTextElem(elem);
                } else {
                    createImgElem(elem);
                }
            }
        }
    }
};

fillTheContent();

let buttons = document.querySelector('nav ul');
buttons.addEventListener('click', function(event) {

    let changeTheContent = function(button, activeButton) {
        const divs = document.querySelectorAll('.content');
        let butInx = Number(button.getAttribute('inx'));
        let actButInx = Number(activeButton.getAttribute('inx'));
        divs[butInx].className += ' unmask';
        divs[actButInx].className = 'content';
    };

    let but = event.target;
    let activeBut = buttons.querySelector('.navItem.active');

    if (but.nodeName.toLowerCase() === 'li' && but !== activeBut) {
        but.classList.toggle('active');
        activeBut.classList.remove('active');
        changeTheContent(but, activeBut);
    }
});