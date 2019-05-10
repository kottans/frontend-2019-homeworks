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

  getCurrentPage = async page => {
    const result = await getList(page);
    this.setState({
      list: result.results,
      nextPageUrl: result.info.next,
      prevPageUrl: result.info.prev
    });
  };

  async componentDidMount() {
    await this.getCurrentPage(this.state.currentPageUrl);
    this.setState({ isLoaded: true });
  }

  handleClickNext = () => {
    this.getCurrentPage(this.state.nextPageUrl);
  };

  handleClickPrev = () => {
    this.getCurrentPage(this.state.prevPageUrl);
  };

  performSearch = ({ searchInputValue }) => {
    this.setState({ searchInputValue });
  };

  performSortFilter = args => {
    this.setState(args);
  };

  runSorting = (a, b) => (a.name < b.name ? 1 : -1);

  sortPersons = (list, state) => {
    if (state === 'desc') {
      return list.sort(this.runSorting);
    }
    return list.sort((a, b) => this.runSorting(b, a));
  };

  filterByName = (list, name) =>
    list.filter(item => item.name.toLowerCase().includes(name));

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

            <SearchFilter handleSortFilter={this.performSortFilter} />
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
