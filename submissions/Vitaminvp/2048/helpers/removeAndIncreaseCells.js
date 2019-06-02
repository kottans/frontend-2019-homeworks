import { cellStates } from '.';

const removeAndIncreaseCells = (cells) => {
  return cells
    .filter(cell => cell.state !== cellStates.DYING)
    .map(cell => {
      if (cell.state === cellStates.INCREASE) {
        cell.value *= 2;
      }
      return cell;
    });
};

export { removeAndIncreaseCells };
