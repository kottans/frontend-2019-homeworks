import React from 'react';
import './style.scss';

const Comics = ({ image }) => (
  <div className="comics-wrapper">
    <div className="image">{image}</div>
  </div>
);

export default Comics;
