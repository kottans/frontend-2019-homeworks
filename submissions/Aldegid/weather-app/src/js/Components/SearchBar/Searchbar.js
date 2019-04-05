import Component from "../../framework/Component";
import googleAutocomplete from "../../googlePlaces"
import AppState from "../../Services/AppState";

google.maps.event.addDomListener(window, 'load', googleAutocomplete);


export default class Searchbar extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    ["updateMyself", "handleChange"].forEach(
      methodName => (this[methodName] = this[methodName].bind(this))
    );
    this.state = {
      history: localStorage.getItem("history") ? JSON.parse(localStorage.getItem("history")) : [],
    }
  }

  updateMyself(newState) {
    this.updateState(newState);
  }

  handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const searchInput = document.querySelector('.container__inputs-search');

    if(this.state.history.includes(searchInput.value)) {
      return
    }
    if(this.state.history.length > 4) {
      this.state.history.shift();
      this.state.history.push(searchInput.value);
    }
    else {
      this.state.history.push(searchInput.value);
    }
    localStorage.setItem('history', JSON.stringify(this.state.history));
    AppState.update('USERINPUT', searchInput.value);
  }

  render() {
    return  [
      {
        tag: 'div',
        classList: ['container', 'container__top'],
        children: [
          {
            tag: 'div',
            classList: ['container__inputs'],
            children: [
              {
                tag: 'form',
                classList: ['main__form'],
                eventHandlers: {
                  submit: this.handleChange
                },
                children: [
                  {
                    tag: 'input',
                    classList: ['container__inputs-search'],
                    attributes: [
                      {name: 'type', value: 'search'},
                      {name: 'name', value: 'search'},
                      {name: 'id', value: 'search'},
                      {name: 'placeholder', value: 'Search by city name...'},
                      {name: 'require', value: 'require'}
                    ],
                  },
                  {
                    tag: 'button',
                    classList: ['search__button'],
                    content: `<i class="fa fa-search" aria-hidden="true"></i>`
                  },
                ]
              },

            ]
          }
        ]
      },

    ];
  }
}
