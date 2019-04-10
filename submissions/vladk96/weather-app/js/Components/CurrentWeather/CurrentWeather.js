import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
import { weatherImages } from '../../utils/images';
import { toCamelCase } from '../../utils/helpers';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['addToFavoriteList', 'updateMyself'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );

    this.state = {
      favoriteCities: JSON.parse(localStorage.getItem('favoriteCities')) || [],
    };
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  addToFavoriteList() {
    const favoriteArray = [...this.state.favoriteCities];
    const formatedCity = `${this.state.currentWeather.name}, ${this.state.currentWeather.country}`;
    const indexSearchedCity = favoriteArray.findIndex(favoriteCity => favoriteCity === formatedCity);

    if (indexSearchedCity !== -1) {
      favoriteArray.splice(indexSearchedCity, 1);
    } else {
      favoriteArray.unshift(formatedCity);
    }

    localStorage.setItem('favoriteCities', JSON.stringify(favoriteArray));

    AppState.update('CHANGECITY', {
      favoriteCities: favoriteArray,
    });
    
  }

  render() {
    if (this.state.currentWeather === undefined) {
      return '';
    } else {
      const iconStar = 
      (this.state.favoriteCities
        .includes(`${this.state.currentWeather.name}, ${this.state.currentWeather.country}`)) ?
      {
        title: 'Remove from favorites',
        class: ['icon-star'],
      } : {
        title:'Add to favorites',
        class: ['icon-star-outlined'],
      };

      return [
        {
          tag: 'section',
          classList: ['today-weather'],
          children: [
            {
              tag: 'div',
              classList: ['wrapper'],
              children: [
                {
                  tag: 'header',
                  children: [
                    {
                      tag: 'h2',
                      classList: ['city-name'],
                      content: `${this.state.currentWeather.name}, ${this.state.currentWeather.country}`,
                    },
                    {
                      tag: 'button',
                      classList: ['favorite-btn'],
                      eventHandlers: {
                        click: this.addToFavoriteList,
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
                          classList: iconStar.class,
                          attributes: [
                            {
                              name: 'title',
                              value: iconStar.title,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  tag: 'p',
                  content: `${this.state.currentWeather.desc}`, // props
                  classList: ['weather-desc'],
                },
                {
                  tag: 'p',
                  content: `${this.state.currentWeather.date}`, // props
                  classList: ['date'],
                },
                {
                  tag: 'div',
                  classList: ['weather-image'],
                  children: [
                    {
                      tag: 'img',
                      attributes: [
                        {
                          name: 'src',
                          value: weatherImages[ toCamelCase(this.state.currentWeather.mainDesc) ],
                        },
                        {
                          name: 'alt',
                          value: 'weather-icon'
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              tag: 'div',
              classList: 'wrapper',
              children: [
                {
                  tag: 'p',
                  content: `Wind speed: ${this.state.currentWeather.wind} ` + (this.state.unit === 'imperial' ? `mph` : `m/s`), // props
                  classList: ['wind-speed'],
                },
                {
                  tag: 'p',
                  content: `Humidity ${this.state.currentWeather.humidity} %`, // props
                  classList: ['humidity'],
                },
                {
                  tag: 'p',
                  content: `Pressure ${this.state.currentWeather.pressure} mmhg`, // props
                  classList: ['plessure'],
                },
                {
                  tag: 'p',
                  content: `${this.state.currentWeather.temp}&deg`, // props
                  classList: ['temperature'],
                },
              ],
            },
          ],
        },
      ];
    }
    
  }

}
