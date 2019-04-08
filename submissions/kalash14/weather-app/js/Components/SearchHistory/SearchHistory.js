import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import WeatherDataService from "../../../Services/WeatherDataService";
import { putItemToLocalStorage } from "../../../Services/constants";
import { scrollableBlockWrapClassHistory } from "../../../Services/constants";
import PerfectScrollbar from "perfect-scrollbar";

export default class SearchHistory extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("RECENTLYVIEWEDPLACES", this.updateSearchHistoryList);
        AppState.watch("WEATHERDATA", this.updateWeatherData);
    }

    handleSmth() {
        const scrollableWrap = document.querySelector(
            `.${scrollableBlockWrapClassHistory}`
        );
        new PerfectScrollbar(scrollableWrap);
    }

    init() {
        const storageRecentlyViewedList = localStorage.getItem(
            "recentlyViewedPlaces"
        )
            ? JSON.parse(localStorage.getItem("recentlyViewedPlaces"))
            : [];

        this.state = {
            storageRecentlyViewedList: storageRecentlyViewedList
        };

        [
            "updateWeatherData",
            "clearSearchHistoryList",
            "getWeatherByPlaceItem",
            "handleForecastData",
            "updateSearchHistoryList"
        ].forEach(
            methodName => (this[methodName] = this[methodName].bind(this))
        );
    }

    updateSearchHistoryList(historyItem) {
        const matchedItem = this.state.storageRecentlyViewedList.find(item => {
            return item.placeId === historyItem.placeId;
        });

        if (matchedItem) {
            this.updateState({
                storageRecentlyViewedList: (this.state.storageRecentlyViewedList = this.state.storageRecentlyViewedList.filter(
                    item => item.placeId !== historyItem.placeId
                ))
            });
        } else {
            this.updateState({
                storageRecentlyViewedList: [
                    ...this.state.storageRecentlyViewedList,
                    historyItem
                ]
            });
        }

        putItemToLocalStorage(
            "recentlyViewedPlaces",
            this.state.storageRecentlyViewedList
        );

        this.handleSmth();
    }

    updateWeatherData(substate) {
        this.updateState(substate);
        this.handleSmth();
    }

    clearSearchHistoryList() {
        this.updateState({
            storageRecentlyViewedList: []
        });

        putItemToLocalStorage(
            "recentlyViewedPlaces",
            this.state.storageRecentlyViewedList
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
                                    "user-activity-title-history"
                                ],
                                content: "recently viewed"
                            },
                            {
                                tag: "button",
                                classList: [
                                    "remove-button",
                                    "remove-button-history"
                                ],
                                eventHandlers: {
                                    click: this.clearSearchHistoryList
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
                                    "user-activity-list-history"
                                ],
                                children: this.state.storageRecentlyViewedList.map(
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
