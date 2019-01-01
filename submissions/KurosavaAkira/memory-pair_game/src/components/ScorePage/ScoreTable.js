import './ScoreTable.sass';
import BlackScreen from '../PageTransition/BlackScreenTransition';
import { changeFullScreenVideo } from '../FullScreenVideo/FullScreenVideo';
import Sundtrack from '../Sound';
import StartingPage from '../StartingPage/StartingPage';

const scoreTable = () => {
    return `<div id="score-table">
                <div class="scores">Web server for score table will be available in next updates...</div>
                <buttom id="play-again">Play again</button>
            </div>`;
}

const addPlayAgainEvent = () => {
    const play_again = document.getElementById('play-again');
    play_again.addEventListener('click', () => { restartGame() });
}

const restartGame = () => {
    BlackScreen.toBlack();
    const black_screen = document.getElementById('black-screen-in');
    const soundtrack = document.getElementById('soundtrack');
    black_screen.addEventListener('animationend', () => { 
        cleanDom();
        soundtrack.pause();
        changeFullScreenVideo('kottans-end.mp4');
        const full_screen_video = document.getElementById('full-screen-video');
        full_screen_video.onended = function(e) {
            StartingPage();
            Sundtrack.change('starting-page.mp3');
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
    const score_page = document.getElementById('score-page');
    const score_page_congratulation = document.getElementsByClassName('score-page-congratulation')[0];
    score_page.insertAdjacentHTML('beforeend', scoreTable());
    const score_table = document.getElementById('score-table');
    score_page_congratulation.addEventListener('animationend', () => { 
        score_table.classList.add('score-table-visible');
    });
    addPlayAgainEvent();
}

export default render;