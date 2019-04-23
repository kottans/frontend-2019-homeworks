import Component from '../../framework/Component';
import { History } from '../../Components/History';
import { Favorites } from '../../Components/Favorites';
export default class WeatherLists extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {}

  render() {
    return [
      {
        tag: 'div',
        classList: ['weather-list'],
        children: 
        [
          {
            tag: 'h3',
            classList: ['list-title'],
            content: 'Search History'
          },
          {
            tag: 'div',
            classList: ['history-list'],
            children: [
              {
                tag: History
              }
            ]
          }
        ],
      },
      {
        tag: 'div',
        classList: ['weather-list'],
        children: 
        [
          {
            tag: 'h3',
            classList: ['list-title'],
            content: 'Favorites'
          },
          {
            tag: 'div',
            classList: ['favorites-list'],
            children: [
              {
                tag: Favorites
              }
            ]
          }
        ],
      }
    ];
  }
}
