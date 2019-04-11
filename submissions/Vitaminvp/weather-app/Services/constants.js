export const URL5 = `https://api.openweathermap.org/data/2.5/forecast`;
export const URL1 = `https://api.openweathermap.org/data/2.5/weather`;

export const KEY = 'e17681c6b25cbaab506757b3f0966598';
export const CLASSES = {
    currentWeatherItem: '.forecast__city',
    loader: 'loader'
};

export const convertToData = stringData => {
    const date = new Date(stringData);
    return new Intl.DateTimeFormat('en-GB').format(date*1000);
};

export const convertToDay = (msData, format='short') => {
    return new Intl.DateTimeFormat('en-US', {weekday: format}).format(msData*1000);
};
export const convertWind = (value, unit) => {
    return unit === 'FA'
            ? `${value} miles/hour`
            : `${value} meter/sec`;
};

export const convertTempUnit = (value, unit) => {
    return unit === 'CE'
        ? `${value.toFixed(0)} &deg;C`
        : unit === 'FA'
            ? `${(value + 32).toFixed(0)} &deg;F`
            : `${(value + 273.15).toFixed(0)} K`;
};

export const initAutocomplete = (input, callback) => {
    const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"]
    });
    autocomplete.addListener("place_changed", (e) =>{
            callback(autocomplete.getPlace(e));
            input.focus();
    });
};

export const renderLoader = parent => {
    const loader = `
        <div class="${CLASSES.loader}">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>`;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${classes.loader}`);
    if(loader) loader.parentNode.removeChild(loader);
};


