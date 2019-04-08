import Component from "../../framework/Component";
import { Searchbar } from "../Searchbar";
import { CurrentWeather } from "../CurrentWeather";
import { WeatherForecast } from "../WeatherForecast";
import { FavouriteLocations } from "../FavouriteLocations";
import { SearchHistory } from "../SearchHistory";

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: "div",
                content: "",
                classList: ["app-container"],
                children: [
                    {
                        tag: "h1",
                        content: "Weather application",
                        classList: ["main-title"]
                    },
                    {
                        tag: Searchbar
                    },
                    {
                        tag: "div",
                        classList: ["search-results-container"],
                        children: [
                            {
                                tag: CurrentWeather
                            },
                            {
                                tag: WeatherForecast,
                                classList: ["forecast-nearest-days"]
                            }
                        ]
                    },
                    {
                        tag: "div",
                        classList: ["user-activity-wrap"],
                        children: [
                            {
                                tag: FavouriteLocations
                            },
                            {
                                tag: SearchHistory
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
