'use strict';

const imagePath = [
    "img/angry.svg",
    "img/cold.svg",
    "img/cool.svg",
    "img/love.svg",
    "img/nerd.svg",
    "img/sick.svg",
]

const getDoubleSortedArray = (array) => {
    array = array.concat(array);
    return array.sort( () =>  0.5 - Math.random() );
}

const addImagesToCards = (imageArray) => {
    let cards = document.querySelectorAll('.card .back');

    cards.forEach( (card, index) => {
        let image = document.createElement('img');
        image.src = imageArray[index];
        image.alt = 'santa-image';

        card.appendChild(image);
    });
}

const flipCard = (card) => {
    card.classList.add('flip');
}
const unflipCard = (card) => {
    card.classList.remove('flip');
}

const hideCard = (card) => {
    card.classList.add('hide');
}

const unhideCard = (card) => {
    card.classList.remove('hide');
}

const compareImage = (cardArr) => {
    return (cardArr[0].getElementsByTagName('img')[0].src === cardArr[1].getElementsByTagName('img')[0].src) ? true : false; 
}

const resetGame = () => {
    userCount = 0;
    cardArray = [];
    allUserCards = 0;
    const sortedArray = getDoubleSortedArray(imagePath);

    document.querySelectorAll('.card').forEach( (card, index) => {
        card.getElementsByTagName('img')[0].src = sortedArray[index];
        unhideCard(card);
        unflipCard(card);
    });
}

const MAX_CARD_COUNT = 2,
      ALL_CARDS = imagePath.length * 2,
      DELAY_TIME = 1000;

let userCount = 0,
    cardArray = [],
    allUserCards = 0;


document.addEventListener('DOMContentLoaded', () => {
    addImagesToCards(getDoubleSortedArray(imagePath));

    document.querySelector('.card-container').addEventListener('click', (event) => {
        const card = event.target.parentElement;
        if (event.target.classList.contains('front') && userCount <= 2) {
            flipCard(card);
            userCount++;
            cardArray.push(card);
        }

        if (userCount == MAX_CARD_COUNT) {
            if (compareImage(cardArray)) {
                cardArray.forEach( (card) => {
                    hideCard(card);
                });
                allUserCards += userCount;
                userCount = 0;
                cardArray = [];
            } else {
                setTimeout(() => {
                    cardArray.forEach( (card) => {
                        unflipCard(card);
                    });
                    
                    userCount = 0;
                    cardArray = [];
                }, DELAY_TIME);
            }
        }

        if (allUserCards === ALL_CARDS) {
            setTimeout(() => {
                resetGame();
                alert('You Win');
                
            }, DELAY_TIME);
        }
    });
});