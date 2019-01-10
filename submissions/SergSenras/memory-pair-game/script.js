let cardsImages = [
  {name: 'bulbasaur', src: 'img/bulbasaur.png'},
  {name: 'caterpie', src: 'img/caterpie.png'},
  {name: 'charmander', src: 'img/charmander.png'},
  {name: 'ekans', src: 'img/ekans.png'},
  {name: 'pidgey', src: 'img/pidgey.png'},
  {name: 'pikachu', src: 'img/pikachu.png'},
  {name: 'rattata', src: 'img/rattata.png'},
  {name: 'squirtle', src: 'img/squirtle.png'}
]

const DUPLICATE_AMOUNT = 2;
const WRAPPER = document.getElementById('container');

let src = []
   ,shuffleArray = []
   ,cardDeck = []
   ,comparedCards = [];

for(let i = 0; i < cardsImages.length; i++){
  let j = 0;
  while(j < DUPLICATE_AMOUNT ){
    src.push(cardsImages[i]);
    j++;
  }
}

shuffleArray = src.sort( () => 0.5 - Math.random());

let getCardTemplate = (name, src) => {
  return `<div class="card-container">
            <div class="card">
              <div class="back ${name}" style="background-image:url('${src}');"></div>
              <div class="front ${name}"></div>
            </div>
          </div>`
}

function initCards() {
  let markup = '';
  markup = shuffleArray.reduce( ( accumulator, currentValue ) => accumulator.concat(getCardTemplate(currentValue.name, currentValue.src)), '' );
  WRAPPER.insertAdjacentHTML('afterbegin',markup);
}

function showCardOnClick(event) {
  let selectedCard = event.target;
  let parentCardDiv = event.target.closest('.card-container');

  if(!parentCardDiv.classList.contains('isSelected')) {
    parentCardDiv.classList.add('isSelected');

    comparedCards.push(selectedCard);
    if(comparedCards.length == 2){
      WRAPPER.classList.add('disableDiv');
      checkCardsMatch();
    }
  } 
}

function checkCardsMatch() {
    setTimeout(function(){
      if(comparedCards[0].className == comparedCards[1].className) {
        comparedCards.forEach( x => x.closest('.card-container').classList.add('isMatch') );
      } else {
        comparedCards.forEach(function(el){
          el.closest('.card-container').classList.remove('isSelected');
        })
      }
      comparedCards = [];
      WRAPPER.classList.remove('disableDiv');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function(){
  initCards();

  WRAPPER.addEventListener('click', showCardOnClick);
})

