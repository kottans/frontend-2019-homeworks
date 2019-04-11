import {Component} from "../../framework/";
import {convertToData, convertToDay, convertTempUnit, convertWind} from "../../../Services/constants";
import AppState from "../../Services/AppState";

class CurrentWeather extends Component{
    constructor(host, props) {
        super(host, props);
        AppState.watch('CURRENT', this.weatherCurrentUpdate);
        AppState.watch('UNIT', this.unitUpdate);
    }

    componentWillMount() {
        const localStorageUnit = localStorage.getItem('unit')?JSON.parse(localStorage.getItem('unit')):'CE';
        this.state = {unit: localStorageUnit};
        this.weatherCurrentUpdate = this.weatherCurrentUpdate.bind(this);
        this.unitUpdate = this.unitUpdate.bind(this);
    }
    unitUpdate(unit){
        this.updateState(unit);
    }
    weatherCurrentUpdate(weatherCurrent){
        this.updateState({...weatherCurrent});
    }

    render() {
        const { dt, name, sys, wind, main, weather, id, unit } = this.state || '';
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
                                classList: ['row'],
                                children: [
                                    {
                                        tag: 'div', classList: ['col-12'],
                                        children: [
                                            {
                                                tag: 'div',
                                                classList: ['forecast'],
                                                children: [
                                                    {
                                                        tag: 'h2',
                                                        classList: ['forecast__city'],
                                                        content: `${name?name:''}${sys&&sys.country?`, ${sys.country}`:''}`,
                                                        attributes: [
                                                            {name: 'id', value: id},
                                                        ],
                                                    },

                                                    {
                                                        tag: 'div',
                                                        classList: ['container'],
                                                        children: [
                                                            {
                                                                tag: 'div',
                                                                classList: ['row'],
                                                                children: [
                                                                    {
                                                                        tag: 'div',
                                                                        classList: ['col-4'],
                                                                        children: [
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__day'],
                                                                                content: `${dt?convertToDay(dt, 'long'):''}`
                                                                            },
                                                                            {
                                                                                tag: 'time',
                                                                                classList: ['forecast__date'],
                                                                                content: `${dt?convertToData(dt):''}`
                                                                            },
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__wind'],
                                                                                content: `Wind ${wind?convertWind(wind.speed, unit):''}`
                                                                            },
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__humidity'],
                                                                                content: `${main?main.humidity:''} %`
                                                                            },
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__pressure'],
                                                                                content: `${main?main.pressure:''} hPa`
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        tag: 'div',
                                                                        classList: ['col-4'],
                                                                        children: [
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__img'],
                                                                                content: `<img  src='https://openweathermap.org/img/w/${weather?weather[0].icon:'01d'}.png' alt='${weather?weather[0].description:''}' title='${weather?weather[0].description:''}' >`
                                                                            },
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__weather'],
                                                                                content: weather?weather[0].description:''
                                                                            },
                                                                        ],
                                                                    },
                                                                    {
                                                                        tag: 'div',
                                                                        classList: ['col-4'],
                                                                        children: [
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__temperature'],
                                                                                children: [
                                                                                    {
                                                                                        tag: 'div',
                                                                                        classList: ['forecast__temperature_min'],
                                                                                        content: `${ main ? convertTempUnit( main.temp_min, unit):''}`
                                                                                    },
                                                                                    {
                                                                                        tag: 'div',
                                                                                        classList: ['forecast__temperature_max'],
                                                                                        content: `${ main ? convertTempUnit( main.temp_max, unit):''}`
                                                                                    },
                                                                                ]
                                                                            },
                                                                            {
                                                                                tag: 'div',
                                                                                classList: ['forecast__temperature_current'],
                                                                                content: `${ main ? convertTempUnit( main.temp, unit):''}`                                                                          },
                                                                        ],
                                                                    }
                                                                ],
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                        ]
                                    },
                                ],
                            },
                        ]
                    },
                ]
            },
        ];
    }
}

export default CurrentWeather;