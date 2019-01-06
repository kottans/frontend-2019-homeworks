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

const shuffleCards = (cardsArray = []) => {
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

const getFlipContainer = ({ target }) => {
  while (!target.classList.contains('flip-container')) {
    target = target.parentElement;
  }

  return target;
};

const showModal = () => {
  playfield.classList.add('playfield--hide');
  modal.classList.remove('finish-modal--hide');
};

const hideModal = () => {
  playfield.classList.remove('playfield--hide');
  modal.classList.add('finish-modal--hide');
};

const checkWin = () => {
  if (disabledCardsCount >= cards.length) {
    setTimeout(showModal, 1000);
  }
};

const resetOpenCards = () => {
  openCards.length = 0;
  openCardsCount = 0;
};

const closeAllCards = () => {
  openCards.forEach(openCard => {
    openCard.classList.toggle('flip-container--open');
  });

  resetOpenCards();
};

const disableSimilarCards = () => {
  openCards.forEach(card => {
    card.classList.add('flip-container--disabled');
  });

  disabledCardsCount += openCards.length;

  resetOpenCards();
  checkWin();
};

const openCard = event => {
  const flipContainer = getFlipContainer(event);

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

const clearContainer = () => {
  playfield.removeEventListener('click', openCard);
  playfield.innerHTML = '';
};

const renderCards = () => {
  const cardTemplates = [];

  cards.forEach((card, idx) => {
    cardTemplates.push(`
      <div class="flip-container" data-index="${idx}">
        <div class="flip-container__flipper card">
          <div class="flip-container__front"></div>
          <div class="flip-container__back">${card}</div>
        </div>
      </div>`);
  });

  playfield.innerHTML = cardTemplates.join('');
  playfield.addEventListener('click', openCard);
};

const startGame = () => {
  cards = shuffleCards(cardTypes.concat(cardTypes));

  clearContainer();
  renderCards();
  hideModal();
};

startGame();

restartButton.addEventListener('click', startGame);
