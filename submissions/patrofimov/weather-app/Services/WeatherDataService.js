import { URL_API_CURRENT, URL_API_FORECAST } from "../config.js";

class WeatherDataService {
  apiPath(data = {}) {
    let query = "";
    if (data) {
      const result = data.value.split(",");
      if (result.length >= 2 && data.value.search(/\d/) !== -1) {
        query = `lon=${result[0].trim()}&lat=${result[1].trim()}&units=${
          data.unit
        }`;
      } else {
        query = `q=${data.value}&units=${data.unit}`;
      }
    }
    return query;
  }

  getCurrentWeather(data = {}) {
    const path = URL_API_CURRENT.replace(/#query/, this.apiPath(data));

    return fetch(path, {
      method: "get"
    })
      .then(response => {
        if (response.ok) return response.json();
        throw response.status;
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        if (error == "404")
          document.querySelector("#weather-container").innerHTML =
            "Nothing found! Please check city!";
        throw error;
      });
  }
  getWeatherForecast(data = {}) {
    const path = URL_API_FORECAST.replace(/#query/, this.apiPath(data));

    return fetch(path, {
      method: "get"
    })
      .then(response => {
        if (response.ok) return response.json();
        throw response.status;
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error(error);
        if (error == "404")
          document.querySelector("#weather-container").innerHTML =
            "<h4 class='weather-error'>Nothing found! Please check city!</h4>";
        throw error;
      });
  }
}

export default new WeatherDataService();
