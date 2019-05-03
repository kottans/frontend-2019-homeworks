export class TypingStatus {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.timeout = 2000;
    this.timer = null;
  }

  render = (message = "") => {
    this.setTimeRender();
    this.node.innerHTML = message;
  };

  setTimeRender = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.render, this.timeout);
  };
}
