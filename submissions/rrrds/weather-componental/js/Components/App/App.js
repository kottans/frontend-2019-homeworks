import { Component, ComponentFactory, parseJSX } from 'recat';

import { Header } from '../Header';
import { CurrentWeather } from '../CurrentWeather';
import { WeatherForecast } from '../WeatherForecast';

export default class App extends Component {
  render() {
    return parseJSX`
      <div class={app}>
        <Header class={header} />
        <CurrentWeather />
        <WeatherForecast class={forecast} />
      </div>`;
  }
}

ComponentFactory.register(App);
