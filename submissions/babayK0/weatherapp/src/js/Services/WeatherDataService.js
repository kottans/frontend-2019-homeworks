class WeatherDataService{
  constructor() {
    this.apiKey = "4f9cbce0da2f60fab520b8667ce7c48c";
  }

  getCurrentWeather(searchValue, units) {
    const API = `https://api.openweathermap.org//data/2.5/weather?q=${searchValue}&units=${units}&appid=4f9cbce0da2f60fab520b8667ce7c48c`;
    return fetch(API).then(response => {
      if(response.ok) {
        return response.json();
      } else {
        Promise.reject(response.statusText);
      }
    });
  }

  getWeatherForecast(searchValue, units) {
    const API = `https://api.openweathermap.org//data/2.5/forecast?q=${searchValue}&units=${units}&appid=4f9cbce0da2f60fab520b8667ce7c48c`;
    return fetch(API).then(response => {
      if(response.ok) {
        return response.json();
      } else {
        Promise.reject(response.statusText);
      }
    });
  }
}

export default new WeatherDataService();
