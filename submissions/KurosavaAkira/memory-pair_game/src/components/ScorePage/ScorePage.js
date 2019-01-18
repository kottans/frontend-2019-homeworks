import sundtrack from '../Sound';
import congratulationSlide from './CongratulationSlide';
import scoreTable from './ScoreTable';

const scorePage = (slide_text) => {
    sundtrack.change('score-page.mp3');
    congratulationSlide(slide_text);
    scoreTable();
};

export default scorePage;
