import React, {Component} from "react";
import "./style.scss";

class CardItem extends Component {

    render() {
        const {name, image, gender, location, species, status} = this.props.card;

        return (
            <section className="user-card">
                <h3 className="name">{name}</h3>
                <p><img src={image} alt=""/></p>
                <ul className="user-card__info">
                    <li><strong>Species:</strong> {species}</li>
                    <li><strong>Gender:</strong> {gender}</li>
                    <li><strong>Status:</strong> {status}</li>
                    <li><strong>Location:</strong> {location}</li>
                </ul>
            </section>
        );
    }
}

export default CardItem;
