// BOARD CLASS
let Board = function(id) {
  this.sequence = [];
  this.boardElement = document.getElementById('board');
}

Board.prototype.generate = function() {
  for(i = 0; i < 8; i++) {
    this.sequence.push(new Card(i), new Card(i));
  }
  this.sequence.sort(function() { return 0.5 - Math.random() });
  this.boardElement.addEventListener('click', event => {
    if(event.target.matches('.card__front')) {
      let cardElement = event.target.parentNode,
          index = cardElement.getAttribute('data-cell');
      cardElement.parentNode.classList.add('open');
      cardElement.querySelector('.card__back').innerHTML = this.sequence[index].value;
      if(selectedCard) {
        if(this.sequence[index].value == selectedCard.value) {
          this.fixCards();
          this.closeAllCards();
        }
        else {
          setTimeout(() => {
            this.closeAllCards();
          }, 600);
        }
      }
      else {
        selectedCard = this.sequence[index];
      }
    }
  });
}

Board.prototype.closeAllCards = function() {
  selectedCard = '';
  Array.from(document.getElementsByClassName('card__wrapper')).forEach(i => {
    i.classList.remove('open');
  });
}

Board.prototype.fixCards = function() {
  Array.from(document.getElementsByClassName('card__wrapper open')).forEach(i => {
    i.classList.add('fixed');
  });
}

// CARD CLASS
let Card = function(value) {
  this.value = value;
}

// INIT
let board = new Board(),
    selectedCard = '';
board.generate();
