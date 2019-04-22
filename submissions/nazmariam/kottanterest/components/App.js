import React, { Component } from "react";
import { Header } from "./Header";
import ImageList from "./ImageList";
import { getPhotos } from "../api";

class App extends Component {
  state = {
    list: [],
    fullList: []
  };
  performSearch = searchName => {
    const list = this.state.fullList;
    let result = [];
    if (searchName !== "decrease" && searchName !== "increase") {
      result = list.filter(item => item.user.name.includes(searchName));
    } else if (searchName === "decrease") {
      result = list.sort((a, b) => b.likes - a.likes);
    } else if (searchName === "increase") {
      result = list.sort((a, b) => a.likes - b.likes);
    }
    this.setState({
      list: result
    });
  };
  async componentDidMount() {
    let list = [];
    list = await getPhotos(list.length);

    this.setState({
      list,
      fullList: list
    });
  }
  render() {
    const list = this.state.list;
    return (
      <>
        <Header handleSubmit={this.performSearch} />
        <ImageList images={this.state && list} />
      </>
    );
  }
}

export default App;
