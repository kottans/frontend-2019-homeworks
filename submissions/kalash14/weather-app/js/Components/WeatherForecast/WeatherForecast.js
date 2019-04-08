import Component from "../../framework/Component";
import WeatherForecastItem from "../../Components/WeatherForecastItem/WeatherForecastItem";
import AppState from "../../../Services/AppState";

export default class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERFORECASTDATA", this.updateMyself);
        AppState.watch("WEATHERDATA", this.updateMyself);
        AppState.watch("CURRENTUNIT", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        const currentUnit = localStorage.getItem("currentUnit")
            ? JSON.parse(localStorage.getItem("currentUnit"))
            : "C";
        this.state = {
            currentUnit: currentUnit
        };
        this.updateMyself = this.updateMyself.bind(this);
    }

    createSortedList(list, object) {
        const hoursList = [];
        const indexesList = [3, 11, 19, 27, 35];

        indexesList.forEach(item => {
            const rawObj = {
                name: object.name
            };
            const finalObj = Object.assign(list[item], rawObj);
            hoursList.push(finalObj);
        });

        // console.log(hoursList);

        return hoursList;
    }

    render() {
        // console.log(this.state);
        this.props.daysList =
            this.state.weatherForecastData &&
            this.state.weatherForecastData.list.length > 0 &&
            this.state.weatherData
                ? this.createSortedList(
                      this.state.weatherForecastData.list,
                      this.state.weatherData
                  )
                : [];
        return [
            {
                tag: "div",
                classList: ["forecast-nearest-days"],
                children:
                    this.props.daysList.length > 0
                        ? this.props.daysList.map(listItem => {
                              return {
                                  tag: WeatherForecastItem,
                                  props: {
                                      ...listItem,
                                      currentUnit: this.state.currentUnit
                                  }
                              };
                          })
                        : ""
            }
        ];
    }
}
