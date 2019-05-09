import {Form} from './form.js';

export class MessageForm extends Form {
  onKeypress(handler) {
    this.node.addEventListener('keypress', handler);
  }
}
