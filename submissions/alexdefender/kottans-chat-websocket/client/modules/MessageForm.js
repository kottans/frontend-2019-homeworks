export class MessageForm {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.input = this.node[0];
  }

  onSubmit(handler) {
    this.node.addEventListener("submit", event => {
      event.preventDefault();

      if (this.input.value) {
        handler(this.input.value);
        this.input.value = "";
      }
    });
  }

  onKeyPress(handler) {
    this.node.addEventListener("keypress", handler);
  }
}
