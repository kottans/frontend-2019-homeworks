import RenderDifficultyMenu from './DifficultyMenu';
import GameOptions from './GameOptions';
import { changeFullScreenVideo } from '../FullScreenVideo/FullScreenVideo';
import BlackScreen from '../PageTransition/BlackScreenTransition';
import Sundtrack from '../Sound';

const StartingPage = () => {
  BlackScreen.fromBlack();
  Sundtrack.play();
  changeFullScreenVideo('planet.mp4', 'loop');
  RenderDifficultyMenu();
  GameOptions.render();
};

export default StartingPage;