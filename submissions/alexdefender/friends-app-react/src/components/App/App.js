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
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      sort: null,
      searchFromInput: null,
      status: "",
      gender: ""
    };
    this.status = "";
    this.gender = "";
  }

  async componentDidMount() {
    const list = await getDataFromApi();
    this.setState({ list });
  }

  findCardsFromSearch = ({ target }) => {
    const searchFromInput = this.state.list.filter(item =>
      item.name.toLowerCase().includes(target.value)
    );

    this.setState({ sort: searchFromInput, searchFromInput });
  };

  sortDescAsc = ({ target }) => {
    this.setState(state => ({
      sort: (state.sort || state.list).sort((nameA, nameB) => {
        if (target.value === SORT_ASC) {
          if (nameA.name < nameB.name) return -1;
        } else if (target.value === SORT_DESC) {
          if (nameA.name > nameB.name) return -1;
        }
      })
    }));
  };

  sortFilter = ({ target }) => {
    const { value, name } = target;

    if (name === FILTER_STATUS) {
      this.status = value;
      this.setState(state => ({
          status: value
      }));
      if (value === ALL_CARDS) {
        this.status = "";
      }
    } else if (name === FILTER_GENDER) {
      this.gender = value;
      if (value === ALL_CARDS) {
        this.gender = "";
      }
    }

    console.log(this.state)

    const state =
      this.state.searchFromInput !== null
        ? this.state.searchFromInput
        : this.state.list;

    let sort;

    if (this.status === "" && this.gender === "") {
      sort = this.state.searchFromInput;
    } else if (this.status === "") {
      sort = state.filter(item => item.gender === this.gender);
    } else if (this.gender === "") {
      sort = state.filter(item => item.status === this.status);
    } else {
      sort = state.filter(
        item => item.status === this.status && item.gender === this.gender
      );
    }

    this.setState({ sort });
  };

  render() {
    const { list, sort } = this.state;

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
          <CardList cards={sort === null ? list : sort} />
        </div>
      </div>
    );
  }
}

export default App;
