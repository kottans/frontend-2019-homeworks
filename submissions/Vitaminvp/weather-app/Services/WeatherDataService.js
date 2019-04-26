import { URL_CURRENT, URL_FORECAST, KEY } from './constants';
import AppState from "../scripts/Services/AppState";

class WeatherDataService {

    subscribeForWeather(query) {

        const promiseAll = (args) =>  Promise.all([...args])
            .then(weather => {
                const [ current, forecast ] = weather;
                AppState.update('CURRENT', {...current});
                AppState.update('FORECAST', {list: forecast.list});
            });

        if (query){
            const args = [this.getWeather(URL_CURRENT, query), this.getWeather(URL_FORECAST, query)];
            return promiseAll(args);
        } else {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const {longitude:lon, latitude:lat} = position.coords;
                    const args = [this.getWeatherInit(URL_CURRENT, lon, lat), this.getWeatherInit(URL_FORECAST, lon, lat)];
                    return promiseAll(args);
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


