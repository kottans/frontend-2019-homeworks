import IWeatherDataService from './IWeatherDataService';
import { fetchCurrentData, fetchForecastData } from '../../api';
import { AppState, entityList } from '../AppState';

const API_UNITS_METRIC = 'metric';
const API_UNITS_IMPERIAL = 'imperial';

class WeatherDataService extends IWeatherDataService {
  constructor() {
    super();

    this.selectedUnit = API_UNITS_METRIC;
    this.lastSearch = null;
  }

  load(cityName = '') {
    if (cityName) {
      Promise.all([
        fetchCurrentData(cityName, this.selectedUnit),
        fetchForecastData(cityName, this.selectedUnit)
      ]).then(data => {
        if (data && data[0].cod == '200') {
          AppState.update(entityList.CURRENT_WEATHER, data[0]);
        } else {
          AppState.update(entityList.CURRENT_WEATHER, null);
        }

        if (data && data[1].cod == '200') {
          AppState.update(entityList.FORECAST_WEATHER, data[1]);
        } else {
          AppState.update(entityList.FORECAST_WEATHER, null);
        }

        this.lastSearch = cityName;
      });
    }
  }

  dataLoaded() {
    if (this.cbCurrent) {
      this.cbCurrent(this.getCurrentWeather());
    }

    if (this.cbForecast) {
      this.cbForecast(this.getWeatherForecast());
    }
  }

  toggleUnit() {
    this.selectedUnit =
      this.selectedUnit === API_UNITS_METRIC
        ? API_UNITS_IMPERIAL
        : API_UNITS_METRIC;

    if (this.cbUnitChange) {
      this.cbUnitChange(this.getCurrentUnit());
    }

    this.load(this.getLastSearch());
  }

  getCurrentUnit() {
    return this.selectedUnit;
  }

  getLastSearch() {
    return this.lastSearch || '';
  }
}

export const weatherDataService = new WeatherDataService();
