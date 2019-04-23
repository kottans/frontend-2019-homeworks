import Component from '../../framework/Component';
import AppState from '../../Services/AppState';
export default class CountControls extends Component {
  constructor(host, props) {
    super(host, props);
    AppState.watch('COUNT', this.updateMyself);
  }

  init() {
    ['increment', 'decrement', 'updateMyself']
    .forEach(methodName => this[methodName] = this[methodName].bind(this));
    this.state = {
      value: this.props.value * 2,
      quantifier: 7,
    }
  }

  updateMyself(subState) {
    // .... transform response
    // do update
    this.updateState(subState);
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
        tag: 'button',
        content: '+',
        eventHandlers: {
          click: this.increment,
        },
      },
    ];
  }

  decrement() {
    AppState.update('COUNT', {
      value: this.state.value - this.state.quantifier,
    });
  } 

  increment() {
    AppState.update('COUNT', {
      value: this.state.value + this.state.quantifier,
    });
  }

}



// import Component from '../../framework/Component';
// import { CountControls } from '../CountControls';
// import { PrettyNumber } from '../PrettyNumber';

// export default class App extends Component {
//   constructor(host) {
//     super(host);
//   }

//   init() {}
  
//   render() {
//     return [
//       {
//         tag: PrettyNumber,
//         containerTag: 'div',
//         props: {
//           value: 5,
//         }
//       },
//       {
//         tag: CountControls,
//         containerTag: 'div',
//         props: {
//           value: 5,
//         }
//       },
//       {
//         tag: PrettyNumber,
//         containerTag: 'div',
//         props: {
//           value: 5,
//         }
//       }
//     ];
//   }
// }
