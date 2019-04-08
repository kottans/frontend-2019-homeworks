import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { putItemToLocalStorage } from "../../../Services/constants";
import { scrollableBlockWrapClassFavourite } from "../../../Services/constants";
import WeatherDataService from "../../../Services/WeatherDataService";
import PerfectScrollbar from "perfect-scrollbar";

export default class FavouriteLocations extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("WEATHERDATA", this.weatherCurrentUpdate);
        AppState.watch("ISFAVOURITEPLACE", this.updateMyself);
        AppState.watch("FAVOURITEPLACEDATA", this.handleFavouritePlace);
    }
    updateMyself(substate) {
        this.updateState(substate);
        this.handleSmth();
    }

    handleSmth() {
        const scrollableWrap = document.querySelector(
            `.${scrollableBlockWrapClassFavourite}`
        );
        new PerfectScrollbar(scrollableWrap);
    }

    init() {
        const storageFavouritePlaces = localStorage.getItem("favouritePlaces")
            ? JSON.parse(localStorage.getItem("favouritePlaces"))
            : [];

        this.state = {
            storageFavouritePlaces: storageFavouritePlaces
        };

        [
            "updateMyself",
            "clearFavouritePlacesList",
            "getWeatherByPlaceItem",
            "handleForecastData",
            "handleFavouritePlace",
            "weatherCurrentUpdate"
        ].forEach(
            methodName => (this[methodName] = this[methodName].bind(this))
        );
    }

    weatherCurrentUpdate(weatherCurrent) {
        const matchedItem = this.state.storageFavouritePlaces.find(item => {
            return item.placeId === weatherCurrent.weatherData.placeId;
        });

        let isFav = matchedItem ? true : false;

        if (weatherCurrent.weatherData.placeId) {
            AppState.update("ISFAVOURITEPLACE", { isFavourite: isFav });
        }
    }

    handleFavouritePlace(place) {
        const matchedItem = this.state.storageFavouritePlaces.find(item => {
            return item.placeId === place.placeId;
        });

        if (matchedItem) {
            this.updateState({
                storageFavouritePlaces: (this.state.storageFavouritePlaces = this.state.storageFavouritePlaces.filter(
                    item => item.placeId !== place.placeId
                ))
            });

            AppState.update("ISFAVOURITEPLACE", { isFavourite: false });
        } else {
            this.updateState({
                storageFavouritePlaces: [
                    ...this.state.storageFavouritePlaces,
                    {
                        place: place.place,
                        formattedPlace: place.formattedPlace,
                        placeId: place.placeId
                    }
                ]
            });

            AppState.update("ISFAVOURITEPLACE", { isFavourite: true });
        }

        putItemToLocalStorage(
            "favouritePlaces",
            this.state.storageFavouritePlaces
        );
    }

    clearFavouritePlacesList() {
        this.updateState({
            storageFavouritePlaces: []
        });
        AppState.update("ISFAVOURITEPLACE", { isFavourite: false });
        putItemToLocalStorage(
            "favouritePlaces",
            this.state.storageFavouritePlaces
        );
    }

    getWeatherByPlaceItem({ target }) {
        if (target.matches(".user-activity-list-item")) {
            this.props.itemDataName = target.dataset.name;
            this.props.placeId = target.dataset.placeid;

            if (!this.state.weatherData) {
                WeatherDataService.getWeatherData(
                    this.props.itemDataName,
                    this.handleForecastData
                );
            } else {
                if (this.state.weatherData.placeId !== this.props.placeId) {
                    WeatherDataService.getWeatherData(
                        this.props.itemDataName,
                        this.handleForecastData
                    );
                } else {
                    return;
                }
            }
        }
    }

    // getWeatherData(cityName) {
    //     const urlsArray = [
    //         WeatherDataService.getWeatherURLS(currentWeaterURLString, cityName),
    //         WeatherDataService.getWeatherURLS(
    //             weatherForecastURLString,
    //             cityName
    //         )
    //     ];

    //     WeatherDataService.getWeather(urlsArray, this.handleForecastData);
    // }

    handleForecastData(data) {
        if (data && data.length > 0) {
            this.props.weatherData = {
                ...data[0],
                placeId: this.props.placeId
            };
            this.props.weatherForecastData = data[1];
            AppState.update("WEATHERDATA", {
                weatherData: this.props.weatherData
            });
            AppState.update("WEATHERFORECASTDATA", {
                weatherForecastData: this.props.weatherForecastData
            });
        }
    }

    render() {
        // console.log(this.state);

        return [
            {
                tag: "div",
                classList: ["user-activity-item"],
                children: [
                    {
                        tag: "div",
                        classList: ["user-activity-header"],
                        children: [
                            {
                                tag: "h3",
                                classList: [
                                    "user-activity-title",
                                    "user-activity-title-fav"
                                ],
                                content: "favourite"
                            },
                            {
                                tag: "button",
                                classList: [
                                    "remove-button",
                                    "remove-button-favourite"
                                ],
                                eventHandlers: {
                                    click: this.clearFavouritePlacesList
                                }
                            }
                        ]
                    },
                    {
                        tag: "div",
                        classList: ["user-activity-content"],
                        children: [
                            {
                                tag: "ul",
                                classList: [
                                    "user-activity-list",
                                    "user-activity-list-favourite"
                                ],
                                children: this.state.storageFavouritePlaces.map(
                                    placeItem => {
                                        return {
                                            tag: "li",
                                            classList: [
                                                "user-activity-list-item"
                                            ],
                                            content:
                                                placeItem.formattedPlace ||
                                                placeItem.name,
                                            attributes: [
                                                {
                                                    name: "data-name",
                                                    value:
                                                        placeItem.place ||
                                                        placeItem.name
                                                },
                                                {
                                                    name: "data-placeid",
                                                    value: placeItem.placeId
                                                }
                                            ]
                                        };
                                    }
                                ),
                                eventHandlers: {
                                    click: this.getWeatherByPlaceItem
                                }
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
