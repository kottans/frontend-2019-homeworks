/* eslint-disable class-methods-use-this */
import { Component, ComponentFactory, parseJSX } from 'recat';

import { entityList, AppState } from '../../Services/AppState';
import {
  formatTemperature,
  formatHumidity,
  formatPressure,
  formatWind
} from '../../formatters';
import { FavoriteButton } from '../FavoriteButton';

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    this.state = { data: null };

    this.onServerResponse = this.onServerResponse.bind(this);
    AppState.watch(entityList.CURRENT_WEATHER, this.onServerResponse);
  }

  onServerResponse(weatherData) {
    this.setState({ data: weatherData });
  }

  render() {
    if (!this.state.data) {
      return false;
    }

    const iconClass = `owf owf-${
      this.state.data.weather[0].id
    } current-weather-icon`;

    const fullName = `${this.state.data.name},${this.state.data.sys.country}`;

    return parseJSX`
        <div class={main weather-details}>
          <div class={weather-icon}>
            <FavoriteButton name={${fullName}} />
            <h2>${this.state.data.name}</h2>
            <i 
              class={${iconClass}}
              title={${this.state.data.weather[0].description}}></i>
          </div>
          <div>
            <div class={row data-details}>
              <div class={aux-temperature}>
                <i class={fas fa-arrow-circle-down}></i>${formatTemperature(
                  this.state.data.main.temp_min
                )}
              </div>
              <div class={main-temperature}>
                ${formatTemperature(this.state.data.main.temp)}
              </div>
              <div class={aux-temperature}>
                <i class={fas fa-arrow-circle-up}></i>
                ${formatTemperature(this.state.data.main.temp_max)}
              </div>
            </div>
          </div>
          <ul class={row data-details data-details--sub}>
            <li title={Wind}>
              <i class={fas fa-wind}></i>
              ${formatWind(this.state.data.wind.speed)}
            </li>
            <li title={Humidity}>
              <i class={fas fa-tint}></i>
              ${formatHumidity(this.state.data.main.humidity)}
            </li>
            <li title={Pressure}>
              <i class={fas fa-weight-hanging}></i>
              ${formatPressure(this.state.data.main.pressure)}
            </li>
          </ul>
        </div>
      </div>`;
  }
}

ComponentFactory.register(CurrentWeather);
