const data = [
  "img/candy-cane.svg",
  "img/christmas-tree.svg",
  "img/gift.svg",
  "img/santa-claus.svg",
  "img/candies.svg",
  "img/snowman.svg"
];
const DELAY = 800;
let isFlipped = false;
let isBlocked = false;
let cards = [];
let firstCard, secondCard;
let grid = document.querySelector(".grid");

function makeCardsArray() {
  data.forEach(item => {
    cards = cards.concat(item, item);
  });
  cards.sort(() => 0.5 - Math.random());
}

function createCards() {
  let fragment = document.createElement('template');
  cards.forEach(item => {
    let attribute = item.split("/")[1];
    fragment.innerHTML += `<div class="memory-card " data-pair="${attribute}">
    <img src="${item}" class="front-side">
    <img src="img/snowflake.svg" class="back-side">
    </div>`;
  });
  grid.appendChild(fragment.content);
}

function handleCardClick() {
  grid.addEventListener("click", function ({ target }) {
    if (isBlocked) return;
    let parent = target.parentElement;
    parent.classList.add("flip");
    if (!isFlipped) {
      isFlipped = true;
      firstCard = parent;
    } else {
      isFlipped = false;
      secondCard = parent;

      if (firstCard.dataset.pair === secondCard.dataset.pair) {
        deleteEvent(arguments.callee);
      } else {
        isBlocked = true;
        unflip();
      }
    }
  });
}

function deleteEvent(func) {
  firstCard.removeEventListener("click", func);
  secondCard.removeEventListener("click", func);
}

function unflip() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    isBlocked = false;
  }, DELAY);
}

function playGame() {
  makeCardsArray();
  createCards();
  handleCardClick();
}
playGame();
