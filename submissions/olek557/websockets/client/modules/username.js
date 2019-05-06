export class Username {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.name = null;
  }
  getName = () => {
    return this.name;
  }
  setName = (value) => {
    this.name = value;
    this.render(this.name);
  }
  render = (value) => {
    this.node.innerHTML = value;
  }
}