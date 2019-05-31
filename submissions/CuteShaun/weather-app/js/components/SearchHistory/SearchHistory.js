import Component from '../../framework/Component';
import AppState from '../../services/AppState';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('USERINPUT', this.updateMyself);
  }

  init() {
    ['updateMyself'].forEach(methodName => (this[methodName] = this[methodName].bind(this)));
  }

  getWeatherFromHistory(e) {
    let newValue;

    if (e.target.id.includes('Ukraine') || e.target.id.includes('ukraine')) {
      const lowerValue = e.target.id.toLowerCase();
      newValue = lowerValue.replace(/ukraine/gi, 'UA');
    } else {
      newValue = e.target.id;
    }

    AppState.update('SHOWFROMHISTORY', newValue);
  }

  updateMyself() {
    this._render();
  }

  render() {
    const srchistory = JSON.parse(localStorage.getItem('history'));
    if (srchistory) {
      return srchistory.map(item => ({
        tag: 'p',
        classList: ['search-city'],
        content: item,
        attributes: [
          {
            name: 'id',
            value: item,
          },
        ],
        eventHandlers: {
          click: this.getWeatherFromHistory,
        },
      }));
    }
    return '';
  }
}
