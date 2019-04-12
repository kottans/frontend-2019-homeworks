import React, { Component } from 'react';
import './App.css';
import {getList} from './api'
import UserCards from './components/UserCards/UserCards'
import SearchFilter from './components/SearchFilter/SearchFilter'
// import Sort from './components/Sort/Sort'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      data: null,
      isLoaded: false,
      // name: null,
      // change: null,
      // asc: false,
      // desc: false,
      // alien: false,
      // human: false,
      currentApiUrl: 'https://rickandmortyapi.com/api/character',
      nextApiUrl: '',
      prevApiData: '',

    };
  }

  handleClickNext = () => {
    const nextList = getList(this.state.nextApiUrl);
    nextList.then( data => {
      this.setState({
        list: data.results,
        data: data,
        nextApiUrl: data.info.next,
        prevApiData: data.info.prev
      })
    })
  }
  handleClickPrev = () => {
    const prevList = getList(this.state.prevApiData);
    prevList.then( data => {
      this.setState({
        list: data.results,
        data: data,
        nextApiUrl: data.info.next,
        prevApiData: data.info.prev
      })
    })
  }

  async componentDidMount() {
    const list = await getList(this.state.currentApiUrl);
    //console.log(list)
    this.setState({
      list: list.results,
      data: list,
      nextApiUrl: list.info.next,
      isLoaded: true
    })
  }

  performSearch = ({name,  change }) => {
    this.setState({ name, change })
  }
  performSort = ({ asc, desc }) => {
    this.setState({ asc, desc })
  }
  performFilter = ({ alien, human }) => {
    this.setState({ alien, human })
  }

  render() {

    const {list, isLoaded, name, change, asc, desc, alien, human} = this.state;
    let result = list;

    if(asc) {
      result = list.sort((a, b) => a.name < b.name ? -1 : 1);
    }
    if(desc) {
      result = list.sort((a, b) => a.name < b.name ? 1 : -1);
    }
    if(human) {
      result = list.filter(item => item.species === 'Human');
    }
    if(alien) {
      result = list.filter(item => item.species === 'Alien');
    }
    if(name ||change) {
      result = list.filter(item => item.name.includes(name || change))
    }
    //console.log('result', result);


    if(!isLoaded) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
        return (
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <button
                  className="btn btn-secondary m-2"
                  onClick={this.handleClickPrev}
                  disabled={!this.state.prevApiData}
                  >
                  ← Prev Page
                </button>
                <button
                  className="btn btn-secondary m-2"
                  onClick={this.handleClickNext}
                  disabled={!this.state.nextApiUrl}
                  >
                  Next Page →
                </button>
                <SearchFilter
                  handleSearch={this.performSearch}
                  handleSort={this.performSort}
                  handleFilter={this.performFilter}
                />
              </div>
                {result.map(item => {
                  return <UserCards key={item.id} {...item}/>
                })}
              </div>


          </div>
        );
    }

  }
}

export default App;
