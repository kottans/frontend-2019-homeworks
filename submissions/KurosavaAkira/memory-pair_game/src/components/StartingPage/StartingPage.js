import renderDifficultyMenu from './DifficultyMenu';
import gameOptions from './GameOptions';
import { changeFullScreenVideo } from '../FullScreenVideo/FullScreenVideo';
import blackScreen from '../PageTransition/BlackScreenTransition';
import sundtrack from '../Sound';

const startingPage = () => {
  blackScreen.fromBlack();
  sundtrack.play();
  changeFullScreenVideo('planet.mp4', 'loop');
  renderDifficultyMenu();
  gameOptions.render();
};

export default startingPage;
