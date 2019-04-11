import { URL1, URL5, KEY } from './constants';
import AppState from "../scripts/Services/AppState";

class WeatherDataService {

    subscribeForWeather(query) {
        if (query){
            Promise.all([this.getWeather(URL1, query), this.getWeather(URL5, query)])
                .then(weather => {
                        AppState.update('FORECAST', {list: weather[1].list});
                        AppState.update('CURRENT', {...weather[0]});
                });
        } else {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const {longitude:lon, latitude:lat} = position.coords;
                    return Promise.all([this.getWeatherInit(URL1, lon, lat), this.getWeatherInit(URL5, lon, lat)])
                        .then(weather => {
                            AppState.update('FORECAST', {list: weather[1].list});
                            AppState.update('CURRENT', {...weather[0]});
                        });
                })
            }
        }
    }

    getWeather(URL, query = ['Kiev', 'UA'], units = 'metric') {
        const city = query[0];
        const code = query.length >1 ? query[query.length - 1] : '';
        const url = `${URL}?q=${city}${code ? `,${code}` : ''}&appid=${KEY}&units=${units}`;
        return this._getData(url);
    }

    getWeatherInit(URL, lon, lat, units = 'metric'){
        const url = `${URL}?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`;
        return this._getData(url);
    }
    _getData(url) {
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return new Error(response.statusText);
                }
            });
    }
}

export default new WeatherDataService();