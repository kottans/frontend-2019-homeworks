import { Component, ComponentFactory, parseJSX } from 'recat';

export default class WeatherForecastItem extends Component {
  render() {
    const mainData = this.props.data.main;

    const details = Object.keys(mainData).map(key => {
      const txt = `${key}: ${mainData[key]}`;
      return parseJSX`<li>${txt}</li>`;
    });

    return parseJSX`
      <div>
        ${this.props.data.dt_txt}
        <ul>${details}</ul>
      </div>`;
  }
}

ComponentFactory.register(WeatherForecastItem);
