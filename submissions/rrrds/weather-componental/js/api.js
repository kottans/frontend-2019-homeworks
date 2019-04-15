const API_KEY = 'fe82917089f7afb293cb0e0619603570';

const API_UNITS = 'metric';
const API_URL = '//api.openweathermap.org/data/2.5/';
const API_CURRENT = `${API_URL}weather?APPID=${API_KEY}`;
const API_FORECAST = `${API_URL}forecast?APPID=${API_KEY}`;

export function fetchData(apiUrl) {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) return {};
      return response.json();
    })
    .catch(() => {});
}

export function fetchCurrentData(cityName, units) {
  return fetchData(`${API_CURRENT}&units=${units}&q=${cityName}`);
}

export function fetchForecastData(cityName, units) {
  return fetchData(`${API_FORECAST}&units=${units}&q=${cityName}`);
}
