import Component from "../../framework/Component";
import { Temperature } from "../Temperature";
import { Humidity } from "../Humidity";
import { Wind } from "../Wind";
import { Pressure } from "../Pressure";
import AppState from "../../Services/AppState";

import WeatherDataService from "../../Services/WeatherDataService";
import { timeConverter } from "../../helpers/helpers";


import imgUrlCloudsDay from "../../../img/weather-icons/animated/cloudy-day-3.svg";
import imgUrlCloudsNight from "../../../img/weather-icons/animated/cloudy-night-3.svg";
import imgUrlFewClouds from "../../../img/weather-icons/animated/cloudy-day-1.svg";
import imgUrlScatteredClouds from "../../../img/weather-icons/animated/cloudy-day-2.svg";
import imgUrlBrokenClouds from "../../../img/weather-icons/animated/cloudy-day-3.svg";
import imgUrlClearDay from "../../../img/weather-icons/animated/day.svg";
import imgUrlClearNight from "../../../img/weather-icons/animated/night.svg";
import imgUrlLightRain from "../../../img/weather-icons/animated/rainy-4.svg";
import imgUrlModerateRain from "../../../img/weather-icons/animated/rainy-2.svg";
import imgUrlRain from "../../../img/weather-icons/animated/rainy-6.svg";
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

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    this.geoLocationData();
    this.favStar = document.querySelector('.fav-button');
    AppState.watch("USERINPUT", this.updateMyself);
    AppState.watch("UNIT", this.computeUnit);
    AppState.watch("SHOWFAVOURITE", this.updateMyself);
    AppState.watch("SHOWFROMHISTORY", this.updateMyself);
    AppState.watch("SHOWDETAILFORECAST", this.showForecastItem);
  }

  init() {
    ['updateMyself', 'geoLocationData', 'changeUnitToImperial','changeUnitToMetric', 'computeUnit', 'toggleFavorite', 'checkActive', 'showForecastItem']
      .forEach(methodName => this[methodName] = this[methodName].bind(this));
    this.apiData = null;
    this.forecastData = null;
    this.state = {
      weatherType : 'weather',
      favorite: localStorage.getItem("favourite") ? JSON.parse(localStorage.getItem("favourite")) : [],
      unit : localStorage.getItem("unit") ? localStorage.getItem("unit") : 'metric',
      city: null,
      country: null,
      celsium: 'active',
      day: '',
      unitWind: 'm/s'
    }
  }

  computeUnit(updatedUnit){
    WeatherDataService.getCurrentWeather(updatedUnit.city, updatedUnit.unit).then(data => {
      this.apiData = data;
      this.updateState(updatedUnit)
    });
  }
  showForecastItem(currentItem) {
    WeatherDataService.getWeatherForecast(this.state.city, this.state.unit).then(data => {
      this.apiData = data.list[currentItem.currItem];
      this.forecastData = data;
      this.state.city = this.forecastData.city.name;
      this.state.country = this.forecastData.city.country;
      this.updateState(this.apiData);
    });
  }

  geoLocationData() {
    WeatherDataService.getWetherByGeolocation(this.state.weatherType, this.state.unit).then(data => {
      this.apiData = data;
      this.state.city = this.apiData.name;
      this.state.country = this.apiData.sys.country;
      this.state.day = this.apiData.dt < this.apiData.sys.sunset;
      AppState.update('ISDAY', this.state.day);
      this.updateState(this.apiData);
    });
  }

  updateMyself(userinput) {
    WeatherDataService.getCurrentWeather(userinput, this.state.unit).then(data => {
      this.apiData = data;
      this.state.city = this.apiData.name;
      this.state.day = this.apiData.dt < this.apiData.sys.sunset;
      this.state.country = this.apiData.sys.country;
      this.updateState(this.apiData)
    });
  }

  changeUnitToImperial(){
    localStorage.setItem('unit', 'imperial');
    AppState.update('UNIT', {
      city: this.state.city,
      unit: 'imperial',
      far: 'active',
      celsium: 'disable',
      unitWind: 'mph'
    })
  }

  changeUnitToMetric(){
    localStorage.setItem('unit', 'metric');
    AppState.update('UNIT', {
      city: this.state.city,
      unit: 'metric',
      far: 'disable',
      celsium: 'active',
      unitWind: 'm/s'
    })
  }

  checkActive() {
    setTimeout(() => {
      const favBTn = document.querySelector('.fav-button');
      const unitMetric = document.querySelector('.celsium');
      const unitImperial = document.querySelector('.farenheit');
      if(localStorage.getItem('unit') === 'metric' || !localStorage.getItem('unit')) {
        unitMetric.classList.add('active')
      } else {
        unitMetric.classList.remove('active');
      }
      if(localStorage.getItem('unit') === 'imperial') {
        unitImperial.classList.add('active');
      } else {
        unitImperial.classList.remove('active');
      }
      if(this.state.favorite.includes(`${this.state.city}, ${this.state.country}`)) {
        favBTn.classList.add('active');
      }
    }, 0);

  }

  toggleFavorite(){
    const favBTn = document.querySelector('.fav-button');
    favBTn.classList.toggle('active');
    const favItem = this.state.favorite.indexOf(`${this.state.city}, ${this.state.country}`);
    if(this.state.favorite.includes(`${this.state.city}, ${this.state.country}`)) {
      if(favItem !== -1) {
        this.state.favorite.splice(favItem, 1);
      }
    } else if(this.state.favorite.length < 5) {
      this.state.favorite.push(`${this.state.city}, ${this.state.country}`);
    }

    localStorage.setItem('favourite', JSON.stringify(this.state.favorite));
    AppState.update("FAVOURITE", this.state.favorite);
  }


  render() {
    if (this.apiData) {
      this.checkActive();
      return [
        {
          tag: "div",
          classList: ["container"],
          children: [
            {
              tag: "div",
              classList: ["container__inner"],
              children: [
                {
                  tag: "div",
                  classList: ["container__inner-head"],
                  children: [
                    {
                      tag: "div",
                      classList: ["container__inner-location"],
                      children: [
                        {
                          tag: "h2",
                          classList: ["location-header"],
                          content: `${this.apiData.name ?  this.apiData.name : this.forecastData.city.name}, ${
                            this.state.country
                          }`
                        },
                        {
                          tag: "button",
                          classList: [
                            "container__inputs-buttons",
                            "fav-button"
                          ],
                          eventHandlers: {
                            click: this.toggleFavorite,
                          },
                          attributes: [
                            { name: "type",
                            value: "button"
                            },
                            {
                              name: 'title',
                              value: 'Add to favorite'
                            }
                        ],
                          children: [
                            {
                              tag: "i",
                              classList: ["fa", "fa-star"],
                            }
                          ]
                        }
                      ]
                    },
                    {
                      tag: "div",
                      classList: ["avg-temperature"],
                      children: [
                        {
                          tag: "span",
                          classList: ["avg-temperature-item"],
                          content: `${Math.round(this.apiData.main.temp_min)}°`,
                          children: [
                            {
                              tag: "i",
                              classList: ["fa", "fa-thermometer-empty"]
                            }
                          ]
                        },
                        {
                          tag: "span",
                          classList: ["avg-temperature-item"],
                          content: `${Math.round(this.apiData.main.temp_max)}°`,
                          children: [
                            {
                              tag: "i",
                              classList: ["fa", "fa-thermometer-full"]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  tag: "div",
                  classList: ["container__inner-meta"],
                  children: [
                    {
                      tag: "div",
                      classList: [
                        "container__inner-left",
                        "container__inner-item"
                      ],
                      children: [
                        {
                          tag: "div",
                          classList: ["temperature__main"],
                          children: [
                            {
                              tag: Temperature,
                              classList: ["temperature__main-big"],
                              props: {
                                temperature: `${Math.round(
                                  this.apiData.main.temp
                                )}`,
                                unit: "C"
                              }
                            },
                            {
                              tag: "div",
                              classList: ["temperature__state"],
                              children: [
                                {
                                  tag: "button",
                                  classList: [
                                    "temperature__state-button",
                                    "celsium",
                                    `${this.state.celsium}`

                                  ],
                                  eventHandlers: {
                                    click: this.changeUnitToMetric,
                                  },
                                  content: "C°"
                                },
                                {
                                  tag: "button",
                                  classList: [
                                    "temperature__state-button",
                                    "farenheit",
                                    `${this.state.far}`
                                  ],
                                  eventHandlers: {
                                    click: this.changeUnitToImperial,
                                  },
                                  content: "F°"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          tag: "p",
                          classList: ["weather-state"],
                          content: `${this.apiData.weather[0]["description"]}`
                        }
                      ]
                    },
                    {
                      tag: "div",
                      classList: [
                        "container__inner-center",
                        "container__inner-item"
                      ],
                      content: `<img src="${getWeatherIcon(this.apiData.weather[0].main, this.state.day)}" alt="${this.apiData.weather[0].main}"/>`
                    }
                  ]
                },
                {
                  tag: "div",
                  classList: ["container__inner-bottom"],
                  children: [
                    {
                      tag: "div",
                      classList: ["day-date"],
                      children: [
                        {
                          tag: "p",
                          classList: ["day"],
                          content: `${timeConverter(
                            this.apiData.dt,
                            "dayweek"
                          )}`
                        },
                        {
                          tag: "i",
                          classList: ["fa", "fa-calendar-o"]
                        },
                        {
                          tag: "span",
                          classList: ["date"],
                          content: `${timeConverter(this.apiData.dt)}`
                        }
                      ]
                    },
                    {
                      tag: "div",
                      classList: ["rest-parameters"],
                      children: [
                        {
                          tag: Wind,
                          props: {
                            speed: `${this.apiData.wind.speed}`,
                            unit: this.state.unitWind
                          }
                        },
                        {
                          tag: Humidity,
                          props: {
                            quantity: `${this.apiData.main.humidity}`
                          }
                        },
                        {
                          tag: Pressure,
                          props: {
                            quantity: `${this.apiData.main.pressure}`,
                            unit: "hPa"
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
    } else {
      return [""];
    }
  }
}
