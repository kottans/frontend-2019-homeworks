const IMAGES = [
    'img/01.jpg',
    'img/02.jpg',
    'img/03.jpg',
    'img/04.jpg',
];
const DELAY_TIME = 700;
const DELAY_TIME_WIN = 800;

var gameContainer = document.getElementById('game-container');
var firstCard;
var firstCardNode;
var secondCard;
var secondCardNode;
var winCount = 0;
var lockCard = false;

function showCards() {
    let doubleImages = IMAGES.concat(IMAGES);
    shuffle(doubleImages);
    let cards = document.createDocumentFragment();
    doubleImages.forEach(element => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.item = element;
        card.innerHTML = `<div class="card-front"></div>
                                <div class="card-back">
                                <img class="image" src="${element}">
                            </div>`;
        cards.append(card);
    });
    gameContainer.appendChild(cards);
}

function flipCard(event) {
    let currentCard = event.target;
    if (currentCard.classList.contains('card-success') ||
        currentCard.classList.contains('flip') ||
        lockCard) return;

    currentCard.classList.add('flip');

    if (!firstCard) {
        firstCard = currentCard.dataset.item;
        firstCardNode = currentCard;
    } else {
        lockCard = true;
        secondCard = currentCard.dataset.item;
        secondCardNode = currentCard;
        checkPair();
    }
}

function checkPair() {
    if (firstCard === secondCard) {
        setTimeout(function () {
            firstCardNode.classList.replace('card', 'card-success');
            secondCardNode.classList.replace('card', 'card-success');
            lockCard = false;
        }, DELAY_TIME);
        checkWin();
    } else {
        setTimeout(returnFlipCard, DELAY_TIME);
    }
    firstCard = '';
    secondCard = '';

}

function returnFlipCard() {
    firstCardNode.classList.remove('flip');
    secondCardNode.classList.remove('flip');
    lockCard = false;
}

function checkWin() {
    winCount++;
    if (winCount === 4) {
        setTimeout(function () { alert('You win!') }, DELAY_TIME_WIN);
    }
}

function shuffle(arr) {
    return arr.sort(function () { return 0.5 - Math.random() });
};

showCards();
gameContainer.addEventListener('click', flipCard);
