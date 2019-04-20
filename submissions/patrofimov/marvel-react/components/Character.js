import React from "react";

const Character = props => {
  const { name, image, modified } = props;
  return (
    <div className="character-wrapper">
      <div className="character">
        <img
          className="character-image"
          src={image}
          alt={name}
        />
        <h2 className="image-caption">{name}</h2>
        <p className="modified">modified: {modified}</p>
      </div>
    </div>
  );
};

export default Character;
