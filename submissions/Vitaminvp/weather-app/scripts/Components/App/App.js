import {Component} from "../../framework/";
import {Header} from "../Header/";
import {CurrentWeather} from "../CurrentWeather/";
import {WeatherForecast} from "../WeatherForecast";
import {Footer} from "../Footer";

class App extends Component {
    constructor(host, props) {
        super(host, props);
        this.props = props;
    }

    render() {
        return [
            {tag: Header},
            {tag: CurrentWeather},
            {tag: WeatherForecast},
            {tag: Footer}
        ];
    }
}

export default App;