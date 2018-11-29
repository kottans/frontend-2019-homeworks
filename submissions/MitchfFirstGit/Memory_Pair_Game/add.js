const CARDS = document.querySelectorAll(".card");
const TIME_SHOW_MATCH_CARDS = 500;
const TIME_KOTTANS = 11;
const convertToSeconds = ms => (ms / 1000).toFixed(1);
let firstGuessCard,
  secondGuessCard,
  startTime,
  endTime,
  gameTime,
  clickCard,
  ramdomPos;
let activeCard = false;
let lockAttempt = false;
let gameResult = 0;
let gamePairs = 6;

const flip = cardImg => {
  clickCard = cardImg.target.parentNode;
  clickCard.firstElementChild.classList.add("frontCard");
  if (clickCard === firstGuessCard) return;
  if (lockAttempt) return;
  clickCard.classList.add("flip");
  if (!activeCard) {
    activeCard = true;
    firstGuessCard = clickCard;
  } else {
    lockAttempt = true;
    activeCard = false;
    secondGuessCard = clickCard;
    match();
  }
};
const match = () => {
  if (
    firstGuessCard.firstElementChild.src ===
    secondGuessCard.firstElementChild.src
  ) {
    firstGuessCard.removeEventListener("click", flip);
    secondGuessCard.removeEventListener("click", flip);
    gameResult++;
    setTimeout(() => {
      firstGuessCard.classList.add("hidden");
      secondGuessCard.classList.add("hidden");
      if (gameResult === gamePairs) {
        endTime = new Date().getTime();
        gameTime = convertToSeconds(endTime - startTime);
        if (gameTime > TIME_KOTTANS) {
          alert(
            ` Your result is ${gameTime} seconds. It was close but I know you can do more, just keep going! `
          );
        } else {
          alert(
            `Congratulation!!! Your result is ${gameTime} seconds. That was hard but you've made it. You can name yourself one of kottans`
          );
        }
        location.reload();
      }
      resetVariables();
    }, TIME_SHOW_MATCH_CARDS);
  } else {
    setTimeout(() => {
      lockAttempt = false;
      firstGuessCard.classList.remove("flip");
      secondGuessCard.classList.remove("flip");
      resetVariables();
    }, 1000);
  }
};
const resetVariables = () => {
  activeCard = false;
  lockAttempt = false;
  firstGuessCard = null;
  secondGuessCard = null;
};

window.onload = () => {
  alert(
    `If you think you are Kottan then you have ${TIME_KOTTANS} seconds to complete this game`
  );
  CARDS.forEach(card => {
    ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
    card.lastElementChild.classList.add("hidden");
  });

  setTimeout(function() {
    CARDS.forEach(card => {
      card.lastElementChild.classList.remove("hidden");
      card.addEventListener("click", flip);
    });

    startTime = new Date().getTime();
  }, 3000);
};
