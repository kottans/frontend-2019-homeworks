import Component from "../../framework/Component";
import {Searchbar} from "../SearchBar";
import {CurrentWeather} from "../CurrentWeather";
import {WeatherForecast} from "../WeatherForecast";
import {WeatherTools} from "../WeatherTools";

export default class App extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
  }

  render() {
    return [
      {
        tag: Searchbar,
      },
      {
        tag: CurrentWeather,
      },
      {
        tag: WeatherForecast,
      },
      {
        tag: WeatherTools,
      }

    ];
  }
}
