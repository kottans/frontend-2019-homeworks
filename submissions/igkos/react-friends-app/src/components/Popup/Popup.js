import React from 'react';
import './style.scss';

const Popup = ({ closePopup, comics }) => (
  <div className="popup">
    <div className="popup_inner">
      <div className="popup_inner-left">
        <img
          src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
          alt={comics.title}
        />
      </div>
      <div className="popup_inner-right">
        <h2>{comics.title}</h2>
        <p>{comics.description}</p>
        <div className="popup_inner-links">
          {comics.urls.map((link, index) => (
            <a key={index} href={link.url}>
              {link.type}
            </a>
          ))}
        </div>
      </div>
      <button onClick={closePopup}>close me</button>
    </div>
  </div>
);

export default Popup;
