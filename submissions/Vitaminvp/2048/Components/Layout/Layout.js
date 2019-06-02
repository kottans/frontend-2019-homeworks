import React, { PureComponent } from 'react';
import {Content, Main} from "../../styles";

class Layout extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Main>
        <Content>{children}</Content>
      </Main>
    );
  }
}

export default Layout;
