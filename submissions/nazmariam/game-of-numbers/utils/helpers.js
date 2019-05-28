export const addToStorage = (item, key) => {
  const data = localStorage[key] ? JSON.parse(localStorage[key]) : [];
  let newData = data.slice();
  if (item) {
    if (newData.indexOf(item) === -1) {
      newData.splice(0, 1, item);
    }
    localStorage[key] = JSON.stringify(newData);
  }
};
export const reverseY = matrix => {
  let reversed = [];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push(matrix[3 - i][j]);
    }
    reversed.push(row);
  }
  return reversed;
};
export const rotate90 = matrix => {
  let reversed = [];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push(matrix[3 - j][i]);
    }
    reversed.push(row);
  }
  return reversed;
};
export const match = (arr, a, b, x, y) => {
  return arr[a] && arr[a][b] && arr[a][b] === arr[x][y];
};
