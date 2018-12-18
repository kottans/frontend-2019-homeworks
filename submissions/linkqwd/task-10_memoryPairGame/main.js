const pairGame = function () {
    const settings = {
        cardContent: 'images', // colors or images
        numberOfCardsToGuess: 2,
        numberOfCardPairs: 10,
        prewievDelay: 3000,
        animationDuration: 500
    }

    let openedCardsCounter = settings.numberOfCardsToGuess;
    let pairCounter = 0;
    let scores = 0;

    let DOM = {
        card: 'js-card',
        cardsHolder: 'js-cards-holder',
        openedCard: 'js-card-opened',
        noClickCard: 'js-card-no-click',
        guessedCards: 'js-card-guessed',
        scores: 'js-scores',
        scoresSelector: document.querySelector('.js-scores')
    }

    let cardsResources = {
        cardsColors: ['#e980a0', '#5880b5', '#a8804b', '#0080ff', '#dc8057', '#008000', '#ff7019', '#ca2b2c', '#edf906', '#26f906', '#f906b5', '#ffffff', '#2f1e3b', '#c700ff', '#0bd5cb', '#ff0700', '#2800ff', '#88b5a5'],
        cardsImages: ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg', 'pic9.jpg', 'pic10.jpg', 'pic11.jpg', 'pic12.jpg', 'pic13.jpg', 'pic14.jpg', 'pic15.jpg']
    }

    function toggleClass(DOMClass) {
        document.querySelectorAll(`.${DOM.card}`).forEach(element => {
            element.classList.toggle(DOMClass);
        });
    }

    function generateCard(index) {
        if (settings.cardContent === 'colors') {
            return `<div class="flip-container"><div class="flipper ${DOM.card} js-card-no-click" data-id="${index + 100}"><div class="front"></div><div class="back" style="background-color:${cardsResources.cardsColors[index]}"></div></div></div>`
        } else if (settings.cardContent === 'images') {
            return `<div class="flip-container"><div class="flipper ${DOM.card} js-card-no-click" data-id="${index + 100}"><div class="front"></div><div class="back" style="background-image: url(../piarGame/images/${cardsResources.cardsImages[index]})"></div></div></div>`
        }
    };

    function buildHTMLCards() {
        let cards = [];

        for (let i = 0; i < settings.numberOfCardPairs; i++) {
            for (let k = 0; k < settings.numberOfCardsToGuess; k++) {
                cards.push(generateCard(i));
            }
        }
        cards.sort(() => 0.5 - Math.random());
        document.querySelector(`.${DOM.cardsHolder}`).insertAdjacentHTML('beforeend', cards.join(''));
    }

    function makePreview(delay, fn) {
        return new Promise((resolve) => setTimeout(() => {
            if (fn) fn();
            resolve();
        }, delay));
    }

    makePreview(settings.animationDuration, () => toggleClass(DOM.openedCard))
    .then(() => makePreview(settings.prewievDelay, () => toggleClass(DOM.openedCard)))
    .then(() => makePreview(settings.animationDuration, () => toggleClass(DOM.noClickCard)));
    
    function checkPair () {
        const openedCards = document.querySelectorAll(`.${DOM.openedCard}`);
        let iDsOfOpenedCards = [...openedCards].map((el) => +el.dataset.id);
        let isIDsEqual = iDsOfOpenedCards.reduce((stack, value) => (stack === value) ? stack = value : stack = 0);

        setTimeout(() => {
            if (isIDsEqual) {
                openedCards.forEach((card) => card.classList.add(DOM.guessedCards));
                scores += 5;
                pairCounter++;
                checkEndOfCards();
            } else {
                scores -= 5;
            }

            DOM.scoresSelector.textContent = scores;
            openedCards.forEach((card) => card.classList.remove(DOM.openedCard));
            openedCardsCounter = settings.numberOfCardsToGuess;
        }, 500);
    }

    function checkEndOfCards() {
        if (pairCounter === settings.numberOfCardPairs) {
            const link = document.createElement('a');
            link.setAttribute('class', 'link');
            link.setAttribute('href', '/piarGame');
            document.querySelector(`.${DOM.cardsHolder}`).appendChild(link).innerHTML = `Your result is: <b>${scores}</b> <br> <b>Click to play again</b>`;
        }
    }

    function setupCardClick() {
        function cardClick(event) {
            let card = event.target.closest(`.${DOM.card}`);

            if (card && openedCardsCounter) {
                card.classList.add(DOM.openedCard)
                openedCardsCounter--;
                if (openedCardsCounter === 0) checkPair();
            }
        }

        document.querySelector(`.${DOM.cardsHolder}`).addEventListener('click', cardClick);
    }

    buildHTMLCards();
    setupCardClick();
}

pairGame();