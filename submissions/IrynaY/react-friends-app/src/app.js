import React, { Component } from 'react'
import './app.css'

import Filter from './components/filter'
import Sorter from './components/sorter'

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

  componentDidMount() {
    const filter = this.state.filter
    this.resetPageState(filter)
  }

  handleSearch({ key, value }) {
    const filter = {...this.state.filter, [key]: value}
    this.resetPageState(filter)
  }

  handleSort(list) {
    this.setState({list})
  }

  handlePrevPage() {
    const filter = this.state.filter
    --filter.page
    this.updatePageState(filter)
  }

  handleNextPage() {
    const filter = this.state.filter
    ++filter.page
    this.updatePageState(filter)
  }

  createQueryString( params ) {
    const arr = []
    for(const param in params) {
      if(param !== 'totalPages' && params[param] !== '')
        arr.push(`${param}=${params[param]}`)
    }
    return arr.join('&')
  }

  async resetPageState( filter ) {
    const {results: list, info} = await fetchCharacterList(this.createQueryString(filter))
    filter.totalPages = info ? info.pages : 0
    filter.page = 1
    this.setState({list, filter})
  }

  async updatePageState( filter ) {
    const {results: list} = await fetchCharacterList(this.createQueryString(filter))
    this.setState({list, filter})
  }

  render() {
    return(
      <div className='App'>
        <div className='sidebar'>
          <Sorter 
            apllySort={this.handleSort.bind(this)} 
            list={this.state.list}/>
          <Filter formSubmit={this.handleSearch.bind(this)}/>
        </div>
        <CharacterList list={this.state.list}>
          <Pagination
            page={this.state.filter.page}
            total={this.state.filter.totalPages}
            goToNextPage={this.handleNextPage.bind(this)}
            goToPrevPage={this.handlePrevPage.bind(this)}/>
        </CharacterList>
      </div>
    )
  }
}

export default App;
