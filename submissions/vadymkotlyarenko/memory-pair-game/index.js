var frontCardsImgs = ["img/AtleticoM.png", 
    "img/Barcelona.png", 
    "img/Bavaria.png", 
    "img/BorussiaD.png", 
    "img/DynamoK.png", 
    "img/Liverpool.png",
    "img/ManchesterCity.png", 
    "img/Napoli.png"];
const BACK_CARD_ING = "img/uefa.png"
const START_TIMEOUT = 1800;
const NOT_RIGHT_TIMEOUT = 600;
var winCounter = 0;
var checkCards = [];
var cards = {};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var init = function(){
    createCards();
    document.getElementById("maincontainer").addEventListener("click", onCardClick);
    setTimeout(closeAllCard, START_TIMEOUT);
}

function createCards() {
    let maincontainer = document.getElementById("maincontainer");
    let cardsImgs = shuffleArray(frontCardsImgs.concat(frontCardsImgs));
    cardsImgs.forEach(cardFrontImg => {
        maincontainer.append(getCard(getSideOfCard("front", cardFrontImg), getSideOfCard("back", BACK_CARD_ING)));
    });
}

function getSideOfCard(side, img) {
    let sideOfCard = document.createElement("img");
    sideOfCard.src = img;    
    sideOfCard.classList.add("the" + side);
    sideOfCard.dataset.item = img;
    return sideOfCard;
}

function getCard(front, back) {
    let card = document.createElement("div");
    card.classList.add("thecard");
    card.append(front, back);
    return card;
}

function onCardClick(e){
    if (e.target.parentElement.tagName !== "DIV" || checkCards.length === 2) {
        return;
    }
    let selectedCard = e.target.parentElement;   
    if(!selectedCard.classList.contains("win") && checkCards.length <= 2) {
        selectedCard.classList.remove("flip");
        checkCards.push(selectedCard);
        if (checkCards.length === 2) {
            checkRight();
        }
    } 
}

function checkRight() {
    checkCards[0].firstElementChild.dataset.item === checkCards[1].firstElementChild.dataset.item 
        ? right() 
        : setTimeout(notRight, NOT_RIGHT_TIMEOUT);
}

function right() {
    checkCards.forEach(card => {
        card.classList.add("win");
    });
    winCounter++;
    if (winCounter === frontCardsImgs.length) {
        alert("WIN!!!");
    }
    checkCards = [];
}

function notRight() {
    checkCards.forEach(card => {
        card.classList.add("flip");
    });
    checkCards = [];
}

function closeAllCard(){
    let cards = document.getElementsByClassName("thecard");
    for (let index = 0; index < cards.length; index++) {
        cards[index].classList.add("flip");
    }
}

init();