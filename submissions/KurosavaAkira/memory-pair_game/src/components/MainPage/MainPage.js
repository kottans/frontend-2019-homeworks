//import './MainPage.sass';
import BlackScreen from '../PageTransition/BlackScreenTransition';
import Sundtrack from '../Sound';
import RenderGameScene from './GameScene';
import RenderBattlegroundStats from './BattlegroundStats';
import RenderBattlegroundBoard from './BattlegroundBoard';
import RenderDialogBox from './DialogBox';

const MainPage = () => {
    BlackScreen.fromBlack();
    Sundtrack.change('main-page.mp3');
    RenderGameScene();
    RenderBattlegroundStats();
    RenderBattlegroundBoard();
    const dialog_text = "Hey, sergeant! You are in the alpha version of the game,<br>so you can't save a princess or lost your life.<br>She will wait for you in next update.";
    RenderDialogBox('captain-sad.png', 'capitan', dialog_text);
};

export default MainPage;