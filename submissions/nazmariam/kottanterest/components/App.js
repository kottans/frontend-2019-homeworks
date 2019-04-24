import React, { Component } from "react";
import Header from "./Header";
import {ImageList} from "./ImageList";
import { getPhotos } from "../api";
import {SORT} from "../utils/helpers.js"

class App extends Component {
  state = {
    list: [],
    fullList: []
  };

  performSearch = searchName => {
    let result = [];
    let {list, fullList} = this.state;
    if (searchName !== SORT.dec && searchName !== SORT.inc) {
      result = fullList.filter(item => item.user.name.toLowerCase().includes(searchName));
    } else if (searchName === SORT.dec) {
      result = list.sort((a, b) => b.likes - a.likes);
    } else if (searchName === SORT.inc) {
      result = list.sort((a, b) => a.likes - b.likes);
    }
    this.setState({
      list: result
    });
  };
  async componentDidMount() {
    let list = await getPhotos();

    this.setState({
      list,
      fullList: list
    });
  }
  render() {
    const {list} = this.state;
    return (
      <>
        <Header handleSubmit={this.performSearch} />
        <ImageList images={list} />
      </>
    );
  }
}

export default App;
