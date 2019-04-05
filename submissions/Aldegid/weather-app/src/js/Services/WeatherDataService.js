
class WeatherDataService {
  constructor() {
    this.apiKey = "ffa19df254477b52e5f0e38980606a54";
    //this.unit = "metric";
  }

  getWetherByGeolocation(weathertype, unit){

    const getGeolocation = () =>
      new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
      );
    const getWeatherByPosition = position => {
      const { longitude } = position.coords;
      const { latitude } = position.coords;
      const api = `https://api.openweathermap.org/data/2.5/${weathertype}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${this.apiKey}`;
      return fetch(api).then(response =>
        response.ok ? response.json() : Promise.reject(response.statusText)
      );

    };
    return getGeolocation()
      .then(getWeatherByPosition)
      .then(result => {
        return result;
      });
  }
  getCurrentWeather(userInput, unit) {
    const api = `https://api.openweathermap.org//data/2.5/weather?q=${userInput}&units=${unit}&appid=${this.apiKey}`
    return fetch(api).then(response => {
      if(response.ok) {
        return response.json();
      }
      if(response.status === 404) {
        document.querySelector('.container__inner').innerHTML = `<h3>Oops, nothing found, please, check your city name</h3>`
      } else {
        Promise.reject(response.statusText);
      }
    }
    );

  }
  getWeatherForecast(userInput, unit) {
    const api = `https://api.openweathermap.org//data/2.5/forecast?q=${userInput}&units=${unit}&appid=${this.apiKey}`
    return fetch(api).then(response => {
      if(response.ok) {
        return response.json();
      }
      if(response.status === 404) {
        const container = document.querySelector('.container-small')
        container.innerHTML = '';
        container.classList.add('d-none');
      } else {
        Promise.reject(response.statusText);
      }
    }
    );

  }
}

export default new WeatherDataService();
