// Card data
//size should be divisible by 2
const cardsArray = [{
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
const defaultCount = 2;
const defaultWidth = 160;


let gameGrid;
let counter = defaultCount;
document.addEventListener("DOMContentLoaded", ready);
let container;
let win;

function ready() {
  container = document.querySelector('.container');
  container.classList.add('fade');

  let btnContinue = document.querySelector('button.continue');
  let btnReset = document.querySelector('button.reset');
  btnContinue.addEventListener('click', () => { start(counter * 2) });
  btnReset.addEventListener('click', () => { start(defaultCount) });

  moveBackground();
  start(counter);
}

function start(n) {
  counter = n;

  if (win)
    win.classList.remove('active-win');
  setTimeout(() => {
    container.classList.remove('fade');
  }, 100);
  addGrid(n);
  setTimeout(preview, 1200);
}


function removeGrid() {
  let game = document.getElementById('game');
  let grid = document.querySelector('.grid');
  game.removeChild(grid);
}


function addGrid(n) {
  if (document.querySelector('.grid') !== null) removeGrid();

  let grid = document.createElement('div');
  let game = document.getElementById('game');
  //event delegation for childs(cards)
  grid.addEventListener('click', selectCard);
  grid.classList.add('grid');
  grid.style.maxWidth = `${defaultWidth * n}px`;
  game.appendChild(grid);
  //duplicate all cards
  if (n > cardsArray.length) n = defaultCount;
  cards = cardsArray.slice(0, n);
  gameGrid = cards.concat(cards);
  gameGrid.sort(() => 0.5 - Math.random());

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


function preview() {
  let cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.classList.add('selected');
  });

  setTimeout(() => {
    cards.forEach(card => {
      card.classList.remove('selected');
    })
  }, 1500);
}


function selectCard(event) {
  let element = event.target;
  if (element.classList.contains('grid') || element.classList.contains('match')) {
    return;
  }
  element.parentNode.classList.add('selected');

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
      setTimeout(() => {
        selected.forEach(card => {
          card.classList.remove('selected');
        })
      }, 500);
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
  let container = document.querySelector('.container');
  container.classList.add('fade');
  win.classList.add('active-win');

  let btnContinue = document.querySelector('button.continue');
  let btnReset = document.querySelector('button.reset');
  if (counter < cardsArray.length) {
    btnContinue.classList.remove('disabled');
    btnContinue.removeAttribute('disabled');

  }
  else {
    btnContinue.classList.add('disabled');
    btnContinue.setAttribute('disabled', 'true');
  }
}


// region background
var lFollowX = 0,
  lFollowY = 0,
  x = 0,
  y = 0,
  friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
  const bg = document.querySelector('#bg');
  bg.style.transform = translate;
  window.requestAnimationFrame(moveBackground);
}
window.addEventListener('mousemove', function (e) {

  var lMouseX = Math.max(-100, Math.min(100, window.innerWidth / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, window.innerHeight / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});
// endregion background
