import Component from '../../framework/Component';
import { WeatherForecast } from '../WeatherForecast';
import { Temperature } from '../Temperature';
import { Wind } from '../Wind';
import { SearchForm } from '../SearchForm';
import { WeatherInfo } from '../WeatherInfo';
import { WeatherForecastItem } from '../WeatherForecastItem';
import { ButtonsBox } from '../ButtonsBox';

export default class App extends Component {
  constructor(host) {
    super(host);
    // this._render();
  }

  // onClick(e) {}

  init() {}

  // eslint-disable-next-line class-methods-use-this
  render() {
    // if (data === undefined) {
    //   data = '';
    // }

    // this.props.data = data;

    const t1 = document.createDocumentFragment();
    new Temperature(t1, { temperature: 25, unit: 'C' });

    const w1 = document.createDocumentFragment();
    // eslint-disable-next-line no-new
    new Wind(w1, { speed: 100500, unit: 'mph' });

    // if () {
    //   return [
    //     {
    //       tag: 'div',
    //       classList: ['container'],
    //       children: [
    //         {
    //           tag: 'div',
    //           classList: ['row'],
    //           children: [
    //             {
    //               tag: 'h3',
    //               content: 'Weather forecast from Odessa mother',
    //               classList: ['main-title'],
    //             },

    //             {
    //               tag: SearchForm,
    //               props: {
    //                 eventHandlers: [
    //                   {
    //                     eventType: 'submit',
    //                     handler: this.onSubmit,
    //                   },
    //                 ],
    //                 attributes: [
    //                   {
    //                     name: 'id',
    //                     value: 'search-form',
    //                   },
    //                 ],
    //               },
    //             },
    //           ],
    //         },
    //         {
    //           tag: 'footer',
    //           content:
    //             'Для моей настоящей одесской мамы Лили :) <span class="copyright">C любовью <a class="link" href="https://github.com/CuteShaun">сuteshaun</a> из <a class="link" href="http://kottans.org/">Kottans</a></span>',
    //         },
    //       ],
    //     },
    //   ];
    // }

    return [
      {
        tag: 'div',
        classList: ['container'],
        children: [
          {
            tag: 'div',
            classList: ['row'],
            children: [
              {
                tag: 'h3',
                content: 'Weather forecast from Odessa mother',
                classList: ['main-title'],
              },

              {
                tag: 'div',
                classList: ['content-wrapper'],
                children: [
                  {
                    tag: 'div',
                    classList: ['content-wrapper__item', 'content-wrapper__item--1'],
                    children: [
                      {
                        tag: SearchForm,
                        props: {
                          attributes: [
                            {
                              name: 'id',
                              value: 'search-form',
                            },
                          ],
                        },
                      },

                      {
                        tag: WeatherForecast,
                        props: {
                          todayData: 'fa',
                          fiveDayData: 'dadad',
                        },
                      },

                      { tag: WeatherInfo },
                    ],
                  },
                ],
              },
            ],
          },
          {
            tag: 'footer',
            content:
              'Для моей настоящей одесской мамы Лили :) <span class="copyright">C любовью <a class="link" href="https://github.com/CuteShaun">сuteshaun</a> из <a class="link" href="http://kottans.org/">Kottans</a></span>',
          },
        ],
      },
    ];
  }
}
