import React, { Component } from 'react';
import './App.scss';
import loader from './GravityAnimating.svg';

import { getComicsList } from './api';

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
    this.getComicsData();
  }
  getComicsData = async () => {
    let { searchParams } = this.state;
    const { list, offset, total } = await getComicsList(searchParams);
    this.setState({
      searchParams: { ...searchParams, offset, total },
      list,
      isLoading: false,
    });
  };
  updateComics = async params => {
    let { searchParams } = this.state;
    await this.setState({
      isLoading: true,
      searchParams: { ...searchParams, ...params },
    });
    this.getComicsData();
  };
  popupTargetComics = e => {
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
      searchParams,
    } = this.state;
    return (
      <div className="App">
        <nav>
          <InputWrapper updateComics={this.updateComics} {...searchParams} />
        </nav>

        {isLoading ? (
          <img src={loader} className="App-logo" alt="logo" />
        ) : (
          <>
            <main onClick={this.popupTargetComics}>
              {list.map(comics => (
                <Comics
                  key={comics.id}
                  image={<Image {...comics.thumbnail} alt={comics.title} />}
                />
              ))}
              {!list.length ? <h2>Oops nothing found ":("</h2> : null}
            </main>
            <Pagination handleClick={this.updateComics} {...searchParams} />
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
