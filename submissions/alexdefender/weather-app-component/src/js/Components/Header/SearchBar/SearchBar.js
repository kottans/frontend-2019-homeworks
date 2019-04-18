import Component from "../../../framework/Component";
import WeatherDataService from "../../../../services/WeatherDataService";
import AppState from "../../../../services/AppState";

export default class SearchBar extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("init", this.getInfoFromInput);
    }

    init() {
        ["getInfoFromInput"]
            .forEach(methodName => this[methodName] = this[methodName].bind(this));
    }

    getInfoFromInput(e) {
        let input;
        if (e.target !== undefined) {
            input = document.getElementById("search").value;
        } else {
            input = e;
            document.getElementById("search").value = e;
        }
        WeatherDataService.getCurrentWeather(input)
            .then(currentWeather => {
                WeatherDataService.getWeatherForecast(input)
                    .then(weatherForecast => {
                        if (currentWeather.message === "city not found") {
                            alert("No found city, please correct name!");
                            return;
                        }
                        AppState.update("currentWeather", currentWeather);
                        AppState.update("weatherForecast", weatherForecast);
                        AppState.update("history", input);
                    });
            });
    }

    render() {
        return [
            {
                tag: "input",
                classList: ["search"],
                attributes: [
                    {
                        name: "type",
                        value: "text"
                    },
                    {
                        name: "name",
                        value: "search"
                    },
                    {
                        name: "id",
                        value: "search"
                    },
                    {
                        name: "value",
                        value: "Kiev, UA"
                    },


                ]
            },
            {
                tag: "button",
                eventHandlers: {
                    click: this.getInfoFromInput,
                },
                classList: ["search__btn"],
                attributes: [
                    {
                        name: "type",
                        value: "submit"
                    }
                ]
            }
        ];
    }
}


