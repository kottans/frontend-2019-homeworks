import Component from '../../framework/Component';
import AppState from '../../services/AppState';

export default class ButtonsBox extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    ['onClick', 'updateMyself'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this)),
    );
    this.state = {
      city: 'null',
      unit: 'metric',
      celsium: 'C°',
      windSpeed: 'm/s',
    };
  }

  updateMyself(newState) {
    this.updateState(newState);
  }

  onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const classNames = [...e.target.classList];

    if (classNames.includes('units-btn')) {
      if (this.state.unit === 'metric') {
        this.state.unit = 'imperial';
        this.state.celsium = 'F°';
        this.state.windSpeed = 'mph';
      } else {
        this.state.unit = 'metric';
        this.state.celsium = 'C°';
        this.state.windSpeed = 'm/s';
      }

      AppState.update('UNIT', this.state);
    }
  }

  render() {
    return [
      {
        tag: 'div',
        classList: 'button-box',
        eventHandlers: { click: this.onClick },
        children: [
          {
            tag: 'button',
            classList: ['button-box__item', 'units-btn'],
            content: 'С/F',
            attributes: [
              {
                name: 'type',
                value: 'button',
              },
            ],
          },
        ],
      },
    ];
  }
}
