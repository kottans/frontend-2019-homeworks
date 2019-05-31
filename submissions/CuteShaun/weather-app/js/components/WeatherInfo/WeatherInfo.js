import Component from '../../framework/Component';
import { SearchHistory } from '../SearchHistory';
import { FavouriteList } from '../FavouriteList';
import { ButtonsBox } from '../ButtonsBox';

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
        tag: 'div',
        classList: ['additional'],
        children: [
          {
            tag: 'div',
            classList: ['additional__tools'],
            children: [
              {
                tag: 'div',
                classList: ['additional__tools-item', 'additional__tools-item--1'],
                children: [
                  {
                    tag: 'div',
                    classList: ['history-head'],
                    content:
                      '<h3 class="history-h3"> <i class="fa fa-clock-o" aria-hidden="true"></i>История</h3>',
                    children: [
                      {
                        tag: 'button',
                        classList: ['clear-button'],
                        attributes: [
                          {
                            name: 'type',
                            value: 'button',
                          },
                        ],
                        eventHandlers: {
                          click: this.resetSerchHistory,
                        },
                        children: [
                          {
                            tag: 'i',
                            classList: ['fa', 'fa-trash'],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    tag: SearchHistory,
                  },
                ],
              },
              {
                tag: 'div',
                classList: ['additional__tools-item', 'additional__tools-item--2'],
                children: [
                  {
                    tag: 'div',
                    classList: ['favorite-head'],
                    content:
                      '<h3 class="history-h3">Шикарные места <i class="fa fa-heart" aria-hidden="true"></i></h3>',
                  },
                  {
                    tag: FavouriteList,
                    classList: ['test'],
                  },
                ],
              },
              {
                tag: 'div',
                classList: ['additional__tools-item', 'additional__tools-item--3'],
                children: [
                  {
                    tag: 'div',
                    classList: ['favorite-head'],
                    content: '<h3 class="history-h3">Величины</h3>',
                    children: [
                      {
                        tag: ButtonsBox,
                        classList: ['test'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }
}
