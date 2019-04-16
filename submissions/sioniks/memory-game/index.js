// cards array
let card = document.getElementsByClassName("card");
let cards = [...card];
const board = document.getElementById("card-board");
let moves = 0;
let finalTime;
let counter = document.querySelector(".moves");
let matchedCard = document.getElementsByClassName("match");
const popup = document.getElementById("popup");
const timer = document.querySelector(".timer");
let second = 0,
  minute = 0,
  hour;
let interval;

let openedCards = [];
document.body.onload = startGame();

window.onload = function () {
  var restarter = document.querySelector(".restart");
  var restarter2 = document.querySelector(".popup-restart");
  restarter.addEventListener("click", startGame);
  restarter2.addEventListener("click", playAgain);
};

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  cards = shuffle(cards);
  for (var i = 0; i < cards.length; i++) {
    board.innerHTML = "";
    [].forEach.call(cards, function (item) {
      board.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset result
  moves = 0;
  counter.innerHTML = moves;
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

var displayCard = function () {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].dataset.type === openedCards[1].dataset.type) {
      matched();
    } else {
      unmatched();
    }
  }
}


function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function () {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}

function disable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.add('disabled');
  });
}

function enable() {
  Array.prototype.filter.call(cards, function (card) {
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

function startTimer() {
  interval = setInterval(function () {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function congrat() {
  if (matchedCard.length == 32) {
    clearInterval(interval);
    finalTime = timer.innerHTML;

    popup.classList.add("is-active");

    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
  }
}

function playAgain() {
  popup.classList.remove("is-active");
  startGame();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congrat);
}