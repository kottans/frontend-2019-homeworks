import React from "react";

import "./Character.css";

const Character = props => (
  <div className="card">
    <img className="card-image" src={props.imageSrc} alt="character" />
    <h2 className="card-name">{props.name}</h2>
    <p className="card-species">Species: {props.species}</p>
    <p className="card-gender">Gender: {props.gender}</p>
  </div>
);

export default Character;
