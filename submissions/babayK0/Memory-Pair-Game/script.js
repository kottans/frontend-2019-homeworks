const IMAGES = ["img/card1.png", "img/card2.png", "img/card3.png", "img/card4.png", "img/card5.png", "img/card6.png", "img/card7.png", "img/card8.png"];
const BACK_FACE_SRC = "img/cardbg.png";
const TIME = 550;
let openedCards = [];
let openedFront = [];
const BODY = document.querySelector("body");

function addBlockOfClick(){
	BODY.style.pointerEvents = 'none';
}
function removeBlockOfClick(i) {
	setTimeout(() => {
    	BODY.style.pointerEvents = 'auto';
	}, TIME * i);
}

function startGame() {
    const GAME_CONTAINER = document.createElement("div");
    GAME_CONTAINER.classList.add("game-container");
    let cards = IMAGES.concat(IMAGES);

    function creatingCards(cardSrc, i) {
        function creatingFF_BF() {
            const FRONT_FACE = document.createElement("img");
            FRONT_FACE.classList.add("front-face");
            FRONT_FACE.src = cardSrc;
            FRONT_FACE.setAttribute("id", 'front' + (i + 1));

            const BACK_FACE = document.createElement("img");
            BACK_FACE.classList.add("back-face");
            BACK_FACE.src = BACK_FACE_SRC;
            BACK_FACE.setAttribute("id", (i + 1));
            creatingCARD(FRONT_FACE, BACK_FACE);
        }

        function creatingCARD(FRONT_FACE, BACK_FACE) {
            const CARD = document.createElement("div");
            CARD.classList.add("card");
            CARD.setAttribute("id", 'card' + (i + 1));
            CARD.append(FRONT_FACE, BACK_FACE);
            GAME_CONTAINER.append(CARD);
        }
        creatingFF_BF();
    }

    function addEvent() {
        GAME_CONTAINER.addEventListener("click", function flipCard({target}) {
            let clicked = target;
            let card = document.getElementById("card" + (target.id));
            let front = document.getElementById("front" + (target.id))
            if (clicked.classList.value === "back-face" && openedCards.length < 2) {
                card.classList.toggle("flip");
                openedCards.push(card);
                if (openedFront.length < 2) {
                    openedFront.push(front);
                }
            }
            if (openedFront.length === 2) {
                let [firstCard, secondCard] = [openedFront[0], openedFront[1]];
                setTimeout(() => {
                    if (firstCard.src === secondCard.src && firstCard.id !== secondCard.id) {
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
                        openedCards.forEach(element => element.classList.toggle("flip"));
                    }
                    openedCards = [];
                    openedFront = [];
                }, TIME);
            }
            BODY.style.pointerEvents = 'auto';
        });
    }

    function flipAll() {
        const allCards = GAME_CONTAINER.querySelectorAll(".card");
        allCards.forEach(element => {
            setTimeout(() => {
                element.classList.toggle("flip");
            }, TIME);
        });
        allCards.forEach(element => {
            setTimeout(() => {
                element.classList.toggle("flip");
            }, TIME * 4);
        });
    }

    cards.sort(() => 0.5 - Math.random())
    cards.forEach(creatingCards);
    addEvent();
    flipAll();
    BODY.append(GAME_CONTAINER);

    removeBlockOfClick(4);
}

addBlockOfClick();
startGame();