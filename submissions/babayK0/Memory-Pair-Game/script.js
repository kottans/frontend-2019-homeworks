const IMAGES = ["img/card1.png", "img/card2.png", "img/card3.png", "img/card4.png", "img/card5.png", "img/card6.png", "img/card7.png", "img/card8.png"];
const BACK_FACE_SRC = "img/cardbg.png";
const TIME = 550;
let openedCards = [];
let openedFront = [];
const BODY = document.querySelector("body");

function startGame() {
    const GAME_CONTAINER = document.createElement("div");
    GAME_CONTAINER.classList.add("game-container");

    function addBlockOfClick(){
        GAME_CONTAINER.classList.toggle("game-container_blocked");
    }
    function removeBlockOfClick(i) {
        setTimeout(() => {
            GAME_CONTAINER.classList.toggle("game-container_blocked");
        }, TIME * i);
    }

    let cards = IMAGES.concat(IMAGES);

    function creatingCards(cardSrc, i) {
        function creatingFrontAndBack() {
            const FRONT_FACE = document.createElement("img");
            FRONT_FACE.classList.add("front-face");
            FRONT_FACE.src = cardSrc;
            FRONT_FACE.setAttribute("id", 'front' + i);

            const BACK_FACE = document.createElement("img");
            BACK_FACE.classList.add("back-face");
            BACK_FACE.src = BACK_FACE_SRC;
            BACK_FACE.setAttribute("id", i);
            creatingCARD(FRONT_FACE, BACK_FACE);
        }

        function creatingCARD(FRONT_FACE, BACK_FACE) {
            const CARD = document.createElement("div");
            CARD.classList.add("card");
            CARD.setAttribute("id", 'card' + i);
            CARD.append(FRONT_FACE, BACK_FACE);
            GAME_CONTAINER.append(CARD);
        }
        creatingFrontAndBack();
    }

    function addEvent() {
        GAME_CONTAINER.addEventListener("click", function flipCard({target}) {
            let clicked = target;
            let card = document.getElementById("card" + (target.id));
            let front = document.getElementById("front" + (target.id))
            if (clicked.classList.value === "back-face" && openedCards.length < 2) {
                flip(card);
                openedCards.push(card);
                if (openedFront.length < 2) {
                    openedFront.push(front);
                }
            }
            if (openedFront.length === 2) {
                let [firstCard, secondCard] = openedFront;
                let checkSame = (firstCard.src === secondCard.src);
                let checkNotSame = (firstCard.id !== secondCard.id);
                setTimeout(() => {
                    if (checkSame && checkNotSame) {
                        addBlockOfClick();
                        removeBlockOfClick(1);
                        openedCards.forEach(element => {
                            element.classList.toggle("block");
                            if (document.getElementsByClassName("block").length === IMAGES.length * 2) {
                                setTimeout(() => {
                                    alert("You win!");
                                }, TIME);
                            }
                        });
                    } else {
                        openedCards.forEach(element => flip(element));
                    }
                    openedCards = [];
                    openedFront = [];
                }, TIME);
            }
            BODY.style.pointerEvents = 'auto';
        });
    }
    function flip(element){
        element.classList.toggle("flip");
    }
    function flipAll() {
        const allCards = GAME_CONTAINER.querySelectorAll(".card");
        allCards.forEach(element => {
            function flip(){
                element.classList.toggle("flip");
            }
            setTimeout(flip,TIME);
            setTimeout(flip,TIME * 4);
        });
    }

    cards.sort(() => 0.5 - Math.random())
    cards.forEach(creatingCards);
    addEvent();
    flipAll();
    BODY.append(GAME_CONTAINER);
    addBlockOfClick();
    removeBlockOfClick(4);
}

startGame();
