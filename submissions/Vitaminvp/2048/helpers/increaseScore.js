import { cellStates } from './cellManager';

const increaseScore = cells => {
  return cells
    .reduce((score, cell) => {
      if (cell.state === cellStates.INCREASE) {
          score += cell.value;
      }
      cell.state = cellStates.IDLE;
      return score;
    }, 0);
};

export { increaseScore };
