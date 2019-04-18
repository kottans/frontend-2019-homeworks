import Component from "../../framework/Component";
import {SearchBar} from "../Header/SearchBar";
import {LocationsList} from "../Header/LocationsList";
import {Main} from "../Main";

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: SearchBar,
                classList: "search-wrapper"
            },
            {
                tag: Main,
                classList: "weather-wrapper",

            },
            {
                tag: LocationsList,
                classList: "favor-hist__wrapper",
            }
        ];
    }
}
