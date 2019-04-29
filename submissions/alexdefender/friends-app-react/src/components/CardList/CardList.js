import React, {Component} from "react";
import "./style.scss";
import {CardItem} from "./CardItem"

class CardList extends Component {

    render() {

        return this.props.cards !== null ? (
            <div className="card-wrapper">
                {Object.entries(this.props.cards).map((card, i) => <CardItem key={i} card={card[1]}/>)}
            </div>
        ) : "";
    }
}

export default CardList;
