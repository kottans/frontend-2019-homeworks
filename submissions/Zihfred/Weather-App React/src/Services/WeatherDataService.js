class WeatherDataService {
    constructor() {
        this.keyAPI = '8aa32dc1d27fc106cbed1f82259f5be9';
        this.currentCity = 'kiev,ua';
        this.units = 'metric';
    }

    async getCurrentWeather(props) {
        this.currentCity = props.city || this.currentCity
        this.units = props.units || this.units;


        return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.currentCity}&units=${this.units}&appid=${this.keyAPI}`)
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                console.error(error);
            });
    };


    async getWeatherForecast(props) {
        this.currentCity = props.city ? props.city : this.currentCity;
        this.units = props.units ? props.units : this.units;


        return await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.currentCity}&units=${this.units}&appid=${this.keyAPI}`)
            .then((response) => {
                return response.json();
            })
            .catch(error => {
                console.error(error);
            });
    };
}

export default new WeatherDataService();

