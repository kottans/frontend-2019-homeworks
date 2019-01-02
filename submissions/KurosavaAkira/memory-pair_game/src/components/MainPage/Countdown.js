import './Countdown.sass';
import ApplyGameLogic from './GameLogic';

const container = document.getElementById('container');

let countdown_number = 3;

const countdown_html = () => {
    return `<div id="countdown">${countdown_number}</div>`
}

const starCountdown = () => {
    const countdown = document.getElementById('countdown');
    let countdownInterval = setInterval(() => {
        if (countdown.innerHTML == 1) {
            clearInterval(countdownInterval);
            countdown.remove();
            ApplyGameLogic();
        }
        else countdown.innerHTML -= 1;
    }, 1000); 
    
}

const render = () => {
    container.insertAdjacentHTML('beforeend', countdown_html());
    starCountdown();
}

export default render;