import React, { Component } from 'react';
import * as ReactDOM from 'react-dom';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modal = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.modal);
  }

  componentWillUnmount() {
    document.body.removeChild(this.modal);
  }

  render() {
    const { closeModal, children } = this.props;
    return ReactDOM.createPortal(
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>2048</h3>
          </div>
          <div className="modal-body">
            <h2>{children}</h2>
          </div>
          <div className="modal-footer">
            <h4>The game will be restarted.</h4>
          </div>
        </div>
      </div>,
      this.modal
    );
  }
}

export default Modal;
