import Component from "../../framework/Component";
import AppState from "../../Services/AppState";

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch("USERINPUT", this.updateMyself);
  }

  init() {
    ['updateMyself']
    .forEach(methodName => this[methodName] = this[methodName].bind(this));
  }

  getWeatherFromHistory(e) {
    AppState.update('SHOWFROMHISTORY', e.target.id);
  }

  updateMyself() {
    this._render();
  }

  render() {
    const srchistory = JSON.parse(localStorage.getItem("history"));
    if(srchistory) {
      return srchistory.map(item => {
        return {
          tag: 'p',
          classList: ['search-city'],
          content: item,
          attributes: [
            {
              name: 'id',
              value: item
            }
          ],
          eventHandlers: {
            click: this.getWeatherFromHistory
          }
        }
      })
    } else {
      return ''
    }

  }
}
