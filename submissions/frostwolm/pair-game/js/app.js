const FLIP_DURATION = 600;

let clickedCards = [];
let cardsNum = 12;
let imgIDsArray = [];
let _checkNow = false;

init();

function init(){
    let gameContainer = document.querySelector('.game-container');
    let fragment = document.createDocumentFragment();

    //reset
    gameContainer.innerHTML = '';
    cardsNum = 12;
    gameContainer.removeEventListener('click', onCardClickHandler);

    for (var i = 0; i < cardsNum; i = i + 2) {
      imgIDsArray[i] = i + 1;
      imgIDsArray[i + 1] = i + 1;
    }
    imgIDsArray.sort(function() { return 0.5 - Math.random() });
    imgIDsArray.forEach(imgNum => {
      let flipContainer = document.createElement('div');
      flipContainer.classList.add('flip-container');
      //flipContainer.dataset.imgid = imgNum;
      let flipper = document.createElement('div');
      flipper.classList.add('flipper');
      let front = document.createElement('div');
      front.classList.add('front');
      let frontImg = document.createElement('img');
      frontImg.classList.add('card');
      frontImg.setAttribute('src', 'img/card-back.png');
      frontImg.dataset.imgid = imgNum;
      let back = document.createElement('div');
      back.classList.add('back');
      let backImg = document.createElement('img');
      backImg.classList.add('card');
      backImg.setAttribute('src', 'img/abstract-'+imgNum+'.png');

      back.appendChild(backImg);
      front.appendChild(frontImg);
      flipper.appendChild(front);
      flipper.appendChild(back);
      flipContainer.appendChild(flipper);
      fragment.appendChild(flipContainer);
    });
    gameContainer.appendChild(fragment);
    gameContainer.addEventListener('click', onCardClickHandler);
}

function onCardClickHandler(evt){
  if (evt.target.classList.contains('card')) {
    clickCard(evt.target);
  }
};

function clickCard(cardElement){
  if (_checkNow) {
    return;
  }
  flip(cardElement);
  if (clickedCards.length < 2) {
    if (clickedCards[0] !== cardElement) {
        clickedCards.push(cardElement);
    }
  }
  if (clickedCards.length == 2) {
    _checkNow = true;
    setTimeout(compareCards, 500);
  }
}

function compareCards() {
  if (clickedCards[0].dataset.imgid ==
      clickedCards[1].dataset.imgid) {
    clickedCards.forEach(cardElem => {
      hide(cardElem);
    });
    cardsNum = cardsNum - 2;
  }else{
    setTimeout(clickedCards.forEach(cardElem => {
      flip(cardElem);
    }), FLIP_DURATION + 100);
  }
  clickedCards = [];
  _checkNow = false;
  checkWin();
}

function checkWin(){
  if (cardsNum == 0) {
    alert('Win!!!');
    init();
  }
}

function flip(cardElement){
  searchParentByClass(cardElement, 'flip-container').classList.toggle('flip');
}

function hide(cardElement){
  searchParentByClass(cardElement, 'flipper').classList.add('hidden');
}

function searchParentByClass(elem, className){
  if (elem.parentNode === document.documentElement) {
    return null;
  }
  if (elem.parentNode.classList.contains(className)) {
    return elem.parentNode;
  } else {
    return searchParentByClass(elem.parentNode, className);
  }
}
