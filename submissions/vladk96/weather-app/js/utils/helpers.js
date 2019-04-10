export const toCamelCase = text => {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) => {
    if (p2) {
      return p2.toUpperCase();
    }
    return p1.toLowerCase();
  });
};

export const convertPlessure = hPa => {
  const MMHG = 1.333;
  return hPa / MMHG;
};
