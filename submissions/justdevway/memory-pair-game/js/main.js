(function () {
    let activeElCount = 0;
    let activeIndex;
    let controller = 1;
    let lvl = 1;
    let done = 0;
    let currentAttempt = 0;
    let imgControl = 0;
    const startSound = new Audio('audio/start.mp3');
    const doneTwoSound = new Audio('audio/done2.mp3');
    const lostGameSound= new Audio('audio/lost.mp3');

    initControllers();

    function initControllers() {
        const button = document.querySelector('.js-game__button');
        button.addEventListener('click', startGame);
    }

    function startGame() {
        const hiddenHeader = document.querySelector('.js-game__header__start');
        const showHeader = document.querySelector('.js-game__header__score');
        hiddenHeader.classList.add('isActive');
        showHeader.classList.add('isActive');
        startSound.play();
        startLevel(lvl);
        changeTime(300);
    }

    function startLevel(lvl) {
        if (lvl === 1) {
            initCardsContainer();
            const controller = document.querySelector('.js-game__input:checked');
            if(controller) {
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
        resetAllCount();
        resetActiveCards(lvl);
        removeLastIndex();
        buildCards(arr, imgControl);
    }

    function buildCards(elementsArr, controller) {
        const list = document.querySelector('.js-game__cards');
        let columnCount;
        list.innerHTML = '';
        switch (lvl) {
            case 1:
                columnCount = 2;
                break;
            case 2:
                columnCount = 3;
                break;
            case 3:
                columnCount = 4;
                break;
            case 4:
                columnCount = 5;
                break;
            case 5:
                columnCount = 8;
                break;
            default:
                columnCount = lvl + 4;
        }
        document.documentElement.style.setProperty('--count', columnCount);
        elementsArr.forEach( el => {
            const item = document.createElement('li');
            item.classList.add('game__card');
            let card;
            if(controller > 0) {
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
        // TODO: can improve with user keyboard, but need time
        // card.tabIndex = 0;
        card.setAttribute('data-index', value);
        cardContainer.classList.add('card__container');
        cardFlipper.classList.add('card__flipper');
        cardFront.classList.add('card__front');
        cardBack.classList.add('card__back');
        if(withImg) {
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

        cardsContainer.addEventListener('click', e => {
            if (!controller) {
                return;
            }
            let target = e.target;
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

            // get current element index
            let index = target.getAttribute("data-index");
            let attempt = document.querySelector('.js-game__attempt--current');
            currentAttempt += 1;
            attempt.innerText = currentAttempt;

            // check current element index with last element index
            activeElCount += 1;

            // check that active elements count <= 2
            if (activeElCount <= 2) {
                if (target.classList.contains('isActive')) {
                    return;
                } else {
                    target.classList.add('isActive');
                    if (activeIndex == index) {
                        done += 1;
                        target.classList.add('isHide');
                        let lastElement = document.querySelector('.js-lastIndex');
                        if (!lastElement) {
                            target.classList.add('js-lastIndex');
                        } else {
                            lastElement.classList.add('isHide');
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
                target.classList.add('isActive', 'js-lastIndex');
                activeElCount += 1;
            }
        });
    }

    function resetActiveCards() {
        activeElCount = 0;
        controller = 1;
        document.querySelectorAll('.js-card.isActive').forEach(el => {
            el.classList.remove('isActive');
        });
        checkLvl();
    }

    function removeLastIndex() {
        const lastElement = document.querySelector('.js-lastIndex');
        if (lastElement) {
            lastElement.classList.remove('js-lastIndex');
        }
    }

    function makeArr(q) {
        let res = [];
        let counter = 1;
        while (counter <= q) {
            res.push(counter);
            res.push(counter);
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
            showModal(1);
            startLevel(lvl);
        }
    }

    function showModal(command) {
        const modal = document.querySelector('.js-modal');
        const modalSeconds = document.querySelector('.js-modal__seconds');
        const modalText = document.querySelector('.js-modal__text');
        let count = 3;
        modal.classList.add('isActive');
        if(!command) {
            modalText.innerText = 'Sorry, but you have spent all time for this game, try again';
            startTimer('lost');
        } else {
            modalText.innerText = 'You have finished level, plz wait';
            startTimer();
        }

        function startTimer(command) {
            let timer = setTimeout(function sec() {
                if (count > 1) {
                    count -= 1;
                    modalSeconds.innerText = count;
                    timer = setTimeout(sec, 1000);
                } else {
                    if(command) {
                        location.reload()
                    } else {
                        modal.classList.remove('isActive');
                        modalSeconds.innerText = 3;
                    }
                }
            }, 1000);
        }
    }

    function resetAllCount() {
        const workContainer = document.querySelector('.js-game__attempt--current');
        done = 0;
        currentAttempt = 0;
        activeIndex = 0;
        workContainer.innerText = currentAttempt;
    }

    // TODO: can improve with make shoter time for every lvl that more than 5, but need time for it
    function  changeTime(time) {
        const timeContainer = document.querySelector('.js-game__time');
        timeContainer.innerText = time;

        let timer = setTimeout(function sec() {
            if (time > 0) {
                time -= 1;
                timeContainer.innerText = time;
                timer = setTimeout(sec, 1000);
            } else {
                showModal();
                clearTimeout(timer);
                lostGameSound.play();
            }
        });
    }
}());
