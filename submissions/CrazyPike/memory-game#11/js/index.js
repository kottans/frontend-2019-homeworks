const input = [];
const SHOW_SECOND_CARD_TIMEOUT = 300;
const CLASS_STYLE_DISPLAYED = 'displayed';
const CLASS_STYLE_CARD = 'card';
const CLASS_STYLE_NOBORDER = 'noborder';
const MEMORY_BOARD_SIZE = 20;

var firstCard = {
    id : 'none',
    card: 'none'
}

let images = {
    1: 'veg1',
    2: 'veg2',
    3: 'veg3',
    4: 'veg4',
    5: 'veg5',
    6: 'veg6',
    7: 'veg7',
    8: 'veg8',
}

let arrayItem = 1;
for (let i = 0; i < MEMORY_BOARD_SIZE; i+=2 ){
    input.push(arrayItem);
    input.push(arrayItem);
    arrayItem = (arrayItem === 8) ? 1 : ++arrayItem;
}
shuffle(input);
const container = document.getElementById('container');
container.innerHTML = input.map((item,index) => `<div class="${CLASS_STYLE_CARD}" id="card${index}" card="${item} "><img src="./img/${images[item]}.png"></div>`).join(' ');
container.addEventListener('click', ({target}) =>{
    //var target = event.target;
    if (!target.classList.contains(CLASS_STYLE_CARD) || target.classList.contains(CLASS_STYLE_DISPLAYED)) return;
    //if (target.className !== 'card') return;
    let targetCard = target.getAttribute('card');
    target.classList.toggle(CLASS_STYLE_DISPLAYED);
    //target.className = 'card displayed';
    if (firstCard.id === 'none') {
        firstCard.id = target.id;
        firstCard.card = targetCard;
    }
    else if (firstCard.card === targetCard) {
        document.getElementById(firstCard.id).classList.toggle(CLASS_STYLE_NOBORDER);
        //document.getElementById(firstCard.id).className = 'card displayed noborder';
        target.classList.toggle(CLASS_STYLE_NOBORDER);
       // target.className = 'card displayed noborder ';
        firstCard.id = 'none';

    }   else {
        let timerid = setTimeout(function() {
            target.classList.toggle(CLASS_STYLE_DISPLAYED);}, SHOW_SECOND_CARD_TIMEOUT);
        document.getElementById(firstCard.id).classList.toggle(CLASS_STYLE_DISPLAYED);
        //document.getElementById(firstCard.id).className = 'card';
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