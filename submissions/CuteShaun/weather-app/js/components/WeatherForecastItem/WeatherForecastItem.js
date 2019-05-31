import Component from '../../framework/Component';
import { Temperature } from '../Temperature';

const moment = require('moment');

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  formatDate(date) {
    date = this.props.data.dt_txt;
    const formatedDate = date.slice(0, 10);
    const momentFormated = moment(formatedDate).format('dddd');
    return momentFormated;
  }

  render() {
    // console.log(this.props, 'this.props');
    return [
      {
        tag: 'div',
        classList: ['weather-forecast-item'],
        children: [
          {
            tag: 'div',
            classList: ['weather-forecast-content'],
            children: [
              {
                tag: 'h5',
                classList: ['weather-forecast-item__day'],
                content: this.formatDate(),
              },
              {
                tag: Temperature,
                classList: ['weather-forecast-item__dat'],
                props: {
                  temperature: `${Math.round(this.props.temp)}${this.props.unit}`,
                },
              },
              {
                tag: 'img',
                classList: ['weather-forecast-item__img'],
                attributes: [
                  {
                    name: 'alt',
                    value: 'weather-icon',
                  },
                  {
                    name: 'src',
                    value: this.props.src,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }
}
