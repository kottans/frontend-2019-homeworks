import React, { Component } from 'react';
import './App.sass';
import { getList } from './api';
import UserCards from './components/UserCards/UserCards';
import SearchFilter from './components/SearchFilter/SearchFilter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      filterSpecies: null,
      sortAscDesc: null,
      isLoaded: false,
      change: null,
      notFound: null,
      currentApiUrl: 'https://rickandmortyapi.com/api/character',
      nextApiUrl: '',
      prevApiUrl: ''
    };
  }

  handleClickNext = () => {
    getList(this.state.nextApiUrl).then(data => {
      this.setState({
        list: data.results,
        nextApiUrl: data.info.next,
        prevApiUrl: data.info.prev
      });
    });
  };

  handleClickPrev = () => {
    getList(this.state.prevApiUrl).then(data => {
      this.setState({
        list: data.results,
        data: data,
        nextApiUrl: data.info.next,
        prevApiUrl: data.info.prev
      });
    });
  };

  async componentDidMount() {
    const list = await getList(this.state.currentApiUrl);
    this.setState({
      list: list.results,
      data: list,
      nextApiUrl: list.info.next,
      isLoaded: true
    });
  }

  performSearch = ({ change }) => {
    this.setState({ change });
  };

  performSort = ({ sortAscDesc }) => {
    this.setState({ sortAscDesc });
  };

  performFilter = ({ filterSpecies }) => {
    this.setState({ filterSpecies });
  };

  sortByAsc = list => list.sort((a, b) => (a.name < b.name ? -1 : 1));

  sortByDesc = list => list.sort((a, b) => (a.name < b.name ? 1 : -1));

  sortPersons = (list, state) => {
    if (state === 'desc') {
      return list.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else {
      return list.sort((a, b) => (a.name < b.name ? -1 : 1));
    }
  };

  filterByName = (list, name) => list.filter(item => item.name.includes(name));

  filterBySpecies = (list, species) =>
    list.filter(item => item.species === species);

  render() {
    const {
      list,
      isLoaded,
      notFound,
      change,
      sortAscDesc,
      filterSpecies,
      prevApiUrl,
      nextApiUrl
    } = this.state;
    let result = list;

    if (sortAscDesc) {
      result = this.sortPersons(list, sortAscDesc);
    }

    if (filterSpecies) {
      result =
        filterSpecies === 'human'
          ? this.filterBySpecies(list, 'Human')
          : this.filterBySpecies(list, 'Alien');
    }

    if (change) {
      result = this.filterByName(list, change);
    }

    if (!isLoaded) {
      return (
        <div className='preloader'>
          <div className='pulse' />
        </div>
      );
    }
    if (notFound) {
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
                disabled={!prevApiUrl}
              >
                ← Prev Page
              </button>
              <button
                className='button'
                onClick={this.handleClickNext}
                disabled={!nextApiUrl}
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
              {result.map(item => {
                return <UserCards key={item.id} {...item} />;
              })}
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
