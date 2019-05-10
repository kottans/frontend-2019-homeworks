import React, { Component } from "react";
import "./style.scss";
import { FilterList } from "../FilterList";
import { CardList } from "../CardList";
import { getDataFromApi } from "../../services/api";

const SORT_DESC = "desc";
const SORT_ASC = "asc";
const FILTER_STATUS = "status";
const FILTER_GENDER = "gender";
const ALL_CARDS = "All";

class App extends Component {
  state = {
    list: [],
    sortList: null,
    searchFromInput: null,
    status: "",
    gender: ""
  };

  async componentDidMount() {
    const list = await getDataFromApi();
    this.setState({ list });
  }

  findCardsFromSearch = ({ target }) => {
    const searchFromInput = this.state.list.filter(item =>
      item.name.toLowerCase().includes(target.value)
    );

    this.setState({ sortList: searchFromInput, searchFromInput });
  };

  sortDescAsc = ({ target }) => {
    const { sortList, list } = this.state;

    let sortDescAsc;
    sortList !== null
      ? (sortDescAsc = sortList.slice())
      : (sortDescAsc = list.slice());

    sortDescAsc.sort((nameA, nameB) => {
      if (target.value === SORT_ASC) {
        if (nameA.name < nameB.name) return -1;
      } else if (target.value === SORT_DESC) {
        if (nameA.name > nameB.name) return -1;
      }
    });

    this.setState({ sortList: sortDescAsc });
  };

  sortFilter = ({ target }) => {
    const { value, name } = target;

    let { status, gender } = this.state;

    if (name === FILTER_STATUS) {
      status = value;
      if (value === ALL_CARDS) {
        status = "";
      }
    } else if (name === FILTER_GENDER) {
      gender = value;
      if (value === ALL_CARDS) {
        gender = "";
      }
    }

    const state =
      this.state.searchFromInput !== null
        ? this.state.searchFromInput
        : this.state.list;

    let sort;

    if (status === "" && gender === "") {
      sort = this.state.searchFromInput;
    } else if (status === "") {
      sort = state.filter(item => item.gender === gender);
    } else if (gender === "") {
      sort = state.filter(item => item.status === status);
    } else {
      sort = state.filter(
        item => item.status === status && item.gender === gender
      );
    }

    this.setState({ sortList: sort, status, gender });
  };

  render() {
    const { list, sortList } = this.state;

    return (
      <div>
        <header className="header">
          <h1 className="header__text">Friends App React</h1>
        </header>
        <div className="container">
          <FilterList
            findCardsFromSearch={this.findCardsFromSearch}
            sortDescAsc={this.sortDescAsc}
            sortFilter={this.sortFilter}
          />
          <CardList cards={sortList === null ? list : sortList} />
        </div>
      </div>
    );
  }
}

export default App;
