import React, { Component } from "react";
import getData from "./api";
import "./App.css";
import { Filters } from "./Filters";
import Character from "./Character";

class App extends Component {
  state = {
    originalList: [],
    listToRender: [],
    filteringOptions: {},
  }

  async componentDidMount() {
    let data = await getData();
    this.setState({
      originalList: data.results,
      listToRender: data.results,
    });
  }

  searchInList = (list, option, value) => {
    const result = list.filter((listItem) => {
      return listItem[option].toLowerCase().includes(value.toLowerCase());
    });
    return result;
  }

  sortingList = (event) => {
    event.preventDefault();
    const { listToRender } = this.state;
    const typeOfSorting = event.target.name;
    const sortedList = listToRender.sort((i, j) => {
      if (typeOfSorting === 'sort-name-acs') {
        return i.name > j.name ? 1 : -1;
      } else if (typeOfSorting === 'sort-name-desc') {
        return i.name > j.name ? -1 : 1;
      }
    });
    this.setState({ listToRender: sortedList });
  }

  filterlist = (list, option, value) => {
    let result;
    if (value === 'all') {
      result = list;
    }
    else if (option === 'location') {
      result = list.filter((listItem) => {
        return listItem.location.name.toLowerCase() == value.toLowerCase();
      });
    }
    else {
      result = list.filter((listItem) => {
        return listItem[option].toLowerCase() === value;
      });
    }
    return result;
  }

  generateFilteredList = (newFilteringOptions) => {
    let listToRender = this.state.originalList;
    const { nameSearch, genderFilter, speciesFilter, locationFilter } = newFilteringOptions;
    if (nameSearch) {
      listToRender = this.searchInList(listToRender, 'name', nameSearch);
    }
    if (genderFilter) {
      listToRender = this.filterlist(listToRender, 'gender', genderFilter);
    }
    if (speciesFilter) {
      listToRender = this.filterlist(listToRender, 'species', speciesFilter);
    }
    if (locationFilter) {
      listToRender = this.filterlist(listToRender, 'location', locationFilter);
    }
    return listToRender;
  }


  performFiltering = (event) => {
    const input = event.target;
    const newFilteringOptions = Object.assign({}, this.state.filteringOptions);
    newFilteringOptions[input.name] = input.value;
    const newListToRender = this.generateFilteredList(newFilteringOptions);
    this.setState({ listToRender: newListToRender, filteringOptions: newFilteringOptions });
  }

  render() {
    const { listToRender } = this.state;
    return (
      <>
        <Filters handleFilter={this.performFiltering} handleSorting={this.sortingList}></Filters>
        <div className="card-wrapper">
          {
            listToRender.map((character) => {
              return <Character key={character.id} character={character} />
            })
          }
        </div>
      </>
    );
  }
}

export default App;
