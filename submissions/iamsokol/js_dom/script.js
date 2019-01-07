const catsArray = [
    {
        name: 'Sebastian',
        url: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'Sebastian Tigger'
    },
    {
        name: 'Smokey',
        url: 'https://images.unsplash.com/photo-1516978101789-720eacb59e79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'Smokey Cleo'
    },
    {
        name: 'Thomas',
        url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'Thomas Misty'
    },
    {
        name: 'Muffin',
        url: 'https://images.unsplash.com/photo-1488015795646-7e22a773d72a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'Muffin Sooty'
    },
    {
        name: 'George',
        url: 'https://images.unsplash.com/photo-1487300001871-12053913095d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        title: 'George Gizmo'
    }
]

let menuBlock = document.createElement('div');
let renderCats = (position) => {
    new Cat(catsArray, position);
}
let renderItem = (item, index) => {
    let block = document.createElement('p');
    block.setAttribute("position", index);
    let menuItem = `${item.name}`;
    block.innerHTML = menuItem;
    menuBlock.appendChild(block);
}

class Cat{
    constructor(catsArray, position) {
        this.catsElement = catsArray[position];
        this.renderPosition();
    }
    renderPosition() {
        let item = this.catsElement;
        let catItem = `
            <img id="img" src=${item.url} alt=${item.name}>
            <p id="title">${item.title}</p>`;
        main.innerHTML = catItem;
    }
}

catsArray.forEach((item, index) => {
    renderItem(item, index);
})
menu.appendChild(menuBlock);

document.getElementById("menu").addEventListener('click', ({target}) => renderCats(target.getAttribute("position")));

new Cat(catsArray, 0);
