import Component from '../../framework/Component';
import { SearchBar } from '../SearchBar/';
import { CurrentWeather } from '../CurrentWeather/';
import { WeatherForecast } from '../WeatherForecast/';
import { FavouriteLocations } from '../FavouriteLocations/';
import { SearchHistory } from '../SearchHistory/';

export default class App extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    return [
      {
        tag: 'div',
        classList: ['app-content'],
        children: [
          { 
            tag: SearchBar,
          },
          { 
            tag: CurrentWeather,
          },
          { 
            tag: WeatherForecast,
          },
          {
            tag: 'section',
            classList: ['lists'],
            children: [
              {
                tag: SearchHistory,
              },
              {
                tag: FavouriteLocations,
              },
            ],
          },
        ]
      }
    ];
  }

}
