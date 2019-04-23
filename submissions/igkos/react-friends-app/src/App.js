import React, { Component } from 'react';
import './App.scss';
import loader from './GravityAnimating.svg';

import { getComicsList } from './api';

import Popup from './components/Popup/Popup';
import Comics from './components/Comics/Comics';
import InputWrapper from './components/InputWrapper/InputWrapper';
import Pagination from './components/Pagination/Pagination';

const Title = ({ title }) => <h2>{title}</h2>;
const Image = ({ path, extension, alt }) => (
  <img src={`${path}.${extension}`} alt={alt} />
);
class App extends Component {
  state = {
    list: [],
    isLoading: true,
    comicsListParams: {
      orderBy: 'modified',
      titleStartsWith: '',
      limit: 20,
      offset: 0,
      total: 0,
    },
    showPopup: false,
  };

  async componentDidMount() {
    this.getComicsData();
  }

  getComicsData = async (params = {}) => {
    const { comicsListParams } = this.state;
    const newComicsListParams = { ...comicsListParams, ...params };
    this.setState({
      isLoading: true,
    });
    const { list, offset, total } = await getComicsList(newComicsListParams);
    this.setState({
      comicsListParams: { ...newComicsListParams, offset, total },
      list,
      isLoading: false,
    });
  };

  popupTargetComic = e => {
    const title = e.target.alt;
    if (title) {
      const targetComics = this.state.list.find(
        comics => comics.title === title,
      );
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
      list,
      isLoading,
      targetComics,
      showPopup,
      comicsListParams,
    } = this.state;
    return (
      <div className="App">
        <nav>
          <InputWrapper
            updateComics={this.getComicsData}
            {...comicsListParams}
          />
        </nav>

        {isLoading ? (
          <img src={loader} className="App-logo" alt="logo" />
        ) : (
          <>
            <main onClick={this.popupTargetComic}>
              {list.map(comics => (
                <Comics
                  key={comics.id}
                  image={<Image {...comics.thumbnail} alt={comics.title} />}
                />
              ))}
              {!list.length ? <h2>Oops nothing found ":("</h2> : null}
            </main>
            <Pagination
              handleClick={this.getComicsData}
              {...comicsListParams}
            />
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
