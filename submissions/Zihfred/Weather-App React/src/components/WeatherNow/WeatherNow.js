import React, {Component} from 'react';
import {roundTemp, getIconByStatus} from '../../Services/WeatherService';


const WeatherNow = (props) => {
     const weatherNow = props.currentWeather;
    if (!weatherNow || weatherNow.cod === '404') return [];
    return (
        <div className={"weatherNow wrapperStyle"}>
            <div
                className={'weatherNow--left'}
            >
                <h1 className={'weatherNow__city'}>
                    {`${weatherNow.name},${weatherNow.sys.country}`}
                    <i className="far fa-star addToFav"
                       onClick={() => props.handleAddFavorite(`${weatherNow.name},${weatherNow.sys.country}`)}
                    >
                    </i>
                </h1>
                <h2 className="weatherNow__skyStatus">
                    {weatherNow.weather[0].main}
                </h2>
                <div className="weatherNow__sunStatus">
                    <img src={getIconByStatus(weatherNow.weather[0].main)}/>
                </div>
                <div className="weatherNow__temp">
                    {roundTemp(weatherNow.main.temp)}
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
                    {`Humidity: ${weatherNow.main.humidity}%`}
                </h2>
                <h2 className="weatherNow__wind">
                    {`Wind: ${weatherNow.wind.speed} ${props.units === 'metric' ? 'km/h' : 'mph'}`}
                </h2>
                <h2 className="weatherNow__pressure">
                    {`Pressure: ${weatherNow.main.pressure} atm`}

                </h2>
            </div>
        </div>)
};

export default WeatherNow;
