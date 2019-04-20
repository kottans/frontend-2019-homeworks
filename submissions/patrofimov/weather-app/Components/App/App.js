import Component from "../../framework/Component";
import { CurrentWeather } from "../CurrentWeather";
import { SearchBar } from "../SearchBar";
import { WeatherForecast } from "../WeatherForecast";
import ComponentFactory from "../../framework/ComponentFactory";
import { FavouriteLocations } from "../FavouriteLocations";
import { SearchHistory } from "../SearchHistory";
import {
  bindScope,
  toggleInStorage,
  pushToStorage,
  isInStorage
} from "../../utils";
import { normalize } from "path";
import AppState from "../../Services/AppState";
import { UNITS_TYPES } from "../../config";

export default class App extends Component {
  constructor(host, props = {}) {
    super(host);
  }

  onSubmit() {
    event.preventDefault();
    event.stopPropagation();
    const value = document.querySelector("#search-input").value;
    const unit = document.querySelector(".unit-active .wi-fahrenheit")
      ? UNITS_TYPES.imperial
      : UNITS_TYPES.metric;
    this.updateState({
      value,
      unit
    });
  }

  init() {
    this.state = {
      value: "",
      unit: UNITS_TYPES.metric,
      fav: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const result = this.state;

    return [
      {
        tag: "form",

        eventHandlers: {
          submit: this.onSubmit
        },

        attributes: [
          {
            name: "autocomplete",
            value: "off"
          },
          {
            name: "target",
            value: "#"
          }
        ],
        children: [
          {
            tag: SearchBar,
            props: {
              query: result ? result.value : ""
            }
          },

          {
            tag: "div",

            attributes: [
              {
                name: "id",
                value: "favourite-container"
              }
            ],
            children: [
              {
                tag: FavouriteLocations,
                props: {
                  query: result
                }
              },

              {
                tag: SearchHistory,
                props: {
                  query: result
                }
              }
            ]
          },
          {
            tag: "div",

            attributes: [
              {
                name: "id",
                value: "weather-container"
              }
            ],
            children: [
              {
                tag: CurrentWeather,
                props: {
                  query: result,
                  unit: result ? result.unit : UNITS_TYPES.metric,
                  fav: result ? result.fav : false
                }
              },

              {
                tag: WeatherForecast,
                props: {
                  query: result,
                  unit: result ? result.unit : UNITS_TYPES.metric
                }
              }
            ]
          }
        ]
      }
    ];
  }
}

ComponentFactory.register(App);
