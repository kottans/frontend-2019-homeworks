export class UserName {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  render(username) {
    this.node.innerHTML = username;
  }
}
