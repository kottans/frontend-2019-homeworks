let clickedCards = [];
let cardsNum = 12;
let imgIDsArray = [];
let _checkNow = false;

init(cardsNum);

function init(){
    document.querySelector('.game-container').innerHTML = '';
    let fragment = document.createDocumentFragment();
    for (var i = 0; i < cardsNum; i = i + 2) {
      imgIDsArray[i] = i + 1;
      imgIDsArray[i + 1] = i + 1;
    }
    imgIDsArray.sort(function() { return 0.5 - Math.random() });
    imgIDsArray.forEach(imgNum => {
      let flipContainer = document.createElement('div');
      flipContainer.classList.add('flip-container');
      flipContainer.dataset.imgid = imgNum;
      let flipper = document.createElement('div');
      flipper.classList.add('flipper');
      let front = document.createElement('div');
      front.classList.add('front');
      let frontImg = document.createElement('img');
      frontImg.classList.add('card');
      frontImg.setAttribute('src', 'img/card-back.png')
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
    document.querySelector('.game-container').appendChild(fragment);
    document.querySelector('.game-container').addEventListener('click', evt => {
      if (evt.target.classList.contains('card')) {
        clickCard(evt.target);
      }
    });
}

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
  if (clickedCards[0].parentNode.parentNode.parentNode.dataset.imgid ==
      clickedCards[1].parentNode.parentNode.parentNode.dataset.imgid) {
    clickedCards.forEach(cardElem => {
      hide(cardElem);
    });
    cardsNum = cardsNum - 2;
  }else{
    clickedCards.forEach(cardElem => {
      flip(cardElem);
    });
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
  cardElement.parentNode.parentNode.parentNode.classList.toggle('flip');
}

function hide(cardElement){
  cardElement.parentNode.parentNode.classList.add('hidden');
}
