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

// Fill the area with cards
function fillArea(src) {
  let somthing = src.concat(src);
  somthing.sort( () => { return 0.5 - Math.random() } ).forEach(addCard);
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

// Move/hide paired cards
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

function update() {
  let openedCards = document.querySelectorAll('.open');

  if (openedCards.length === 2) {
    if (openedCards[0].isEqualNode(openedCards[1])) {
      setTimeout(moveUp, 700, openedCards);
      setTimeout(flipBack, 600, openedCards);
    } else {
      setTimeout(flipBack, 700, openedCards);
    }
  }
  setTimeout(congrats, 800);
};

fillArea(sources);

section.addEventListener('click', (event) => {
  let target = event.target;
  if (target !== section) {
    while (!target.classList.contains('flipper-container')) {
      target = target.parentNode;
    }
    flipCard(target);
  }
  update();
 });
