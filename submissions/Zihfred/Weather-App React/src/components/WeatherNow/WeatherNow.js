import React, {Component} from 'react';
import {roundTemp, getIconByStatus} from '../../Services/WeatherService';


const WeatherNow = (props) => {
     const weather = props.currentWeather;
    if (!weather || weather.cod === '404') return [];
    return (
        <div className={"weatherNow wrapperStyle"}>
            <div
                className={'weatherNow--left'}
            >
                <h1 className={'weatherNow__city'}>
                    {`${weather.name},${weather.sys.country}`}
                    <i className="far fa-star addToFav"
                       onClick={() => props.handleAddFavorite(`${weather.name},${weather.sys.country}`)}
                    >
                    </i>
                </h1>
                <h2 className="weatherNow__skyStatus">
                    {weather.weather[0].main}
                </h2>
                <div className="weatherNow__sunStatus">
                    <img src={getIconByStatus(weather.weather[0].main)}/>
                </div>
                <div className="weatherNow__temp">
                    {roundTemp(weather.main.temp)}
                </div>
                <div className="units">
                    <a
                        onClick={props.handleUnits}
                        href="#"
                        className={props.units === 'metric' ? ['units__item', 'units__item--active'].join(" ") : ['units__item']}
                    >
                        °C
                    </a>
                    <a
                        onClick={props.handleUnits}
                        href="#"
                        className={props.units === 'imperial' ? ['units__item', 'units__item--active'].join(" ") : ['units__item']}
                    >
                        °F
                    </a>
                </div>
            </div>
            <div className="weatherNow--right">
                <h2 className="weatherNow__humidity">
                    {`Humidity: ${weather.main.humidity}%`}
                </h2>
                <h2 className="weatherNow__wind">
                    {`Wind: ${weather.wind.speed} ${props.units === 'metric' ? 'km/h' : 'mph'}`}
                </h2>
                <h2 className="weatherNow__pressure">
                    {`Pressure: ${weather.main.pressure} atm`}

                </h2>
            </div>
        </div>)
};

export default WeatherNow;
