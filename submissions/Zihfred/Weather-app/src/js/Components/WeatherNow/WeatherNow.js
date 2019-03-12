import Component from "../../framework/Component";
import Data from "../../Data/fakeData"

export default class WeatherNow extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
      //wrapper div
      let weatherNow = document.createElement('div');
      weatherNow.classList.add('weatherNow');
      weatherNow.classList.add('wrapperStyle');

      //left side
      let weatherNow__left = document.createElement('div');
      weatherNow__left.classList.add('weatherNow--left');

      //left side city
      let weatherNow__city = document.createElement('h1');
      weatherNow__city.classList.add('weatherNow__city');
      weatherNow__city = this.props.city;

      //left side sky status
      let weatherNow__skyStatus = document.createElement('h2');
      weatherNow__skyStatus.className = 'weatherNow__skyStatus';
      weatherNow__skyStatus.textContent = this.props.skyStatus;

      //left side sun status
      let weatherNow__sunStatus = document.createElement('div');
      weatherNow__sunStatus.className = 'weatherNow__sunStatus';

      let weatherNow__sunStatusImage = document.createElement('img')
      weatherNow__sunStatusImage.setAttribute('src', this.props.sunStatus);
      weatherNow__sunStatus.appendChild(weatherNow__sunStatusImage);

      //left side temperature
      let weatherNow__temp = document.createElement('div');
      weatherNow__temp.className = 'weatherNow__temp';
      weatherNow__temp.textContent = this.props.temp;

      //left side units
      let units = document.createElement('div');
      units.classList.add('units');

      let unitLink1 = document.createElement('a');
      let unitLink2 = document.createElement('a');
      unitLink1.classList.add('units__item');
      unitLink1.textContent = '°C';
      unitLink2.classList.add('units__item');
      unitLink2.textContent = '°F';
      unitLink1.setAttribute('href', '#');
      unitLink2.setAttribute('href', '#');

      units.append(unitLink1,unitLink2);

      //append elements to left side
      weatherNow__left.append(
          weatherNow__city,
          weatherNow__skyStatus,
          weatherNow__sunStatus,
          weatherNow__temp,
          units);

      //right side
      let weatherNow__right = document.createElement('div');
      weatherNow__right.classList.add('weatherNow--right');

      //right side humidity
      let weatherNow__humidity = document.createElement('h2');
      weatherNow__humidity.classList.add('weatherNow__humidity');
      weatherNow__humidity.textContent = `Humidity: ${this.props.humidity}%`;

      //right side wet
      let weatherNow__wet = document.createElement('h2');
      weatherNow__wet.classList.add('weatherNow__wet');
      weatherNow__wet.textContent = `Wet: ${this.props.wet}%`;

      //right side wind
      let weatherNow__wind = document.createElement('h2');
      weatherNow__wind.classList.add('weatherNow__wind');
      weatherNow__wind.textContent = `Wind: ${this.props.wind}  ${this.props.windUnit}`;

      //right side wind
      let weatherNow__pressure = document.createElement('h2');
      weatherNow__pressure.classList.add('weatherNow__pressure');
      weatherNow__pressure.textContent = `Pressure: ${this.props.pressure}  ${this.props.pressureUnit}`;

      //append elements to right side
      weatherNow__right.append(
          weatherNow__humidity,
          weatherNow__wet,
          weatherNow__wind,
          weatherNow__pressure
      );


      //append left & right side
      weatherNow.append(
          weatherNow__left
      );


      return [
          weatherNow__left,
          weatherNow__right

      ];
  }
}


