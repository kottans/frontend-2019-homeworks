import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
import WeatherDataService from '../../Services/WeatherDataService.js';

import videoClear from '../../../video/min_sun.mp4';
import videoClouds from '../../../video/min_clouds.mp4';
import videoRain from '../../../video/min_rain.mp4';
import videoSnow from '../../../video/min_snow.mp4';
import videoThunderstorm from '../../../video/min_thunderstorm.mp4';
import videoFog from '../../../video/Fog.mp4';

const chooseVideo = weatherID => {
  if (weatherID === '01d' || weatherID === '01n') return videoClear;
  if (
    weatherID === '02d' ||
    weatherID === '02n' ||
    weatherID === '03d' ||
    weatherID === '03n' ||
    weatherID === '04d' ||
    weatherID === '04n'
  )
    return videoClouds;
  if (
    weatherID === '09d' ||
    weatherID === '09n' ||
    weatherID === '10d' ||
    weatherID === '10n'
  )
    return videoRain;
  if (weatherID === '11d' || weatherID === '11n') return videoThunderstorm;
  if (weatherID === '13d'|| weatherID === '13n') return videoSnow;
  if (weatherID === '50d' || weatherID === '50n') return videoFog;
};
export default class VideoWeather extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('USERINPUT', this.updateMyself);
    AppState.watch('SHOWCITY', this.updateMyself);
  }

  init() {
    ['updateMyself'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
    this.state = {
      units: 'metric',
      ID: "01d"
    };
  }

  updateMyself(searchValue) {
    WeatherDataService.getCurrentWeather(searchValue, this.state.units).then(
      result => {
        this.curentWeather = result;
        this.state.ID = this.curentWeather.weather[0].icon;
        this.updateState(this.curentWeather);
      }
    );
  }

  render() {
    return [
      {
        tag: 'video',
        classList: ['video'],
        attributes: [
          {
            name: 'id',
            value: 'weatherVideo'
          },
          {
            name: 'autoplay',
            value: 'autoplay'
          },
          {
            name: 'muted',
            value: 'muted'
          },
          {
            name: 'loop',
            value: 'loop'
          }
        ],
        content: 'Your browser does not support HTML5 video.',
        children: [
          {
            tag: 'source',
            attributes: [
              {
                name: 'src',
                value: `${chooseVideo(
                  this.state.ID
                )}`
              },
              {
                name: 'type',
                value: 'video/mp4'
              }
            ]
          }
        ]
      }
    ];
  }
}
