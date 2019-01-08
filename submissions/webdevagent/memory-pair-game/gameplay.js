//Initialize and define basic game variables and objects
const restartButton = document.querySelector('.restart');
const galleryContainer = document.querySelector('.catGallery');
let checkCard = null;
let canOpenCard = true;
const catGallery = [
  'cats/attention-cat.jpeg',
  'cats/hungry-cat.jpeg',
  'cats/looking-cat.jpg',
  'cats/sleeping-cat.jpeg',
  'cats/standing-cat.jpeg',
  'cats/sweet-cat.jpeg',
];

const gameCards = [];

//fill ampty Array by game-blocks
for (let i = 0; i < 12; i++) {
  gameCards[i] = createBlock(catGallery[i % 6]);
};

//add addEventListeners to gameBlocks and restartButton
gameCards.forEach(num => num.addEventListener('click', cardCompare));
restartButton.addEventListener('click', startGame);

//call function startGame() to  begin playing
startGame();

/*Initialize and define basic game methods
Initialize and define function that randomize income Array*/
function Shuffle(o) {
  for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

//Game begining function defining
function startGame() {
  Shuffle(gameCards);
  gameCards.forEach(num => {
    galleryContainer.appendChild(num)
    num.firstChild.classList.toggle('right', false);
    num.firstChild.classList.toggle('transformCard', false);
    num.firstChild.classList.add('start');
    checkCard = null;
    canOpenCard = true;
  });
};

//Html element creation function definition
function createCard(element, className) {
  let card = document.createElement(element);
  card.classList.add(className);
  return card;
};

//Initialize and define game block creation function
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

/*Initialize and define cardCompare function, that compare cards and run
 internal method that based on the comparison result*/
function cardCompare({target}) {
  function afterCompareAction(className, time, action) {
    setTimeout(() => {
      if (action == 'add') {
        checkCard.classList.add(className);
        target.parentNode.classList.add(className);
      } else {
        checkCard.classList.toggle(className);
        target.parentNode.classList.toggle(className);
        checkCard = null;
        checkCardImg = null;
        canOpenCard = true;
      }
    }, time);
  };
  let innerImg = target.parentNode.querySelector('img');
  if (canOpenCard) {
    if (checkCard == null) {
      target.parentNode.classList.add('transformCard');
      checkCard = target.parentNode;
      checkCardImg = innerImg;
    } else {
      target.parentNode.classList.add('transformCard');
      if (checkCardImg.src == innerImg.src && checkCardImg != innerImg) {
        canOpenCard = false;
        afterCompareAction('right', 1000, 'add');
        afterCompareAction('start', 2000);
      } else if (checkCardImg != innerImg) {
        canOpenCard = false;
        afterCompareAction('transformCard', 1000)
      }
    }
  }
}
