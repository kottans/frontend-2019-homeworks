import Component from "../../framework/Component";
import Data from "../../Data/fakeData"
import {WeatherForecastItem } from "../WeatherForecastItem";

export default class WeatherForecast extends Component {
  constructor(host, props) {
    super(host, props);

  }

  render() {

      return [
                  {
                      tag: WeatherForecastItem ,
                      classList: ['futureWeatherItem', 'wrapperStyle'],
                      props: {
                          image: 'image',
                          skyStatus: 'Clear',
                          temp: '18',
                          time: '21:00',
                          date: '24/04'
                      }
                  },
                  {
                      tag: WeatherForecastItem ,
                      classList: ['futureWeatherItem', 'wrapperStyle'],
                      props: {
                          image: 'image',
                          skyStatus: 'Clear',
                          temp: '18',
                          time: '21:00',
                          date: '24/04'
                      }
                  },
                  {
                      tag: WeatherForecastItem ,
                      classList: ['futureWeatherItem', 'wrapperStyle'],
                      props: {
                          image: 'image',
                          skyStatus: 'Clear',
                          temp: '18',
                          time: '21:00',
                          date: '24/04'
                      }
                  },
                  {
                      tag: WeatherForecastItem ,
                      classList: ['futureWeatherItem', 'wrapperStyle'],
                      props: {
                          image: 'image',
                          skyStatus: 'Clear',
                          temp: '18',
                          time: '21:00',
                          date: '24/04'
                      }
                  },
                  {
                      tag: WeatherForecastItem ,
                      classList: ['futureWeatherItem', 'wrapperStyle'],
                      props: {
                          image: 'image',
                          skyStatus: 'Clear',
                          temp: '18',
                          time: '21:00',
                          date: '24/04'
                      }
          },
      ];
  }

}


