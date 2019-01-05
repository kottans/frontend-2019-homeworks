const mainBox = document.querySelector('.game-board');
const allCards = document.querySelectorAll('.game-card');
let isFlippedCard = false;
let blockBoard = false;
let firstCard, secondCard;

allCards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (blockBoard || this === firstCard) return;

  this.classList.add('flip');

  if (!isFlippedCard) {
    isFlippedCard = true;
    firstCard = this;
  } else {
    secondCard = this;
    checkCardsMatching();
  }
}

const checkCardsMatching = () => {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    return blockCards();
  }
  return stopFlipCards();
}

const blockCards = () => {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  setTimeout(() => {
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
    resetSettings();
  }, 700);
}

const stopFlipCards = () => {
  blockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetSettings();
  }, 1500);
}

const resetSettings = () => {
  [isFlippedCard, blockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  allCards.forEach(item => {
    let randomItemPos = Math.floor(Math.random() * 16);
    item.style.order = randomItemPos;
  });
})();










