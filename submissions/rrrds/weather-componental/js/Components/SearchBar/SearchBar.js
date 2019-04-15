import { Component, ComponentFactory, parseJSX } from 'recat';

export default class SearchBar extends Component {
  handleSearchSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);

    this.props.handleSearch(data.get('searchField'));
  }

  render() {
    return parseJSX`
      <form 
        class={search-form}
        onSubmit={${e => this.handleSearchSubmit(e)}}>
        <input 
          class={search__input} 
          name={searchField} 
          value={${this.props.cityName || ''}} />
        <button class={button button--search}>Search</button>
      </form>`;
  }
}

ComponentFactory.register(SearchBar);
