import Component from '../../framework/Component';
import { SearchBar } from '../SearchBar';
import { WeatherForecast } from '../WeatherForecast';
import { CurentWeather } from '../CurentWeather';
import { VideoWeather } from '../VideoWeather';
import { WeatherLists } from '../WeatherLists';

export default class App extends Component {
  constructor(host) {
    super(host);
  }

  init() {}
  
  render() {
    return [
      {
        tag: SearchBar,
      },
      {
        tag: CurentWeather,
      },
      {
        tag: WeatherForecast,
      },
      {
        tag: VideoWeather,
      },
      {
        tag: WeatherLists,
      },
    ];
  }
}
