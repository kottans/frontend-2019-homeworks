import './Countdown.sass';
import applyGameLogic from './GameLogic';

const container = document.getElementById('container');

let COUNTDOWN_NUMBER = 3;

const countdownHtml = () => {
    return `<div id="countdown">${COUNTDOWN_NUMBER}</div>`
}

const starCountdown = () => {
    const countdown = document.getElementById('countdown');
    let countdownInterval = setInterval(() => {
        if (countdown.innerHTML == 1) {
            clearInterval(countdownInterval);
            countdown.remove();
            applyGameLogic();
        }
        else countdown.innerHTML -= 1;
    }, 1000); 
    
}

const render = () => {
    container.insertAdjacentHTML('beforeend', countdownHtml());
    starCountdown();
}

export default render;
