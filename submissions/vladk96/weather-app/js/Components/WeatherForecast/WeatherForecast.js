import Component from '../../framework/Component';
import { WeatherForecastItem } from '../WeatherForecastItem/';
import AppState from '../../Services/AppState';

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);

    AppState.watch('CHANGECITY', this.updateMyself);
  }

  init() {
    this.updateMyself = this.updateMyself.bind(this);
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  render() {
    if (this.state.weatherForecast === undefined) {
      return '';
    }
    return [
      {
        tag: 'section',
        classList: ['week-forecast'],
        children: [
          {
            tag: 'ul',
            classList: ['week-forecast-list'],
            children: this.state.weatherForecast.map(day => {
              return {
                tag: WeatherForecastItem,
                props: day,
              };
            }),
          },
        ],
      },
    ];
  }

}
