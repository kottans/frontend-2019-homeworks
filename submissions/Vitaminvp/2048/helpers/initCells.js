import { defaultCellValue, matrixLength, create } from '.';

const initCells = () => {
  const cell1 = create(getRandomCoord(), getRandomCoord(), defaultCellValue);
  const cell2 = create(getRandomCoord(), getRandomCoord(), defaultCellValue);

  if (cell1.x === cell2.x && cell1.y === cell2.y) {
    cell1.x = cell1.x === 0 ? 1 : cell1.x - 1;
  }

  return [cell1, cell2];
};

const getRandomCoord = () => Math.floor(Math.random() * matrixLength);

export { initCells, getRandomCoord };
