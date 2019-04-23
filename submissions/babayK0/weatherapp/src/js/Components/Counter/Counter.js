import Component from '../../framework/Component';
export default class Counter extends Component {
  constructor(host, props) {
    super(host, props);
  }

  init() {
    ['increment', 'decrement']
    .forEach(methodName => this[methodName] = this[methodName].bind(this));
    this.state = {
      value: this.props.value * 2,
      quantifier: 7,
    }
  }

  render() {
    return [
      {
        tag: 'button',
        content: '-',
        eventHandlers: {
          click: this.decrement,
        },
      },
      {
        tag: 'span',
        content: this.state.value
      },
      {
        tag: 'button',
        content: '+',
        eventHandlers: {
          click: this.increment,
        },
      },
    ];
  }

  decrement() {
    this.updateState({
      value: this.state.value - this.state.quantifier,
    });
  } 

  increment() {
    this.updateState({
      value: this.state.value + this.state.quantifier,
    });
  }

}
