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
    const bestTime = document.querySelector('.stopwatch__best');
    const currentTime = document.querySelector('.stopwatch__current');
    const FLIP_TIME = 1000;
    let startTime = 0;
    let startTimeInMilliseconds;
    let timeInterval;

    const startButtonHandler = ({target}) => {

        if (target.matches('.button-start')) {
            startSection.classList.add('hidden');
            cardsSection.classList.add('active');
            renderCardItems(imagesData);
            timeInterval = startStopWatch();
            checkBestTime();
            startTimeInMilliseconds = getStartDate();
        }

    };

    startSection.addEventListener('click', startButtonHandler);

    const getStartDate = () => {
        const currentDate = new Date();
        return currentDate.getTime();
    };

    const calculateGameDuration = (startDate) => {
        const endDate = new Date().getTime();
        const gameDuration = endDate - startDate;
        return gameDuration;
    };

    const displayDate = (time, element) => {

        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor(time / (1000 * 60));
        let seconds = Math.floor((time - minutes * 1000 * 60) / 1000);

        element.innerHTML = createFinalDateFormat(seconds, minutes, hours);

    };

    const createFinalDateFormat = (seconds, minutes, hours) => {

        const hoursString = hours ? (hours > 9 ? hours : "0" + hours) : "00",
              minutesString = minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00",
              secondsString = seconds > 9 ? seconds : "0" + seconds;

        const finalDateFormat = `${hoursString}:${minutesString}:${secondsString}`;

        return finalDateFormat;

    };

    const startStopWatch = () => {

        return setInterval(() => {
            startTime += FLIP_TIME;
            displayDate(startTime, currentTime);
        },FLIP_TIME);

    };

    const checkBestTime = () => {
        const previousSavedDate = localStorage.getItem('bestTime');

        if (previousSavedDate) {

            let convertedDate = Number(previousSavedDate);
            displayDate(convertedDate, bestTime);

        }
    };

    const checkBestTimeInLocalStorage = (gameDuration) => {

        const previousSavedDate = localStorage.getItem('bestTime');

        if (previousSavedDate) {

            let convertedDate = Number(previousSavedDate);

            if (gameDuration < convertedDate) {
                localStorage.setItem('bestTime', gameDuration);
            }

        }
        else {
            localStorage.setItem('bestTime', gameDuration);
        }

    };

    const clearStopWatch = () => {

        const gameDuration = calculateGameDuration(startTimeInMilliseconds);
        checkBestTimeInLocalStorage(gameDuration);
        clearTimeout(timeInterval);
        startTime = 0;
        currentTime.innerHTML = '00:00:00';

    };

    const renderCardItems = (imagesURLsArray) => {

        imagesURLsArray = imagesURLsArray.sort(function() { return 0.5 - Math.random() });

        let cardItemContent = '';
        imagesURLsArray.forEach(cardItem => {

            cardItemContent += `
                <div class="card-item" data-team="${cardItem.name}">
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
            }, FLIP_TIME);
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
                clearStopWatch();
            }, FLIP_TIME);
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

        }, FLIP_TIME);

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
            checkBestTime();
            timeInterval = startStopWatch();
        }

    };

    winModal.addEventListener('click', modalClickHandler);

};

document.addEventListener('DOMContentLoaded', initHandler = () => {
    initGame();
    document.removeEventListener('DOMContentLoaded', initHandler);
});
