import {Component} from "../../../framework/";
import {convertToDay, convertToData, convertTempUnit} from "../../../../Services/constants";
import AppState from "../../../Services/AppState";

class WeatherForecastItem extends Component{
    constructor(host, props) {
        super(host, props);
    }
    componentWillMount() {
        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        let stateToUpdate = {...this.props};
        delete stateToUpdate['sys'];
        AppState.update('CURRENT', stateToUpdate);
    }
    render() {
        const {dt, main, weather, unit} = this.props;
        return [
            {
                tag: 'div',
                classList: ['col-12'],
                children: [
                    {
                        tag: 'div',
                        classList: ['week__forecast'],
                        attributes: {name: 'id', value: dt},
                        children: [
                            {
                                tag: 'div',
                                classList: ['week__forecast_day'],
                                content: `${convertToDay(dt)}`
                            },
                            {
                                tag: 'div',
                                classList: ['week__forecast_data'],
                                content: `${convertToData(dt)}`
                            },
                            {
                                tag: 'div',
                                classList: ['week__forecast_img'],
                                content: `<img  src="https://openweathermap.org/img/w/${weather[0].icon}.png" alt="${weather[0].description}" title="${weather[0].description}" >`//'<i class="fas fa-cloud-sun-rain"></i>'
                            },
                            {
                                tag: 'div',
                                classList: ['week__forecast_temperature'],
                                content: `${main ? convertTempUnit(main.temp, unit):''}`
                            },
                        ]
                    },
                ],
                eventHandler: {
                    click: this.onClick
                }
            },
        ];
    }
}

export default WeatherForecastItem;