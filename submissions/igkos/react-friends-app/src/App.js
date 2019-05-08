import React, { Component } from 'react';
import './App.scss';
import loader from './GravityAnimating.svg';

import { getComicsList } from './api';

import Popup from './components/Popup/Popup';
import Comics from './components/Comics/Comics';
import InputWrapper from './components/InputWrapper/InputWrapper';
import Pagination from './components/Pagination/Pagination';

class App extends Component {
  state = {
    list: [],
    isLoading: true,
    comicsListParams: {
      orderBy: 'modified',
      limit: 20,
      offset: 0,
    },
    totalPagesComics: 0,
    showPopup: false,
    error: null,
  };

  componentDidMount() {
    this.getComicsData();
  }

  getComicsData = async (params = {}) => {
    const { comicsListParams } = this.state;
    const newComicsListParams = { ...comicsListParams, ...params };
    this.setState({
      isLoading: true,
    });
    try {
      const { list, offset, total } = await getComicsList(newComicsListParams);
      this.setState({
        comicsListParams: { ...newComicsListParams, offset },
        list,
        totalPagesComics: total,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  };

  popupTargetComics = id => {
    if (id) {
      const targetComics = this.state.list.find(comics => comics.id === id);
      this.setState({
        targetComics,
      });
      this.togglePopup();
    }
  };
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  };
  render() {
    const {
      error,
      list,
      isLoading,
      targetComics,
      showPopup,
      comicsListParams,
      totalPagesComics,
    } = this.state;
    return (
      <div className="App">
        <header>
          <InputWrapper
            updateComics={this.getComicsData}
            {...comicsListParams}
          />
        </header>
        {error ? <h2>error: {error.message}</h2> : null}
        {isLoading ? (
          <img src={loader} className="App-logo" alt="logo" />
        ) : null}
        {!error && !isLoading ? (
          <>
            <main>
              {list.map(comics => (
                <Comics
                  key={comics.id}
                  comics={comics}
                  handleClick={this.popupTargetComics}
                />
              ))}
              {!list.length ? <h2>Oops nothing found :(</h2> : null}
            </main>
            <Pagination
              handleClick={this.getComicsData}
              total={totalPagesComics}
              {...comicsListParams}
            />
          </>
        ) : null}
        {showPopup ? (
          <Popup
            text="Close Me"
            closePopup={this.togglePopup}
            comics={targetComics}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
