import React, { Component } from 'react';
import './App.scss';
import loader from './GravityAnimating.svg';

import { getComicsList, setComicsSearchParams } from './api';

import Popup from './Popup';
import Comics from './Comics';
import InputWrapper from './InputWrapper';
import Pagination from './Pagination';

const Title = ({ title }) => <h2>{title}</h2>;
const Image = ({ path, extension, alt }) => (
  <img src={`${path}.${extension}`} alt={alt} />
);
class App extends Component {
  state = {
    list: [],
    isLoading: true,
    searchParams: {
      orderBy: 'modified',
      titleStartsWith: '',
      limit: 20,
      offset: 0,
      total: 0,
    },
    showPopup: false,
  };

  async componentDidMount() {
    this.updateComicsDate();
  }
  updateComicsDate = async () => {
    const { list, offset, total } = await getComicsList();
    this.updateSearchParams({ offset, total });
    this.setState({ list, isLoading: false });
  };
  updateSearchParams = params => {
    let { searchParams } = this.state;
    searchParams = Object.assign(searchParams, params);
    this.setState(searchParams);
  };
  setComicsLParams = async params => {
    this.setState({ isLoading: true });
    this.updateSearchParams(params);
    setComicsSearchParams(this.state.searchParams);
    this.updateComicsDate();
  };
  onClick = e => {
    const title = e.target.alt;
    if (e.target.alt) {
      const targetComics = this.state.list.find(
        comics => comics.title === title,
      );
      this.togglePopup(targetComics);
    }
  };
  togglePopup = (targetComics = {}) => {
    this.setState({
      showPopup: !this.state.showPopup,
      targetComics,
    });
  };
  render() {
    const {
      list,
      isLoading,
      targetComics,
      showPopup,
      searchParams,
    } = this.state;
    return (
      <div className="App">
        <nav>
          <InputWrapper
            handleSubmit={this.setComicsLParams}
            {...searchParams}
          />
        </nav>

        {isLoading ? (
          <img src={loader} className="App-logo" alt="logo" />
        ) : (
          <>
            <main onClick={this.onClick}>
              {list.map(comics => (
                <Comics
                  key={comics.id}
                  title={<Title title={comics.title} />}
                  image={<Image {...comics.thumbnail} alt={comics.title} />}
                />
              ))}
              {!list.length ? <h2>Oops nothing found ":("</h2> : null}
            </main>
            <Pagination handleClick={this.setComicsParams} {...searchParams} />
          </>
        )}
        {showPopup ? (
          <Popup
            text="Close Me"
            closePopup={this.togglePopup}
            comics={targetComics}
            title={<Title title={targetComics.title} />}
            image={
              <Image {...targetComics.thumbnail} alt={targetComics.title} />
            }
          />
        ) : null}
      </div>
    );
  }
}

export default App;
