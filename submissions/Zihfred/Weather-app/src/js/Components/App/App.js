import Component from "../../framework/Component";

import {Temperature} from "../Temperature/";
import {SearchBlock} from "../SearchBlock";
import {WeatherNow} from "../WeatherNow";
import {WeatherForecast} from "../WeatherForecast";
import {SearchHistory} from "../SearchHistory";
import {Wind} from "../Wind";
import Data from "../../Data/fakeData"
import FavCities from "../favCities/favCities";

export default class App extends Component {
    constructor(host) {
        super(host);
    }

    render() {
        return [
            {
                tag: SearchBlock,
                wrapperTag: 'form',
                classList: ['search']
            },
            {
                tag: 'div',
                classList: ['cityBlock',],
                children:[
                    {
                        tag: SearchHistory,
                        wrapperTag: 'div',
                        classList: ['searchHistory', 'wrapperStyle'],
                        props: {
                            history: Data.history,
                        }
                    },
                    {
                        tag: FavCities,
                        wrapperTag: 'div',
                        classList: ['favCities', 'wrapperStyle'],
                        props: {
                            favCities: Data.favCities,
                        }
                    }
                ]
            },
            {
                tag: WeatherNow,
                classList: ['weatherNow', 'wrapperStyle'],
                props: {
                    city: Data.city,
                    humidity: Data.humidity,
                    wet: Data.wet,
                    wind: Data.wind,
                    windUnit: Data.windUnit,
                    pressure: Data.pressure,
                    pressureUnit: Data.pressureUnit
                }
            },
            {
               tag: WeatherForecast,
                classList: ['futureWeather'],
            },


        ]
    }
}
