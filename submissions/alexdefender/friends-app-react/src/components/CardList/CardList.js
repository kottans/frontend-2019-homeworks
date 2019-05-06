import React, { Component } from "react";
import "./style.scss";
import { CardItem } from "./CardItem";

class CardList extends Component {
  render() {
    if (this.props.cards !== null) {
      return (
        <div className="card-wrapper">
          {this.props.cards.map((card, i) => (
            <CardItem key={i} card={card} />
          ))}
        </div>
      );
    }
  }
}

export default CardList;
