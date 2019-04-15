const API_KEY = "fe82917089f7afb293cb0e0619603570";

const API_UNITS = "metric";
const API_URL = "//api.openweathermap.org/data/2.5/";
const API_CURRENT = `${API_URL}weather?APPID=${API_KEY}&units=${API_UNITS}&q=`;
const API_FORECAST = `${API_URL}forecast?APPID=${API_KEY}&units=${API_UNITS}&q=`;

const cityFullName = "London,uk";

const weatherDetails = document.querySelector(".weather-details");
const weatherForecast = document.querySelector(".forecast");

displayWeatherDetails = weatherData => {
  weatherDetails.innerHTML = buildWeatherDetails(weatherData);
};

displayForecastDetails = weatherData => {
  let details = ['<ul>'];
  
  weatherData.forEach(day => {
    details.push('<li>');
    details.push(buildWeatherDetails(day.main));
    details.push('</li>');
  });

  details.push('</ul>');

  weatherForecast.innerHTML = details.join('');
};

buildWeatherDetails = data => {
  let infoArr = ["<dl>"];

  Object.keys(data).forEach(key => {
    infoArr.push(`<dt>${key}</dt><dd>${data[key]}</dd>`);
  });

  infoArr.push("</dl>");

  return infoArr.join("");
};


fetch(API_CURRENT + cityFullName)
  .then(res => res.json())
  .then(data => displayWeatherDetails(data.main));

fetch(API_FORECAST + cityFullName)
  .then(res => res.json())
  .then(data => displayForecastDetails(data.list));