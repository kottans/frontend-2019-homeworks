"use strict";
//array of our cards
let list = [
  "./img/sad.png",
  "./img/dad.png",
  "./img/indiffirent.png",
  "./img/pfff.png",
  "./img/troll.png",
  "./img/rage.png",
  "./img/yellow.png",
  "./img/scream.png"
];
//double our cards in the array
list = list.concat(list);

const GAME_BOARD = document.getElementById("content");
const WINNER_STRING = "OK, dude. You are the winner. ";
const TIME_OF_BACK_FLIP = 1200;
const TIME_OF_HIDDING = 800;
let keepPlaying, secondClick, nextMoveFlag, previousFlipper, previousImage;

//funtcion to flip one or more fliper containers
const flip = function() {
  [...arguments].forEach(flipper => {
    flipper.classList.toggle("flip");
  });
};

//function that starts next move and handle game over situation
const nextMove = () => {
  if (keepPlaying) {
    secondClick = false;
    previousFlipper = null;
    nextMoveFlag = true;
  } else {
    GAME_BOARD.textContent = WINNER_STRING;
    let newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.addEventListener("click", newGame);
    GAME_BOARD.appendChild(newGameButton);
  }
};

// hide matches from page, and count how many cards are left in the game
function removeMatches(currentFlipper) {
  currentFlipper.classList.add("hidden");
  previousFlipper.classList.add("hidden");
  keepPlaying -= 2;
  nextMove();
}

//function that handle moves(clicks on the cards)
const move = event => {
  const currentFlipper = event.currentTarget;
  // prettier-ignore
  const currentImage = event.currentTarget.querySelector("img").getAttribute("src");

  //check the click on the same card, click on not hidden element and possibility of opening cards
  if (
    currentFlipper != previousFlipper &&
    !currentFlipper.classList.contains("hidden") &&
    nextMoveFlag
  ) {
    flip(currentFlipper);
    if (secondClick) {
      nextMoveFlag = false;
      if (currentImage != previousImage) {
        setTimeout(() => {
          flip(previousFlipper, currentFlipper);
          nextMove();
        }, TIME_OF_BACK_FLIP);
      } else {
        setTimeout(() => {
          removeMatches(currentFlipper);
        }, TIME_OF_HIDDING);
      }
    } else {
      previousFlipper = currentFlipper;
      previousImage = currentImage;
      secondClick = true;
    }
  }
};

const newGame = () => {
  //shuffle array of cards
  list.sort(function() {
    return 0.5 - Math.random();
  });

  //set game's variables to the start values
  GAME_BOARD.textContent = "";
  keepPlaying = list.length;
  secondClick = false;
  nextMoveFlag = true;

  //render our cards on the page(back sides)
  list.forEach(img => {
    //create blank side of the card
    const blank = document.createElement("div");
    blank.classList.add("front");

    //create our flipper container
    let flipper = document.createElement("div");
    flipper.classList.add("flipper");

    //add event listnee to our flipper container
    flipper.addEventListener("mousedown", event => {
      move(event);
    });

    //create image on back side of our card
    let image = document.createElement("img");
    image.setAttribute("src", img);
    image.classList.add("back");

    //add back and front of our card to the flipper
    flipper.appendChild(image);
    flipper.appendChild(blank);

    //add aour flipper to the page
    GAME_BOARD.appendChild(flipper);
  });
};

newGame();
