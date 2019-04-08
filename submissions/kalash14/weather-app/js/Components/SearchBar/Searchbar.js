import Component from "../../framework/Component";
import { initAutocomplete } from "../../../Services/constants";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";
import UnitsToggle from "../UnitsToggle/UnitsToggle";
import FavouriteToggle from "../FavouriteToggle/FavouriteToggle";

export default class Searchbar extends Component {
    constructor(host, props) {
        super(host, props);
    }

    init() {
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.setAttribute("placeholder", "Location");
        this.input.setAttribute("required", "");
        this.input.setAttribute("autofocus", "");
        this.input.classList.add("main-search-input");

        [
            "handleSubmit",
            "handleForecastData",
            "checkItemAndPushToArray",
            "handleSmth"
        ].forEach(
            methodName => (this[methodName] = this[methodName].bind(this))
        );
    }

    handleSmth() {
        initAutocomplete(this.input, this.handleSubmit);
    }

    handleSubmit(place) {
        this.props.place = place.name;
        this.props.formattedPlace = place.formatted_address;
        this.props.placeId = place.id;

        WeatherDataService.getWeatherData(
            this.props.place,
            this.handleForecastData
        );

        this.input.value = "";
    }

    checkItemAndPushToArray(array) {
        if (
            array.filter(
                item =>
                    item.placeId === this.props.placeId ||
                    (this.state.weatherData && this.state.weatherData.placeId)
            ).length === 0
        ) {
            const placeObject = {
                place: this.props.place || this.state.weatherData.place,
                formattedPlace:
                    this.props.formattedPlace ||
                    this.state.weatherData.formattedPlace,
                placeId: this.props.placeId || this.state.weatherData.placeId
            };
            array.push(placeObject);
        }
    }

    handleForecastData(data) {
        if (data && data.length > 0) {
            const dataObj = {
                placeId: this.props.placeId,
                place: this.props.place,
                formattedPlace: this.props.formattedPlace
            };

            this.props.weatherData = {
                ...data[0],
                ...dataObj
            };
            this.props.weatherForecastData = data[1];
            AppState.update("WEATHERDATA", {
                weatherData: this.props.weatherData
            });
            AppState.update("WEATHERFORECASTDATA", {
                weatherForecastData: this.props.weatherForecastData
            });
            AppState.update("RECENTLYVIEWEDPLACES", dataObj);
        }
    }

    render() {
        return [
            {
                tag: "div",
                content: "",
                classList: ["search-block"],
                children: [
                    {
                        tag: FavouriteToggle
                    },
                    this.input,
                    {
                        tag: UnitsToggle
                    }
                ]
            }
        ];
    }
}
