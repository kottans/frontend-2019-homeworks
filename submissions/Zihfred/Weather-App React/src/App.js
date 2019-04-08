import React, {Component} from 'react';
import Search from './components/Search/Search'
import WeatherNow from './components/WeatherNow/WeatherNow';
import History from "./components/history/History";
import FavoriteCities from "./components/FavoriteCities/FavoriteCities";
import FutureWeather from './components/FutureWeather/FutureWeather';

import WeatherService from './Services/WeatherDataService'
import CyrillicToTranslit from "cyrillic-to-translit-js";

import './App.css';


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


        //Events
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleUnits = this.handleUnits.bind(this);
        this.handleHistoryItem = this.handleHistoryItem.bind(this);
        this.handleAddFavorite = this.handleAddFavorite.bind(this);
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
        this.handleRemoveFavCity = this.handleRemoveFavCity.bind(this);
        this.handleAutocomplete = this.handleAutocomplete.bind(this);

    }

    handleRemoveFavCity(cityWillRemove) {
        let favList = this.state.favorite.slice();
        favList.splice(favList.indexOf(cityWillRemove), 1);
        this.setState({
            favorite: favList,
        });
        localStorage.setItem("favorite", JSON.stringify(favList));
    }

    handleFavoriteClick(item) {
        if (item) {
            WeatherService.getCurrentWeather({
                city: item,
                units: this.state.units,
            })
                .then(result => this.setState({
                    inputValue: '',
                    currentWeather: result,
                    history: [...this.state.history, result]
                }))
                .then(() => WeatherService.getWeatherForecast({
                    city: item,
                    units: this.state.units,
                })
                    .then(result => this.setState({
                        weatherForecast: result
                    })));
        }
    }

    handleAddFavorite(cityName) {
        Promise.resolve()
            .then(() => {
                if (this.state.favorite.indexOf(cityName) === -1) {
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

    handleHistoryItem(item) {
        WeatherService.getCurrentWeather({
            city: item.name,
            units: this.state.units,
        })
            .then(result => this.setState({
                inputValue: '',
                currentWeather: result,
                history: [...this.state.history, result]
            }))
            .then(() => WeatherService.getWeatherForecast({
                city: item.name,
                units: this.state.units,
            })
                .then(result => this.setState({
                    weatherForecast: result
                })));
    }

    handleUnits(e) {
        //get unit now from form
        let unitValue = e.target.textContent === '°C' ? 'metric' : 'imperial';

        //set units in localstorage
        localStorage.setItem('units', unitValue);

        //get last city to true change units and save city
        let lastCity = this.state.history[this.state.history.length - 1].name || this.defaultCity;

        //get weather now
        WeatherService.getCurrentWeather({
            city: lastCity,
            units: unitValue,
        })
        //set weather now to State
            .then(result => this.setState({
                currentWeather: result,
                units: unitValue,
            }))
            //get weather forecast
            .then(() => WeatherService.getWeatherForecast({
                city: lastCity,
                units: unitValue,
            })
            //set weather forecast to State
                .then(result => this.setState({
                    weatherForecast: result
                })));
    }

    handleSearch(e) {
        e.preventDefault();

        let inputValue = this.state.inputValue.trim();

        //Ukraine to translit
        inputValue = CyrillicToTranslit({preset: 'uk'}).transform(inputValue);

        WeatherService.getCurrentWeather({
            city: inputValue,
            units: this.state.units,
        })
            .then(result => this.setState({
                inputValue: result.name ? `${result.name}, ${result.sys.country}` : '',
                currentWeather: result,
                history: [...this.state.history, result],
            })).then(() => WeatherService.getWeatherForecast({
            city: this.state.inputValue,
            units: this.state.units,
        }).then(result => this.setState({
            weatherForecast: result
        })));
    }


    handleAutocomplete(city) {
        Promise.resolve()
            .then(() => {
                this.setState({
                    inputValue: city,
                    needToAutocomplete: false,
                })
            })
            .then(() => {
                WeatherService.getCurrentWeather({
                    city: this.state.inputValue,
                    units: this.state.units,
                })
                    .then(result => this.setState({
                        currentWeather: result,
                        history: [...this.state.history, result]
                    }))
                    .then(() => WeatherService.getWeatherForecast({
                        city: this.state.inputValue,
                        units: this.state.units,
                    })
                        .then(result => this.setState({
                            weatherForecast: result
                        })))
            })
    }

    handleInput(e) {
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
        WeatherService.getCurrentWeather({
            city: this.defaultCity,
            units: this.state.units,
        }).then(result => this.setState({
            currentWeather: result,
            history: [...this.state.history, result]
        })).then(() => WeatherService.getWeatherForecast({
            city: this.defaultCity,
            units: this.state.units,
        }).then(result => this.setState({
            weatherForecast: result
        })));
    }


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
                <div className={"сities"}>
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
