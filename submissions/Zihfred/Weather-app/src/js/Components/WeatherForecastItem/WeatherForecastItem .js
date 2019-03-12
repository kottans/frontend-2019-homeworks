import Component from "../../framework/Component";
import Data from "../../Data/fakeData"

export default class WeatherForecastItem extends Component {
  constructor(host, props) {
    super(host, props);

  }

  render() {
      //future weather item
      let futureWeatherItem = document.createElement('div');
      futureWeatherItem.classList.add('futureWeatherItem12312');
      futureWeatherItem.classList.add('wrapperStyle213');

      //future weather icon
      let weatherIcon = document.createElement('img');
      weatherIcon.setAttribute('src',this.props.image);
      weatherIcon.setAttribute('alt','Sky status');
      weatherIcon.classList.add('futureWeatherItem__img');

      //future weather temp
      let futureWeather__temp = document.createElement('p');
      futureWeather__temp.classList.add('futureWeatherItem__temp');
      futureWeather__temp.textContent = this.props.temp;

      //future weather time
      let futureWeather__time = document.createElement('p');
      futureWeather__time.classList.add('futureWeatherItem__time');
      futureWeather__time.textContent = this.props.time;

      //future weather date
      let futureWeather__date = document.createElement('p');
      futureWeather__date.classList.add('futureWeatherItem__date');
      futureWeather__date.textContent = this.props.date;

      //future weather sky status
      let futureWeather__skyStatus = document.createElement('p');
      futureWeather__skyStatus.classList.add('futureWeatherItem__skyStatus');
      futureWeather__skyStatus.textContent = this.props.skyStatus;

      //append elements to item
      futureWeatherItem.append(

      );


      return [
          futureWeather__skyStatus,
          futureWeather__temp,
          futureWeather__time,
          futureWeather__date
      ];
  }

}


