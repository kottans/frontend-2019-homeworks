import './cards.sass';
import cardImages from './CardImages';

const NUMBER_OF_CARDS = 12;

let cards = [];
let cardsImgFinal = [];

class Card {
  constructor(x, y, image) {
    this.id = Card.id();
    this.x = x;
    this.y = y;
    this.image = image;
  }

  static id() {
    return cards.length + 1;
  }
}

const shuffleCardsImg = (cards) => {
    return cards.sort( () => Math.random() - 0.5) ;
}
//Сut off half of the cards to create a duplicate of each card
const cutHalfCardsImg = () => { 
    return cardImages.slice(0, NUMBER_OF_CARDS / 2);
}

const cloneCardsImg = () => {
    let gameCards = cutHalfCardsImg();
    for (let i = gameCards.length - 1; i >= 0; i--){
      gameCards.push(gameCards[i]);
    }
    return cardsImgFinal = gameCards;
}

const generateCards = () => {
  let x = 75;
  let y = 90;
  for (let i = 0; i < NUMBER_OF_CARDS; i++) {
    if (i === 6) x = 75;
    if (i >= 6) y = 210;
    x += 120;
    cards.push(new Card(x, y, cardsImgFinal[i]));
  }
}

const resetCardsForNextGame = () => {
  return cards = [];
}

const generateCardsHtml = () => {
  let htmlString = '';
  for (let i = 0; i < NUMBER_OF_CARDS; i++) {
    htmlString += `<div class="card" id="${cards[i].id}">
                      <div class="card-content" style="margin-left: ${cards[i].x}px; margin-top: ${cards[i].y}px">
                        <div class="card-front"></div>
                        <div class="card-back" style="background-image: url(static/images/card-images/${cards[i].image})"></div>
                      </div>
                    </div>`;
  }
  return htmlString;
}

const render = () => {
    shuffleCardsImg(cardImages);
    cutHalfCardsImg();
    cloneCardsImg();
    shuffleCardsImg(cardsImgFinal);
    generateCards();
    return generateCardsHtml();
}

export { render as cards, cards as cardsData, resetCardsForNextGame as resetCards };
