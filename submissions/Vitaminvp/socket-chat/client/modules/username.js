export class Username {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.name = "";
  }

  render = value => {
    this.name = value;
    this.node.value = value;
  };

  getName = () => this.name;
  setName = name => (this.name = name);
}
