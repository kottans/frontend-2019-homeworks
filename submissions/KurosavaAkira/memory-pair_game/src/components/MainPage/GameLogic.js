import { cardsData, resetCards } from './Cards';
import scorePage from '../ScorePage/ScorePage';

const MARGIN_LEFT = 50;
let pair = [];
let numberOfPairs = 0;
let cardZindex = 2;

const addClickEventToCards = () => {
    const battlegroundBoardField = document.querySelector('.battleground-board-field');
    battlegroundBoardField.addEventListener('click', (e) => { 
        const card = e.target.closest('.card');
        if (card === null) return;
        else {
            cardClick(card);
        } 
    });
}

const cardClick = (card) => {
    card.children[0].classList.add('card-content-show');
    pair.push({
        id : card.attributes.id.value, 
        img : cardsData[card.attributes.id.value - 1].image
    });
    checkPair();
}

const checkPair = () => {
    if (pair[1] == null) return
    else if (pair[0].img !== pair[1].img) hidePair();
    else if (pair[0].img === pair[1].img) correctPair();
}

const hidePair = () => {
    const card_1 = document.getElementById(pair[0].id);
    const card_2 = document.getElementById(pair[1].id);
    pair = [];
    setTimeout(() => {
        card_1.children[0].classList.remove('card-content-show');
        card_2.children[0].classList.remove('card-content-show');
    }, 500);    
}

const correctPair = () => {
    const card_1 = document.getElementById(pair[0].id);
    const card_2 = document.getElementById(pair[1].id);
    numberOfPairs += 1;
    pair = [];
    setTimeout(() => {
        if (numberOfPairs == 6) {
            resetGameVariables();
            showScorePage();
        } 
        card_1.children[0].classList.add('card-content-correct');
        card_2.children[0].classList.add('card-content-correct');
        card_1.children[0].classList.remove('card-content-show');
        card_2.children[0].classList.remove('card-content-show');
        card_1.children[0].addEventListener('transitionend', () => { 
            card_1.children[0].classList.add('card-content-correct-grayscale');
            card_2.children[0].classList.add('card-content-correct-grayscale');
        });
        //hideCorrectPair(card_1, card_2);
    }, 500);    
}

const hideCorrectPair = (card_1, card_2) => {
    //z-index style is not working :(
    card_1.children[0].style.zIndex = `${cardZindex++}`;
    card_1.children[0].style.marginLeft = `${MARGIN_LEFT + cardZindex * 10}px`;
    card_2.children[0].style.zIndex = `${cardZindex++}`;
    card_2.children[0].style.marginLeft = `${MARGIN_LEFT + cardZindex * 10}px`;
}

const showHideCards = () => {
    const cards = document.querySelectorAll('.card-content');
    const battlegroundBoard = document.getElementById('battleground-board'); 
    cards.forEach( card => {
        card.classList.add('card-content-show');
    });
    setTimeout(() => {
        battlegroundBoard.classList.remove('battleground-board-disable');
        addClickEventToCards();
        cards.forEach( card => {
            card.classList.remove('card-content-show');
        });
    }, 2000);
}

const showScorePage = () => {
    setTimeout(() => { scorePage('Well done!'); }, 500);
}

const resetGameVariables = () => {
    resetCards();
    pair = [];
    numberOfPairs = 0;
    cardZindex = 2;
}

const applyGameLogic = () => {
    setTimeout(() => { showHideCards(); }, 2000);
}

export default applyGameLogic;
