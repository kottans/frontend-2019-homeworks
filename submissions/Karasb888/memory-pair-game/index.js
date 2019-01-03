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

  function rebuildGameCards(nodes, attributes) {
    attributes.sort(function() {
      return 0.5 - Math.random()
    });
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].removeAttribute(ATRIBUTE_CARD);
      nodes[i].removeAttribute(ATTRIBUTE_CHECK);
      nodes[i].removeAttribute(ATTRIBUTE_OPEN_CARD);
      nodes[i].classList.remove(ANIMATION_CLASS);
      nodes[i].setAttribute(ATRIBUTE_CARD, attributes[i]);
    }
  };

  function pairChecking(array) {
    if (array.length === 2) {
      if (array[0].getAttribute(ATRIBUTE_CARD) === array[1].getAttribute(ATRIBUTE_CARD)) {
        countOpenPairs++;
        array[0].setAttribute(ATTRIBUTE_OPEN_CARD, ATTRIBUTE_OPEN_CARD);
        array[1].setAttribute(ATTRIBUTE_OPEN_CARD, ATTRIBUTE_OPEN_CARD);
        array.splice(0, 2);
        if (countOpenPairs === CARDS_MAX / 2) {
          setTimeout(gameRestart, ANIMATION_DURATION);
        }
      }
    } else if (array.length === 3) {
      array[0].classList.remove(ANIMATION_CLASS);
      array[1].classList.remove(ANIMATION_CLASS);
      array[0].removeAttribute(ATTRIBUTE_CHECK);
      array[1].removeAttribute(ATTRIBUTE_CHECK);
      array.splice(0, 2);
    }
  };

  function gameRestart() {
    alert('You win!');
    rebuildGameCards(CARDS, cardsAtributes);
    openCards = [];
  };

  const GAME_CONTAINER = document.getElementById('game');
  const CARDS = document.querySelectorAll('.flip-container');
  rebuildGameCards(CARDS, cardsAtributes);

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
