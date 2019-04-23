import React, {Component} from 'react';
import Search from './components/Search/Search'
import WeatherNow from './components/WeatherNow/WeatherNow';
import History from "./components/history/History";
import FavoriteCities from "./components/FavoriteCities/FavoriteCities";
import FutureWeather from './components/FutureWeather/FutureWeather';

import WeatherService from './Services/WeatherDataService'
import CyrillicToTranslit from "cyrillic-to-translit-js";

import './App.css';

let ToTranslit = CyrillicToTranslit({preset: 'uk'})
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentWeather: null,
            weatherForecast: null,
            inputValue: '',
            units: localStorage.getItem('units') || 'metric',
            history: [],
            favorite: JSON.parse(localStorage.getItem("favorite")) || [],
            needToAutocomplete: false,
        };

        this.defaultCity = this.state.favorite[this.state.favorite.length - 1];

    }

    handleRemoveFavCity = (cityToRemove) => {
        let favList = [...this.state.favorite];
        favList = favList.filter(item => {
            return item !== cityToRemove;
        });
        this.setState({
            favorite: favList,
        });
        localStorage.setItem("favorite", JSON.stringify(favList));
    };

    handleFavoriteClick = (item) => {
        if (item) {
            Promise.all([
                WeatherService.getCurrentWeather({
                    city: item,
                    units: this.state.units,
                }),
                WeatherService.getWeatherForecast({
                    city: item,
                    units: this.state.units,
                })
            ])
                .then(values => {
                    this.setState({
                        inputValue: '',
                        currentWeather: values[0],
                        history: [...this.state.history, values[0]],
                        weatherForecast: values[1],
                    })
                });
        }
    };

    handleAddFavorite = (cityName) => {
        Promise.resolve()
            .then(() => {
                if (this.state.favorite.includes(cityName) === false) {
                    this.setState({
                        favorite: [...this.state.favorite, cityName],
                    });
                }
            })
            .then(() => {
                //replace favcities in localstorage
                localStorage.setItem("favorite", JSON.stringify(this.state.favorite));
            });
    }

    handleHistoryItem = (item) => {
        Promise.all([
            WeatherService.getCurrentWeather({
                city: item.name,
                units: this.state.units,
            }),
            WeatherService.getWeatherForecast({
                city: item.name,
                units: this.state.units,
            })
        ]).then(values => {
            this.setState({
                inputValue: '',
                currentWeather: values[0],
                history: [...this.state.history, values[0]],
                weatherForecast: values[1]
            });
        });
    }

    handleUnits = (e) => {
        //get unit now from form
        let unitValue = e.target.textContent === '°C' ? 'metric' : 'imperial';

        //set units in localstorage
        localStorage.setItem('units', unitValue);

        //get last city to right change units and save city
        let lastCity = this.state.history[this.state.history.length - 1].name || this.defaultCity;


        Promise.all([
            WeatherService.getCurrentWeather({
                city: lastCity,
                units: unitValue,
            }),
            WeatherService.getWeatherForecast({
                city: lastCity,
                units: unitValue,
            })
        ]).then((values) => {
            this.setState({
                currentWeather: values[0],
                units: unitValue,
                weatherForecast: values[1]
            });
        });
    };

    handleSearch = (e) => {
        e.preventDefault();

        let inputValue = this.state.inputValue.trim();

        //Ukraine to translit
        inputValue = ToTranslit.transform(inputValue);


        Promise.all([
            WeatherService.getCurrentWeather({
                city: inputValue,
                units: this.state.units,
            }),
            WeatherService.getWeatherForecast({
                city: this.state.inputValue,
                units: this.state.units,
            })
        ]).then(values => {
            this.setState({
                inputValue: values[0].name ? `${values[0].name}, ${values[0].sys.country}` : '',
                currentWeather: values[0],
                history: [...this.state.history, values[0]],
                weatherForecast: values[1]
            })
        })
    };


    handleAutocomplete = (city) => {
        this.setState({
            inputValue: city,
            needToAutocomplete: false,
        }, () =>
            Promise.all([
                WeatherService.getCurrentWeather({
                    city: this.state.inputValue,
                    units: this.state.units,
                }),
                WeatherService.getWeatherForecast({
                    city: this.state.inputValue,
                    units: this.state.units,
                })
            ])
                .then(value => {
                    this.setState({
                        currentWeather: value[0],
                        history: [...this.state.history, value[0]],
                        weatherForecast: value[1]
                    })
                }));
    };

    handleInput = (e) => {
        e.preventDefault();
        if (this.state.history[this.state.history.length - 1].name !== this.state.inputValue) {
            this.setState({
                needToAutocomplete: true,
                inputValue: e.target.value,
            })
        } else
            this.setState({
                inputValue: e.target.value,
            });
    }

    componentDidMount() {
        Promise.all([
            WeatherService.getCurrentWeather({
                city: this.defaultCity,
                units: this.state.units,
            }),
            WeatherService.getWeatherForecast({
                city: this.defaultCity,
                units: this.state.units,
            }),
        ])
            .then(values => {
                    this.setState({
                        currentWeather: values[0],
                        weatherForecast: values[1],
                        history: [...this.state.history, values[0]],
                    })
                }
            )
    };


    render() {
        return (
            <div className="App">
                <Search
                    inputValue={this.state.inputValue}
                    handleInput={this.handleInput}
                    handleSearch={this.handleSearch}
                    handleAutocomplete={this.handleAutocomplete}
                    needToAutocomplete={this.state.needToAutocomplete}

                />
                <div className="сities">
                    <History
                        history={this.state.history}
                        itemClick={this.handleHistoryItem}
                    />
                    <FavoriteCities
                        handleClick={this.handleFavoriteClick}
                        cities={this.state.favorite}
                        handleRemoveFavCity={this.handleRemoveFavCity}
                    />
                </div>
                <WeatherNow
                    units={this.state.units}
                    handleAddFavorite={this.handleAddFavorite}
                    currentWeather={this.state.currentWeather}
                    handleUnits={this.handleUnits}
                />
                <FutureWeather
                    units={this.state.units}
                    weatherForecast={this.state.weatherForecast}
                />
            </div>
        );
    }
}

export default App;
