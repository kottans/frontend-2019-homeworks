import Component from '../../framework/Component';
import AppState from '../../services/AppState';

export default class FavouriteList extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('FAVOURITE', this.updateMyself);
  }

  init() {
    ['updateMyself', 'getWeatherFromFavorite', 'removeFavItem'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this)),
    );
    this.state = {
      favourite: JSON.parse(localStorage.getItem('favourite')),
    };
  }

  getWeatherFromFavorite(e) {
    AppState.update('SHOWFAVOURITE', e.target.id);
  }

  updateMyself(newState) {
    this.state.favourite = newState;
    this.updateState(newState);
  }

  removeFavItem(e) {
    const favItem = this.state.favourite.indexOf(e.target.parentNode.firstChild.id);
    this.state.favourite.splice(favItem, 1);
    localStorage.setItem('favourite', JSON.stringify(this.state.favourite));
    AppState.update('FAVOURITE', this.state.favourite);
  }

  render() {
    const favItems = JSON.parse(localStorage.getItem('favourite'));

    if (favItems) {
      return favItems.map(item => ({
        tag: 'div',
        classList: ['favorite-item'],
        children: [
          {
            tag: 'p',
            classList: ['favourite-city'],
            content: item,
            attributes: [
              {
                name: 'id',
                value: item,
              },
            ],
            eventHandlers: {
              click: this.getWeatherFromFavorite,
            },
          },
          {
            tag: 'button',
            classList: ['clear-button'],
            attributes: [
              {
                name: 'type',
                value: 'button',
              },
            ],
            eventHandlers: {
              click: this.removeFavItem,
            },

            children: [
              {
                tag: 'i',
                classList: ['fa', 'fa-trash'],
              },
            ],
          },
        ],
      }));
    }
    return '';
  }
}
