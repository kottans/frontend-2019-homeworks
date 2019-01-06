const gameBoard = document.querySelector('.game-board');
const allCards = document.querySelectorAll('.game-card');
let isFlippedCard = false;
let isBlockedBoard = false;
let firstCard, secondCard;

const flipCard = (targetCard) => {
  if (targetCard !== null) {
    if (isBlockedBoard || targetCard === firstCard) return;
  
    targetCard.classList.add('flip');

    if (!isFlippedCard) {
      isFlippedCard = true;
      firstCard = targetCard;
    } else {
      secondCard = targetCard;
      checkCardsMatching();
    }
  }
}

const checkCardsMatching = () => {
  if (firstCard.dataset.img === secondCard.dataset.img) {
    return blockCards();
  }
  return stopFlipCards();
}

const blockCards = () => {
  setTimeout(() => {
    firstCard.classList.add('hide');
    secondCard.classList.add('hide');
    resetSettings();
  }, 700);
}

const stopFlipCards = () => {
  isBlockedBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetSettings();
  }, 700);
}

const resetSettings = () => {
  [isFlippedCard, isBlockedBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  allCards.forEach(item => {
    let randomItemPos = Math.floor(Math.random() * 16);
    item.style.order = randomItemPos;
  });
})();

gameBoard.addEventListener('click', function(e) {
  const targetCard = e.target.closest('.game-card');
  flipCard(targetCard);
});

