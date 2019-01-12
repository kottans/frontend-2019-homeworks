let input = [1,5,4,8,3,2,6,4,7,3,1,6,8,5,2,7]
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

let container = document.getElementById('container');
container.innerHTML = input.map((item,index) => `<div class="card" id="card${index  }" card="${item} "><img src="./img/${images[item]}.png"></div>`).join(' ');
container.addEventListener('click', (event) =>{
    var target = event.target;
    if (target.className !== 'card') return;
    let targetCard = target.getAttribute('card');
    target.className = 'card displayed';
    if (firstCard.id === 'none') {
        firstCard.id = target.id;
        firstCard.card = targetCard;
    }
    else if (firstCard.card === targetCard) {
        document.getElementById(firstCard.id).className = 'card displayed noborder';

        target.className = 'card displayed noborder ';
        firstCard.id = 'none';

    }   else {


        let timerid = setTimeout(function() {
            target.className = 'card';}, 300)

        document.getElementById(firstCard.id).className = 'card';



        firstCard.id = 'none';
    }
} )
