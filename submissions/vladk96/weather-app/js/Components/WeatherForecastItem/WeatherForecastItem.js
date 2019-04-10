import Component from '../../framework/Component';
import AppState from '../../Services/AppState';

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    ['showWeather', 'updateMyself'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  showWeather() {
    AppState.update('CHANGECITY', {
      currentWeather: this.props.weather,
    });
  }

  render() {
    return [
      {
        tag: 'li',
        classList: ['week-forecast-day'],
        eventHandlers: {
          click: this.showWeather,
        },
        children: [
          {
            tag: 'h2',
            content: `${this.props.day}`,
            classList: ['week-forecast-title'],
          },
          {
            tag: 'p',
            content: `${this.props.weather.temp}&deg`,
            classList: ['week-forecast-temperature'],
          },
        ],
      },
    ];
  }

}
