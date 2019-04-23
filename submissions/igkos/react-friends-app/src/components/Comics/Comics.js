import React from 'react';
import './style.scss';

const Comics = ({ comics }) => (
  <div className="comics-wrapper">
    <div className="image">
      <img
        src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
        alt={comics.title}
      />
    </div>
  </div>
);

export default Comics;
