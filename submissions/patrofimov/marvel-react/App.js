import React, { Component } from "react";
import Characters from "./components/Characters";
import SearcBar from "./components/SearchBar";
import "./App.css";
import { getCharactersList } from "./api/api";

const Name = ({ name }) => {
  return <h2>{name}</h2>;
};

const Image = ({ path, extension, name }) => {
  return (
    <img
      className="characters-image"
      src={`${path}.${extension}`}
      alt={name}    />
  );
};

class App extends Component {
  state = {
    charactersList: [],
    name: "",
    sortName: "asc",
    filterDateFrom: false,
    filterDateTo: false,
    dateFrom: "2010-01-01",
    dateTo: "2020-01-01",
    ready: false,
  };

  async componentDidMount() {
    const charactersList = await getCharactersList();
    const ready = true;
    console.log({ charactersList });
    this.setState({ charactersList, ready });
  }

  performSearch = ({ name }) => {
    this.setState({ name });
  };

  performSort = ({ sortName }) => {
    this.setState({ sortName });
  };

  performFilter = ({ filterDateFrom, filterDateTo, dateFrom, dateTo }) => {
    this.setState({ filterDateFrom, filterDateTo, dateFrom, dateTo });
  };

  render() {
    const {
      charactersList,
      name,
      sortName,
      filterDateFrom,
      filterDateTo,
      dateFrom,
      dateTo,
      ready
    } = this.state;

    if (!ready) {
      return <div>Loading ...</div>;
    }

    const formatDate = dateString => {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat().format(date);
    };

    debugger;

    let result = name
      ? charactersList.filter(characters =>
          characters.name.toUpperCase().includes(name.toUpperCase())
        )
      : charactersList;

    if (filterDateFrom) {
      result = result.filter(
        characters => Date.parse(characters.modified) >= Date.parse(dateFrom)
      );
    }

    if (filterDateTo) {
      result = result.filter(
        characters => Date.parse(characters.modified) <= Date.parse(dateTo)
      );
    }

    switch (sortName) {
      case "asc":
        result = result.sort((a, b) => (a.name > b.name ? 1 : -1));
        break;
      case "desc":
        result = result.sort((a, b) => (b.name > a.name ? 1 : -1));
        break;
      case "old":
        result = result.sort((a, b) =>
          Date.parse(a.modified) >= Date.parse(b.modified) ? 1 : -1
        );
        break;
      case "new":
        result = result.sort((a, b) =>
          Date.parse(b.modified) >= Date.parse(a.modified) ? 1 : -1
        );
        break;
      default:
    }

    return (
      <div className="App">
        <div className="sideBar">
          <SearcBar
            handleSearch={this.performSearch}
            handleSort={this.performSort}
            handleFilter={this.performFilter}
          />
        </div>
        <div className="charactersList">
          {result.map(characters => (
            <Characters
              key={characters.id}
              {...characters}
              name={<Name name={characters.name} />}
              image={<Image {...characters.thumbnail} name= {characters.name} />}
              modified={formatDate(characters.modified)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
