import {Label} from './label.js';

export class SendingStatus extends Label {
  constructor(...args) {
  super(...args);
  this.message = '';
  this.id = '';
  }

  render() {
    super.render(this.message);
  }

  hide() {
    clearInterval(this.id);
    this.message = '';
    this.render();
  }

  show() {
    let counter = 0;
    this.id = setInterval(() => {
      counter++;
      this.message = 'Sending ' + '.'.repeat(counter % 3 + 1);
      this.render();
    }, 100);
   
  }


}
