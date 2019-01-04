document.addEventListener('DOMContentLoaded', function() {
  const CARDS_MAX = 16;
  var cardsAtributes = ['spanch1', 'spanch2', 'spanch3', 'spanch4', 'spanch5', 'spanch6', 'spanch7', 'spanch8'];
  cardsAtributes = cardsAtributes.concat(cardsAtributes);
  const ATRIBUTE_CARD = 'card';
  const ATTRIBUTE_OPEN_CARD = 'open';
  const ATTRIBUTE_CHECK = 'self';
  const ANIMATION_CLASS = 'flip';
  const ANIMATION_DURATION = 600;
  var countOpenPairs = 0;
  var openCards = [];

  const GAME_CONTAINER = document.getElementById('game');
  var allCards = [];

  for (var i = 0; i < CARDS_MAX; i++) {
    let flipContainer = document.createElement('div');
    flipContainer.classList.add('flip-container', 'game__card');
    allCards.push(flipContainer);
    let flipper = document.createElement('div');
    flipper.classList.add('flipper');
    let front = document.createElement('div');
    front.classList.add('front');
    let back = document.createElement('div');
    back.classList.add('back');
    flipContainer.appendChild(flipper);
    flipper.appendChild(front);
    flipper.appendChild(back);
    GAME_CONTAINER.appendChild(flipContainer);
  }
  rebuildGameCards(allCards, cardsAtributes);


  function rebuildGameCards(nodes, attributes) {
    attributes.sort(function() {
      return 0.5 - Math.random()
    });
    nodes.forEach(function(item, i) {
      item.removeAttribute(ATRIBUTE_CARD);
      item.removeAttribute(ATTRIBUTE_CHECK);
      item.removeAttribute(ATTRIBUTE_OPEN_CARD);
      item.classList.remove(ANIMATION_CLASS);
      item.setAttribute(ATRIBUTE_CARD, attributes[i]);
    });
  }

  function pairChecking(cards) {
    if (cards.length === 2) {
      if (cards[0].getAttribute(ATRIBUTE_CARD) === cards[1].getAttribute(ATRIBUTE_CARD)) {
        countOpenPairs++;
        cards[0].setAttribute(ATTRIBUTE_OPEN_CARD, ATTRIBUTE_OPEN_CARD);
        cards[1].setAttribute(ATTRIBUTE_OPEN_CARD, ATTRIBUTE_OPEN_CARD);
        cards.splice(0, 2);
        if (countOpenPairs === CARDS_MAX / 2) {
          setTimeout(gameRestart, ANIMATION_DURATION);
        }
      }
    } else if (cards.length === 3) {
      cards[0].classList.remove(ANIMATION_CLASS);
      cards[1].classList.remove(ANIMATION_CLASS);
      cards[0].removeAttribute(ATTRIBUTE_CHECK);
      cards[1].removeAttribute(ATTRIBUTE_CHECK);
      cards.splice(0, 2);
    }
  };

  function gameRestart() {
    alert('You win!');
    rebuildGameCards(allCards, cardsAtributes);
    openCards = [];
  };

  GAME_CONTAINER.addEventListener('click', function(e) {
    let clickedCard = e.target.closest('.flip-container');

    if (clickedCard.getAttribute(ATTRIBUTE_OPEN_CARD) === null && clickedCard.getAttribute('self') === null) {
      clickedCard.setAttribute(ATTRIBUTE_CHECK, ATTRIBUTE_CHECK);
      clickedCard.classList.add(ANIMATION_CLASS);
      openCards.push(clickedCard);
      pairChecking(openCards);
    }
  });
});
