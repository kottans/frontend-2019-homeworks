var cardsImages = [
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

var src = []
   ,cardDeck = []
   ,comparedCards = [];

for(var i = 0; i < cardsImages.length; i++){
  var j = 0;
  while(j < DUPLICATE_AMOUNT ){
    src.push(cardsImages[i]);
    j++;
  }
}
// shuffle array
src = src.sort(function() { return 0.5 - Math.random() });

// display all cards on the board
function initCards() {
  var markup = '';
  for(var i = 0; i < src.length; i++){
    markup += `<div class="card-container">
                 <div class="card">
                   <div class="back `+ src[i].name +`" style="background-image:url('`+src[i].src+`');">
                   </div>
                   <div class="front `+ src[i].name +`">
                   </div>
                 </div>
               </div>`;
  }
  document.getElementById('container').insertAdjacentHTML('afterbegin',markup);
}

// show card on click
function showCard(event) {
  let selectedCard = event.target;
  let parentCardDiv = event.target.parentElement.parentElement;

  if(parentCardDiv.className.indexOf('isSelected') == -1) {
    parentCardDiv.classList.add('isSelected');

    comparedCards.push(selectedCard);
    if(comparedCards.length == 2){
      // disable click while check matching
      WRAPPER.classList.add('disableDiv');
      cardsMatch();
    }
  } 
}

// remove cards if they match
function cardsMatch() {
    setTimeout(function(){
      if(comparedCards[0].className == comparedCards[1].className) {
        // remove cards if they match
        comparedCards.forEach( x => x.parentElement.parentElement.style.visibility = 'hidden' );
      } else {
        // hide cards if it does not match
        comparedCards.forEach(function(el){
          el.parentElement.parentElement.classList.remove('isSelected');
        })
      }
      comparedCards = [];
      // enable click
      WRAPPER.classList.remove('disableDiv');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', function(){
  initCards();

  var container = document.getElementById('container');
  container.addEventListener('click', showCard);
})

