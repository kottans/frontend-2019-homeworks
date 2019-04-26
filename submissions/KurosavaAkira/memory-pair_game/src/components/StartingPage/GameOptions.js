import './GameOptions.sass';
import settings from '../Settings';

const gameOptions = {
    openMenuButton : function() {
        return `<button id="game-options-button">Game options</button>`
    },
    mainMenu : function() {
        return `<div id="game-options-menu">
                    <div class="game-options-checkboxs">
                        <h3>Options</h3>
                        <label class="game-options-label">
                            <input type="checkbox" class="checkbox" id="game-options-menu-sound" value="sound" checked>
                            <span>Sound</span>
                        </label>
                        <label class="game-options-label">
                            <input type="checkbox" class="checkbox" id="game-options-menu-fullscreen" value="fullscreen" checked>
                            Fullscreen
                        </label>
                    </div>
                    <div class="game-options-info">
                        <h3>Hotkeys</h3>
                        <p>M - Sound off/on</p>
                        <p>F - Fullscreen off/on</p>
                    </div>
                    <button id="game-options-menu-close">Close<button>
                </div>`
    },
    openMenuClickEvent : function() {
        const gameOptionsButton = document.getElementById('game-options-button');
        gameOptionsButton.addEventListener('click', () => { 
            this.applyMenuClickEven();
        });
    },
    closeMenuClickEvent : function() {
        const gameOptionsMenuClose = document.getElementById('game-options-menu-close');
        gameOptionsMenuClose.addEventListener('click', () => { 
            this.applyMenuClickEven();
        });
    },
    applyMenuClickEven : function() {
        const gameOptionsMenu = document.getElementById('game-options-menu');
        const difficultyMenu = document.querySelector('.difficulty-menu');
        const gameOptionsButton = document.getElementById('game-options-button');
        gameOptionsMenu.classList.toggle('game-options-menu-visible');
        difficultyMenu.classList.toggle('difficulty-menu-hide');
        gameOptionsButton.classList.toggle('difficulty-menu-hide');
    },
    checkboxClickEvent : function() {
        const checkboxes = document.querySelectorAll('.checkbox');
        checkboxes.forEach( checkbox => {
            checkbox.addEventListener('click', () => { this.applyCheckbox(checkbox.value) });
        });
    },
    applyCheckbox : function(checkbox) {
        return this.checkboxFunc(checkbox);
    },
    checkboxFunc : function(checkbox) {
        switch (checkbox) {
            case 'sound': return this.checkboxSound();
            case 'fullscreen': return this.checkboxFullscreen();
        }
    },
    checkboxSound : function() {
        settings.sound = !settings.sound;
        const soundtrack = document.getElementById('soundtrack');
        const fullScreenVideo = document.getElementById('full-screen-video');
        soundtrack.muted = !soundtrack.muted;
        fullScreenVideo.muted = !fullScreenVideo.muted;
    },
    checkboxFullscreen : function() {
        const isFullscreen = document.webkitCurrentFullScreenElement == null;
        settings.fullscreen = !settings.fullscreen;
        if (!(isFullscreen)) document.webkitCancelFullScreen();
        else document.documentElement.webkitRequestFullScreen();
    },
    setsettings : function() {
        document.getElementById('game-options-menu-sound').checked = settings.sound;
        document.getElementById('game-options-menu-fullscreen').checked = settings.fullscreen;
    },
    render : function() {
        const container = document.getElementById('container');
        container.insertAdjacentHTML('beforeend', this.openMenuButton() + this.mainMenu());
        this.setsettings();
        this.openMenuClickEvent();
        this.closeMenuClickEvent();
        this.checkboxClickEvent();
    },
}

export default gameOptions;
