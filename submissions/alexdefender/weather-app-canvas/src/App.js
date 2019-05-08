import React from "react";
import Weather from "./Weather";

const API_KEY = "8d1b861416af657fb97369937070ea06";
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

function fetchWeather(city) {
  let url = `${CORS_PROXY}https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${city}`;
  return fetch(url).then(r => r.json());
}

export default class App extends React.Component {
  state = {
    city: "",
    weather: {},
    error: null
  };
  render() {
    const { city, weather, error } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Weather weather={weather} width={640} height={360} />
        <form
          style={{
            padding: "16px 0"
          }}
          onSubmit={e => {
            e.preventDefault();
            fetchWeather(city)
              .then(weather => {
                this.setState({ weather });
              })
              .catch(error => this.setState({ error }));
          }}
        >
          <input
            value={city}
            onChange={e => this.setState({ city: e.target.value })}
          />
          <button>Submit</button>
        </form>
        {error && <pre style={{ color: "red" }}>{error.message}</pre>}
        <pre>{JSON.stringify(weather, null, 2)}</pre>
      </div>
    );
  }
}
