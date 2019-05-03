import { Username } from "./Username.js";
let countStatusId = 1;

export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
    this.activeUser = new Username();
  }

  renderMessage = (username, message, time, status) => {
    let element = document.createElement("p");

    if (this.activeUser.getActiveName() === username) {
      element.className = "active-user";
      if (status === "delivered") {
        const sentStatus = document.querySelector(`#status-${countStatusId}`);
        sentStatus.innerHTML = status;
        countStatusId++;
      } else {
        let statusMessage = `<span id="status-${countStatusId}" class="message-status">${status}</span>`;
        element.innerHTML = `${time} [${username}]: ${message} ${statusMessage}\n`;
      }
    } else {
      if (username === "system") {
        element.className = "system-user";
      }
      element.innerHTML = `${time} [${username}]: ${message}\n`;
    }

    if (element.innerHTML !== "") {
      this.node.appendChild(element);
    }
  };

  renderSystemMessage = (message, time) => {
    this.renderMessage("system", message, time);
  };
}
