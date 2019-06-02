import styled from 'styled-components';
import { calculateBackgroundColor } from '../helpers';

const FieldTag = styled.div`
  height: 450px;
  position: relative;
  width: 450px;
`;

const Background = styled.div`
  align-content: space-between;
  background-color: #bbada0;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 450px;
  justify-content: space-between;
  padding: 5px;
  position: absolute;
  width: 450px;
`;

const Playground = styled(Background)`
  background-color: transparent;
`;

const BackgroundCell = styled.div`
  margin: 5px;
  background-color: rgba(238, 228, 218, 0.35);
  height: 100px;
  width: 100px;
  border-radius: 3px;
`;

const Cell = styled(BackgroundCell)`
  transform: translate(${({ x }) => x * 110}px, ${({ y }) => y * 110}px);
  text-align: center;
  line-height: 100px;
  background-color: ${({ value }) => calculateBackgroundColor(value)};
  position: absolute;
  transition-property: transform;
  transition: 100ms ease-in-out;
  color: #6a4e4e;
  font-weight: 900;
  font-size: ${({ value }) =>
    value < 100 ? 66 : value < 1000 ? 47 : value < 10000 ? 40 : 30}px;
`;

export { FieldTag, Background, Playground, BackgroundCell, Cell };
