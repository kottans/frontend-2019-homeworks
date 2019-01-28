import startingPage from './StartingPage/StartingPage';
import settings from './Settings';

const hotKeys = {
    fullscreen : function () {
        document.body.addEventListener('keydown', (e) => {
            const isKeyF = 70;
            const isFullscreen = document.webkitCurrentFullScreenElement == null;
            if ((e.key == 'f' || e.keyCode == isKeyF) && (e.target.nodeName == 'BODY')) {
                e.preventDefault();
                settings.fullscreen = !settings.fullscreen;
                const gameOptionsMenuFullscreen = document.getElementById('game-options-menu-fullscreen')
                if (gameOptionsMenuFullscreen) gameOptionsMenuFullscreen.checked = !gameOptionsMenuFullscreen.checked;
                if (!(isFullscreen)) document.webkitCancelFullScreen();
                else document.documentElement.webkitRequestFullScreen();
            }
        });
    },
    sound : function () {
        document.body.addEventListener('keydown', (e) => {
            const isKeyM = 77;
            if ((e.key == 'm' || e.keyCode == isKeyM) && (e.target.nodeName == 'BODY')) {
                e.preventDefault();
                const fullScreenVideo = document.getElementById('full-screen-video');
                const soundtrack = document.getElementById('soundtrack');
                const gameOptionsMenuSound = document.getElementById('game-options-menu-sound')
                soundtrack.muted = !soundtrack.muted;
                settings.sound = !settings.sound;
                if (fullScreenVideo) fullScreenVideo.muted = !fullScreenVideo.muted;
                if (gameOptionsMenuSound) gameOptionsMenuSound.checked = !gameOptionsMenuSound.checked;
            }
        });
    },
    introVideoSkipButton : function () {
        document.body.addEventListener('keydown', {
            handleEvent: function (e) {
                const isKeyEsc = 27;
                if ((e.key == 'Escape' || e.key == 'Esc' || e.keyCode == isKeyEsc) && (e.target.nodeName=='BODY')) {
                    e.preventDefault();
                    const introVideoMenu = document.getElementById('intro-video-menu');
                    const introVideoMenuSkip = document.getElementById('intro-video-menu-skip');
                    //check if intro video ended
                    if (typeof(introVideoMenu) != 'undefined' && introVideoMenu != null) {
                        introVideoMenu.remove();
                        introVideoMenuSkip.remove() 
                        startingPage();
                        document.body.removeEventListener(e.type, this, false);
                    } else document.body.removeEventListener(e.type, this, false);
                }
            }
        });
    },
    applyHotKeys : function () {
        this.introVideoSkipButton();
        this.sound();
        this.fullscreen();
    }
}

export default hotKeys;
