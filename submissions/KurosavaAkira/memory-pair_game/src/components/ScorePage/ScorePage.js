import Sundtrack from '../Sound';
import CongratulationSlide from './CongratulationSlide';
import ScoreTable from './ScoreTable';

const ScorePage = (slide_text) => {
    Sundtrack.change('score-page.mp3');
    CongratulationSlide(slide_text);
    ScoreTable();
};

export default ScorePage;