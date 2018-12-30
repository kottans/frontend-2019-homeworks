const technologies = ["react", "vue", "angular", "html", "css", "js"];
const pathToImg = "img/";
let playArray = [];

let blocked = false;
let inGuessArray = [];
let guessedArray = [];

let flip1Sound = new Audio("sound/flip-1.mp3");
let flip2Sound = new Audio("sound/flip-2.mp3");
let successSound = new Audio("sound/Success 2.mp3");
flip1Sound.volume = 0.1;
flip2Sound.volume = 0.1;

function playSuccess() {
  successSound.currentTime = 0;
  successSound.play();
}

function shuffleCards() {
  technologies.forEach(element => {
    playArray.push(element);
    playArray.push(element);
  });
  playArray.sort(function() {
    return 0.5 - Math.random();
  });
}

function spreadCards() {
  let field = document.querySelector(".field");
  playArray.forEach(function(el) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(el);
    card.setAttribute("onclick", "handleGuess(this)");

    let bothSides = document.createElement("div");
    bothSides.classList.add("both-sides");

    let frontSide = document.createElement("div");
    frontSide.classList.add("front");

    let backSide = document.createElement("div");
    backSide.classList.add("back");

    let img = document.createElement("img");
    img.setAttribute("src", pathToImg + el + ".png");

    backSide.appendChild(img);
    bothSides.appendChild(frontSide);
    bothSides.appendChild(backSide);
    card.appendChild(bothSides);
    field.appendChild(card);
  });
}

function render() {
  cardsElArr.forEach(function(el) {
    if (inGuessArray.includes(el) || guessedArray.includes(el)) {
      if (!el.classList.contains("flipped")) {
        el.classList.add("flipped");
        flip1Sound.currentTime = 0;
        flip1Sound.play();
      }
    } else {
      if (el.classList.contains("flipped")) {
        el.classList.remove("flipped");
        flip2Sound.currentTime = 0;
        flip2Sound.play();
      }
    }
  });
}

function unblock() {
  blocked = false;
  inGuessArray = [];
  render();
}

function handleGuess(el) {
  if (!blocked) {
    if (inGuessArray.length == 0) {
      inGuessArray.push(el);
    } else {
      if (inGuessArray[0].classList.contains(el.classList[1])) {
        guessedArray.push(el);
        guessedArray.push(inGuessArray[0]);
        if (guessedArray.length == playArray.length) {
          setTimeout(showModal, 500);
        }
        inGuessArray = [];
        setTimeout(playSuccess, 400);
      } else {
        inGuessArray.push(el);
        blocked = true;
        setTimeout(unblock, 1000);
      }
    }
    render();
  }
}

shuffleCards();
spreadCards();
let cardsElArr = document.querySelectorAll(".card");

let modal = document.getElementsByClassName("modal")[0];
function showModal() {
  modal.classList.add("modal-shown");
}
function startagain() {
  modal.classList.remove("modal-shown");
  let field = document.querySelector(".field");

  field.innerHTML = "";
  let blocked = false;
  playArray = [];
  inGuessArray = [];
  guessedArray = [];

  shuffleCards();
  spreadCards();
}
