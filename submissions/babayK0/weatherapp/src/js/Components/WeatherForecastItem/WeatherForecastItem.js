import Component from '../../framework/Component';
import DateConvertor from '../../Services/DateConvertor.js'
export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: 'span',
        classList: ['forecast-day'],
        content: DateConvertor.convertTime(this.props.dayOfWeek, true).substring(0, 3),
      },
      {
        tag: 'div',
        classList: ['forecast-img-wrapper'],
        children: [
          {
            tag: 'img',
            attributes: [
              {
                name: 'alt',
                value: 'weather image'
              },
              {
                name: 'src',
                value: this.props.src
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
        tag: 'span',
        classList: ['forecast-temp'],
        content: Math.round(this.props.temperature) + `&deg;`
      }
    ];
  }
}
