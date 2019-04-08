import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";
import { putItemToLocalStorage } from "../../../Services/constants";

export default class FavouriteToggle extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("ISFAVOURITEPLACE", this.updateMyself);
        AppState.watch("WEATHERDATA", this.updateMyself);
    }

    updateMyself(substate) {
        this.updateState(substate);
    }

    init() {
        this.updateMyself = this.updateMyself.bind(this);
        this.handleFavouritePlace = this.handleFavouritePlace.bind(this);
        this.state = {
            isFavourite: false
        };
    }

    handleFavouritePlace({ target }) {
        if (target.matches(".add-to-favourite")) {
            // console.log(this.state);

            if (this.state.weatherData) {
                const formattedPlace =
                    this.state.weatherData.formattedPlace ||
                    this.state.weatherData.name;
                const placeName =
                    this.state.weatherData.place || this.state.weatherData.name;
                const placeId = this.state.weatherData.placeId;

                AppState.update("FAVOURITEPLACEDATA", {
                    placeId: placeId,
                    place: placeName,
                    formattedPlace: formattedPlace
                });
            } else {
                return;
            }
        }
    }

    render() {
        return [
            {
                tag: "button",
                classList: [
                    "add-to-favourite",
                    this.state.isFavourite
                        ? "add-to-favourite-active"
                        : "button"
                ],
                eventHandlers: {
                    click: this.handleFavouritePlace
                }
            }
        ];
    }
}
