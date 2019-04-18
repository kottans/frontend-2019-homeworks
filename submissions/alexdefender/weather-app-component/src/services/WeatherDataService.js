import AppState from "./AppState";

const API_KEY = "&APPID=9e5f732b51c403196a6a5096551e6098";
const API_DATA_WEATHER = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_DATA_FORECAST = "https://api.openweathermap.org/data/2.5/forecast?q=";
let API_TEMP_UNIT = "&units=metric";

class WeatherDataService {
    constructor() {
        AppState.watch("unit", this.changeUnit);
    }

    changeUnit(state) {
        API_TEMP_UNIT = state;
    }

    getCurrentWeather(city) {
        return fetch(API_DATA_WEATHER + city + API_TEMP_UNIT + API_KEY)
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }

    getWeatherForecast(city) {
        return fetch(API_DATA_FORECAST + city + API_TEMP_UNIT + API_KEY)
            .then(response => {
                return response.json();
            })
            .catch(err => {
                console.log(err);
            });
    }
}

export default new WeatherDataService();
