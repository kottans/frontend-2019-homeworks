import React from 'react';
import './style.scss';

const Comics = ({ comics, handleClick }) => (
  <div className="comics-wrapper" onClick={() => handleClick(comics.title)}>
    <div className="image">
      <img
        src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
        alt={comics.title}
      />
    </div>
  </div>
);

export default Comics;
