import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
export default class SearchBar extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('USERINPUT', this.updateMyself);
  }

  init() {
    ['updateMyself', 'onChange', 'onSubmit'].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
    this.state = {
      searchValue: null,
    }
  }

  updateMyself(subState) {
    this.updateState(subState);
  }

  onChange(event) {
    const searchValue = event.target.value;
    this.state.searchValue = searchValue;
  }

  onSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    AppState.update('USERINPUT', this.state.searchValue);
  }

  render() {
    return [
      {
        tag: 'form',
        classList: ['search-form'],
        attributes: [
          {
            name: 'autocomplete',
            value: 'off'
          }
        ],
        children: [
          {
            tag: 'input',
            classList: ['searchbar'],
            eventHandlers: { change: this.onChange },
            attributes: [
              {
                name: 'type',
                value: 'text'
              },
              {
                name: 'name',
                value: 'city'
              },
              {
                name: 'inputmode',
                value: 'verbatim'
              },
              {
                name: 'placeholder',
                value: 'Enter city name'
              },
              {
                name: 'title',
                value: 'Type city name'
              },
              {
                name: 'required',
                value: 'required'
              }
            ]
          },
          {
            tag: 'button',
            classList: ['search-button'],
            attributes: [
              {
                name: 'title',
                value: "What's the weather today?"
              }
            ]
          }
        ],
        eventHandlers: { submit: this.onSubmit }
      }
    ];
  }
}
