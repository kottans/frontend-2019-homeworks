import { Username } from "./Username.js";

export class UsernameList {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.activeUser = new Username();
  }

  render = usersList => {
    this.node.innerHTML = "";
    let documentFragment = document.createDocumentFragment();

    usersList.forEach(user => {
      let element = document.createElement("p");
      if (this.activeUser.getActiveName() === user) {
        element.className = "active-user";
      }
      element.innerHTML = `${user}\n`;
      documentFragment.appendChild(element);
    });

    this.node.appendChild(documentFragment);
  };
}
