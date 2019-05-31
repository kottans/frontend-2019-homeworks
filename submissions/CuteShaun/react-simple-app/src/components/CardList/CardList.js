import React, { Component } from "react";
import Card from "../Card/Card";
import "./CardList.css";

class CardList extends Component {
  render() {
    return (
      <div className="card-list">
        {this.props.list.map((item, index) => {
          return (
            <Card
              key={index}
              id={item.name}
              img={item.image}
              name={item.name}
              species={item.species}
              location={item.location}
              addToFavourites={this.props.addToFavourites}
              favourites={this.props.favourites}
            />
          );
        })}
      </div>
    );
  }
}

export default CardList;
