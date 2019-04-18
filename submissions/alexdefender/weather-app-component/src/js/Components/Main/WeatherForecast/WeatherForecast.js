import Component from "../../../framework/Component";
import {WeatherForecastItem} from "../WeatherForecastItem/index";
import AppState from "../../../../services/AppState";

const WEATHER_FORECAST_TIME = "12:00:00";
let unitTemp = "&units=metric";

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("weatherForecast", this.updateMyself);
        AppState.watch("unit", this.changeUnit);
    }

    init() {
        ["updateMyself", "convertObjectToArrayForRender", "changeUnit"]
            .forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.state = this.props;
    }

    changeUnit(unit) {
        unitTemp = unit;
    }

    updateMyself(state) {
        let unit = "C";

        if (unitTemp !== "&units=metric") {
            unit = "F";
        }
        const newState = state.list
            .filter(weatherForecast =>
                weatherForecast.dt_txt.includes(WEATHER_FORECAST_TIME))
            .filter((weatherForecast, i) => 0 < i && i < 4)
            .map(weatherData => {
                return {
                    "main": weatherData.weather[0].main,
                    "date": weatherData.dt_txt.substr(0, 10),
                    "icon": weatherData.weather[0].icon,
                    "temp": Math.round(weatherData.main.temp),
                    "unit": unit,
                    "wind": Math.round(weatherData.wind.speed),
                    "description": weatherData.weather[0].description.toUpperCase(),
                };
            });
        this.updateState(newState);
    }

    convertObjectToArrayForRender(obj) {
        const render = [];
        Object.entries(obj).forEach(weatherForecast => {
            const {main, date, icon, temp, unit, wind, description} = weatherForecast[1];
            render.push({
                    tag: WeatherForecastItem,
                    props: {
                        main: main,
                        date: date,
                        icon: icon,
                        temp: temp,
                        unit: unit,
                        wind: wind,
                        description: description
                    },
                    classList: ["weather__days-3__day"]
                }
            );

        });

        return render;
    }

    render() {
        return this.convertObjectToArrayForRender(this.state);
    }
}
