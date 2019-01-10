const restartButton = document.querySelector('.restart');
const galleryContainer = document.querySelector('.cat-gallery');
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

const gameCards = Array(catGallery.length * 2).fill(0);
gameCards.forEach((num, i) => gameCards[i] = createBlock(catGallery[i % catGallery.length]));
gameCards.forEach((num, i) => {
  num.querySelector('.flip-box-inner').dataset.order = i;
  let frontCardData = num.querySelector('.flip-box-front').dataset;
  frontCardData.order = i;
  frontCardData.compareNum = i % catGallery.length;
});
galleryContainer.addEventListener('click', cardCompare)
restartButton.addEventListener('click', startGame);
startGame();

function startGame() {
  gameCards.sort(() => 0.5 - Math.random());
  gameCards.forEach(num => {
    galleryContainer.appendChild(num);
    let innerCard = num.querySelector('.flip-box-inner');
    innerCard.classList.remove('right', 'transform-card');
    innerCard.classList.add('start');
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
  [flipBoxFront, flipBoxBack].forEach(num => flipBoxInner.appendChild(num));
  flipBox.appendChild(flipBoxInner);
  return flipBox;
};

function cardCompare({target}) {
  let playCardClass = target.className;
  let targetInnerCard = galleryContainer.querySelector(`.flip-box-inner[data-order='${target.dataset.order}']`);
  let canCompare = playCardClass != 'flip-box' && playCardClass != 'catGallery' && canOpenCard && playCardClass == 'flip-box-front';
  const sInterval = 1000;
  const lInterval = 2000;

  function afterCompareAction(fcard, scard, className, time, compared) {
    setTimeout(() => {
      fcard.classList.toggle(className);
      scard.classList.toggle(className);
      if (compared) {
        checkCard = null;
        canOpenCard = true;
      }
    }, time);
  }
  if (canCompare) {
    if (checkCard == null) {
      targetInnerCard.classList.toggle('transform-card');
      checkCard = target;
      checkCardInnerCard = galleryContainer.querySelector(`.flip-box-inner[data-order='${checkCard.dataset.order}']`);
    }
    if (target.dataset.compareNum != checkCard.dataset.compareNum) {
      targetInnerCard.classList.toggle('transform-card');
      canOpenCard = false;
      afterCompareAction(targetInnerCard, checkCardInnerCard, 'transform-card', sInterval, true);
    }
    if (target.dataset.compareNum == checkCard.dataset.compareNum && target != checkCard) {
      targetInnerCard.classList.toggle('transform-card');
      canOpenCard = false;
      afterCompareAction(targetInnerCard, checkCardInnerCard, 'right', sInterval);
      afterCompareAction(targetInnerCard, checkCardInnerCard, 'start', lInterval, true);
    }
  }
};
