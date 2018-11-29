let game = document.getElementById('game');
let points = game.childElementCount;

let memoryCard = document.getElementsByClassName('memory-card');
let firstCard, secondCard;

let flippedCardList = [];
let removedCardsList = [];

for (let i = 0; i < points; i++) {
    memoryCard[i].addEventListener('click', letsPlay);
}

function letsPlay(e) {
    if (flippedCardList.length < 1) {
        showFlag(e);
    } else {
        hideFlag(e);
    }
}

// Show clicked card
function showFlag(e) {
    firstCard = e.target;
    firstCard.className = 'show';
    flippedCardList.push(firstCard);
};

//Hide or remove
function hideFlag(e) {
    secondCard = e.target;
    secondCard.className = 'show';
    flippedCardList.push(secondCard);

// Check for double click on the same card
    if (firstCard === secondCard) {
        alert('You have allready clicked on it.')
        flippedCardList.splice(1, 1);
    }
    ;

//Check if clicked thrice
    if (flippedCardList.length == 3) {
        alert("Do not rush!");
        for (let i = 0; i < flippedCardList.length; i++) {
            flippedCardList[i].className = 'hidden';
        }
        flippedCardList = [];
        return;
    }

//Check for correct pair of cards and remove it.
    if (flippedCardList[0].currentSrc === flippedCardList[1].currentSrc) {
        setTimeout(function () {
            flippedCardList[0].parentElement.className = 'removed';
            flippedCardList[1].parentElement.className = 'removed';
            --points;
            --points;
            flippedCardList = [];
            removedCardsList.push(firstCard, secondCard);
            if (!points) {
                setTimeout(function () {
                    alert('Game over! Try again.');
                    restart();
                }, 10)
            }
        }, 500);
// If not correct - hide it!
    } else {
        setTimeout(function () {
            flippedCardList[0].className = 'hidden';
            flippedCardList[1].className = 'hidden';
            flippedCardList = [];
        }, 500)
    }

};

// Restart game
function restart(){
    points = game.childElementCount;
    for (let i = 0; i < removedCardsList.length; i++){
        removedCardsList[i].className = 'hidden';
        removedCardsList[i].parentElement.className = 'memory-card';
    }
    removedCardsList = [];
};
