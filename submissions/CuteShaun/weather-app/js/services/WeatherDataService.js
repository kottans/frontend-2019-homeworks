class WeatherDataService {
  constructor() {
    this.APIKEY = 'd5f2fdfdab2f973dc4e4e3aa87a6ccfb';
  }

  getWeatherByGeo(unit) {
    const getGeoLocation = () => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    const getWeatherByPosition = (position) => {
      const { longitude } = position.coords;
      const { latitude } = position.coords;

      const api = [
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${
          this.APIKEY
        }`,
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${
          this.APIKEY
        }`,
      ];

      const promises = api.map(url => fetch(url).then((response) => {
          if (response.ok) {
            return response.json();
          }

          if (response.status === 404) {
            console.log('Ooops, nothing found');
          }
        }),);

      return Promise.all(promises);
    };

    return getGeoLocation()
      .then(getWeatherByPosition)
      .then(result => result);
  }

  getCurrentWeather(userInput, unit) {
    this.api = [
      `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=${unit}&appid=${
        this.APIKEY
      }`,
      `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&units=${unit}&appid=${
        this.APIKEY
      }`,
    ];

    const promises = this.api.map(url => fetch(url).then((response) => {
        if (response.ok) {
          return response.json();
        }

        if (response.status === 404) {
          console.log('Ooops, nothing found');
        }
      }),);

    return Promise.all(promises);
  }
}

export default new WeatherDataService();
