import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
import WeatherDataService from "../../Services/WeatherDataService";
import { ICON_URL, ICON_EXT, UNITS_TYPES } from "../../config";
import { monthDay, hourMinute } from "../../utils";
import { WeatherForecastItem } from "../WeatherForecastItem";
import AppState from "../../Services/AppState";
export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);

    this.onServerResponse = this.onServerResponse.bind(this);
    if (props.query) {
      this.onServerResponse(WeatherDataService.getWeatherForecast(props.query));
    }
  }

  onServerResponse(callback, subState) {
    callback.then(data => {
      const query = subState ? subState : this.props;

      const datalist = data.list.map(function(item) {
        return {
          dt: monthDay(item.dt),
          time: hourMinute(item.dt),
          descr: item.weather[0].description,
          temp: {
            value: Math.round(item.main.temp),
            unit: query.unit === UNITS_TYPES.metric ? "°C" : "°F"
          },
          icon: ICON_URL + item.weather[0].icon + ICON_EXT,
          isReady: true
        };
      });

      this.updateState({
        datalist,
        isReady: true
      });
    });
  }

  init() {
    this.state = {
      datalist: [
        {
          dt: "",
          time: "",
          descr: "",
          temp: {},
          icon: "",
          isReady: false
        }
      ],
      isReady: false
    };
    this.updateMyself = this.updateMyself.bind(this);
    AppState.watch("UNIT", this.updateMyself);
  }

  updateMyself(subState) {
    this.onServerResponse(
      WeatherDataService.getWeatherForecast(subState),
      subState
    );
  }

  render() {
    const { datalist, isReady } = this.state;

    return {
      tag: "div",
      attributes: [
        {
          name: "id",
          value: "weather-forecast-main"
        }
      ],

      classList: [
        isReady ? "weather-visible" : "weather",
        "wt-row",
        "wt-row-spread"
      ],

      children: [
        ...datalist.map(data => ({
          tag: WeatherForecastItem,
          props: data
        }))
      ]
    };
  }
}

ComponentFactory.register(WeatherForecast);
