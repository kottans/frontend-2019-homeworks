const data = [
  "img/candy-cane.svg",
  "img/christmas-tree.svg",
  "img/gift.svg",
  "img/santa-claus.svg",
  "img/candies.svg",
  "img/snowman.svg"
];
let isFlipped = false;
let isBlocked = false;
let cards = [];
let firstCard, secondCard;
let grid = document.querySelector(".grid");

function shufleCards() {
  data.forEach(item => {
    cards.push(item);
    cards.push(item);
  });
  cards.sort(() => 0.5 - Math.random());
}

function createCards() {
  cards.forEach(item => {
    let attribute = item.split("/")[1];
    let div = document.createElement("div");
    div.className = "memory-card";
    div.setAttribute("pair", attribute);

    let frontImg = document.createElement("img");
    frontImg.setAttribute("src", item);
    frontImg.className = "front-side";

    let backImg = document.createElement("img");
    backImg.setAttribute("src", "img/snowflake.svg");
    backImg.className = "back-side";

    grid.appendChild(div);
    div.append(frontImg, backImg);
  });
}

function flipCards() {
  grid.addEventListener("click", function(event) {
    if(isBlocked) return;
    let target = event.target;
    let parent = target.parentElement;
    parent.classList.add("flip");

    if (!isFlipped) {
      isFlipped = true;
      firstCard = parent;
    } else {
      isFlipped = false;
      secondCard = parent;
      isBlocked = true;
      if (firstCard.getAttribute("pair") === secondCard.getAttribute("pair")) {
        deleteEvent(arguments.callee);
      } else {
        unflip();
      }
    }
  });
}

function deleteEvent(func) {
  firstCard.removeEventListener("click", func);
  secondCard.removeEventListener("click", func);
}

function unflip(){
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    isBlocked = false;
  }, 800);
}

function playGame() {
  shufleCards();
  createCards();
  flipCards();
}
playGame();
