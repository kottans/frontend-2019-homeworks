import React, { Component } from 'react'
import './App.css';

import Filter from './components/filter'
import CharacterList from './components/character-list'
import Pagination from './components/pagination'

import { fetchCharacterList } from './services'

class App extends Component {
  state = {
    list: [],
    filter: {
      name: '',
      status: '',
      gender: '',
      page: 1,
      totalPages: 1
    }
  }

  async componentDidMount() {
    const {results: list, info} = await fetchCharacterList()
    const filter = this.state.filter

    filter.totalPages = info ? info.pages : 0
    this.setState({list, filter})
  }

  createQueryString(params){
    let arr = []
    for(const param in params) {
      if(params[param] !== '')
        arr.push(`${param}=${params[param]}`)
    }
    return arr.join('&')
  }

  async handleSearch({key, value}) {
    const filter = {...this.state.filter, [key]: value}
    const {results: list, info} = await fetchCharacterList(this.createQueryString(filter))

    filter.totalPages = info ? info.pages : 0
    filter.currentPage = 1
    this.setState({filter, list})
  }

  async handlePrevPage(){
    const filter = this.state.filter
    --filter.page
    const {results: list, info} = await fetchCharacterList(this.createQueryString(filter))

    filter.totalPages = info ? info.pages : 0
    this.setState({list, filter})
  }

  async handleNextPage(){
    const filter = this.state.filter
    ++filter.page
    const {results: list, info} = await fetchCharacterList(this.createQueryString(filter))

    filter.totalPages = info ? info.pages : 0
    this.setState({list, filter})
  }

  render() {
    return (
      <div className='App'>
        <Filter formSubmit={this.handleSearch.bind(this)}/>
        <CharacterList list={this.state.list}>
          <Pagination
            page={this.state.filter.page}
            total={this.state.filter.totalPages}
            goToNextPage={this.handleNextPage.bind(this)}
            goToPrevPage={this.handlePrevPage.bind(this)}
            />
        </CharacterList>
      </div>
    )
  }
}

export default App;
