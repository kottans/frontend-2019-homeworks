import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
import WeatherDataService from '../../Services/WeatherDataService.js';
import DateConvertor from '../../Services/DateConvertor.js';

import clearD from '../../../img/clearD.png';
import clearN from '../../../img/clearN.png';
import cloudyD from '../../../img/cloudyD.png';
import cloudyN from '../../../img/cloudyN.png';
import cloudy from '../../../img/cloudy.png';
import rainD from '../../../img/rainD.png';
import rainN from '../../../img/rainN.png';
import rain from '../../../img/rain.png';
import snowD from '../../../img/snowD.png';
import snowN from '../../../img/snowN.png';
import thunderstorm from '../../../img/thunderstorm.png';
import fog from '../../../img/fog.png';

const chooseIcon = weatherID => {
  if (weatherID === '01d') return clearD;
  if (weatherID === '01n') return clearN;
  if (weatherID === '02d') return cloudyD;
  if (weatherID === '02n') return cloudyN;
  if (
    weatherID === '03d' ||
    weatherID === '03n' ||
    weatherID === '04d' ||
    weatherID === '04n'
  )
    return cloudy;
  if (weatherID === '09d' || weatherID === '09n') return rain;
  if (weatherID === '10d') return rainD;
  if (weatherID === '10n') return rainN;
  if (weatherID === '11d' || weatherID === '11n') return thunderstorm;
  if (weatherID === '13d') return snowD;
  if (weatherID === '13n') return snowN;
  if (weatherID === '50d' || weatherID === '50n') return fog;
};

