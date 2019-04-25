import React, { Component } from 'react'
import './app.css'

import Spinner from './components/spinner'
import Filter from './components/filter'
import Sorter from './components/sorter'
import CharacterList from './components/character-list'
import Pagination from './components/pagination'

import { fetchCharacterList, createQueryStringFromObject } from './services'

class App extends Component {
  state = {
    list: [],
    filter: {
      name: '',
      status: '',
      gender: '',
      page: 1
    },
    sort: '',
    pages: 0, 
    isLoad: false
  }

  componentDidMount() {
    const { filter } = this.state
    this.resetPageState(filter)
  }

  handleSearch = ({ key, value }) => {
    const { filter } = this.state
    filter[key] = value
    this.resetPageState(filter)
  }

  handleSort = ( order ) => {
    const { list } = this.state
    if(order === 'asc'){
      list.sort(( current, next ) => current.name > next.name ? 1 : -1)
      this.setState({list, sort: order})
    } else if (order === 'desc') {
      list.sort(( current, next ) => current.name < next.name ? 1 : -1)
      this.setState({list, sort: order})
    }
  }

  handlePageNavigation = async ( page ) => {
    this.setState({isLoad: false})
    const { filter } = this.state
    filter.page = page
    const { results: list } = await fetchCharacterList( createQueryStringFromObject(filter) )
    this.setState({list, filter, sort: '', isLoad: true})
  }

  async resetPageState( filter ) {
    try {
      this.setState({isLoad: false})
      const { results: list, info } = await fetchCharacterList( createQueryStringFromObject(filter) )
      this.setState({list, filter, sort: '', pages: info.pages, isLoad: true})
    } catch (error) {
      this.setState({list: [], sort: '', pages: 0, isLoad: true})
    }
  }

  render() {
    const { filter, list, pages, sort, isLoad } = this.state
    return (
      <div className='App'>
        <div className='sidebar'>
          <Sorter apllySort={this.handleSort} order={sort}/>
          <Filter formOnChange={this.handleSearch}/>
        </div>
          {!isLoad 
            ? <Spinner/>
            : <CharacterList list={list}>
                {(pages !== 1) && <Pagination page={filter.page} total={pages} onClick={this.handlePageNavigation}/>}
              </CharacterList>
          }
      </div>
    )
  }
}

export default App;
