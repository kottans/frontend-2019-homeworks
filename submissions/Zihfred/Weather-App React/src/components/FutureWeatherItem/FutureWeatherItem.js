import React, {Component} from 'react';
import {roundTemp, getIconByStatus} from '../../Services/WeatherService';

const FutureWeatherItem = (props) => {
    return (
        <div className="futureWeatherItem wrapperStyle">
            <img src={getIconByStatus(props.skyStatus)}
                 alt="sky status"
                 className="futureWeatherItem__img"/>
            <p className="futureWeatherItem__skyStatus">
                {props.skyStatus}
            </p>
            <p className="futureWeatherItem__temp">
                {roundTemp(props.temp) + `${props.units === 'metric' ? ' °C' : ' °F'}`}
            </p>
            <p className="futureWeatherItem__time">
                {props.date.slice(11, 16)}
            </p>
            <p className="futureWeatherItem__date">
                {`${props.date.slice(5, 7)}.${props.date.slice(8, 10)}`}
            </p>
        </div>
    )
};

export default FutureWeatherItem;

