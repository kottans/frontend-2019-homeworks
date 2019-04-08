import { apiKey } from "./constants";
import { currentWeaterURLString } from "./constants";
import { weatherForecastURLString } from "./constants";

class WeatherDataService {
    constructor() {
        this.getWeatherData = this.getWeatherData.bind(this);
    }

    getWeatherURLS(url, city) {
        return `${url}${city}&appid=${apiKey}&units=metric`;
    }

    getWeather(urls, callback) {
        return Promise.all(urls.map(u => fetch(u)))
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(result => {
                callback(result);
            });
    }

    getWeatherData(cityName, callBack) {
        const urlsArray = [
            this.getWeatherURLS(currentWeaterURLString, cityName),
            this.getWeatherURLS(weatherForecastURLString, cityName)
        ];

        this.getWeather(urlsArray, callBack);
    }
}

export default new WeatherDataService();
