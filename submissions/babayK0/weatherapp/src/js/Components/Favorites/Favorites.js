import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class Favorites extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('ADDTOFAVORITES', this.updateMyself);
  }

  init() {
    ['updateMyself'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
  }

  updateMyself() {
    this._render();
  }

  showCity({ target }) {
    AppState.update('SHOWCITY', target.innerText);
  }

  render() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (favorites) {
      return favorites.map(cityName => {
        return {
          tag: 'p',
          classList: ['favorites-city'],
          content: cityName,
          eventHandlers: {
            click: this.showCity
          }
        };
      });
    } else return '';
  }
}
