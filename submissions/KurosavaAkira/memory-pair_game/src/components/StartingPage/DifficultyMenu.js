import './DifficultyMenu.sass';
import mainPage from '../MainPage/MainPage';
import blackScreen from '../PageTransition/BlackScreenTransition';

const gameDifficultyMenu = () => {
    return `<div class="difficulty-menu">
                <button class="difficulty-name difficulty-disabled" value="easy">Easy</button>
                <button class="difficulty-name" value="normal">Normal</button>
                <button class="difficulty-name difficulty-disabled" value="hard">Hard</button>
            </div>`
}
  
const render = () => {
    const container = document.getElementById('container');
    return container.insertAdjacentHTML('beforeend', gameDifficultyMenu());
}

const addClickEvent = () => {
    const difficultyMenu = document.querySelector('.difficulty-menu');
    difficultyMenu.addEventListener('click', (e) => {
        switch (e.target.value) {
            case 'easy':
                applyDifficulty(e.target.value);
                break;
            case 'normal':
                applyDifficulty(e.target.value);
                break;
            case 'hard':
                applyDifficulty(e.target.value);
                break;
        }
    });
}

const applyDifficulty = (difficulty) => {
    pageTransitionEffect();
    const blackScreen = document.getElementById('black-screen-in');
    const fullScreenVideo = document.getElementById('full-screen-video');
    fullScreenVideo.classList.add('full-screen-video-zoom');
    return blackScreen.addEventListener('animationend', () => { 
           fullScreenVideo.classList.remove('full-screen-video-zoom');
           document.getElementById('full-screen-video').pause();
           document.querySelector('.difficulty-menu').remove();
           document.getElementById('game-options-button').remove(); 
           document.getElementById('game-options-menu').remove();
           mainPage();
    });
}

const pageTransitionEffect = () => {
    const menu = document.querySelector('.difficulty-menu');
    menu.classList.add('difficulty-menu-transition');
    blackScreen.toBlack();
}

const renderDifficultyMenu = () => {
    render();
    addClickEvent();
}

export default renderDifficultyMenu;
