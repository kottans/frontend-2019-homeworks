const IMAGES = [
    'img/01.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
];

var gameContainer = document.getElementById('game-container');
var firstCard;
var firstCardNode;
var secondCard;
var secondCardNode;
var winCount = 0;

function showCards() {
    let doubleImages = IMAGES.concat(IMAGES);
    shuffle(doubleImages);

    doubleImages.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.item = element;
        card.innerHTML = `<div class="card-front"></div>
                                <div class="card-back">
                                <img class="image" src="${element}">
                            </div>`;
        gameContainer.appendChild(card);
    });
}

function flipCard(event) {
    if (event.target.classList.contains('card-success')) return;
    if (event.target.classList.contains('flip')) return;

    event.target.classList.add('flip');

    if (!firstCard) {
        firstCard = event.target.dataset.item;
        firstCardNode = event.target;
    } else {
        secondCard = event.target.dataset.item;
        secondCardNode = event.target;
        checkPair();
    }
}

function checkPair() {
    if (firstCard === secondCard) {
        setTimeout(function () {
            firstCardNode.classList.replace('card', 'card-success');
            secondCardNode.classList.replace('card', 'card-success');
        }, 600);
        checkWin();
    } else {
        setTimeout(returnFlipCard, 700);
    }
    firstCard = '';
    secondCard = '';
}

function returnFlipCard() {
    firstCardNode.classList.remove('flip');
    secondCardNode.classList.remove('flip');
}

function checkWin() {
    winCount++;
    if (winCount === 4) {
        setTimeout(function() {alert('You win!')}, 900);
    }
}

function shuffle(o) {
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

showCards();
gameContainer.addEventListener('click', flipCard);
