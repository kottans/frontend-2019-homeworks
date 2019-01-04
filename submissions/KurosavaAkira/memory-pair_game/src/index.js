import './index.sass';

import DeviceSupported from './components/DeviceSupport/DeviceSupport';
import HotKeys from './components/HotKeys';
import Sundtrack from './components/Sound';
import { renderFullScreenVideo } from './components/FullScreenVideo/FullScreenVideo';
import RenderIntroVideoMenu from './components/StartingPage/IntroVideoMenu';
import StartingPage from './components/StartingPage/StartingPage';

if (DeviceSupported()) {
    renderFullScreenVideo('kottans-intro.mp4', '');
    RenderIntroVideoMenu();
    HotKeys.applyHotKeys();
    Sundtrack.create('starting-page.mp3', true);
    
    const full_screen_video = document.getElementById('full-screen-video');
    
    full_screen_video.onended = function(e) {
        StartingPage();
    }    
}


