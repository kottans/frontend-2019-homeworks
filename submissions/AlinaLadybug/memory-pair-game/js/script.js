// Card data
//size should be divisible by 2
const CARDS_ARRAY = [{
  'name': 'airplane',
  'src': 'img/cards/airplane.jpg',
},
{
  'name': 'mars',
  'src': 'img/cards/mars_explorers.jpg',
},
{
  'name': 'nasa',
  'src': 'img/cards/nasa.jpg',
},
{
  'name': 'cassini',
  'src': 'img/cards/cassini.jpg',
},
{
  'name': 'galileo',
  'src': 'img/cards/galileo.jpg',
},
{
  'name': 'horizons',
  'src': 'img/cards/new_horizons.jpg',
},
{
  'name': 'space',
  'src': 'img/cards/space.jpg',
},
{
  'name': 'galaxy',
  'src': 'img/cards/galaxy.jpg',
}
];
const DEFAULT_COUNT = 2;
const DEFAULT_WIDTH = 130;


let gameGrid;
let counter = DEFAULT_COUNT;
let container;
let win;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
  container = document.querySelector('.container');
  container.classList.add('fade');

  const BTN_CONTINUE = document.querySelector('button.continue');
  const BTN_RESET = document.querySelector('button.reset');
  BTN_CONTINUE.addEventListener('click', () => { start(counter * 2) });
  BTN_RESET.addEventListener('click', () => { start(DEFAULT_COUNT) });

  moveBackground();
  start(counter);
}

function start(n) {
  counter = n;

  if (win)
    win.classList.remove('active-win');
  const FADE_TIME = 100;
  const PREVIEW_TIME = 1200;
  setTimeout(() => {
    container.classList.remove('fade');
  }, FADE_TIME);
  addGrid(n);
  setTimeout(preview, PREVIEW_TIME);
}


function removeGrid() {
  const GAME = document.getElementById('game');
  const GRID = document.querySelector('.grid');
  GAME.removeChild(GRID);
}


function addGrid(n) {
  if (document.querySelector('.grid')) removeGrid();

  const GAME = document.getElementById('game');

  let grid = document.createElement('div');
  //event delegation for childs(cards)
  grid.addEventListener('click', selectCard);
  grid.classList.add('grid');
  grid.style.maxWidth = `${DEFAULT_WIDTH * n}px`;

  GAME.appendChild(grid);

  gameGrid = getGrid(n);
  gameGrid.forEach(item => {
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    let front = document.createElement('div');
    front.classList.add('front');
    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.src})`;
    card.appendChild(front);
    card.appendChild(back);
    grid.appendChild(card);
  });
}


function getGrid(n) {
  //duplicate all cards
  if (n > CARDS_ARRAY.length) n = DEFAULT_COUNT;
  cards = CARDS_ARRAY.slice(0, n);
  gameGrid = cards.concat(cards);
  gameGrid.sort(() => 0.5 - Math.random());
  return gameGrid;
}


function preview() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('selected');
  });
  const PREVIEW_TIME = 1500;
  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('selected');
    })
  }, PREVIEW_TIME);
}


function selectCard({ target }) {
  if (target.classList.contains('grid') || target.classList.contains('match')) {
    return;
  }
  target.parentNode.classList.add('selected');

  let selectedArr = Array.from(document.getElementsByClassName('selected'));
  let selected = selectedArr.filter(el => {
    return !el.classList.contains('match');
  });
  if (selected.length == 2) {
    let firstEl = selected[0].dataset.name;
    let secondEl = selected[1].dataset.name;

    if (firstEl === secondEl) {
      match(selected);
    }
    else {
      const UNSELECT_TIME = 500;
      setTimeout(() => {
        selected.forEach(card => {
          card.classList.remove('selected');
        })
      }, UNSELECT_TIME);
    }
  }
}


function match(selected) {
  selected.forEach(card => {
    card.classList.add('match');
  });
  checkWin();
}

function checkWin() {
  let matched = document.querySelectorAll('.match');
  if (matched.length == gameGrid.length) {
    showModal();
  }
}

function showModal() {
  win = document.querySelector('.win');
  win.classList.add('active-win');

  const CONTAINER = document.querySelector('.container');
  CONTAINER.classList.add('fade');

  const BTN_CONTINUE = document.querySelector('button.continue');
  if (counter < CARDS_ARRAY.length) {
    BTN_CONTINUE.classList.remove('disabled');
    BTN_CONTINUE.removeAttribute('disabled');

  }
  else {
    BTN_CONTINUE.classList.add('disabled');
    BTN_CONTINUE.setAttribute('disabled', 'true');
  }
}


// region background
let lFollowX = 0,
  lFollowY = 0,
  x = 0,
  y = 0,
  friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
  const BG = document.querySelector('#bg');
  BG.style.transform = translate;
  window.requestAnimationFrame(moveBackground);
}
window.addEventListener('mousemove', function (e) {

  let lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
  let lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});
// endregion background
