let config = {
  technologies: ["react", "vue", "angular", "html", "css", "js"],
  pathToImg: "img/",
  blocked: false,
  playArray: [],
  inGuessArray: [],
  guessedArray: [],
  cardsElArr: [],
  flip1Sound: new Audio("sound/flip-1.mp3"),
  flip2Sound: new Audio("sound/flip-2.mp3"),
  successSound: new Audio("sound/Success 2.mp3"),
  modal: document.getElementById("modal"),
  field: document.getElementById("field")
};

config.flip1Sound.volume = 0.1;
config.flip2Sound.volume = 0.1;
config.field.addEventListener("click", function(event) {
  handleGuess(event.target.parentElement.parentElement);
});

function playSuccess() {
  config.successSound.currentTime = 0;
  config.successSound.play();
}

function showModal() {
  config.modal.classList.add("modal-shown");
  document.querySelector("body").classList.add("scroll-blocked");
}

function truncateData() {
  config.field.innerHTML = "";
  config.blocked = false;
  config.playArray = [];
  config.inGuessArray = [];
  config.guessedArray = [];
}

function startagain() {
  config.modal.classList.remove("modal-shown");
  document.querySelector("body").classList.remove("scroll-blocked");
  truncateData();
  shuffleCards();
  spreadCards();
}

function shuffleArray(arr) {
  arr.sort(function() {
    return 0.5 - Math.random();
  });
}

function shuffleCards() {
  config.technologies.forEach(element => {
    config.playArray.push(element);
  });
  config.playArray = config.playArray.concat(config.playArray);
  shuffleArray(config.playArray);
}

function spreadCards() {
  config.playArray.forEach(function(el) {
    config.field.innerHTML += ` 
    <div class="card ${el}">
      <div class="both-sides">
        <div class="front"></div>
        <div class="back">
          <img src="img/${el}.png">
        </div>
      </div>
    </div>
    `;
  });
  config.cardsElArr = document.querySelectorAll(".card");
}

function render() {
  config.cardsElArr.forEach(function(el) {
    if (config.inGuessArray.includes(el) || config.guessedArray.includes(el)) {
      if (!el.classList.contains("flipped")) {
        el.classList.add("flipped");
        config.flip1Sound.currentTime = 0;
        config.flip1Sound.play();
      }
    } else {
      if (el.classList.contains("flipped")) {
        el.classList.remove("flipped");
        config.flip2Sound.currentTime = 0;
        config.flip2Sound.play();
      }
    }
  });
}

function unblock() {
  config.blocked = false;
  config.inGuessArray = [];
  render();
}

function handleGuess(el) {
  if (config.blocked) return;
  if (config.inGuessArray.length == 0) {
    config.inGuessArray.push(el);
  } else {
    if (config.inGuessArray[0].classList.contains(el.classList[1])) {
      config.guessedArray.push(el);
      config.guessedArray.push(config.inGuessArray[0]);
      config.guessedArray.length == config.playArray.length
        ? setTimeout(showModal, 500)
        : null;
      config.inGuessArray = [];
      setTimeout(playSuccess, 400);
    } else {
      config.inGuessArray.push(el);
      config.blocked = true;
      setTimeout(unblock, 1000);
    }
  }
  render();
}

shuffleCards();
spreadCards();
