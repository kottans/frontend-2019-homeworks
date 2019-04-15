import { Component, ComponentFactory, parseJSX } from 'recat';

import { FavoriteService } from '../../Services/FavoriteService';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);

    this.state = { favorites: FavoriteService.getData() };

    this.onFavoritesUpdate = this.onFavoritesUpdate.bind(this);
    FavoriteService.subscribeForUpdate(this.onFavoritesUpdate);
  }

  onFavoritesUpdate(data) {
    this.setState({ favorites: data });
  }

  handleFavClick(e) {
    if (e.target.localName === 'button') {
      const button = e.target;
      this.props.handleSearch(button.dataset.city);
    }
  }

  render() {
    if (this.state.favorites.lenght === 0) {
      return false;
    }

    const buttons = this.state.favorites.map(city => {
      return parseJSX`
        <button data-city={${city}} class={button button--fav} type={button}>
          ${city}
        </button>`;
    });

    return parseJSX`
      <div onClick={${e => this.handleFavClick(e)}}>
        ${buttons}
      </div>`;
  }
}

ComponentFactory.register(FavouriteLocations);
