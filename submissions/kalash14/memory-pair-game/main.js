let initGame = () => {

    let imagesData = [
        {
            name: 'ManUnited',
            url: 'images/220px-Manchester_United_FC_crest.svg.png'
        },
        {
            name: 'Arsenal',
            url: 'images/1200px-Arsenal_FC.svg.png'
        },
        {
            name: 'Chelsea',
            url: 'images/1200px-Chelsea_FC.svg.png'
        },
        {
            name: 'Liverpool',
            url: 'images/1200px-Liverpool_FC.svg.png'
        },
        {
            name: 'ManCity',
            url: 'images/1200px-Manchester_City_FC_badge.svg.png'
        },
        {
            name: 'Tottenham',
            url: 'images/spurs-blue-no-text-300x300.png'
        }

    ];

    imagesData = imagesData.concat(imagesData);

    const startSection = document.querySelector('.start-section');
    const cardsSection = document.querySelector('.cards-section');
    const cardWrap = document.querySelector('.cards-wrap');
    const winModal = document.querySelector('.win-modal');
    let firstCard = null;
    let matchesCounter = 0;
    let blockCardWrap = false;
    let cardItems;
    let seconds = 0, minutes = 0, hours = 0, secondsRaw = 0, watchTimer;
    const bestTime = document.querySelector('.stopwatch__best');
    const currentTime = document.querySelector('.stopwatch__current');

    const startButtonHandler = ({target}) => {

        if (target.matches('.button-start')) {
            startSection.classList.add('hidden');
            cardsSection.classList.add('active');
            timer();
            checkBestTime();
            renderCardItems(imagesData);
        }

    };

    startSection.addEventListener('click', startButtonHandler);

    /* stopwatch init */

    let processDate = () => {
        seconds++;
        secondsRaw++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }

        currentTime.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        timer();
    };


    let timer = () => {
        watchTimer = setTimeout(processDate, 1000);
    };

    /* the best time check */

    const checkBestTime = () => {
        const previousSavedDate = localStorage.getItem('bestDate');

        if (previousSavedDate) {

            let convertedDate = Number(previousSavedDate);

            let minutes = Math.floor(convertedDate / 60);
            let seconds = convertedDate - minutes * 60;
            let hours = Math.floor(convertedDate / 3600);

            bestTime.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

        }
    };

    const clearStopWatch = () => {

        const previousSavedDate = localStorage.getItem('bestDate');

        if (previousSavedDate) {

            let convertedDate = Number(previousSavedDate);

            if (secondsRaw < convertedDate) {
                localStorage.setItem('bestDate', secondsRaw);
            }

        }
        else {
            localStorage.setItem('bestDate', secondsRaw);
        }

        seconds = 0;
        minutes = 0;
        hours = 0;
        secondsRaw = 0;

        currentTime.innerHTML = "00:00:00";
        clearTimeout(watchTimer);

    };

    let renderCardItems = (imagesURLsArray) => {

        let cardItemContent = '';
        imagesURLsArray.forEach(cardItem => {

            let randPosition = Math.floor(Math.random() * 12);
            cardItemContent += `
                <div class="card-item" data-team="${cardItem.name}" style="order: ${randPosition};">
                    <div class="card-item__thumb">
                        <img src="${cardItem.url}" alt="card-item-thumb">
                    </div>
                </div>
            `;

        });

        cardWrap.insertAdjacentHTML('beforeend', cardItemContent);
        cardItems = document.querySelectorAll('.card-item');

    };

    const cardWrapClickHandler = ({target}) => {

        if (target.matches('.card-item') && !target.matches('.flipped')) {
            flipCard(target);
        }

    };

    cardWrap.addEventListener('click', cardWrapClickHandler);

    const flipCard = (target) => {

        if (blockCardWrap) return;

        if (!firstCard) {
            firstCard = target;
        }
        else {
            matchCheck(target);
            checkFinishGame();
        }

        target.classList.add('flipped');

    };

    const matchCheck = (target) => {

        blockCardWrap = true;

        if (target.dataset.team === firstCard.dataset.team) {
            setTimeout(() => {
                firstCard.classList.add('hidden');
                target.classList.add('hidden');
                firstCard = null;
                blockCardWrap = false;
            }, 1000);
            matchesCounter++;
        }
        else {
            removeFlip();
        }

    };

    const checkFinishGame = () => {

        if (matchesCounter === 6) {
            setTimeout(() => {
                resetGame();
                winModal.classList.add('active');
            }, 1000);
            clearStopWatch();
        }

    };

    let removeFlip = () => {

        setTimeout(() => {

            cardItems.forEach(item => {
                if (item.classList.contains('flipped')) {
                    item.classList.remove('flipped');
                }
            });

            blockCardWrap = false;

        }, 1000);

        firstCard = null;

    };

    const resetGame = () => {
        cardWrap.innerHTML = "";
        firstCard = null;
        matchesCounter = 0;
    };

    const modalClickHandler = ({target}) => {

        if (target.matches('.button-newgame')) {
            renderCardItems(imagesData);
            winModal.classList.remove('active');
            timer();
            checkBestTime();
        }

    };

    winModal.addEventListener('click', modalClickHandler);

};

document.addEventListener('DOMContentLoaded', initHandler = () => {
    initGame();
    document.removeEventListener('DOMContentLoaded', initHandler);
});