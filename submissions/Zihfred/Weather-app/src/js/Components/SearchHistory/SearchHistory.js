import Component from "../../framework/Component";
import Data from "../../Data/fakeData"
export default class SearchHistory extends Component {
  constructor(host, props) {
    super(host, props);
  }

  createSearchedCity(city){
      let historyItem = document.createElement('div');

      historyItem.classList.add('historyItem');
      let historyItem__city = document.createElement('div');
      historyItem__city.classList.add('historyItem__city');
      historyItem__city.textContent = city;
      historyItem__city.setAttribute('tabindex', '0');
      historyItem.appendChild(historyItem__city);


      return historyItem;
  }


  render() {


      let title = document.createElement('h1');
      title.textContent = 'Search History';
      title.classList.add('searchHistory__title');

      let cityContainer = document.createElement('div');
      cityContainer.classList.add('cityContainer');

      if(this.props.history.length > 0) {
        this.props.history.forEach(item => {

          cityContainer.appendChild( this.createSearchedCity(item));
        })
      }





      return [
          title,
          cityContainer
      ];
  }
}