export default class CurentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('USERINPUT', this.updateMyself);
    AppState.watch('SHOWCITY', this.updateMyself);
    AppState.watch('UNITS', this.changeUnits);
  }

  init() {
    ['updateMyself', 'changeUnits', 'switchUnits', 'addToFavorites', 'checkFavorite'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
    this.curentWeather = null;
    this.forecastWeather = null;
    this.state = {
      city: null,
      country: null,
      units: localStorage.getItem('units')
        ? localStorage.getItem('units')
        : 'metric',
      unit: localStorage.getItem('unit') ? localStorage.getItem('unit') : 'C',
      speed: localStorage.getItem('speed')
        ? localStorage.getItem('speed')
        : 'm/s',
      day: null,
      ID: null,
      history: localStorage.getItem('history')
        ? JSON.parse(localStorage.getItem('history'))
        : [],
      favorites: localStorage.getItem('favorites')
        ? JSON.parse(localStorage.getItem('favorites'))
        : [],
    };
  }

  updateMyself(searchValue) {
    WeatherDataService.getCurrentWeather(searchValue, this.state.units).then(
      result => {
        this.curentWeather = result;
        this.state.city = this.curentWeather.name;
        this.state.country = this.curentWeather.sys.country;
        this.state.day = this.curentWeather.sys.sunrise;
        this.state.ID = this.curentWeather.weather[0].icon;
        this.updateState(this.curentWeather);

        if (this.state.history.includes(this.state.city)) return;
        if (this.state.history.length > 5) {
          this.state.history.pop();
          this.state.history.unshift(this.state.city);
        } else {
          this.state.history.unshift(this.state.city);
        }
        localStorage.setItem('history', JSON.stringify(this.state.history));
        AppState.update('ADDTOHISTORY', this.state.city);
      }
    );
  }

  addToFavorites({ target }) {
    if (target.checked) {
      if (this.state.favorites.includes(this.state.city)) return;
      this.state.favorites.unshift(this.state.city);
    } else {
      this.state.favorites = this.state.favorites.filter(favorite => {
        return favorite !== this.state.city;
      });
    }
    localStorage.setItem('favorites', JSON.stringify(this.state.favorites));
    AppState.update('ADDTOFAVORITES', this.state.city);
    console.log(this.state.favorites);
  }

  checkFavorite(){
    if (this.state.favorites.includes(this.state.city)){
      return 'checked';
    }else {
      return
    }
  }

  changeUnits(newUnits) {
    WeatherDataService.getCurrentWeather(newUnits.city, newUnits.units).then(
      result => {
        this.curentWeather = result;
        this.updateState(newUnits);
      }
    );
  }

  switchUnits(event) {
    const metric = 'metric';
    const imperial = 'imperial';

    if (event.target.value === metric) {
      event.target.value = imperial;
      this.state.units = imperial;
      this.state.unit = 'F';
      this.state.speed = 'mph';
    } else if (event.target.value === imperial) {
      event.target.value = metric;
      this.state.units = metric;
      this.state.unit = 'C';
      this.state.speed = 'm/s';
    }

    localStorage.setItem('units', this.state.units);
    localStorage.setItem('unit', this.state.unit);
    localStorage.setItem('speed', this.state.speed);

    AppState.update('UNITS', {
      city: this.state.city,
      units: this.state.units
    });
  }

  render() {
    return this.curentWeather !== null
      ? [
          {
            tag: 'div',
            classList: ['weather-maininfo'],
            children: [
              {
                tag: 'span',
                classList: ['city', 'maininfo-item'],
                children: [
                  {
                    tag: 'label',
                    classList: ['favorite'],
                    attributes: [
                      {
                        name: 'title',
                        value: 'Like this !'
                      }
                    ],
                    children: [
                      {
                        tag: 'input',
                        classList: ['checkbox-favorite', 'checkbox'],
                        attributes: [
                          {
                            name: 'type',
                            value: 'checkbox'
                          },
                          {
                            name: this.checkFavorite(),
                          }
                        ],
                        eventHandlers: {
                          change: this.addToFavorites,
                        }
                      },
                      {
                        tag: 'span',
                        classList: ['like']
                      }
                    ]
                  },
                  {
                    tag: 'span',
                    classList: ['city-name'],
                    content: `${this.state.city}, ${this.state.country}`
                  },
                  {
                    tag: 'label',
                    classList: ['swap'],
                    attributes: [
                      {
                        name: 'title',
                        value: 'Change units'
                      }
                    ],
                    children: [
                      {
                        tag: 'input',
                        classList: ['checkbox-units', 'checkbox'],
                        eventHandlers: {
                          change: this.switchUnits
                        },
                        attributes: [
                          {
                            name: 'type',
                            value: 'checkbox'
                          },
                          {
                            name: 'value',
                            value: this.state.units
                          }
                        ]
                      },
                      {
                        tag: 'div',
                        classList: ['units'],
                        content: this.state.unit
                      }
                    ]
                  }
                ]
              },
              {
                tag: 'div',
                classList: ['image-wrapper', 'maininfo-item'],
                children: [
                  {
                    tag: 'img',
                    attributes: [
                      {
                        name: 'alt',
                        value: `${this.curentWeather.weather[0].main}`
                      },
                      {
                        name: 'src',
                        value: `${chooseIcon(this.state.ID)}`
                      },
                      {
                        name: 'draggable',
                        value: false
                      }
                    ]
                  }
                ]
              },
              {
                tag: 'div',
                classList: ['main-weather', 'maininfo-item'],
                children: [
                  {
                    tag: 'span',
                    classList: ['temperature-info'],
                    content: Math.round(this.curentWeather.main.temp) + `&deg;`
                  },
                  {
                    tag: 'span',
                    classList: ['weather-descr'],
                    content: this.curentWeather.weather[0].main
                  }
                ]
              },
              {
                tag: 'span',
                classList: ['extra-descr'],
                content: this.curentWeather.weather[0].description
              }
            ]
          },
          {
            tag: 'div',
            classList: ['weather-subinfo'],
            children: [
              {
                tag: 'span',
                classList: ['day', 'subinfo-item'],
                content: DateConvertor.convertTime(this.state.day, true)
              },
              {
                tag: 'span',
                classList: ['date', 'subinfo-item'],
                content: DateConvertor.convertTime(this.state.day)
              },
              {
                tag: 'span',
                classList: ['wind', 'subinfo-item'],
                content:
                  `Wind: ` +
                  Math.round(this.curentWeather.wind.speed) +
                  ` ${this.state.speed}`
              },
              {
                tag: 'span',
                classList: ['humidity', 'subinfo-item'],
                content:
                  `Humidity:   ` +
                  Math.round(this.curentWeather.main.humidity) +
                  ` %`
              },
              {
                tag: 'span',
                classList: ['pressure', 'subinfo-item'],
                content:
                  `Pressure: ` +
                  Math.round(this.curentWeather.main.pressure) +
                  ` atm`
              }
            ]
          }
        ]
      : [
          {
            tag: 'h2',
            classList: ['typewriter'],
            content: 'Type your city and press search  =)'
          }
        ];
  }
}
