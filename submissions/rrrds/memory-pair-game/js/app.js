const playfield = document.querySelector('.playfield');
const modal = document.querySelector('.finish-modal');
const restartButton = document.querySelector('.finish-modal__button');
const cardTypes = ['A', 'B', 'C', 'D'];
const openCards = [];
const timeoutCloseCards = 1000;
const timeoutDisableCards = 600;
let openCardsCount = 0;
let disabledCardsCount = 0;
let cards = [];

const shuffleCards = function(cardsArray = []) {
  let counter = cardsArray.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);

    counter -= 1;

    const temp = cardsArray[counter];
    cardsArray[counter] = cardsArray[index];
    cardsArray[index] = temp;
  }

  return cardsArray;
};

const getFlipContainer = function(event) {
  let { target } = event;

  while (!target.classList.contains('flip-container')) {
    target = target.parentElement;
  }

  return target;
};

const showModal = function() {
  playfield.classList.add('playfield--hide');
  modal.classList.remove('finish-modal--hide');
};

const hideModal = function() {
  playfield.classList.remove('playfield--hide');
  modal.classList.add('finish-modal--hide');
};

const checkWin = function() {
  if (disabledCardsCount >= cards.length) {
    setTimeout(showModal, 1000);
  }
};

const resetOpenCards = function() {
  openCards.length = 0;
  openCardsCount = 0;
};

const closeAllCards = function() {
  openCards.forEach(openCard => {
    openCard.classList.toggle('flip-container--open');
  });

  resetOpenCards();
};

const disableSimilarCards = function() {
  openCards.forEach(card => {
    card.classList.add('flip-container--disabled');
  });

  disabledCardsCount += openCards.length;

  resetOpenCards();

  checkWin();
};

const openCard = function(event) {
  const flipContainer = getFlipContainer(event);

  console.log(flipContainer);

  if (
    !flipContainer ||
    flipContainer.classList.contains('flip-container--open') ||
    flipContainer.classList.contains('flip-container--disabled') ||
    openCardsCount >= 2
  ) {
    return;
  }

  openCardsCount += 1;
  openCards.push(flipContainer);

  flipContainer.classList.toggle('flip-container--open');

  if (openCardsCount >= 2) {
    if (
      cards[openCards[0].getAttribute('data-index')] ===
      cards[openCards[1].getAttribute('data-index')]
    ) {
      setTimeout(disableSimilarCards, timeoutDisableCards);
    } else {
      setTimeout(closeAllCards, timeoutCloseCards);
    }
  }
};

const clearContainer = function() {
  playfield.removeEventListener('click', openCard);
  playfield.innerHTML = '';
};

const renderCards = function() {
  const cardsFragment = document.createDocumentFragment();
  cards.forEach((card, idx) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('flip-container');
    cardDiv.setAttribute('data-index', idx);
    cardDiv.innerHTML = `<div class="flip-container__flipper card">
  <div class="flip-container__front">
      
  </div>
  <div class="flip-container__back">
      ${card}
  </div>
</div>`;
    cardsFragment.appendChild(cardDiv);
  });

  playfield.appendChild(cardsFragment);
  playfield.addEventListener('click', openCard);
};

const startGame = function() {
  cards = shuffleCards(cardTypes.concat(cardTypes));

  clearContainer();

  renderCards();

  hideModal();
};

startGame();

restartButton.addEventListener('click', startGame);
