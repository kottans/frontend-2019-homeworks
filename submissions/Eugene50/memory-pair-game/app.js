const cards = document.querySelectorAll('#container');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let count = 0;

shuffle(); 
   
function turnOver() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('open');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;

  match();
}
   
function match() {
  if(firstCard.dataset.name === secondCard.dataset.name){
    setTimeout(()=>{
      firstCard.classList.add('close');
      secondCard.classList.add('close');
      count++;
    },1400);
  }
  unTurnOver();
}

function unTurnOver() {
  lockBoard = true;

  setTimeout(()=> {
    firstCard.classList.remove('open');
    secondCard.classList.remove('open');

    reset();
  },1500);
}

function reset() {
  if(count===6){alert('You won!');}

  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

function shuffle() {
    cards.forEach(element=> {
        let randomPosition = Math.floor(Math.random() * 12);
        element.style.order = randomPosition;
    })
}

cards.forEach(element => element.addEventListener('click', turnOver));
