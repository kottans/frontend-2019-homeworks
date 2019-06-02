import React, { PureComponent } from 'react';
import {
  Background,
  BackgroundCell,
  Cell,
  FieldTag,
  Playground
} from '../../styles';

class Field extends PureComponent {
  static defaultProps = {
    matrix: [[]]
  };
  render() {
    const { cells } = this.props;
    return (
      <FieldTag>
        <Background>
          {Array.from(new Array(16), (_, i) => i).map(i => (
            <BackgroundCell key={i} />
          ))}
        </Background>
        <Playground>
          {cells.map(({ x, y, value, id }) => (
            <Cell key={id} x={x} y={y} value={value}>
              {value}
            </Cell>
          ))}
        </Playground>
      </FieldTag>
    );
  }
}

export default Field;
