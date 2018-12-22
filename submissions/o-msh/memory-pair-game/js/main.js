const flipClassName = "flipped";
const delay = 1000;
const imgs = [
    "img/santa_christmas_emoji_cool_sunglasses.png",
    "img/santa_christmas_emoji_dribble_silly.png",
    "img/santa_christmas_emoji_love.png",
    "img/santa_christmas_emoji_nerd_smart.png",
    "img/santa_christmas_emoji_sleep_tired.png",
    "img/santa_christmas_emoji_wink_tongue.png"
];
const getWinnerMessage = () => "<div class='winner'>Congratulations!<br><button>New Game</button><div class='celebration_gif'><iframe src='https://giphy.com/embed/itDBteCsTFSVO' width='100%' height='100%' frameBorder='0' class='giphy-embed'></iframe><p><a href='https://giphy.com/gifs/girlfriend-test-pregnancy-itDBteCsTFSVO'></a></p></div></div>";
let container;
let openedCards = [];
let flipState = false;

const handlerFlip = e => {
    if (flipState) return;
    let card = e.target.parentNode;
    if (card.matches(".card")) {
        if (!card.classList.contains(flipClassName)) {
            let src = card.querySelector("img").getAttribute("src");
            card.classList.add(flipClassName);
            openedCards.push({ card, src });
            checkCoincidence();
        }
    } else if (card.matches(".winner")) {
        prepareGameField();
        fillGameField();
    }
};

const checkCoincidence = () => {
    let cardsCount = openedCards.length;
    if (cardsCount === 2) {
        changeFlipState();
        if (openedCards[0].src === openedCards[1].src) {
            hideCoincidence();
        } else {
            hideFlipped();
        }
        setTimeout(() => {
            openedCards = [];
            changeFlipState();
            checkForWin();
        }, delay);
    }
};

const hideCoincidence = () => {
    setTimeout(() => {
        openedCards.forEach(({ card }) => {
            card.classList.remove(flipClassName);
            card.classList.add("hidden");
        });
    }, delay);
};

const changeFlipState = () => flipState = !flipState;

const hideFlipped = () => {
    setTimeout(() => {
        openedCards.forEach(({ card }) => {
            card.classList.toggle(flipClassName);
        });
    }, delay);
};

const checkForWin = () => {
    if (container.querySelectorAll(".hidden").length === imgs.length * 2) {
        container.innerHTML = getWinnerMessage();
    }
};

const createCards = () => {
    let fragment = document.createDocumentFragment();
    let images = imgs;
    images = images.concat(images);
    images.sort(function () { return 0.5 - Math.random() });
    for (let i = 0; i < images.length; i++) {
        let card = document.createElement("div");
        let front_side = document.createElement("div");
        let back_side = document.createElement("img");
        back_side.setAttribute("src", images[i]);
        card.classList.add("card");
        card.dataset.item = i;
        front_side.classList.add("card_side", "front");
        back_side.classList.add("card_side", "back");
        card.appendChild(front_side);
        card.appendChild(back_side);
        fragment.appendChild(card);
    };
    return fragment;
};

const prepareGameField = () => {
    container = document.querySelector(".container");
    container.innerHTML = "";
};

const fillGameField = () => {
    container.appendChild(createCards());
};

const startGame = () => {
    prepareGameField();
    fillGameField();
    container.addEventListener("click", handlerFlip);
};

window.onload = () => {
    startGame();
};
