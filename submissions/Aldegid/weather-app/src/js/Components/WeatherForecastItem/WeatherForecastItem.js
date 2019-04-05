import Component from "../../framework/Component";
import {Temperature} from "../Temperature";

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
          {
            tag: 'p',
            classList: ["day-small"],
            content: this.props.weekDay.substring(0, 3).toUpperCase()
          },
          {
            tag: 'div',
            classList: ["weather-img-small"],
            content: `<img src="${this.props.imgUrl}" alt="currentwether" />`
          },
          {
            tag: Temperature,
            classList: ['temperature-small'],
            props: {
              temperature: Math.round(this.props.temperature),
            }
          }
    ];
  }
}
