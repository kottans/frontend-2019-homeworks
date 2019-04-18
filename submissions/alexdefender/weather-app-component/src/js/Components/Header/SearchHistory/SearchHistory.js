import AppState from "../../../../services/AppState";
import Component from "../../../framework/Component";

export default class SearchHistory extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch("history", this.updateMySelf);
    }

    init() {
        ["updateMySelf", "removeCityByClickBtn", "searchCityFromSearchList", "checkLocalStorage"]
            .forEach(methodName => this[methodName] = this[methodName].bind(this));
        this.historyState = [];
        this.checkLocalStorage();
    }

    checkLocalStorage() {
        if (this.historyState.length === 0 && localStorage["historyState"] !== undefined) {
            this.historyState = JSON.parse(localStorage["historyState"].slice(0));
        }
    }

    updateMySelf(state) {
        if (!this.historyState.includes(state)) {
            this.historyState.push(state);
        }
        localStorage["historyState"] = JSON.stringify(this.historyState);
        this.updateState(this.historyState);
    }

    removeCityByClickBtn(e) {
        this.historyState = this.historyState.filter(city => city !== e.target.id.substr(0, e.target.id.length - 2));
        this.updateState(this.historyState);
    }

    searchCityFromSearchList(e) {
        if (this.historyState.length === 0) {
            localStorage.removeItem("historyState");
        } else {
            localStorage["historyState"] = this.historyState.slice(0);
        }
        if (e.target.innerText === "") return;
        AppState.update("init", e.target.innerText);
    }

    render() {
        return this.historyState !== undefined ?
            this.historyState.map(city => {

                return {
                    tag: "div",
                    content: city,
                    eventHandlers: {
                        click: this.searchCityFromSearchList
                    },

                    children: [
                        {
                            tag: "button",
                            eventHandlers: {
                                click: this.removeCityByClickBtn,
                            },
                            attributes: [
                                {
                                    name: "id",
                                    value: `${city}-h`
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
