import Component from "../../framework/Component";
import AppState from "../../../Services/AppState";

export default class UnitsToggle extends Component {
    constructor(host, props) {
        super(host, props);
        this.isMetricUnitsCheck;
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
        this.handleUnits = this.handleUnits.bind(this);
    }

    handleUnits(event) {
        // console.log(event);

        AppState.update("CURRENTUNIT", {
            currentUnit: event.target.value
        });

        this.putUnitToLocalStorage();
    }

    putUnitToLocalStorage() {
        localStorage.setItem(
            "currentUnit",
            JSON.stringify(this.state.currentUnit)
        );
    }

    render() {
        // console.log(this.state);
        return [
            {
                tag: "select",
                classList: ["temperature-units"],
                children: [
                    {
                        tag: "option",
                        attributes: [
                            {
                                name: "value",
                                value: "C"
                            },
                            this.state.currentUnit === "C"
                                ? { name: "selected", value: "" }
                                : {}
                        ],
                        content: "°C"
                    },
                    {
                        tag: "option",
                        attributes: [
                            {
                                name: "value",
                                value: "F"
                            },
                            this.state.currentUnit === "F"
                                ? { name: "selected", value: "" }
                                : {}
                        ],
                        content: "°F"
                    }
                ],
                eventHandlers: {
                    change: this.handleUnits
                }
            }
        ];
    }
}
