import './GameOptions.sass';
import Settings from '../Settings';

const GameOptions = {
    open_menu_button : function() {
        return `<button id="game-options-button">Game options</button>`
    },
    main_menu : function() {
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
        const game_options_button = document.getElementById('game-options-button');
        game_options_button.addEventListener('click', () => { 
            this.applyMenuClickEven();
        });
    },
    closeMenuClickEvent : function() {
        const game_options_menu_close = document.getElementById('game-options-menu-close');
        game_options_menu_close.addEventListener('click', () => { 
            this.applyMenuClickEven();
        });
    },
    applyMenuClickEven : function() {
        const game_options_menu = document.getElementById('game-options-menu');
        const difficulty_menu = document.getElementsByClassName('difficulty-menu')[0];
        const game_options_button = document.getElementById('game-options-button');
        game_options_menu.classList.toggle('game-options-menu-visible');
        difficulty_menu.classList.toggle('difficulty-menu-hide');
        game_options_button.classList.toggle('difficulty-menu-hide');
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
        Settings.sound = Settings.sound == true ? false : true;
        const soundtrack = document.getElementById('soundtrack');
        const full_screen_video = document.getElementById('full-screen-video');
        soundtrack.muted = !soundtrack.muted;
        full_screen_video.muted = !full_screen_video.muted;
    },
    checkboxFullscreen : function() {
        Settings.fullscreen = Settings.fullscreen == true ? false : true;
        if(!(document.webkitCurrentFullScreenElement==null)) document.webkitCancelFullScreen();
        else document.documentElement.webkitRequestFullScreen();
    },
    setSettings : function() {
        document.getElementById('game-options-menu-sound').checked = Settings.sound;
        document.getElementById('game-options-menu-fullscreen').checked = Settings.fullscreen;
    },
    render : function() {
        const container = document.getElementById('container');
        container.insertAdjacentHTML('beforeend', this.open_menu_button() + this.main_menu());
        this.setSettings();
        this.openMenuClickEvent();
        this.closeMenuClickEvent();
        this.checkboxClickEvent();
    },
}

export default GameOptions;