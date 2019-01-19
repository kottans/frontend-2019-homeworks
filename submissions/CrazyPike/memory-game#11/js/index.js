const input = [];
const SHOW_SECOND_CARD_TIMEOUT = 300;
const CLASS_STYLE_DISPLAYED = 'displayed';
const CLASS_STYLE_CARD = 'card';
const CLASS_STYLE_NOBORDER = 'noborder';
const MEMORY_BOARD_SIZE = 16;

let  firstCard = {
    id : 'none',
    card: 'none'
}

let images = [
    'veg1',
    'veg2',
    'veg3',
    'veg4',
    'veg5',
    'veg6',
    'veg7',
    'veg8']

let arrayItem = 0;
let imagesQty = images.length;
for (let i = 0; i < MEMORY_BOARD_SIZE; i+=2 ){
    input.push(arrayItem);
    input.push(arrayItem);
    arrayItem = (arrayItem === imagesQty - 1) ? 0 : ++arrayItem;
}

shuffle(input);

const container = document.getElementById('container');
container.innerHTML = input.map((item,index) => `<div class="${CLASS_STYLE_CARD}" id="card${index}" card="${item} "><img src="./img/${images[item]}.png"></div>`).join(' ');
container.addEventListener('click', ({target}) =>{
    if (!target.classList.contains(CLASS_STYLE_CARD) || target.classList.contains(CLASS_STYLE_DISPLAYED)) return;
    let targetCard = target.getAttribute('card');
    target.classList.toggle(CLASS_STYLE_DISPLAYED);
    if (firstCard.id === 'none') {
        firstCard.id = target.id;
        firstCard.card = targetCard;
    }
    else if (firstCard.card === targetCard) {
        document.getElementById(firstCard.id).classList.toggle(CLASS_STYLE_NOBORDER);
        target.classList.toggle(CLASS_STYLE_NOBORDER);
        firstCard.id = 'none';

    }   else {
        let timerid = setTimeout(function() {
            target.classList.toggle(CLASS_STYLE_DISPLAYED);}, SHOW_SECOND_CARD_TIMEOUT);
        document.getElementById(firstCard.id).classList.toggle(CLASS_STYLE_DISPLAYED);
        firstCard.id = 'none';
    }
} )

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
