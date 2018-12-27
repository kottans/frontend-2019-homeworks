import './DifficultyMenu.sass';
import MainPage from '../MainPage/MainPage';
import BlackScreen from '../PageTransition/BlackScreenTransition';

const game_difficulty_menu = () => {
    return `<div class="difficulty-menu">
                <button class="difficulty-name difficulty-disabled" value="easy">Easy</button>
                <button class="difficulty-name" value="normal">Normal</button>
                <button class="difficulty-name difficulty-disabled" value="hard">Hard</button>
            </div>`
}
  
const render = () => {
    const container = document.getElementById('container');
    return container.insertAdjacentHTML('beforeend', game_difficulty_menu());
}

const addClickEvent = () => {
    const buttons = document.querySelectorAll('.difficulty-name');
    buttons.forEach( button => {
        button.addEventListener('click', () => { applyDifficulty(button.value) });
    });
}

const applyDifficulty = (difficulty) => {
    pageTransitionEffect();
    const black_screen = document.getElementById('black-screen-in');
    const full_screen_video = document.getElementById('full-screen-video');
    full_screen_video.classList.add('full-screen-video-zoom');
    return black_screen.addEventListener('animationend', () => { 
           full_screen_video.classList.remove('full-screen-video-zoom');
           document.getElementById('full-screen-video').pause();
           document.getElementsByClassName('difficulty-menu')[0].remove();
           document.getElementById('game-options-button').remove(); 
           document.getElementById('game-options-menu').remove();
           MainPage();
    });
}

const pageTransitionEffect = () => {
    const menu = document.getElementsByClassName('difficulty-menu')[0];
    menu.classList.add('difficulty-menu-transition');
    BlackScreen.toBlack();
}

const RenderDifficultyMenu = () => {
    render();
    addClickEvent();
}

export default RenderDifficultyMenu;