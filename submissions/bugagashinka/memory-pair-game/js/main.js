(function() {
  const MAX_FLIPP_CARDS = 2,
    SHOW_CARDS_TIME = 1000,
    WAIT_TIME_BEFORE_RESET = 2000;

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

  const gameBoard = document.querySelector('.board');

  gameBoard.addEventListener('click', ({ target }) => {
    let targetStyles = target.classList;
    if (
      !(flippedCardArr.length > 1) &&
      !targetStyles.contains('front-disabled') &&
      targetStyles.contains('front')
    ) {
      flippCardBackEnd(target.closest('.flipper'));
    }
  });

  gameBoard.addEventListener('transitionend', ({ target }) => {
    if (!target.classList.contains('hover')) {
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
      const frontCardStyles = card.querySelector('.front').classList;
      frontCardStyles.add('front-disabled');
    });
    if (pairCount == cardImgArr.length) {
      setTimeout(resetGame, WAIT_TIME_BEFORE_RESET);
    }
  }

  function cardPairCheck() {
    return (
      flippedCardArr[0].querySelector('.back img').src ==
      flippedCardArr[1].querySelector('.back img').src
    );
  }

  const cardNodeArr = Array.from(document.querySelectorAll('.flip-container'));

  const fullImgArray = shuffle(cardImgArr.concat(cardImgArr));
  const cardArr = cardNodeArr.map((cardNode, id) => {
    setCardImg(cardNode, fullImgArray[id++]);
  });

  function setCardImg(cardNode, imgPath) {
    let imgNode = document.createElement('img');
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
})();
