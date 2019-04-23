import React, { Component } from "react";
import Header from "./Header";
import ImageList from "./ImageList";
import { getPhotos } from "../api";

class App extends Component {
  state = {
    list: [],
    fullList: []
  };
  sort= {
    dec: "decrease",
    inc: "increase"
  };
  performSearch = searchName => {
    let result = [];
    if (searchName !== this.sort.dec && searchName !== this.sort.inc) {
      result = this.state.fullList.filter(item => item.user.name.toLowerCase().includes(searchName));
    } else if (searchName === this.sort.dec) {
      result = this.state.list.sort((a, b) => b.likes - a.likes);
    } else if (searchName === this.sort.inc) {
      result = this.state.list.sort((a, b) => a.likes - b.likes);
    }
    this.setState({
      list: result
    });
  };
  async componentDidMount() {
    let list = await getPhotos(0);

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
