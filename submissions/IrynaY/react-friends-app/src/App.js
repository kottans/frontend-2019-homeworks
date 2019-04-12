import React, { Component } from 'react'
import './App.css';

import Filter from './components/filter'
import CharacterList from './components/character-list'

import { fetchCharacterList } from './services'

class App extends Component {
  state = {
    list: [],
    info: {},
    filter: {}
  }

  async componentDidMount(){
    const {info, results: list} = await fetchCharacterList()
    // console.log(kist)
    this.setState({list, info, page: 1})
  }

  async applyFilter() {
    // const {info, results: list} = await fetchCharacterList()
    // this.setState(list)
    console.log("19829213897321978")
  }

  render() {
    console.log(this.state)
    return (
      <div className='App'>
        <Filter handleSubmit={this.applyFilter}/>
        <CharacterList list={this.state.list} page={this.state.page}/>
      </div>
    );
  }
}

export default App;
