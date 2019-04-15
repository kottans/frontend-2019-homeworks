import { Component, ComponentFactory, parseJSX } from 'recat';

import { FavoriteService } from '../../Services/FavoriteService';

export default class FavoriteButton extends Component {
  handleClick() {
    FavoriteService.toggleCity(this.props.name);
    this.forceRender();
  }

  render() {
    let styleClass = 'button-fav far fa-star';
    let title = 'Add favorite';

    if (FavoriteService.isFavorite(this.props.name)) {
      styleClass = 'button-fav fas fa-star';
      title = 'Remove favorite';
    }

    return parseJSX`
      <button
        class={${styleClass}}
        title={${title}}
        onClick={${() => this.handleClick()}}
        type={button}
      ></button>`;
  }
}

ComponentFactory.register(FavoriteButton);
