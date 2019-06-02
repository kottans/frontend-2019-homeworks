import React, { PureComponent } from 'react';
import { Container } from '../../styles';

class ControlPanel extends PureComponent {
  render() {
    const { children } = this.props;
    return <Container>{children}</Container>;
  }
}

export default ControlPanel;
