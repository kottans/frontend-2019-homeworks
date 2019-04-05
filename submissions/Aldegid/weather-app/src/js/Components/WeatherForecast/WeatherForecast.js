import Component from "../../framework/Component";
import {WeatherForecastItem} from "../WeatherForecastItem";
import AppState from "../../Services/AppState";

import WeatherDataService from "../../Services/WeatherDataService"
import { timeConverter } from "../../helpers/helpers";

import imgUrlCloudsDay from "../../../img/weather-icons/animated/cloudy-day-3.svg";
import imgUrlCloudsNight from "../../../img/weather-icons/animated/cloudy-night-3.svg";
import imgUrlFewClouds from "../../../img/weather-icons/animated/cloudy-day-1.svg";
import imgUrlScatteredClouds from "../../../img/weather-icons/animated/cloudy-day-2.svg";
import imgUrlBrokenClouds from "../../../img/weather-icons/animated/cloudy-day-3.svg";
import imgUrlClearDay from "../../../img/weather-icons/animated/day.svg";
import imgUrlClearNight from "../../../img/weather-icons/animated/night.svg";
import imgUrlLightRain from "../../../img/weather-icons/animated/rainy-1.svg";
import imgUrlModerateRain from "../../../img/weather-icons/animated/rainy-2.svg";
import imgUrlRain from "../../../img/weather-icons/animated/rainy-3.svg";
import imgUrlShowerRain from "../../../img/weather-icons/animated/rainy-7.svg";
import imgUrlSnow from "../../../img/weather-icons/animated/snowy-5.svg";
import imgUrlThunderstorm from "../../../img/weather-icons/animated/thunder.svg";
import imgUrlEzhik from "../../../img/ezhik.gif";

const getWeatherIcon = (wetherState, dayOrNight) => {
  if (wetherState === "Clear") {
    if(dayOrNight) {
      return imgUrlClearDay
    } else {
      return imgUrlClearNight
    }
  }
  if(wetherState === 'Clouds') {
    if(dayOrNight) {
      return imgUrlCloudsDay
    } else {
      return imgUrlCloudsNight
    }
  }
  if(wetherState === 'Haze' || wetherState === 'Mist' || wetherState === 'Smoke' || wetherState === 'Fog') {
    return imgUrlEzhik
  }
  if (wetherState === "Rain") {
    return imgUrlRain;
  }
  if (wetherState === "Snow") {
    return imgUrlSnow;
  }
  if (wetherState === "Thunderstorm") {
    return imgUrlThunderstorm;
  }
  if (wetherState === "Drizzle") {
    return imgUrlLightRain;
  }
};

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);
    this.apiData;
    this.geoLocationData();
    AppState.watch("USERINPUT", this.updateMyself);
    AppState.watch("UNIT", this.computeUnit);
    AppState.watch("SHOWFAVOURITE", this.updateMyself);
    AppState.watch("SHOWFROMHISTORY", this.updateMyself);
    AppState.watch("ISDAY", this.updateDayNight);
  }

  init() {
    ['updateMyself', 'computeUnit', 'geoLocationData', 'showDetailWeather', 'updateDayNight']
      .forEach(methodName => this[methodName] = this[methodName].bind(this));
    this.apiData = null;
      this.state = {
        weatherType : 'forecast',
        unit : localStorage.getItem("unit") ? localStorage.getItem("unit") : 'metric',
        city: null,
        day: null
    }
  }

  showDetailWeather(e) {
    AppState.update('SHOWDETAILFORECAST', {
      currItem: e.target.dataset.item,
      isDay: this.state.day
    });
  }

  computeUnit(updatedUnit){
    WeatherDataService.getWeatherForecast(updatedUnit.city, updatedUnit.unit).then(data => {
      this.apiData = data;
      this.updateState(updatedUnit);
    });
  }

  geoLocationData() {
    return WeatherDataService.getWetherByGeolocation(this.state.weatherType, this.state.unit).then(data => {
      this.apiData = data;
      this.state.city = this.apiData.city.name;
      this.updateState(this.apiData);
    });
  }

  updateDayNight(bool) {
    this.state.day = bool;
    this.updateState(this.state.day);
  }

  updateMyself(userinput) {
    WeatherDataService.getWeatherForecast(userinput, this.state.unit).then(data => {
      this.apiData = data;
      this.state.city = this.apiData.city.name;
      this.updateState(this.apiData);
    });
  }

  render() {
    if(this.apiData){
      return [
        {
          tag: 'div',
          classList: ["container", "container-small"],
          children: [
            {
              tag: 'div',
              classList: ["container__inner-small"],
              eventHandlers: {
                click: this.showDetailWeather
              },
              children: [
                {
                  tag: WeatherForecastItem,
                  classList: ['container__inner-small-item'],
                  props: {
                    weekDay: `${timeConverter(this.apiData.list[0].dt, "dayweek")}`,
                    imgUrl: getWeatherIcon(this.apiData.list[0].weather[0].main, this.state.day),
                    temperature: `${this.apiData.list[0].main.temp}`
                  },
                  attributes: [
                    {
                      name: 'data-item',
                      value: '0'
                    }
                  ],
                },
                {
                  tag: WeatherForecastItem,
                  classList: ['container__inner-small-item'],
                  props: {
                    weekDay: `${timeConverter(this.apiData.list[7].dt, "dayweek")}`,
                    imgUrl: getWeatherIcon(this.apiData.list[7].weather[0].main, this.state.day),
                    temperature: `${this.apiData.list[7].main.temp}`
                  },
                  attributes: [
                    {
                      name: 'data-item',
                      value: '7'
                    }
                  ],
                },
                {
                  tag: WeatherForecastItem,
                  classList: ['container__inner-small-item'],
                  props: {
                    weekDay: `${timeConverter(this.apiData.list[15].dt, "dayweek")}`,
                    imgUrl: getWeatherIcon(this.apiData.list[15].weather[0].main, this.state.day),
                    temperature: `${this.apiData.list[15].main.temp}`
                  },
                  attributes: [
                    {
                      name: 'data-item',
                      value: '15'
                    }
                  ],
                },
                {
                  tag: WeatherForecastItem,
                  classList: ['container__inner-small-item'],
                  props: {
                    weekDay: `${timeConverter(this.apiData.list[23].dt, "dayweek")}`,
                    imgUrl: getWeatherIcon(this.apiData.list[23].weather[0].main, this.state.day),
                    temperature: `${this.apiData.list[23].main.temp}`
                  },
                  attributes: [
                    {
                      name: 'data-item',
                      value: '23'
                    }
                  ],
                },
                {
                  tag: WeatherForecastItem,
                  classList: ['container__inner-small-item'],
                  props: {
                    weekDay: `${timeConverter(this.apiData.list[31].dt, "dayweek")}`,
                    imgUrl: getWeatherIcon(this.apiData.list[31].weather[0].main, this.state.day),
                    temperature: `${this.apiData.list[31].main.temp}`
                  },
                  attributes: [
                    {
                      name: 'data-item',
                      value: '31'
                    }
                  ],
                },
                {
                  tag: WeatherForecastItem,
                  classList: ['container__inner-small-item'],
                  props: {
                    weekDay: `${timeConverter(this.apiData.list[39].dt, "dayweek")}`,
                    imgUrl: getWeatherIcon(this.apiData.list[39].weather[0].main, this.state.day),
                    temperature: `${this.apiData.list[39].main.temp}`
                  },
                  attributes: [
                    {
                      name: 'data-item',
                      value: '39'
                    }
                  ],
                },
              ]
            }
          ]

        }
      ];
    } else {
      return [''];
    }
  }
}
