import React, { Component } from "react";
import apiDataCall from "../utils/apiDataCall";
import parseForm from "../utils/parseForm";
import { Characters } from "./Characters";
import { Pagination } from "./Pagination";
import Aside from "./Aside";

const appStatus = {
  dataNotLoaded: "notLoaded",
  dataLoaded: "ok"
};

class App extends Component {
  state = {
    status: appStatus.dataNotLoaded,
    query: "",
    currentPage: 1,
    statusText: "Loading..."
  };

  componentDidMount() {
    apiDataCall(this.state.query)
      .then(response => {
        this.setState({
          charactersData: response.results,
          pagesCount: response.info.pages,
          status: appStatus.dataLoaded
        });
      })
      .catch(reason => {
        this.setState({
          status: reason.status,
          statusText: reason.statusText
        });
      });
  }

  ascDescArraySorter = (arr, type) => {
    console.log(arr);
    switch (type) {
      case "asc-name":
        return arr.sort((b, a) => (b.name < a.name ? -1 : 1));
      case "desc-name":
        return arr.sort((a, b) => (b.name < a.name ? -1 : 1));
      case "asc-id":
        return arr.sort((b, a) => (b.id < a.id ? -1 : 1));
      case "desc-id":
        return arr.sort((a, b) => (b.id < a.id ? -1 : 1));
      default:
        return arr;
    }
  };

  paginationClickHandler = e => {
    const clickedElementId = +e.target.id;
    const queryWithPagination = `page=${clickedElementId}&${this.state.query}`;

    apiDataCall(`?${queryWithPagination}`).then(response => {
      this.setState({
        charactersData: response.results,
        pagesCount: response.info.pages,
        currentPage: clickedElementId
      });
    });
  };

  formSubmitHandler = e => {
    e.preventDefault();

    const formDataArray = parseForm(e.target);

    const characterIdSearchValue = formDataArray.find(
      item => item.name === "name"
    ).value;

    if (Number(characterIdSearchValue)) {
      apiDataCall(`/${characterIdSearchValue}`)
        .then(response => {
          this.setState({
            charactersData: [response],
            pagesCount: null,
            status: appStatus.dataLoaded
          });
        })
        .catch(reason => {
          this.setState({
            status: reason.status,
            statusText: reason.statusText
          });
        });

      return;
    }

    const query = formDataArray
      .map(item => (item.value ? `${item.name}=${item.value}&` : ""))
      .join("");

    const sortingOption = formDataArray.find(item => item.name === "sort")
      .value;

    apiDataCall(`?${query}`)
      .then(response => {
        if (sortingOption) {
          const sortedArrayOfChars = this.ascDescArraySorter(
            response.results,
            sortingOption
          );

          this.setState({
            charactersData: sortedArrayOfChars
          });
        } else {
          this.setState({
            charactersData: response.results
          });
        }

        this.setState({
          pagesCount: response.info.pages,
          status: appStatus.dataLoaded,
          query: query,
          currentPage: 1
        });
      })
      .catch(reason => {
        this.setState({
          status: reason.status,
          statusText: reason.statusText
        });
      });
  };

  render() {
    if (this.state.status === appStatus.dataNotLoaded) {
      return (
        <div className="container">
          <Aside formSubmitHandler={this.formSubmitHandler} />
          <main>
            <h2>{this.state.statusText}</h2>
          </main>
        </div>
      );
    } else if (this.state.status === appStatus.dataLoaded) {
      return (
        <div className="container">
          <Aside formSubmitHandler={this.formSubmitHandler} />
          <main>
            <Characters charactersData={this.state.charactersData} />
            <Pagination
              pagesCount={this.state.pagesCount}
              currentPage={this.state.currentPage}
              onClick={this.paginationClickHandler}
            />
          </main>
        </div>
      );
    } else if (this.state.status === 404) {
      return (
        <div className="container">
          <Aside formSubmitHandler={this.formSubmitHandler} />
          <main>
            <h2>{this.state.statusText}</h2>
          </main>
        </div>
      );
    } else {
      return (
        <div className="container">
          <main>
            <h2>Unkown error while rendering</h2>
          </main>
        </div>
      );
    }
  }
}

export default App;
