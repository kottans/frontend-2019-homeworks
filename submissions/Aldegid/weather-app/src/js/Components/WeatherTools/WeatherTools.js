import Component from "../../framework/Component";
import {SearchHistory} from "../SearchHistory";
import {FavouriteLocations} from "../FavouriteLocations";
export default class WeatherTools extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    this.resetSerchHistory = this.resetSerchHistory.bind(this);
  }

  resetSerchHistory() {
    localStorage.removeItem('history');
    this._render();
  }

  render() {
    return [
      {
        tag: "div",
        classList: ["container"],
        children: [
          {
            tag: 'div',
            classList: ["container__tools"],
            children: [
              {
                tag: 'div',
                classList: ["container__tools-item"],
                children: [
                  {
                    tag: 'div',
                    classList: ['history-head'],
                    content:`<h3 class="history-h3"> <i class="fa fa-clock-o" aria-hidden="true"></i>History</h3>`,
                    children: [
                      {
                        tag: 'button',
                        classList:['clear-button'],
                        attributes: [
                          {
                            name: 'type',
                            value: 'button'
                          }
                        ],
                        eventHandlers: {
                          click: this.resetSerchHistory,
                        },
                        children: [
                          {
                            tag: 'i',
                            classList: ['fa', 'fa-trash']
                          }
                        ]
                      }
                    ]

                  },
                  {
                    tag: SearchHistory
                  }
                ]
              },
              {
                tag: 'div',
                classList: ["container__tools-item"],
                children: [
                  {
                    tag: 'div',
                    classList: ["favorite-head"],
                    content: `<h3 class="history-h3"> <i class="fa fa-star" aria-hidden="true"></i>Favorites</h3>`
                  },
                  {
                    tag: FavouriteLocations,
                    classList: ['test']
                  },
                ]
              }
            ]
          },

        ]
      }
    ];
  }
}
