import React, { Component } from "react";
import getData from "./api";
import "./App.css";
import Filters from "./Filters";
import Character from "./Character";

class App extends Component {
  state = {
    originalList: [],
    listToRender: [],
    filteringOptions: {}
  };

  async componentDidMount() {
    let data = await getData();
    this.setState({
      originalList: data.results,
      listToRender: data.results
    });
  }

  searchInList = (list, option, value) => {
    console.log(list, option, value);
    const result = list.filter(listItem => {
      return listItem[option].toLowerCase().includes(value.toLowerCase());
    });
    return result;
  };

  sortingList = event => {
    event.preventDefault();
    const { listToRender } = this.state;
    const typeOfSorting = event.target.name;
    const sortedList = listToRender.sort((i, j) => {
      return typeOfSorting === "sort-name-acs"
        ? i.name.localeCompare(j.name)
        : j.name.localeCompare(i.name);
    });
    this.setState({ listToRender: sortedList });
  };

  filterList = (list, option, value) => {
    let result;
    if (value === "all") {
      result = list;
    } else {
      result = list.filter(listItem => {
        const filteringOption =
          option === "location" ? listItem[option].name : listItem[option];
        return filteringOption.toLowerCase() === value.toLowerCase();
      });
    }
    return result;
  };

  generateFilteredList = filterOptions => {
    let { originalList } = this.state;
    Object.keys(filterOptions).forEach(filterOption => {
      if (filterOption === "name") {
        originalList = this.searchInList(
          originalList,
          filterOption,
          filterOptions[filterOption]
        );
      } else {
        originalList = this.filterList(
          originalList,
          filterOption,
          filterOptions[filterOption]
        );
      }
    });
    return originalList;
  };

  performFiltering = event => {
    const { target } = event;
    const { filteringOptions } = this.state;
    filteringOptions[target.name] = target.value;
    this.setState({
      listToRender: this.generateFilteredList(filteringOptions),
      filteringOptions
    });
  };

  render() {
    const { listToRender } = this.state;
    return (
      <>
        <Filters
          handleFilter={this.performFiltering}
          handleSorting={this.sortingList}
        />
        <div className="card-wrapper">
          {listToRender.map(character => {
            return <Character key={character.id} character={character} />;
          })}
        </div>
      </>
    );
  }
}

export default App;
