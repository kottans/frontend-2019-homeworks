const data = [
    {
        title: 'HTML',
        image: 'img/html.png',
        description: 'Hypertext Markup Language (HTML) is the standard markup language for creating web pages and web ' +
            'applications. With Cascading Style Sheets (CSS) and JavaScript, it forms a triad of cornerstone ' +
            'technologies for the World Wide Web.'
    },
    {
        title: 'CSS',
        image: 'img/css.png',
        description: 'CSS is designed to enable the separation of presentation and content, including layout, colors, and fonts.' +
            ' This separation can improve content accessibility, provide more flexibility and control in the ' +
            'specification of presentation characteristics, enable multiple web pages to share formatting by specifying' +
            ' the relevant CSS in a separate .css file, and reduce complexity and repetition in the structural content.'
    },
    {
        title: 'JavaScript',
        image: 'img/JavaScript.png',
        description: 'JavaScript (JS) is a lightweight, interpreted or JIT compiled programming language with first-class ' +
            'functions. Most well-known as the scripting language for Web pages, many non-browser environments also use' +
            ' it, such as node.js and Apache CouchDB. JS is a prototype-based, multi-paradigm, dynamic scripting' +
            ' language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.'

    },
    {
        title: 'DOM',
        image: 'img/dom.png',
        description:  'The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the' +
            ' page so that programs can change the document structure, style, and content. The DOM represents the' +
            ' document as nodes and objects.'
    }
];

let inx = 0;
let divs = [];

let fillTheContent = function(data) {

    //create navigation menu item
    const navMenu = document.querySelector('nav ul');
    let navItem = document.createElement('li');
    let node = document.createTextNode(data.title);
    navItem.appendChild(node);
    navItem.className = 'navItem';
    if (inx === 0) {
        navItem.classList.add('active');
    }
    navItem.setAttribute('inx', inx);
    navMenu.appendChild(navItem);
    inx++;

    //create div blocks of content
    let div = document.createElement('div');
    div.className = 'content';
    if (divs[0] === undefined) {
        div.classList.add('unmask');
    }

    //add the title of the content
    let title = document.createElement('h1');
    node = document.createTextNode(data.title);
    title.appendChild(node);
    div.appendChild(title);

    //add the image of the content
    let image = document.createElement('img');
    image.setAttribute('src', data.image);
    div.appendChild(image);

    //add the description of the content
    let description = document.createElement('p');
    node = document.createTextNode(data.description);
    description.appendChild(node);
    div.appendChild(description);


    //add the div to the container
    divs.push(div);
    let container = document.querySelector('.container');
    container.appendChild(div);
};

for (let i = 0; i < data.length; i++) {
    fillTheContent(data[i]);
}

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