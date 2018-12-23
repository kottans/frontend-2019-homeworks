(function () {
    let activeElCount = 0;
    let activeIndex;
    let controller = 1;
    let lvl = 1;
    const maxLvl = 9;
    let done = 0;
    let currentAttempt = 0;
    let imgControl = 0;
    const startSound = new Audio('audio/start.mp3');
    const doneTwoSound = new Audio('audio/done2.mp3');
    const lostGameSound = new Audio('audio/lost.mp3');
    const winGameSound = new Audio('audio/win.mp3');
    const roundTime = 40;
    const timeForModal = 3;
    const timeForWin = 7;

    initControllers();

    const makeTimer = (time, container, cb) => {
        const timeContainer = document.querySelector(container);
        let timer = setInterval( () => {
            let nextTick = time - 1;
            if(nextTick) {
                time = nextTick;
                timeContainer.innerText = time;
            } else {
                if(!cb) {
                    showModal(false);
                } else {
                    cb();
                }
                clearInterval(timer);
            }
        }, 1000);

        return {
            cancel: () => clearInterval(timer),
        };
    };

    let timeForRound;

    document.addEventListener('keydown', function (e) {
        let enterKeyCode = 13;
        if (e.keyCode == enterKeyCode) {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('js-game__controller')) {
                const allLabels = document.querySelectorAll('.js-game__controller');
                allLabels.forEach(el => el.querySelector('.js-game__input').checked = false);
                activeElement.querySelector('.js-game__input').checked = true;
            }
            if (activeElement.classList.contains('js-card')) {
                openCard(activeElement);
            }
        }
    });

    function initControllers() {
        const button = document.querySelector('.js-game__button');
        button.addEventListener('click', startGame);
    }

    function startGame() {
        this.style.pointerEvents = 'none'
        const hiddenHeader = document.querySelector('.js-game__header__start');
        const showHeader = document.querySelector('.js-game__header__score');
        hiddenHeader.classList.add('is-active');
        showHeader.classList.add('is-active');
        startSound.play();
        startLevel(lvl);
    }

    function startLevel(lvl) {
        if (lvl === 1) {
            initCardsContainer();
            const controller = document.querySelector('.js-game__input:checked');
            if (controller) {
                const gameType = controller.getAttribute('value');
                imgControl = gameType;
            } else {
                imgControl = 1;
            }
        }
        const quantity = Math.pow(2, lvl);
        let arr = makeArr(quantity);
        const attemptContainer = document.querySelector('.js-game__attempt--record');
        attemptContainer.innerText = quantity * 2;
        arr = shuffleArr(arr);
        if(timeForRound) {
            timeForRound.cancel();
        }
        if(lvl <= 5) {
            if(lvl === 1) {
                timeForRound = makeTimer(roundTime * lvl, '.js-game__time');
            } else {
                timeForRound = makeTimer(roundTime * lvl + timeForModal, '.js-game__time');
            }
        } else {
            if(lvl === maxLvl) {
                showModal(true);
            } else {
                timeForRound = makeTimer(roundTime * (maxLvl - lvl) + timeForModal, '.js-game__time');
            }
        }
        resetAllCount();
        resetActiveCards(lvl);
        removeLastIndex();
        buildCards(arr, imgControl);
    }

    function buildCards(elementsArr, controller) {
        const list = document.querySelector('.js-game__cards');
        let columnCount;
        list.innerHTML = '';
        if (lvl < 5) {
            columnCount = lvl + 1;
        } else if (lvl === 5) {
            columnCount = 8;
        } else {
            columnCount = lvl + 4;
        }

        document.documentElement.style.setProperty('--count', columnCount);
        elementsArr.forEach(el => {
            const item = document.createElement('li');
            // item.tabIndex = 0;
            item.classList.add('game__card');
            let card;
            if (controller > 0) {
                card = buildCard(el, 1);
            } else {
                card = buildCard(el);
            }
            item.append(card);
            list.append(item);
        });
    }

    function buildCard(value, withImg) {
        const card = document.createElement('div');
        const cardContainer = document.createElement('div');
        const cardFlipper = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');
        card.classList.add('card', 'js-card');
        card.setAttribute('data-index', value);
        card.tabIndex = 0;
        cardContainer.classList.add('card__container');
        cardFlipper.classList.add('card__flipper');
        cardFront.classList.add('card__front');
        cardBack.classList.add('card__back');
        if (withImg) {
            const img = document.createElement('img');
            img.setAttribute('src', `img/${value}.jpg`);
            img.setAttribute('alt', 'test images');
            img.classList.add('card__img');
            cardBack.append(img);
        } else {
            cardBack.innerText = value;
        }
        cardFlipper.append(cardFront, cardBack);
        cardContainer.append(cardFlipper);
        card.append(cardContainer);
        return card;
    }

    function initCardsContainer() {
        const cardsContainer = document.querySelector('.js-game__cards');

        cardsContainer.addEventListener('click', openCard);
    }

    function openCard(e) {
        if (!controller) {
            return;
        }
        let target;
        if (e.target) {
            target = e.target;
            let checkOnCard;
            let checkOnCards;
            while (!checkOnCard) {
                checkOnCards = target.classList.contains('js-game__cards');
                if (checkOnCards) {
                    return;
                }
                target = target.parentElement;
                checkOnCard = target.classList.contains('js-card');
            }
        } else {
            if (e.classList.contains(('js-card'))) {
                target = e;
            } else {
                return;
            }
        }


        let index = target.getAttribute("data-index");
        let attempt = document.querySelector('.js-game__attempt--current');

        currentAttempt += 1;
        attempt.innerText = currentAttempt;
        activeElCount += 1;
        if (activeElCount <= 2) {
            if (target.classList.contains('is-active')) {
                return;
            } else {
                target.classList.add('is-active');
                if (activeIndex == index) {
                    done += 1;
                    target.classList.add('is-hide');
                    target.tabIndex = -1;
                    let lastElement = document.querySelector('.js-lastIndex');
                    if (!lastElement) {
                        target.classList.add('js-lastIndex');
                    } else {
                        lastElement.classList.add('is-hide');
                        lastElement.tabIndex = -1;
                    }
                    doneTwoSound.play();
                    removeLastIndex();
                    controller = 0;
                    setTimeout(function () {
                        resetActiveCards();
                    }, 500);
                } else {
                    activeIndex = index;
                    removeLastIndex();
                    target.classList.add('js-lastIndex');
                }
            }
        } else {
            resetActiveCards();
            removeLastIndex();
            activeIndex = index;
            target.classList.add('is-active', 'js-lastIndex');
            activeElCount += 1;
        }
    }

    function resetActiveCards() {
        activeElCount = 0;
        controller = 1;
        document.querySelectorAll('.js-card.is-active').forEach(el => {
            el.classList.remove('is-active');
        });
        checkLvl();
    }

    function removeLastIndex() {
        const lastElement = document.querySelector('.js-lastIndex');
        if (lastElement) {
            lastElement.classList.remove('js-lastIndex');
        }
    }

    function makeArr(quantity) {
        let res = [];
        let counter = 1;
        while (counter <= quantity) {
            res.push(counter, counter);
            counter += 1;
        }
        return res;
    }

    function shuffleArr(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x) ;
        return o;
    }

    function checkLvl() {
        if (done === Math.pow(2, lvl)) {
            lvl += 1;
            document.querySelector('.js-game__lvl__indicator').innerText = lvl;
            showModal(true);
            startLevel(lvl);
        }
    }

    function showModal(success_round) {
        const modal = document.querySelector('.js-modal');
        const modalText = document.querySelector('.js-modal__text');
        let count = 4;
        modal.classList.add('is-active');
        if (!success_round) {
            modalText.innerText = 'Sorry, but all time are spend, pls try again';
            lostGameSound.play();
            makeTimer(timeForModal, '.js-modal__seconds', () => {
                location.reload();
            });
        } else {
            if(success_round == 'win') {
                modalText.innerText = 'You win this memory game. You are our Hero! :)';
                winGameSound.play();
                makeTimer(timeForWin, '.js-modal__seconds', () => {
                    modal.classList.remove('is-active');
                    location.reload();
                });
            } else {
                modalText.innerText = 'You finish level, plz wait';
                makeTimer(timeForModal, '.js-modal__seconds', () => {
                    modal.classList.remove('is-active');
                });
            }

        }
    }

    function resetAllCount() {
        const workContainer = document.querySelector('.js-game__attempt--current');
        done = 0;
        currentAttempt = 0;
        activeIndex = 0;
        workContainer.innerText = currentAttempt;
    }

}());

