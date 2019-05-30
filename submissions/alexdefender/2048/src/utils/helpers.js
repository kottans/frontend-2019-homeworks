export const sumDoubleCells = arr => {
  const arrLength = arr.length;
  let score = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] === arr[j]) {
          const sum = arr[i] + arr[j];
          score += sum;
          arr.splice(i, 1, sum);
          arr.splice(j, 1);
          j = arr.length;
        } else {
          if (arr[j] !== null) {
            j = arr.length;
          }
        }
      }
    } else {
      arr.splice(i, 1);
      i--;
    }
  }

  if (arr.length < arrLength) {
    for (let i = arr.length; i < arrLength; i++) {
      arr.push(null);
    }
  }
  return { arr, score };
};

export const rotate90 = arr => {
  const rotateArr = [[], [], [], []];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      rotateArr[j][i] = arr[i][arr.length - 1 - j];
    }
  }

  return rotateArr;
};
