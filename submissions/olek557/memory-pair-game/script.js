// BOARD CLASS
const Board = function(squareSize) {
  this.sequence = [];
  this.squareSize = squareSize;
  this.size = squareSize * squareSize;
  this.selectedCard = '';
}

Board.prototype.startGame = function() {
  this.generateHTMLBoard();
  this.generateDataBoard();
  this.randomizeDataBoard();
  this.addEventListenerToCards();
}

Board.prototype.generateHTMLBoard = function() {
  let board = document.createElement('div');
  board.classList.add('wrapper');
  board.id = 'board';
  for (let i = 0; i < this.size; i++) {
    let cardWrapper = document.createElement('div'),
        card = document.createElement('div'),
        card__front = document.createElement('div'),
        card__back = document.createElement('div');
    card__front.classList.add('card__front');
    card__back.classList.add('card__back');
    card.classList.add('card');
    card.setAttribute('data-cell', i);
    card.appendChild(card__back);
    card.appendChild(card__front);
    cardWrapper.classList.add('card__wrapper');
    cardWrapper.appendChild(card);
    board.appendChild(cardWrapper);
  }
  document.body.appendChild(board);
  this.boardElement = document.getElementById('board');
}

Board.prototype.generateDataBoard = function() {
  for (let i = 0; i < this.size / 2; i++) {
    this.sequence.push(new Card(i), new Card(i));
  }
}

Board.prototype.randomizeDataBoard = function() {
  this.sequence.sort(() => { return 0.5 - Math.random() });
}

Board.prototype.addEventListenerToCards = function() {
  this.boardElement.addEventListener('click', event => {
    if(event.target.matches('.card__front')) {
      let cardElement = event.target.parentNode,
          index = cardElement.getAttribute('data-cell');
      cardElement.parentNode.classList.add('open');
      cardElement.querySelector('.card__back').innerHTML = this.sequence[index].value;
      if(this.selectedCard) {
        if(this.sequence[index].value == this.selectedCard.value) {
          setTimeout(() => {
            this.hideCards();
            this.closeAllCards();
          }, 600);
        }
        else {
          setTimeout(() => {
            this.closeAllCards();
          }, 600);
        }
      }
      else {
        this.selectedCard = this.sequence[index];
      }
    }
  });
}

Board.prototype.closeAllCards = function() {
  this.selectedCard = '';
  Array.from(document.getElementsByClassName('card__wrapper')).forEach(i => {
    i.classList.remove('open');
  });
}

Board.prototype.hideCards = function() {
  Array.from(document.getElementsByClassName('card__wrapper open')).forEach(i => {
    i.classList.add('hide');
  });
}

// CARD CLASS
let Card = function(value) {
  this.value = value;
}

// INIT
const board = new Board(4);
board.startGame();
