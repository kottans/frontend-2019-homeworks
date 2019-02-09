const section = document.querySelector('section');

const sources = [
  'image/beth.png',
  'image/jerry.jpg',
  'image/morty.png',
  'image/pickle-rick.png',
  'image/rick.png',
  'image/ruben.png',
  'image/snuffles.png',
  'image/summer.jpg'
];

function addCard(e) {
  section.insertAdjacentHTML('afterbegin',
    `<div class="flipper-container">
       <div class="card">
         <div class="back">
           <img src="${e}">
         </div>
         <div class="front">
         </div>
       </div>
     </div>`)
};

function fillArea(src) {
  let doubleArr = src.concat(src);
  doubleArr.sort(() => 0.5 - Math.random()).forEach(addCard);
};

function flipCard(card) {
  if (!card.classList.contains('open')) {
    card.classList.add('open');
  }
};

function flipBack(cards) {
  cards.forEach( card => {
    if (card.classList.contains('open')) {
      card.classList.remove('open');
    }
  })
};

function moveUp(cards) {
  cards.forEach( card => {
    if (!card.classList.contains('hidden')) {
      card.classList.add('hidden');
    }
  })
};

function congrats() {
  let cards = document.querySelectorAll('.flipper-container');
  let hidden = document.querySelectorAll('.hidden');
  if (hidden.length === cards.length) {
    alert('Wubba Lubba Dub Dub!');
  }
};

function update(delay) {
  let openedCards = document.querySelectorAll('.open');

  if (openedCards.length === 2) {
    if (openedCards[0].isEqualNode(openedCards[1])) {
      setTimeout(moveUp, delay, openedCards);
      setTimeout(flipBack, delay, openedCards);
    } else {
      setTimeout(flipBack, delay, openedCards);
    }
  }
  setTimeout(congrats, delay);
};

fillArea(sources);

section.addEventListener('click', (event) => {
  let target = event.target;
  if (target !== section) {
    target = target.closest('.flipper-container');
    flipCard(target);
  }
  update(800);
 });
