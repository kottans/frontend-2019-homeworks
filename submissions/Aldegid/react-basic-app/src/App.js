import React, { Component } from 'react';
import './App.sass';
import { getList } from './api';
import UserCards from './components/UserCards/UserCards';
import SearchFilter from './components/SearchFilter/SearchFilter';

class App extends Component {
  state = {
    list: null,
    filterSpecies: null,
    sortOrder: null,
    isLoaded: false,
    searchInputValue: null,
    currentPageUrl: 'https://rickandmortyapi.com/api/character',
    nextPageUrl: '',
    prevPageUrl: ''
  };

  getCurrentPage = page => {
    getList(page).then(data => {
      this.setState({
        list: data.results,
        nextPageUrl: data.info.next,
        prevPageUrl: data.info.prev,
        isLoaded: true
      });
    });
  };

  handleClickNext = () => {
    this.getCurrentPage(this.state.nextPageUrl);
  };

  handleClickPrev = () => {
    this.getCurrentPage(this.state.prevPageUrl);
  };

  componentDidMount() {
    this.getCurrentPage(this.state.currentPageUrl);
  }

  performSearch = ({ searchInputValue }) => {
    this.setState({ searchInputValue });
  };

  performSort = ({ sortOrder }) => {
    this.setState({ sortOrder });
  };

  performFilter = ({ filterSpecies }) => {
    this.setState({ filterSpecies });
  };

  runSorting = (a, b) => (a.name < b.name ? 1 : -1);

  sortPersons = (list, state) => {
    if (state === 'desc') {
      return list.sort(this.runSorting);
    }
    return list.sort((a, b) => this.runSorting(b, a));
  };

  filterByName = (list, name) => list.filter(item => item.name.includes(name));

  filterBySpecies = (list, species) =>
    list.filter(item => item.species === species);

  render() {
    const {
      list,
      isLoaded,
      searchInputValue,
      sortOrder,
      filterSpecies,
      prevPageUrl,
      nextPageUrl
    } = this.state;
    let result = list;

    if (sortOrder) {
      result = this.sortPersons(list, sortOrder);
    }

    if (filterSpecies) {
      result = this.filterBySpecies(list, filterSpecies);
    }

    if (searchInputValue) {
      result = this.filterByName(list, searchInputValue);
    }

    if (!isLoaded) {
      return (
        <div className='preloader'>
          <div className='pulse' />
        </div>
      );
    }

    return (
      <div className='container'>
        <section className='main-section'>
          <aside className='filter'>
            <div className='buttons-group'>
              <button
                className='button'
                onClick={this.handleClickPrev}
                disabled={!prevPageUrl}
              >
                ← Prev Page
              </button>
              <button
                className='button'
                onClick={this.handleClickNext}
                disabled={!nextPageUrl}
              >
                Next Page →
              </button>
            </div>

            <SearchFilter
              handleSearch={this.performSearch}
              handleSort={this.performSort}
              handleFilter={this.performFilter}
            />
          </aside>
          <div className='users-wrap'>
            <div className='users'>
              {result.map(item => (
                <UserCards key={item.id} {...item} />
              ))}
            </div>
            {result.length === 0 ? (
              <div className='not-found'>
                Oops, Nothing found{' '}
                <span role='img' aria-label='img'>
                  😱
                </span>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
