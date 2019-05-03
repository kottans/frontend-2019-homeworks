export class Username {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  getActiveName = () => {
    return document.querySelector("#username").innerHTML;
  };

  render = value => {
    this.node.innerHTML = value;
  };
}
