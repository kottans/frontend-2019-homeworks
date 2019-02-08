import './index.sass';

import deviceSupported from './components/DeviceSupport/DeviceSupport';
import hotKeys from './components/HotKeys';
import sundtrack from './components/Sound';
import { renderFullScreenVideo } from './components/FullScreenVideo/FullScreenVideo';
import renderIntroVideoMenu from './components/StartingPage/IntroVideoMenu';
import startingPage from './components/StartingPage/StartingPage';

if (deviceSupported()) {
    renderFullScreenVideo('kottans-intro.mp4', '');
    renderIntroVideoMenu();
    hotKeys.applyHotKeys();
    sundtrack.create('starting-page.mp3', true);
    
    const fullScreenVideo = document.getElementById('full-screen-video');
    
    fullScreenVideo.onended = function(e) {
        startingPage();
    }    
}


