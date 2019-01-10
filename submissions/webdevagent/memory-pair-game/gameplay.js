const restartButton = document.querySelector('.restart');
const galleryContainer = document.querySelector('.catGallery');
let checkCard = null;
let canOpenCard = true;
let checkCardInnerCard;
const catGallery = [
  'cats/attention-cat.jpeg',
  'cats/hungry-cat.jpeg',
  'cats/looking-cat.jpg',
  'cats/sleeping-cat.jpeg',
  'cats/standing-cat.jpeg',
  'cats/sweet-cat.jpeg',
];

const gameCards = Array(12).fill(0);
gameCards.forEach((num, i) => gameCards[i] = createBlock(catGallery[i % 6]));
gameCards.forEach((num, i) => {
  num.querySelector('.flip-box-inner').dataset.order = i;
  num.querySelector('.flip-box-front').dataset.order = i;
  num.querySelector('.flip-box-front').dataset.compareNum = i % 6;
});
galleryContainer.addEventListener('click', cardCompare)
restartButton.addEventListener('click', startGame);
startGame();

function startGame() {
  gameCards.sort(() => 0.5 - Math.random());
  gameCards.forEach(num => {
    galleryContainer.appendChild(num)
    num.querySelector('.flip-box-inner ').classList.remove('right', 'transform-card');
    num.querySelector('.flip-box-inner ').classList.add('start');
    checkCard = null;
    canOpenCard = true;
  });
};

function createCard(element, className) {
  let card = document.createElement(element);
  card.classList.add(className);
  return card;
};

function createBlock(imgsrc) {
  let flipBox = createCard('div', 'flip-box');
  let flipBoxInner = createCard('div', 'flip-box-inner');
  let flipBoxFront = createCard('div', 'flip-box-front');
  let flipBoxBack = createCard('div', 'flip-box-back');
  let catImage = createCard('img');
  catImage.src = imgsrc;
  flipBoxBack.appendChild(catImage);
  flipBoxInner.appendChild(flipBoxFront);
  flipBoxInner.appendChild(flipBoxBack);
  flipBox.appendChild(flipBoxInner);
  return flipBox;
};

function cardCompare({target}) {
  let PlayCardClass = target.className;
  let targetInnerCard = galleryContainer.querySelector(`.flip-box-inner[data-order='${target.dataset.order}']`);
  const sInterval = 1000;
  const lInterval = 2000;

  function afterCompareAction(fcard, scard, className, time, action) {
    setTimeout(() => {
      if (action == 'add') {
        fcard.classList.add(className);
        scard.classList.add(className);
      } else {
        fcard.classList.toggle(className);
        scard.classList.toggle(className);
        checkCard = null;
        canOpenCard = true;
      }
    }, time);
  }
  if (PlayCardClass != 'flip-box' && PlayCardClass != 'catGallery' && canOpenCard && PlayCardClass == 'flip-box-front') {
    if (checkCard == null) {
      targetInnerCard.classList.toggle('transform-card');
      checkCard = target;
      checkCardInnerCard = galleryContainer.querySelector(`.flip-box-inner[data-order='${checkCard.dataset.order}']`);
    }
    if (target.dataset.compareNum != checkCard.dataset.compareNum) {
      targetInnerCard.classList.toggle('transform-card');
      canOpenCard = false;
      afterCompareAction(targetInnerCard, checkCardInnerCard, 'transform-card', 1000);
    }
    if (target.dataset.compareNum == checkCard.dataset.compareNum && target != checkCard) {
      targetInnerCard.classList.toggle('transform-card');
      canOpenCard = false;
      afterCompareAction(targetInnerCard, checkCardInnerCard, 'right', 1000, 'add');
      afterCompareAction(targetInnerCard, checkCardInnerCard, 'start', 2000);
    }
  }
};
