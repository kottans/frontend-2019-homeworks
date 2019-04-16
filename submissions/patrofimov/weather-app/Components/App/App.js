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

export default class App extends Component {
  constructor(host, props = {}) {
    super(host);
  }

  onSubmit() {
    event.preventDefault();
    event.stopPropagation();

    const searchInput = document.querySelector("#search-input").value;
    const btnUnit = document.querySelector(".unit-active .wi-fahrenheit");
    const unit = btnUnit ? "imperial" : "metric";

    this.updateState({
      value: searchInput,
      unit: unit
    });

    console.log("OnSubmit!");
  }

  init() {
    this.state = {
      value: "",
      unit: "metric",
      fav: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    const data = this.state;

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
              query: data ? data.value : ""
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
                  query: data
                }
              },

              {
                tag: SearchHistory,
                props: {
                  query: data
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
                  query: data,
                  unit: data ? data.unit : "metric",
                  fav: data ? data.fav : false
                }
              },

              {
                tag: WeatherForecast,
                props: {
                  query: data,
                  unit: data ? data.unit : "metric"
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
