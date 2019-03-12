import Component from "../../framework/Component";
import Data from "../../Data/fakeData"
export default class FavCities extends Component {
  constructor(host, props) {
    super(host, props);
  }

  createSearchedCity(city){
      let historyItem = document.createElement('div');

      historyItem.classList.add('cityItem');
      let historyItem__city = document.createElement('div');
      historyItem__city.classList.add('cityItem__city');

      let star = document.createElement('div');
      star.classList.add('cityItem__star')
      star.innerHTML = '<i class="fas fa-star"></i>';

      historyItem__city.textContent = city;
      historyItem.appendChild(star);

      historyItem__city.setAttribute('tabindex', '0');
      historyItem.appendChild(historyItem__city);


      return historyItem;
  }


  render() {


      let title = document.createElement('h1');
      title.textContent = 'Favorite cities';
      title.classList.add('favCities__title');

      let cityContainer = document.createElement('div');
      cityContainer.classList.add('cityContainer');

      if(this.props.favCities.length > 0) {
        this.props.favCities.forEach(item => {

          cityContainer.appendChild( this.createSearchedCity(item));
        })
      }





      return [
          title,
          cityContainer
      ];
  }
}
