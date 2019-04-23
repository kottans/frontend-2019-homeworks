import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class History extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('ADDTOHISTORY', this.updateMyself);
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
    const history = JSON.parse(localStorage.getItem('history'));
    if (history) {
      return history.map(cityName => {
        return {
          tag: 'p',
          classList: ['history-city'],
          content: cityName,
          eventHandlers: {
            click: this.showCity
          }
        };
      });
    } else return '';
  }
}
