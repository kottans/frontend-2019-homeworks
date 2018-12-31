const svgImages = [
  'img/001-superhero.svg',
  'img/002-superhero-1.svg',
  'img/003-superhero-2.svg',
  'img/020-superhero-19.svg',
  'img/005-superhero-4.svg',
  'img/014-superhero-13.svg',
  'img/007-superhero-6.svg',
  'img/008-superhero-7.svg',
];
const container = document.querySelector('.container');
const gameContainer = document.querySelector('.game-container');
const modalContainer = document.querySelector('.modal-container');

let flippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;
let showedCards = 0;

function createCards() {
  images = svgImages;
  let cardContainer = document.createDocumentFragment();
  images = images.concat(images);
  shuffle(images);
  images.forEach(function (item) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.item = item;
    card.innerHTML = `<div class="front-part"></div>
                      <img src="${item}" class="back-part">`
    cardContainer.append(card);
  });
  return cardContainer;
}

function shuffle(arr) {
  arr.sort(function () { return 0.5 - Math.random() });
}

function flipCard(e) {
  if(!e.target.classList.contains('card')){
    return;
  }
  currentCard = e.target;
  if(currentCard.classList.contains('succes')){
    return;
  }
  if (lockBoard) return;
  if(currentCard === firstCard) return;
  currentCard.classList.add('flip');
  if (!flippedCard) {
    flippedCard = true;
    firstCard = currentCard;
    return;
  }
  secondCard = currentCard;
  isPaired();
  setTimeout(() => {
    showWinMessage();
  }, 500);
}

function isPaired() {
  if (firstCard.dataset.item === secondCard.dataset.item){
    disableCards()
  }else unflipCards();
}

function disableCards() {
  secondCard.classList.add('succes');
  firstCard.classList.add('succes');
  showedCards += 1;
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  firstCard.classList.add('wrong');
  secondCard.classList.add('wrong');
  setTimeout(() => {
    firstCard.classList.remove('flip', 'wrong');
    secondCard.classList.remove('flip', 'wrong');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  flippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function showWinMessage(){
  if(showedCards === svgImages.length){
    gameContainer.classList.add('hidden');
    modalContainer.classList.remove('modal-hidden');
 }
}

function play(){
  showedCards = 0;
  gameContainer.innerHTML = '';
  gameContainer.classList.remove('hidden');
  modalContainer.classList.add('modal-hidden');
  gameContainer.appendChild(createCards());
  gameContainer.addEventListener('click', flipCard);
}

modalBtn = document.querySelector('.button');
modalBtn.addEventListener('click', function(){
  play();
});

play();
