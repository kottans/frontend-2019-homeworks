import Component from "../../../framework/Component";
import AppState from "../../../../services/AppState";

let unitTemp = "&units=metric";

export default class CurrentWeather extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("currentWeather", this.updateMyself);
        AppState.watch("unit", this.changeUnit);
    }

    init() {
        ["updateMyself", "changeUnit"]
            .forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.state = this.props;
    }

    changeUnit(unit) {
        unitTemp = unit;
    }

    updateMyself(state) {
        let currentDate = new Date().toISOString().substr(0, 10);
        let unit = "C";

        if (unitTemp !== "&units=metric") {
            unit = "F";
        }

        this.state = {
            "city": state.name,
            "country": state.sys.country,
            "date": currentDate,
            "temp": Math.round(state.main.temp),
            "unit": unit,
            "wind": Math.round(state.wind.speed),
            "description": state.weather[0].description.toUpperCase(),
            "icon": state.weather[0].icon,
            "clouds": state.clouds.all,
            "humidity": state.main.humidity,
            "pressure": state.main.pressure,
        };
        this.updateState(this.state);
    }

    render() {
        const {city, country, date, temp, unit, wind, description, icon, clouds, humidity, pressure} = this.state;

        return (Object.entries(this.state).length !== 0) ? [
            {
                tag: "div",
                children: [
                    {
                        tag: "h1",
                        content: `${city}, ${country}`
                    },
                    {
                        tag: "p",
                        content: date
                    },
                    {
                        tag: "div",
                        classList: "weather__today__main-values",
                        children: [
                            {
                                tag: "p",
                                classList: "weather__today__temp",
                                content: `${temp}&deg;${unit}`
                            },
                            {
                                tag: "ul",
                                children: [
                                    {
                                        tag: "li",
                                        content: `${wind} m/s`
                                    },
                                    {
                                        tag: "li",
                                        content: description
                                    }
                                ]
                            },
                            {
                                tag: "img",
                                classList: "weather__today__img",
                                attributes: [
                                    {
                                        name: "src",
                                        value: `http://openweathermap.org/img/w/${icon}.png`
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        tag: "p",
                        classList: "weather__today__description",
                        content: this.props.description
                    },
                    {
                        tag: "hr"
                    },
                    {
                        tag: "table",
                        classList: "weather__today__more-values",
                        children: [
                            {
                                tag: "tbody",
                                children: [
                                    {
                                        tag: "tr",
                                        children: [
                                            {
                                                tag: "th",
                                                content: "Clouds"
                                            },
                                            {
                                                tag: "td",
                                                content: `${clouds} %`
                                            }
                                        ]
                                    },
                                    {
                                        tag: "tr",
                                        children: [
                                            {
                                                tag: "th",
                                                content: "Humidity"
                                            },
                                            {
                                                tag: "td",
                                                content: `${humidity} %`
                                            }
                                        ]
                                    },
                                    {
                                        tag: "tr",
                                        children: [
                                            {
                                                tag: "th",
                                                content: "Pressure"
                                            },
                                            {
                                                tag: "td",
                                                content: `${pressure} hPa`
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ] : [];
    }
}
