wrapper = document.querySelector( '.game-field__wrapper' );
let cardsPool = [  ];
let openedCards = [  ];
const imageArray = [
  { 'id' : 'fb',       'img' : 'img/fb.svg' },
  { 'id' : 'line',     'img' : 'img/line.svg' },
  { 'id' : 'skype',    'img' : 'img/skype.svg' },
  { 'id' : 'snap',     'img' : 'img/snap.svg' },
  { 'id' : 'tlg',      'img' : 'img/tlg.svg' },
  { 'id' : 'viber',    'img' : 'img/viber.svg' },
  { 'id' : 'weixin',   'img' : 'img/weixin.svg' },
  { 'id' : 'whatsapp', 'img' : 'img/whatsapp.svg' }
];
const data = [...imageArray, ...imageArray];
//создать value-блоков
function createCardField ( value ) {
  value.forEach( val => {
    wrapper.appendChild( val );
  } );
}
//создать поле из num карточек через fn createCard(num)
function createCard ( num ) {
  let tmpArr = [];
  for ( var i = 0; i < num; i++ ) {
    const card = document.createElement('div');
    const cardWrapper = document.createElement('div');
    const cardFront = document.createElement('div');
    const cardBack = document.createElement('div');
    card.classList.add('card');
    cardWrapper.classList.add('card__wrapper');
    cardFront.classList.add('card__front');
    cardBack.classList.add('card__back');
    card.appendChild(cardWrapper);
    cardWrapper.appendChild(cardFront);
    cardWrapper.appendChild(cardBack);
    tmpArr.push(card);
  }
  return tmpArr;

}
//перемешать массив
function shuffleImages () {

  var j, x, i;
  for (i = data.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = data[i];
    data[i] = data[j];
    data[j] = x;
  }
  return data;
}
// наполнить блоки 
function insertContentInCards() {
  cardBackArr = document.querySelectorAll('.card__back');
  let shuffledArray = new shuffleImages();
  cardBackArr.forEach((val, ind) => {
    val.style.backgroundImage = `url(${shuffledArray[ind].img})`;
    val.style.backgroundRepeat = 'no-repeat';
    val.style.backgroundPosition = 'center center';
    val.setAttribute('data-name', `${shuffledArray[ind].id}`)
  });
}
//игровая логика
function gameRules(val) {
  const cardFrontArray = document.querySelectorAll('.card__front');
  if (!event.target.classList.contains('card__front')) {
    console.log(event.target)
    return;
  }
  else {
    console.log(val);
    val.target.offsetParent.classList.toggle('card__wrapper--click');
    cardsPool.push(event.target.nextSibling);
    if (cardsPool.length === 2 && checkCardsPool(cardsPool)) {
      cardsPool.forEach(val => {
        val.offsetParent.offsetParent.classList.add('same-cards');
        openedCards.push(val.offsetParent.offsetParent);
      });
      cardsPool = [];
      
    }
    else if (cardsPool.length > 1 && checkCardsPool(cardsPool) !== true) {
      cardsPool.forEach(value => {
        setTimeout(() => {
          value.offsetParent.classList.remove('card__wrapper--click');
        }, 500);
      });
      cardsPool = [];
    }
  }
}
//если победа
function win() {
  if (openedCards.length == 16) {
    openedCards = [];
    document.querySelectorAll('.card').forEach(val => {
      wrapper.removeChild(val);
    });
    alert('Победа!');
  }
}
//открыть блоки на 2 секунды
function help() {
  setTimeout( () => {
    document.querySelectorAll('.card__wrapper').forEach(val => {
      val.classList.add('help-btn--click');
    })
  }, 300);
  setTimeout( () => {
      document.querySelectorAll('.card__wrapper').forEach(val => {
        val.classList.remove('help-btn--click');
      })
  }, 2300);
}
//проверка карт на идентичность
function checkCardsPool (arr) {
  return arr[0].dataset.name === arr[1].dataset.name;
}


wrapper.addEventListener( 'click', (val) => {
  gameRules(val);
  win();
} );

document.querySelector('.help-btn').addEventListener('click', function(){
  help();
} );

document.querySelector('.start-btn').addEventListener('click', function() {
  if ( this.classList.contains('active') ) {
    document.querySelectorAll('.card').forEach(val => {
      wrapper.removeChild(val);
    });
  }
  this.classList.add('active');
  setTimeout(()=>{
    help();
    createCardField(createCard(16));
    insertContentInCards();
  },500);
});
