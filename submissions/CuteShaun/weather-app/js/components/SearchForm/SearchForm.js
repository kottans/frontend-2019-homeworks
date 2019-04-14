import Component from '../../framework/Component';
import googleAutocomplete from '../../googlePlaces';
import AppState from '../../services/AppState';

google.maps.event.addDomListener(window, 'load', googleAutocomplete);

export default class SearchForm extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    ['updateMyself', 'myPersonalEvent'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this)),
    );

    this.state = {
      history: null,
    };
  }

  updateMyself(newState) {
    this.updateState(newState);
  }

  myPersonalEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    const inputValue = document.getElementById('city-input').value;
    const correctInputValue = inputValue.split(',');
    let newValue = '';

    if (localStorage.getItem('history')) {
      this.state.history = JSON.parse(localStorage.getItem('history'));
    } else {
      this.state.history = [];
    }

    if (correctInputValue.length > 2) {
      correctInputValue.splice(1, 1);
      newValue = correctInputValue.join(',');
    } else {
      newValue = inputValue;
    }

    if (newValue.includes('Ukraine') || newValue.includes('ukraine')) {
      const lowerValue = newValue.toLowerCase();
      newValue = lowerValue.replace(/ukraine/gi, 'UA');
    }

    if (this.state.history.includes(newValue)) {
      return;
    }
    if (this.state.history.length > 4) {
      this.state.history.shift();
      this.state.history.push(newValue);
    } else {
      this.state.history.push(newValue);
    }
    localStorage.setItem('history', JSON.stringify(this.state.history));
    AppState.update('USERINPUT', newValue);
  }

  render() {
    return [
      {
        tag: 'form',
        eventHandlers: { submit: this.myPersonalEvent },
        classList: ['forecast-form'],
        attributes: [],
        children: [
          {
            tag: 'input',
            classList: ['forecast-form__input'],
            attributes: [
              {
                name: 'type',
                value: 'text',
              },

              {
                name: 'id',
                value: 'city-input',
              },

              {
                name: 'placeholder',
                value: 'Синок, сюда пиши город, английскими буквами...',
              },

              {
                name: 'title',
                value: 'Ну ты же знаешь, твоя мама не любит три раза повторять, пиши город',
              },

              {
                name: 'name',
                value: 'city',
              },

              {
                name: 'required',
              },
            ],
          },

          {
            tag: 'button',
            content: 'Спросить маман за погоду',
            classList: ['forecast-form__button'],
            attributes: [
              {
                name: 'type',
                value: 'submit',
              },
              {
                name: 'id',
                value: 'city-button',
              },
            ],
          },
        ],
      },
    ];
  }
}
