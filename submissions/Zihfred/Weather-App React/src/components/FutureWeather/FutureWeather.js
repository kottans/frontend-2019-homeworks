import React from 'react';
import FutureWeatherItem from "../FutureWeatherItem/FutureWeatherItem";


export default class FutureWeather extends React.PureComponent{


    render(){
        console.log(this.props.weatherForecast)
        if (!this.props.weatherForecast ||
            !this.props.weatherForecast.list ||
            this.props.weatherForecast === '404')
            return (<div className="futureWeather wrapperStyle">
                <h1
                    className={'futureWeather__error'}
                >
                    City not found or connection error
                </h1>
            </div>);

        return (
            <div className="futureWeather">
                {this.props.weatherForecast.list.map(item => {
                    if (item.dt_txt.slice(11, 16) === '12:00')
                        return <FutureWeatherItem
                            units={this.props.units}
                            key={item.dt_txt}
                            skyStatus={item.weather[0].main}
                            temp={item.main.temp}
                            date={item.dt_txt}
                        />
                })}
            </div>)
    }

}
