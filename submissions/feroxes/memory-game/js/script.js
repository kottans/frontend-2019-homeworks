const game = document.getElementById('game');
let memoryCard;
let arr = ['1','2','3','4','5','6','7','8'];
function compareRandom(a, b) {
    return Math.random() - 0.5;
}
function renderGame() {

    for (let i = 0; i < 2; i++) {
        arr.sort(compareRandom);
        for(let j = 0; j <= 7; j++) {
            memoryCard = createDomElement('div', {className: 'memory-card'}, game);
            createDomElement('img', {className: 'hidden', src: `style/img/${arr[j]}.jpg`}, memoryCard);
        }
    }
    function createDomElement(tagName, config, tagToAdd) {
        let tag = document.createElement(tagName);
        Object.assign(tag, config)
        tagToAdd.appendChild(tag);
        return tag;
    };
};
renderGame();

let points = game.childElementCount;
let firstCard, secondCard;

let flippedCardList = [];
let removedCardsList = [];

game.addEventListener('click', handleCardClick);

function handleCardClick(e) {
    if (flippedCardList.length === 0) {
        showFlag(e);
    } else {
        hideOrRemoveFlag(e);
    }
};

function showFlag(e) {
    firstCard = e.target;
    firstCard.classList.add('shown');
    flippedCardList.push(firstCard);
};

function hideOrRemoveFlag(e) {
    secondCard = e.target;
    secondCard.classList.add('shown');
    flippedCardList.push(secondCard);

    if (firstCard === secondCard) {
        flippedCardList.splice(1, 1);
    }

    if (flippedCardList.length == 3) {
        alert("Do not rush!");
        for (let i = 0; i < flippedCardList.length; i++) {
            flippedCardList[i].classList.remove('shown');
        }
        flippedCardList = [];
        return;
    }

    if (flippedCardList[0].currentSrc === flippedCardList[1].currentSrc) {
        setTimeout(function () {
            flippedCardList.forEach((elem) => {
                elem.parentElement.classList.add('removed')
            })
            points -= 2;
            flippedCardList = [];
            removedCardsList.push(firstCard, secondCard);
            if (!points) {
                setTimeout(function () {
                    alert('Game over! Try again.');
                    restart();
                }, 10)
            }
        }, 500);
    } else {
        setTimeout(function () {
            flippedCardList[0].classList.remove('shown');
            flippedCardList[1].classList.remove('shown');
            flippedCardList = [];
        }, 500)
    }
};

function restart() {
    game.innerHTML = '';
    renderGame();
    points = game.childElementCount;
};