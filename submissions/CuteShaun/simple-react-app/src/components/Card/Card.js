import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    const {
      name,
      species,
      addToFavourites,
      location,
      img,
      favourites
    } = this.props;


    return (
      <div className="card">
        <div className="img-wrapper">
          <img src={img} alt="person-img" className="card__img" />
          <i
            className={
              favourites.includes(name)
                ? "card__icon card__icon--red far fa-heart"
                : "card__icon far fa-heart"
            }
            onClick={event => {
              addToFavourites(event);
            }}
            id={name}
          />
        </div>

        <div className="card__text">
          <p className="card__name">{name}</p>
          <p className="card__gender">{species}</p>
          <p className="card__whatever">{location}</p>
        </div>
      </div>
    );
  }
}

export default Card;
