import { cloneDeep } from 'lodash';
import matrixRotate from 'matrix-rotate';
import { matrixLength, cellStates } from '.';

const directions = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const moveCells = (initCells, direction) => {
  const cells = cloneDeep(initCells);

  const matrix = Array.from(new Array(matrixLength), () =>
    Array.from(new Array(matrixLength), () => 0)
  );

  cells.forEach(cell => {
    matrix[cell.x][cell.y] = cell;
  });

  rotateMatrixFromDirection(matrix, direction);

  for (let y = 0; y < matrixLength; y++) {
    for (let x = 0; x < matrixLength; x++) {
      if (matrix[x][y] === 0) continue;
      moveCell(matrix, x, y);
    }
  }

  rotateMatrixToDirection(matrix, direction);

  for (let y = 0; y < matrixLength; y++) {
    for (let x = 0; x < matrixLength; x++) {
      if (matrix[x][y] === 0) continue;
      matrix[x][y].x = x;
      matrix[x][y].y = y;
    }
  }
  return cells;
};

const moveCell = (matrix, x, y) => {
  let nextRow = y - 1;
  let currentRow = y;

  while (nextRow >= 0) {
    if (matrix[x][nextRow] === 0) {
      matrix[x][nextRow] = matrix[x][currentRow];
      matrix[x][currentRow].state = cellStates.MOVING;
      matrix[x][currentRow] = 0;
      currentRow = nextRow;
    } else if (
      matrix[x][nextRow].value === matrix[x][currentRow].value &&
      (matrix[x][nextRow].state === cellStates.IDLE ||
        matrix[x][nextRow].state === cellStates.MOVING)
    ) {
      matrix[x][nextRow].state = cellStates.DYING;
      matrix[x][currentRow].state = cellStates.INCREASE;
      matrix[x][nextRow] = matrix[x][currentRow];
      matrix[x][currentRow] = 0;
      currentRow = nextRow;
    } else {
      break;
    }
    nextRow -= 1;
  }
};

const rotateMatrixFromDirection = (matrix, direction) => {
  switch (direction) {
    case directions.LEFT:
      matrixRotate(matrix);
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    case directions.DOWN:
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    case directions.RIGHT:
      matrixRotate(matrix);
      break;
    default:
      break;
  }
};

const rotateMatrixToDirection = (matrix, direction) => {
  switch (direction) {
    case directions.LEFT:
      matrixRotate(matrix);
      break;
    case directions.DOWN:
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    case directions.RIGHT:
      matrixRotate(matrix);
      matrixRotate(matrix);
      matrixRotate(matrix);
      break;
    default:
      break;
  }
};

// function printMatrix(matrix) {
//   let printString = '[\n';
//
//   Array.from(new Array(matrixLength), (x, i) => i).forEach(colNum => {
//     printString += '  ';
//     printString += Array.from(new Array(matrixLength), (x, i) => i)
//       .map(rowNum => JSON.stringify(matrix[colNum][rowNum]).padStart(40, ' '))
//       .join(', ');
//     printString += ',\n';
//   });
//
//   printString += ']';
//   console.log(printString);
// }

export { moveCells, directions };
