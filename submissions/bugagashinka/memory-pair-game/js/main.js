(function(global) {
  const MAX_FLIPP_CARDS = 2,
    SHOW_CARDS_TIME = 1000,
    WAIT_TIME_BEFORE_RESET = 2000;

  const doc = global.document,
    win = global.window;

  let pairCount = 0,
    flippedCardArr = [],
    cardImgArr = [
      'images/1.jpg',
      'images/2.jpg',
      'images/3.jpg',
      'images/4.jpg',
      'images/5.jpg',
      'images/6.jpg',
    ];

  const gameBoard = doc.querySelector('.board');

  gameBoard.addEventListener('click', event => {
    let target = event.target.classList;
    if (!target.contains('front-disabled') && target.contains('front')) {
      flippCardBackEnd(event.target.parentElement);
    }
  });

  gameBoard.addEventListener('transitionend', e => {
    if (!e.target.classList.contains('hover')) {
      flippedCardArr.pop();
    }
  });

  function flippCardBackEnd(cardNode) {
    if (
      !cardNode.classList.contains('hover') &&
      flippedCardArr.length < MAX_FLIPP_CARDS
    ) {
      cardNode.classList.toggle('hover');
      flippedCardArr.push(cardNode);
    }

    if (flippedCardArr.length == MAX_FLIPP_CARDS) {
      if (cardPairCheck()) {
        pairCount++;
        disableCardPair();
      }
      flippedCardArr.forEach(flippCardFrontEnd);
    }
  }

  function flippCardFrontEnd(cardNode) {
    setTimeout(() => {
      cardNode.classList.remove('hover');
    }, SHOW_CARDS_TIME);
  }

  function disableCardPair() {
    flippedCardArr.forEach(card => {
      card.children[0].classList.add('front-disabled');
    });
    if (pairCount == cardImgArr.length) {
      setTimeout(resetGame, WAIT_TIME_BEFORE_RESET);
    }
  }

  function cardPairCheck() {
    return (
      flippedCardArr[0].children[1].children[0].src ==
      flippedCardArr[1].children[1].children[0].src
    );
  }

  const cardNodeArr = Array.prototype.slice.call(
    doc.querySelectorAll('.flip-container'),
  );

  const fullImgArray = shuffle(cardImgArr.concat(cardImgArr));
  const cardArr = cardNodeArr.map((cardNode, id) => {
    setCardImg(cardNode, fullImgArray[id++]);
  });

  function setCardImg(cardNode, imgPath) {
    let imgNode = doc.createElement('img');
    let cardBack = cardNode.querySelector('.back');
    imgNode.src = imgPath;
    imgNode.setAttribute('width', '100%');
    imgNode.setAttribute('height', '100%');
    cardBack.appendChild(imgNode);
  }

  function resetGame() {
    pairCount = 0;
    cardNodeArr.forEach(cardNode => {
      let cardFront = cardNode.querySelector('.front');
      cardFront.classList.remove('front-disabled');
    });
  }

  function shuffle(arr) {
    return arr.sort(function() {
      return 0.5 - Math.random();
    });
  }
})(this);
