import { URL_API_CURRENT, URL_API_FORECAST } from "../config.js";

class WeatherDataService {
  apiPath(data = {}) {
    let query = "";

    if (data) {
      const dataList = data.value.split(",");
      if (dataList.length >= 2 && data.value.search(/\d/) !== -1) {
        query = `lon=${dataList[0].trim()}&lat=${dataList[1].trim()}&units=${
          data.unit
        }`;
      } else {
        query = `q=${data.value}&units=${data.unit}`;
      }
    }

    return query;
  }

  getCurrentWeather(data = {}) {
    let query = this.apiPath(data);

    //if (!data.value) return {};

    let path = URL_API_CURRENT.replace(/#query/, query);

    return fetch(path, {
      method: "get"
    })
      .then(response => {
        if (response.ok) return response.json();
        throw response.status;
      })
      .then(data => {
        // console.log(data);
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
    let query = this.apiPath(data);

    // if (!data.value) return {};

    let path = URL_API_FORECAST.replace(/#query/, query);

    console.log(path);

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
