export class Label {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  render(username) {
    this.node.innerHTML = username;
  }

}
