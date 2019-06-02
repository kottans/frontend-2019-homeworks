import { uniqueId } from 'lodash';

const cellStates = {
  IDLE: 'IDLE',
  MOVING: 'MOVING',
  DYING: 'DYING',
  INCREASE: 'INCREASE'
};

const create = (x, y, value, id) => ({
  x,
  y,
  value,
  id: id ? id : uniqueId(),
  state: cellStates.IDLE
});
const calculateBackgroundColor = value => {
  if (value === 0) {
    return 'transparent';
  }
  const step = Math.min(16, Math.log2(value));
  return `hsl(0, ${calculateSaturation(step)}%, ${calculateLightness(step)}%);`;
};
const calculateSaturation = step => Math.floor((100 / 16) * step);
const calculateLightness = step => 100 - Math.floor((50 / 16) * step);
export { create, cellStates, calculateBackgroundColor };
