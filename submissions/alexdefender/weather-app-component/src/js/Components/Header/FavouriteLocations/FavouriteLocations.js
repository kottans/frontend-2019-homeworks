import Component from "../../../framework/Component";
import AppState from "../../../../services/AppState";

export default class FavouriteLocations extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("favourite", this.updateMyself);
    }

    init() {
        ["updateMyself", "removeCityByClickBtn", "searchCityFromFavourite", "checkLocalStorage"]
            .forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.favouriteState = [];
        this.checkLocalStorage();
    }

    checkLocalStorage() {
        if (this.favouriteState.length === 0 && localStorage["favouriteState"] !== undefined) {
            this.favouriteState = JSON.parse(localStorage["favouriteState"].slice(0));
        }
    }

    updateMyself(state) {
        if (!this.favouriteState.includes(state) && Object.entries(state).length !== 0) {
            this.favouriteState.push(state);
        } else {
            this.favouriteState = this.favouriteState.filter(city => city !== state);
        }
        localStorage["favouriteState"] = JSON.stringify(this.favouriteState);
        this.updateState(this.favouriteState);
    }

    removeCityByClickBtn(e) {
        this.favouriteState = this.favouriteState.filter(city => city !== e.target.id.substr(0, e.target.id.length - 2));
        this.updateState(this.favouriteState);
    }

    searchCityFromFavourite(e) {
        if (this.favouriteState.length === 0) {
            localStorage.removeItem("favouriteState");
        } else {
            localStorage["favouriteState"] = this.favouriteState.slice(0);
        }

        if (e.target.innerText === "") return;
        AppState.update("init", e.target.innerText);
    }

    render() {
        return this.favouriteState !== undefined ?
            this.favouriteState.map(city => {
                return {
                    tag: "div",
                    content: city,
                    eventHandlers: {
                        click: this.searchCityFromFavourite
                    },
                    children: [
                        {
                            tag: "button",
                            eventHandlers: {
                                click: this.removeCityByClickBtn
                            },
                            attributes: [
                                {
                                    name: "id",
                                    value: `${city}-f`
                                },
                            ],
                            classList: ["fa", "fa-times"]
                        }
                    ]
                };
            })
            : [];
    }
}