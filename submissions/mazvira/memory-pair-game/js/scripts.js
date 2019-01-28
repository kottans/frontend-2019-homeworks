const cards = [
 {
    'name': 'strawberry',
    'img': 'img/strawberry.jpg',
  },
  {
    'name': 'pear',
    'img': 'img/pear.jpg',
  },
  {
    'name': 'pineapple',
    'img': 'img/pineapple.jpg',
  },
  {
    'name': 'melon',
    'img': 'img/melon.jpg',
  },
  {
    'name': 'pomegranate',
    'img': 'img/pomegranate.jpg',
  },
  {
    'name': 'grape',
    'img': 'img/grape.jpg',
  }, 
  
  {
    'name': 'orange',
    'img': 'img/orange.jpg',
  },
  
  {
    'name': 'blueberries',
    'img': 'img/blueberries.jpg',
  },
  {
    'name': 'lemon',
    'img': 'img/lemon.jpg',
  },
  
];

const game = document.getElementById('game');

const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

game.appendChild(grid);

const gameGrid = cards.concat(cards);

gameGrid.sort(() => 0.5 - Math.random());

gameGrid.forEach(item => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const front = document.createElement('div');
  front.classList.add('front');
  front.dataset.name = item.name;

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

let count = 0;
let firstGuess = '';
let secondGuess = '';
let previousTarget = null;
let delay = 1200;

grid.addEventListener('click', function (event) {
  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected')) { return; }
  
  if (count < 2) {
    count++;
    if (count === 1) {
	  firstGuess = clicked.dataset.name;
	  clicked.parentNode.classList.add('selected');
    } else {
	  secondGuess = clicked.dataset.name;
      clicked.parentNode.classList.add('selected');
    }
  
    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
           setTimeout(match, delay);
           setTimeout(resetGuesses, delay);
     } else {
     setTimeout(resetGuesses, delay);
    }
    }  
  previousTarget = clicked;
  }
 });

const match = function(){
  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = function(){
  firstGuess = '';
  secondGuess = '';
  count = 0;

  let selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

