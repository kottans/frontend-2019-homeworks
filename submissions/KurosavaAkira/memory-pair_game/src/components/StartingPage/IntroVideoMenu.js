import './IntroVideoMenu.sass';
import settings from '../Settings';

const introVideoMenuHTML = () => {
    return `<div id="intro-video-menu">
                <button class="intro-video-menu-box" value="sound">Sound</button>
                <button class="intro-video-menu-box" value="screen">Full Screen</button>
                <button class="intro-video-menu-box" value="hide">Hide</button>
            </div>`
}

const introVideoMenuSkipHTML = () => {
    return `<div id="intro-video-menu-skip">
                Press ESC to skip
            </div>`
}

const addClickEvent = () => {
    const buttons = document.querySelectorAll('.intro-video-menu-box');
    buttons.forEach( button => {
        button.addEventListener('click', () => { applyButton(button.value) });
    });
}
//remove menu after it hides
const removeMenuAfterHide = () => {
    const introVideoMenu = document.getElementById('intro-video-menu');
    const introVideoMenuSkip = document.getElementById('intro-video-menu-skip');
    introVideoMenu.addEventListener('animationend', () => { 
        introVideoMenu.remove() 
        introVideoMenuSkip.remove() 
    });
}

const applyButton = (button) => {
    return buttonsFunc(button);
}

const buttonsFunc = (button) => {
    switch (button) {
        case 'sound': return buttonSound();
        case 'screen': return buttonScreen();
        case 'hide': return buttonHide();
    }
} 

const buttonSound = () => {
    const buttonSound = document.querySelector('.intro-video-menu-box');
    buttonSound.classList.toggle('intro-video-menu-box-active');
    const fullScreenVideo = document.getElementById('full-screen-video');
    settings.sound = !settings.sound;
    const soundtrack = document.getElementById('soundtrack');
    soundtrack.muted = !soundtrack.muted;
    if(fullScreenVideo.muted) fullScreenVideo.muted = false;
    else fullScreenVideo.muted = true;
}

const buttonScreen = () => {
    const buttonSound = document.getElementsByClassName('intro-video-menu-box')[1];
    const isFullscreen = document.webkitCurrentFullScreenElement == null;
    buttonSound.classList.toggle('intro-video-menu-box-active');
    settings.fullscreen = !settings.fullscreen;
    if(!(isFullscreen)) document.webkitCancelFullScreen();
    else document.documentElement.webkitRequestFullScreen();
}

const buttonHide = () => {
    const introVideoMenu = document.getElementById('intro-video-menu');
    introVideoMenu.classList.add('intro-video-menu-hide-button');
    introVideoMenu.addEventListener('animationend', () => { introVideoMenu.remove() });
}

const render = () => {
    const container = document.getElementById('container');
    return container.insertAdjacentHTML('beforeend', introVideoMenuHTML() + introVideoMenuSkipHTML());
}

const RenderIntroVideoMenu = () => {
    render();
    addClickEvent();
    removeMenuAfterHide();
}

export default RenderIntroVideoMenu;
