import React from "react";

const Characters = props => {
  console.log({ props });

  const { name, image, modified } = props;
  return (
    <div className="characters-wrapper">
      <div className="characters">
        <div className="image">{image}</div>
        <div className="image-caption">{name}</div>
        <div className="modified">modified: {modified}</div>
      </div>
      <div />
    </div>
  );
};

export default Characters;
