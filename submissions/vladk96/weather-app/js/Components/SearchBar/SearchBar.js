import Component from "../../framework/Component";
import AppState from '../../Services/AppState';
import WeatherDataService from '../../Services/WeatherDataService';
import { CITIES } from '../../utils/city-list';

export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    [
      'searchCity',
      'changeUnit',
      'updateMyself',
      'showAutocomplete',
      'onClick'
    ].forEach(methodName => this[methodName] = this[methodName].bind(this));
    
    this.state = {
      unit: 'metric',
      historyCities: JSON.parse(localStorage.getItem('historyCities')) || [],
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  getUpdatedHistoryCities(cityState, city, country) {
    const historyArray = [...cityState];
    const formatedCity = `${city}, ${country}`;
    const indexSearchedCity = historyArray.findIndex(historyCity => historyCity === formatedCity);

    if (indexSearchedCity !== -1) {
      historyArray.splice(indexSearchedCity, 1);
    }
    historyArray.unshift(formatedCity);

    if (historyArray.length > 10) {
      historyArray.pop();
    }
    return historyArray;
  }

  searchCity(event) {
    const ENTER_KEY_CODE = 13;

    if (event.keyCode === ENTER_KEY_CODE) {
      WeatherDataService
        .getAllWeather(event.target.value, this.state.unit)
        .then(data => {
          const updatedHistoryArray = this.getUpdatedHistoryCities(this.state.historyCities, data.currentData.name, data.currentData.country);
          localStorage.setItem('historyCities', JSON.stringify(updatedHistoryArray));
          
          AppState.update('CHANGECITY', {
            cityName: event.target.value,
            currentWeather: data.currentData,
            weatherForecast: data.forecastData,
            historyCities: updatedHistoryArray,
          });
        })
        .catch(() => {
          alert('Invalid city name');
        });
    }
  }

  showAutocomplete(event) {
    const searchContainer = event.srcElement.parentElement;
    const searchInput = event.target;
    const ul = document.createElement('ul');

    const userCity = event.target.value;
    const filteredCities = CITIES.filter(city => {
      const fullCity = `${city.name}, ${city.country}`.toLowerCase();
      return fullCity.includes(userCity.toLowerCase());
    });

    ul.classList.add('autocomplete');

    if (searchContainer.lastChild.className === 'autocomplete') {
      document.querySelector('.autocomplete').remove();
      searchInput.classList.remove('search-input-remove-border-radius');
    }

    if (userCity && filteredCities.length > 0) {
      searchInput.classList.add('search-input-remove-border-radius');

      ul.append(...filteredCities.slice(0, 10).map(city => {
        const li = document.createElement('li');

        li.classList.add('autocomplete-item');
        li.innerHTML = `${city.name}, ${city.country}`;

        return li;
      }));

      ul.addEventListener('click', this.onClick);
      searchContainer.appendChild(ul);
    }
  }

  onClick({ target }) {
    WeatherDataService
    .getAllWeather(target.textContent, this.state.unit)
    .then(data => {
      const updatedHistoryArray = this.getUpdatedHistoryCities(this.state.historyCities, data.currentData.name, data.currentData.country);
      localStorage.setItem('historyCities', JSON.stringify(updatedHistoryArray));
      
      AppState.update('CHANGECITY', {
        cityName: target.textContent,
        currentWeather: data.currentData,
        weatherForecast: data.forecastData,
        historyCities: updatedHistoryArray,
      });
    });
  }

  changeUnit({ target }) {
    const currentUnit = target.value;

    if (this.state.cityName) {
      WeatherDataService
        .getAllWeather(this.state.cityName, currentUnit)
        .then(data => {
          AppState.update('CHANGECITY', {
            currentWeather: data.currentData,
            weatherForecast: data.forecastData,
            unit: currentUnit,
          });
        });
    } else {
      AppState.update('CHANGECITY', {
        unit: currentUnit,
      });
    }

  }
  
  render() {
    return [
      {
        tag: 'section',
        classList: ['search-bar'],
        children: [
          {
            tag: 'div',
            classList: ['search-container'],
            children: [
              {
                tag: 'input',
                classList: ['search-input'],
                eventHandlers: {
                  keydown: this.searchCity,
                  input: this.showAutocomplete,
                },
                attributes: [
                  {
                    name: 'type',
                    value: 'text',
                  },
                  {
                    name: 'placeholder',
                    value: 'Search...',
                  },
                ],
              },
            ],
          },
          {
            tag: 'select',
            classList: ['units'],
            eventHandlers: {
              change: this.changeUnit,
            },
            attributes: [
              {
                name: 'name',
                value: 'units',
              },
              {
                name: 'id',
                value: 'units',
              },
            ],
            children: [
              {
                tag: 'option',
                content: '&degC',
                attributes: [
                  {
                    name: 'value',
                    value: 'metric',
                  },
                ],
              },
              {
                tag: 'option',
                content: '&degF',
                attributes: [
                  {
                    name: 'value',
                    value: 'imperial',
                  },
                  (this.state.unit === 'imperial') ?  
                  {
                    name: 'selected',
                    value: 'true',
                  }
                  : {},
                ],
              },
            ],
          },
        ],
      },
    ];

  }
}
