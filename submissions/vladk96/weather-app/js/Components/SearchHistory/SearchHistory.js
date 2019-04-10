import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
import WeatherDataService from '../../Services/WeatherDataService';

export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['cleanAllHistory', 'updateMyself', 'showCityWeather'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    this.state = {
      unit: 'metric',
      historyCities: JSON.parse(localStorage.getItem('historyCities')) || [],
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  showCityWeather(event) {
    const cityName = event.target.innerText;

    WeatherDataService
      .getAllWeather(cityName, this.state.unit)
      .then(data => {
        const historyCity = [...this.state.historyCities];
        const cityIndex = historyCity.findIndex( city => city === cityName);

        historyCity.splice(cityIndex, 1);
        historyCity.unshift(cityName);
        
        AppState.update('CHANGECITY', {
          cityName: cityName,
          currentWeather: data.currentData,
          weatherForecast: data.forecastData,
          historyCities: historyCity,
        });
      });
  }
  
  cleanAllHistory() {
    localStorage.removeItem('historyCities');
    AppState.update('CHANGECITY', {
      historyCities: [],
    });
  }

  render() {
    if (this.state.historyCities.length !== 0) {
      return [
        {
          tag: 'section',
          classList: ['list', 'viewed-list'],
          children: [
            {
              tag: 'header',
              classList: ['list-head'],
              children: [
                {
                  tag: 'h2',
                  content: 'Last 10 viewed cities',
                  classList: ['list-title'],
                },
                {
                  tag: 'button',
                  classList: ['list-button'],
                  eventHandlers: {
                    click: this.cleanAllHistory,
                  },
                  attributes: [
                    {
                      name: 'type',
                      value: 'button',
                    },
                  ],
                  children: [
                    {
                      tag: 'span',
                      classList: ['icon-bin'],
                    },
                  ],
                },
              ],
            },
            {
              tag: 'ul',
              children: this.state.historyCities.map( cityName => ({
                tag: 'li',
                eventHandlers: {
                  click: this.showCityWeather,
                },
                content: `${cityName}`,
              })),
            },
          ],
        },
      ];
    } else {
      return "";
    }
    
  }

}
