import './ScoreTable.sass';
import blackScreen from '../PageTransition/BlackScreenTransition';
import { changeFullScreenVideo } from '../FullScreenVideo/FullScreenVideo';
import sundtrack from '../Sound';
import startingPage from '../StartingPage/StartingPage';

const scoreTable = () => {
    return `<div id="score-table">
                <div class="scores">Web server for score table will be available in next updates...</div>
                <buttom id="play-again">Play again</button>
            </div>`;
}

const addPlayAgainEvent = () => {
    const playAgain = document.getElementById('play-again');
    playAgain.addEventListener('click', () => { restartGame() });
}

const restartGame = () => {
    blackScreen.toBlack();
    const blackScreenDom = document.getElementById('black-screen-in');
    const soundtrack = document.getElementById('soundtrack');
    blackScreenDom.addEventListener('animationend', () => { 
        cleanDom();
        soundtrack.pause();
        changeFullScreenVideo('kottans-end.mp4');
        const fullScreenVideo = document.getElementById('full-screen-video');
        fullScreenVideo.onended = function(e) {
            startingPage();
            sundtrack.change('starting-page.mp3');
        }
    });
}

const cleanDom = () => {
    document.getElementById('game-scene').remove();
    document.getElementById('battleground-stats').remove();
    document.getElementById('battleground-board').remove(); 
    document.getElementById('score-page').remove();
}

const render = () => {
    const scorePage = document.getElementById('score-page');
    const scorePageCongratulation = document.querySelector('.score-page-congratulation');
    scorePage.insertAdjacentHTML('beforeend', scoreTable());
    const scoreTableDom = document.getElementById('score-table');
    scorePageCongratulation.addEventListener('animationend', () => { 
        scoreTableDom.classList.add('score-table-visible');
    });
    addPlayAgainEvent();
}

export default render;
