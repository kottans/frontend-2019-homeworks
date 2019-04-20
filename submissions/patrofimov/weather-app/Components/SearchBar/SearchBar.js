import Component from "../../framework/Component";
import ComponentFactory from "../../framework/ComponentFactory";
export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  render() {
    const query = this.props.query;
    return `<div id="search-bar">
    <div class="row">
        <div class="input-container">
            <input type="text" value="${
              query ? query : ""
            }" id="search-input" class="search" placeholder="E.g.: Kyiv, New York, 30.5 50.4, -74.0 40.7" title="Enter city or location!"/>
            <div id="history-container" class="city-container"></div>
        </div>
        <button type="submit" id="search-action" class="btn-frameless btn-search btn-round" title="Get weather" type="button" ${
          query ? "" : "enabled"
        }><i class="material-icons" omclick=${null}>location_searching</i></button>
    </div>
    <div id="auto-complete-container" class="city-container"></div>
    <div id="favorites-container" class="city-container"></div>
    </div>`;
  }
}

ComponentFactory.register(SearchBar);
