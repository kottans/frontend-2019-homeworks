import Component from "../../framework/Component";
import WeatherDataService from "../../Services/WeatherDataService";
import { moodImagery } from "../../../../src/assets/mood/imagery/moodimagery.js";
import ComponentFactory from "../../framework/ComponentFactory";
import { ICON_URL, ICON_EXT, UNITS_TYPES } from "../../config";
import {
  bindScope,
  toggleInStorage,
  pushToStorage,
  isInStorage
} from "../../utils";
import AppState from "../../Services/AppState";

export default class CurrentWeather extends Component {
  constructor(host, props) {
    super(host, props);
    this.onServerResponse = this.onServerResponse.bind(this);
    if (props.query) {
      this.onServerResponse(WeatherDataService.getCurrentWeather(props.query));
    }
  }

  onServerResponse(callback, subState) {
    callback.then(data => {
      const query = subState ? subState : this.props;
      const result = {
        city: data.name + ", " + data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
        wind: {
          speed: Math.round(data.wind.speed),
          unit: query.unit == UNITS_TYPES.metric ? "m/s" : "yd/s"
        },
        hum: {
          value: data.main.humidity,
          unit: "%"
        },
        press: {
          value: Math.round(data.main.pressure),
          unit: query.unit == UNITS_TYPES.metric ? "atm" : "kip"
        },
        descr: data.weather[0].description,
        temp: {
          value: Math.round(data.main.temp),
          unit: query.unit
        },
        icon: ICON_URL + data.weather[0].icon + ICON_EXT,
        unit: query.unit,
        isReady: true
      };
      result.fav = isInStorage(result.city, "likedStorage");
      this.updateState(result);
    });
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  init() {
    this.state = {
      city: "",
      lat: "",
      lon: "",
      wind: {},
      hum: {},
      press: {},
      descr: "",
      temp: {},
      icon: "",
      fav: false,
      unit: UNITS_TYPES.metric,
      isReady: false
    };
    this.updateMyself = this.updateMyself.bind(this);
    this.onClickFav = this.onClickFav.bind(this);
    this.onClickUnit = this.onClickUnit.bind(this);
  }

  onClickUnit(e) {
    const activeBtn = e.target;
    if (
      activeBtn.classList.contains("wi-celsius") ||
      activeBtn.classList.contains("wi-fahrenheit")
    ) {
      activeBtn.classList.toggle("unit-active");
      const btn = document.querySelector(
        activeBtn.classList.contains("wi-celsius")
          ? ".wi-fahrenheit"
          : ".wi-celsius"
      );
      btn.classList.toggle("unit-active");
      e.preventDefault();
      const data = {
        value: document.querySelector("#search-input").value,
        unit: activeBtn.classList.contains("wi-celsius")
          ? UNITS_TYPES.imperial
          : UNITS_TYPES.metric
      };
      this.onServerResponse(WeatherDataService.getCurrentWeather(data), data);
      AppState.update("UNIT", data);
    }
  }

  onClickFav(e) {
    const cityFullName = document.querySelector("#wt-cityFull").innerText;
    const activeBtn = e.target;

    if (
      activeBtn.classList.contains("favourite-no") ||
      activeBtn.classList.contains("favourite-yes")
    ) {
      const btnFavNo = document.querySelector("#favourite-no");
      btnFavNo.classList.toggle("display-none");

      const btnFavYes = document.querySelector("#favourite-yes");
      btnFavYes.classList.toggle("display-none");

      toggleInStorage(cityFullName, "likedStorage");

      e.preventDefault();

      AppState.update("FAV", {
        fav: isInStorage(cityFullName, "likedStorage")
      });
    }
  }

  render() {
    const result = this.state;

    if (result.isReady) {
      pushToStorage(result.city, "historyStorage");
      AppState.update("CITY", {});
    }

    return `<div id="weather-today-main" class="weather-today ${
      result.isReady ? "weather-visible" : "weather"
    }">
    <div class="wt-row" on-click={this.onClickFav}>
        <button id="favourite-no" class="favourite-no btn-frameless btn-round ${
          !result.fav ? "" : "display-none"
        }" title="Add to favourites!"><i class="material-icons favourite-no">favorite_border</i></button>
        <button id="favourite-yes" class="favourite-yes btn-frameless btn-round ${
          result.fav ? "" : "display-none"
        }" title="Remove from favourites"><i class="material-icons favourite-yes">favorite</i></button>
        <div class="wt-main-city" id="wt-cityFull">${result.city}</div>
       
        <div class="wt-main-geo" id="wt-geoFull">${
          result.isReady ? result.lon + ", " + result.lat : ""
        }</div>
    </div>
    <div class="wt-row">
        <div class="wt-column">
            <div class="weather-item">
                <div class="wt-header">
                <img class="wt-icon" src="${moodImagery.iWind}"></img>
                </div>
                <div class="wt-data" id="wt-windSpeed">${
                  result.isReady ? result.wind.speed : ""
                }</div>
                <div class="wt-data" id="wt-windSpeedUnits">${
                  result.isReady ? result.wind.unit : ""
                }</div>
                <div class="wt-windAzimuth" id="wt-windAzimuth"></div>
            </div>
            <div class="weather-item">
                
                <div class="wt-header">
                <img class="wt-icon" src="${moodImagery.iHum}"></img>
                </div>
                <div class="wt-data" id="wt-humidity">${
                  result.isReady ? result.hum.value : ""
                }</div>
                <div class="wt-data">${result ? result.hum.unit : ""}</div>
            </div>
            <div class="weather-item">
                <div class="wt-header">
                <img class="wt-icon" src="${moodImagery.iBar}"></img>
                </div>
                <div class="wt-data" id="wt-pressure">${
                  result.isReady ? result.press.value : ""
                }</div>
                <div class="wt-data">${
                  result.isReady ? result.press.unit : ""
                }</div>
            </div>
        </div>
        <div class="wt-row-nowrap">
            <div class="wt-main-item wt-descr-icon" id="wt-descr-icon">
            <img src=${
              result.isReady ? result.icon : ""
            }  class ="wt-icon-img" />
            </div>
            <div class="wt-column">
                <div class="wt-row">
                    
                    <img class="wt-icon wt-icon-temp" src="${
                      moodImagery.iTemp
                    }"></img>
                    <div class="wt-temp" id="wt-temp">${
                      result.isReady ? result.temp.value : ""
                    }</div>
                    <div id="unit-switch" class="unit-switch" title="Change unit!" on-click={this.onClickUnit}>
                        <button data-unit="celsius" class="btn-frameless btn-unit-switch ${
                          result.unit == UNITS_TYPES.metric ? "unit-active" : ""
                        }" type="button">
                            <i class="wi wi-celsius"></i>
                        </button>
                        <button data-unit="fahrenheit" class="btn-frameless btn-unit-switch ${
                          result.unit != UNITS_TYPES.metric ? "unit-active" : ""
                        }" type="button">
                            <i class="wi wi-fahrenheit"></i>
                        </button>
                    </div>
                </div>
                <div class="wt-descr-main" id="wt-descr">${
                  result.isReady ? result.descr : ""
                }</div>
            </div>
        </div>
    </div>
</div>
`;
  }
}
ComponentFactory.register(CurrentWeather);
