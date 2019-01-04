import { cards_data, resetCards } from './Cards';
import ScorePage from '../ScorePage/ScorePage';

const margin_left = 50;
let pair = [];
let number_of_pairs = 0;
let card_z_index = 2;

const addClickEventToCards = () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach( card => {
        card.addEventListener('click', () => { cardClick(card) });
    });
}

const cardClick = (card) => {
    card.children[0].classList.add('card-content-show');
    pair.push({
        id : card.attributes.id.value, 
        img : cards_data[card.attributes.id.value - 1].image
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
    number_of_pairs += 1;
    pair = [];
    setTimeout(() => {
        if (number_of_pairs == 6) {
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
    card_1.children[0].style.zIndex = `${card_z_index++}`;
    card_1.children[0].style.marginLeft = `${margin_left + card_z_index * 10}px`;
    card_2.children[0].style.zIndex = `${card_z_index++}`;
    card_2.children[0].style.marginLeft = `${margin_left + card_z_index * 10}px`;
}

const showHideCards = () => {
    const cards = document.querySelectorAll('.card-content');
    const battleground_board = document.getElementById('battleground-board'); 
    cards.forEach( card => {
        card.classList.add('card-content-show');
    });
    setTimeout(() => {
        battleground_board.classList.remove('battleground-board-disable');
        addClickEventToCards();
        cards.forEach( card => {
            card.classList.remove('card-content-show');
        });
    }, 2000);
}

const showScorePage = () => {
    setTimeout(() => { ScorePage('Well done!'); }, 500);
}

const resetGameVariables = () => {
    resetCards();
    pair = [];
    number_of_pairs = 0;
    card_z_index = 2;
}

const ApplyGameLogic = () => {
    setTimeout(() => { showHideCards(); }, 2000);
}

export default ApplyGameLogic;