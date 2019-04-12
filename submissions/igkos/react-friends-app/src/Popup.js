import React from 'react';

const Popup = ({ closePopup, comics, title, image }) => (
  <div className="popup">
    <div className="popup_inner">
      <div className="popup_inner-left">{image}</div>
      <div className="popup_inner-right">
        {title}
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
