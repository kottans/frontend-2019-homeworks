import React, { Component } from "react";
import Character from "./components/Character";
import SearchBar from "./components/SearchBar";
import "./App.css";
import { getCharacters } from "./api/api";
import { DATE_FROM_DEFAULT, DATE_TO_DEFAULT } from "./config";
import { convertDate } from "./utils/utils";

class App extends Component {
  state = {
    characters: [],
    name: "",
    sortName: "asc",
    filterByDateFrom: false,
    filterByDateTo: false,
    dateFrom: DATE_FROM_DEFAULT,
    dateTo: DATE_TO_DEFAULT,
    isReady: false
  };

  async componentDidMount() {
    let result = await getCharacters();
    let characters = result.map(function(character) {
      return {
        id: character.id,
        name: character.name,
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`,
        modified: new Date(character.modified)
      };
    });
    this.setState({ characters, isReady: true });
  }

  performSearch = ({ name }) => {
    this.setState({ name });
  };

  performSort = ({ sortName }) => {
    this.setState({ sortName });
  };

  performFilter = ({ filterByDateFrom, filterByDateTo, dateFrom, dateTo }) => {
    this.setState({ filterByDateFrom, filterByDateTo, dateFrom, dateTo });
  };

  render() {
    const {
      characters,
      name,
      sortName,
      filterByDateFrom,
      filterByDateTo,
      dateFrom,
      dateTo,
      isReady
    } = this.state;

    if (!isReady) {
      return <div>Loading ...</div>;
    }

    let result =
      name !== ""
        ? characters.filter(character =>
            character.name.toUpperCase().includes(name.toUpperCase())
          )
        : characters;

    if (filterByDateFrom) {
      result = result.filter(character => character.modified >= dateFrom);
    }

    if (filterByDateTo) {
      result = result.filter(character => character.modified <= dateTo);
    }

    const runSorting = (a, b) => (a > b ? 1 : -1);
    const choicesSorting = {
      asc: (a, b) => runSorting(a.name, b.name),
      desc: (a, b) => runSorting(b.name, a.name),
      old: (a, b) => runSorting(a.modified, b.modified),
      new: (a, b) => runSorting(b.modified, a.modified)
    };
    result = result.sort((a, b) => choicesSorting[sortName](a, b));

    return (
      <div className="App">
        <div className="sidebar">
          <SearchBar
            handleSearch={this.performSearch}
            handleSort={this.performSort}
            handleFilter={this.performFilter}
          />
        </div>
        <div className="characters">
          {result.map(character => (
            <Character
              key={character.id}
              name={character.name}
              image={character.image}
              modified={convertDate(character.modified)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
