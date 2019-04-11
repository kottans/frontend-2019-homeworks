import {Component} from "../../framework/";
import {WeatherForecastItem} from "./WeatherForecastItem";
import AppState from "../../Services/AppState";

class WeatherForecast extends Component {
    constructor(host, props) {
        super(host, props);
        AppState.watch('FORECAST', this.weatherForecastUpdate);
        AppState.watch('UNIT', this.unitUpdate);
    }
    componentWillMount() {
        this.weatherForecastUpdate = this.weatherForecastUpdate.bind(this);
        this.unitUpdate = this.unitUpdate.bind(this);
        const localStorageUnit = localStorage.getItem('unit')?JSON.parse(localStorage.getItem('unit')):'CE';
        this.state = {list: [], unit: localStorageUnit};
    }
    unitUpdate(unit){
        this.updateState(unit);
    }
    weatherForecastUpdate(weatherForecast){
        this.updateState({list: weatherForecast.list});
    }

    render() {
        return [
            {
                tag: 'section',
                content: '',
                children: [
                    {
                        tag: 'div',
                        content: '',
                        classList: ['container'],
                        children: [
                            {
                                tag: 'div',
                                classList: ['row', 'renderItems'],
                                children: (this.state.list.length)
                                    ? this.state.list
                                        .filter((item, i) => i%7 === 0)
                                        .map(item => {
                                        return {
                                            tag: WeatherForecastItem,
                                            props: {...item, unit: this.state.unit}
                                        };
                                    })
                                    : '',
                            },
                        ]
                    },
                ]
            },
        ];
    }
}


export default WeatherForecast;
