(function () {
    let activeElCount = 0;
    let activeIndex;
    let controller = 1;
    let lvl = 1;
    const MAX_LVL = 9;
    let done = 0;
    let currentAttempt = 0;
    let imgControl = 0;
    const START_QUANTITY = 2;
    const START_SOUND = new Audio('audio/start.mp3');
    const DONE_TWO_SOUND = new Audio('audio/done2.mp3');
    const LOST_GAME_SOUND = new Audio('audio/lost.mp3');
    const WIN_GAME_SOUND = new Audio('audio/win.mp3');
    const ROUND_TIME = 40;
    const TIME_FOR_MODAL = 3;
    const TIME_FOR_AFK = 10000;
    let timeForRound;

    const createTimer = (time, cb) => {
            let timer = setInterval(() => {
                let nextTick = time - 1;
                if (nextTick !== -1) {
                    cb();
                    time = nextTick;
                } else {
                    clearInterval(timer);
                }
            }, 1000);

        return {
            cancel: () => clearInterval(timer),
        };
    };


    const setTimer = (time, container, cb) => {
        const timeContainer = document.querySelector(container);
        timeContainer.innerText = time;
        let timer = createTimer(time, () => {
            time -= 1;
            timeContainer.innerText = time;
            if(time == 0) {
                if (!cb) {
                    showModal('lost');
                } else {
                    cb();
                }
            }
        });
        return {
            cancel: () => timer.cancel()
        };
    };

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

    const controlPanelView  = (status) => {
        const startButton = document.querySelector('.js-game__button');
        const hiddenHeader = document.querySelector('.js-game__header__start');
        const showHeader = document.querySelector('.js-game__header__score');
        const gameContent = document.querySelector('.js-game__content');

        if(status == 'hide') {
            startButton.classList.add('is_disabled');
            hiddenHeader.classList.add('is_active');
            showHeader.classList.add('is_active');
            gameContent.classList.remove('is_disabled');
        } else {
            startButton.classList.remove('is_disabled');
            hiddenHeader.classList.remove('is_active');
            showHeader.classList.remove('is_active');
            gameContent.classList.add('is_disabled');
        }
    };

    const startGame = () => {
        controlPanelView('hide');
        START_SOUND.play();
        startLevel(lvl);
    };

    const initControllers = () => {
        const button = document.querySelector('.js-game__button');
        button.addEventListener('click', startGame);
    };

    const countAttempts = (container, number) => {
        let attempt = document.querySelector(container);
        if(number) {
            attempt.innerText = number;
        } else {
            currentAttempt += 1;
            attempt.innerText = currentAttempt;
        }
    };

    const startLevel = (lvl) => {
        if (lvl === 1) {
            initCardsContainer();
            const controller = document.querySelector('.js-game__input:checked');
            if (controller) {
                const game_type = controller.getAttribute('value');
                imgControl = game_type;
            } else {
                imgControl = 1;
            }
        }
        const quantity = Math.pow(START_QUANTITY, lvl);
        let arr = makeCardsArray(quantity);
        countAttempts('.js-game__attempt--record', quantity * 2);
        arr = shuffleArr(arr);
        if (timeForRound) {
            timeForRound.cancel();
        }
        if (lvl <= 5) {
            if (lvl === 1) {
                timeForRound = setTimer(ROUND_TIME * lvl, '.js-game__time');
            } else {
                timeForRound = setTimer(ROUND_TIME * lvl + TIME_FOR_MODAL, '.js-game__time');
            }
        } else {
            if (lvl === MAX_LVL) {
                showModal('next');
            } else {
                timeForRound = setTimer(ROUND_TIME * (MAX_LVL - lvl) + TIME_FOR_MODAL, '.js-game__time');
            }
        }
        resetAllCount();
        resetActiveCards(lvl);
        removeLastIndex();
        buildCards(arr, imgControl);
    };

    const buildCards = (elementsArr, controller) => {
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
            item.classList.add('game__card');
            let card;
            if (controller > 0) {
                card = buildCard(el, 'img');
            } else {
                card = buildCard(el);
            }
            item.append(card);
            list.append(item);
        });
    };

    const buildCard = (value, contentType) => {
        const card = document.createElement('div');
        card.classList.add('card', 'js-card');
        card.setAttribute('data-index', value);
        card.tabIndex = 0;
        const tempImg = `<img class="card__img" src="img/${value}.jpg" />`;
        card.innerHTML = `
            <div class="card__container">
                <div class="card__flipper">
                    <div class="card__front"></div>
                    <div class="card__back">
                        ${contentType === 'img' ? tempImg : value }
                    </div>
                </div>
            </div>  
        `;
        return card;
    };

    const initCardsContainer = () => {
        const cardsContainer = document.querySelector('.js-game__cards');

        cardsContainer.addEventListener('click', openCard);
    };

    const upperToCardElement = (event) => {
        let target;
        if (event.target) {
            target = event.target;
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
            return target;
        } else {
            if (event.classList.contains(('js-card'))) {
                target = event;
                return target;
            } else {
                return;
            }
        }
    };

    const openSameCard = (element) => {
        let cardDisabledPause = 500;
        done += 1;
        element.classList.add('is_hide');
        element.tabIndex = -1;
        let lastElement = document.querySelector('.js-last_index');
        if (!lastElement) {
            element.classList.add('js-last_index');
        } else {
            lastElement.classList.add('is_hide');
            lastElement.tabIndex = -1;
        }
        DONE_TWO_SOUND.play();
        removeLastIndex();
        controller = 0;
        setTimeout(function () {
            resetActiveCards();
        }, cardDisabledPause);
    };

    const openOneCard = (element) => {
        removeLastIndex();
        element.classList.add('js-last_index');
    };

    const closeAllCards = (element) => {
        resetActiveCards();
        removeLastIndex();
        element.classList.add('is_active', 'js-last_index');
        activeElCount += 1;
    };

    const openCard = (event) => {
        if (!controller) {
            return;
        }

        let currentElement = upperToCardElement(event);

        if(!currentElement) {
            return;
        }

        let index = currentElement.getAttribute("data-index");

        countAttempts( '.js-game__attempt--current');
        activeElCount += 1;
        if (activeElCount <= 2) {
            if (currentElement.classList.contains('is_active')) {
                return;
            } else {
                currentElement.classList.add('is_active');
                let index = currentElement.getAttribute("data-index");

                if(activeIndex == index) {
                    openSameCard(currentElement);
                } else {
                    activeIndex = index;
                    openOneCard(currentElement);
                }
            }
        } else {
            activeIndex = index;
            closeAllCards(currentElement);
        }
    };

    const resetActiveCards = () => {
        activeElCount = 0;
        controller = 1;
        document.querySelectorAll('.js-card.is_active').forEach(el => {
            el.classList.remove('is_active');
        });
        checkLvl();
    };

    const removeLastIndex = () => {
        const lastElement = document.querySelector('.js-last_index');
        if (lastElement) {
            lastElement.classList.remove('js-last_index');
        }
    };

    const makeCardsArray = (quantity) => {
        let res = [];
        let counter = 1;
        while (counter <= quantity) {
            res.push(counter, counter);
            counter += 1;
        }
        return res;
    };

    const shuffleArr = (arr) => {
        arr.sort(() => 0.5 - Math.random())
        return arr;
    }

    const checkLvl = () => {
        if (done === Math.pow(2, lvl)) {
            lvl += 1;
            document.querySelector('.js-game__lvl__indicator').innerText = lvl;
            showModal('next');
            startLevel(lvl);
        }
    }

    const reloadGame = () => {
        timeForRound.cancel();
        lvl = 1;
        removeLastIndex();
        resetActiveCards();
        resetAllCount();
        controlPanelView('show');
    };

    const showModal = (round_status) => {
        const modal = document.querySelector('.js-modal');
        const modalText = document.querySelector('.js-modal__text');
        const modalSeconds = document.querySelector('.js-modal__seconds');
        let count = 3;
        modalSeconds.innerText = count;
        modal.classList.add('is_active');
        if (round_status == 'lost') {
            modalText.innerText = 'Sorry, but all time are spend, pls try again';
            LOST_GAME_SOUND.play();
            setTimer(TIME_FOR_MODAL, '.js-modal__seconds', () => {
                reloadGame();
                modal.classList.remove('is_active');
            });
        } else {
            if (round_status == 'win') {
                modalText.innerText = 'You win this memory game. You are our Hero! :)';
                WIN_GAME_SOUND.play();
                setTimer(TIME_FOR_AFK, '.js-modal__seconds', () => {
                    modal.classList.remove('is_active');
                    reloadGame();
                });
            } else {
                modalText.innerText = 'You finish level, plz wait';
                setTimer(TIME_FOR_MODAL, '.js-modal__seconds', () => {
                    modal.classList.remove('is_active');
                });
            }
        }
    };

    const resetAllCount = () => {
        const workContainer = document.querySelector('.js-game__attempt--current');
        done = 0;
        currentAttempt = 0;
        activeIndex = 0;
        workContainer.innerText = currentAttempt;
    };

    initControllers();
}());

