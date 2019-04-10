import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
import WeatherDataService from '../../Services/WeatherDataService';

export default class FavouriteLocations extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['updateMyself', 'removeCity', 'showCityWeather'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    this.state = {
      unit: 'metric',
      favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || [],
      historyCities: JSON.parse(localStorage.getItem('historyCities')) || [],
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  removeCity(event) {
    const cityIndex = event.target.offsetParent.dataset.id;
    const changefavoriteCities = [...this.state.favoriteCities];

    changefavoriteCities.splice(cityIndex, 1);
    localStorage.setItem('favoriteCities', JSON.stringify(changefavoriteCities));

    AppState.update('CHANGECITY', {
      favoriteCities: changefavoriteCities,
    });
  }

  cleanAllFavorites() {
    localStorage.removeItem('favoriteCities');

    AppState.update('CHANGECITY', {
      favoriteCities: [],
    });
  }

  showCityWeather(event) {
    const cityName = event.target.innerText;

    if (event.target.tagName === 'LI') {
     WeatherDataService
      .getAllWeather(cityName, this.state.unit)
      .then(data => {
        const historyCities = [...this.state.historyCities];
        const cityIndex = historyCities.findIndex( city => city === cityName);

        if (cityIndex !== -1) {
          historyCities.splice(cityIndex, 1);
        }
        
        historyCities.unshift(cityName);
        
        AppState.update('CHANGECITY', {
          cityName: cityName,
          currentWeather: data.currentData,
          weatherForecast: data.forecastData,
          historyCities: historyCities,
        });
      }); 
    }
    
  }
  
  render() {
    if(this.state.favoriteCities.length !== 0) {
      return [
        {
          tag: 'section',
          classList: ['list', 'favorite-list'],
          children: [
            {
              tag: 'header',
              classList: ['list-head'],
              children: [
                {
                  tag: 'h2',
                  content: 'Favorite cities',
                  classList: ['list-title'],
                },
                {
                  tag: 'button',
                  classList: ['list-button'],
                  eventHandlers: {
                    click: this.cleanAllFavorites,
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
              children: this.state.favoriteCities.map((city, index) => {
                return {
                  tag: 'li',
                  content: `${city}`,
                  eventHandlers: {
                    click: this.showCityWeather,
                  },
                  children: [
                    {
                      tag: 'button',
                      attributes: [
                        {
                          name: 'data-id',
                          value: index,
                        }
                      ],
                      classList: ['favorite-list-button'],
                      eventHandlers: {
                        click: this.removeCity,
                      },
                      children: [
                        {
                          tag: 'span',
                          classList: ['icon-close'],
                        },
                      ],
                    },
                  ],
                };
              }),
            },
          ],
        },
      ];
    } else {
      return "";
    }
  }

}
