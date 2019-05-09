import { renderDate } from "../helpers.js";

export class Messages {
  constructor(selectorNode, typingNode = "#typingStatus", usersNode) {
    this.node = document.querySelector(selectorNode);
    this.typing = document.querySelector(typingNode);
    this.users = document.querySelector(usersNode);
  }

  renderMessage = (username, message, date) => {
    const className = username === "system" ? "sysMessage" : "";
    this.node.insertAdjacentHTML(
      "beforeend",
      `<p class=${className}><b>[${username} <small>${renderDate(
        date
      )}</small>]</b> ${message}</p>`
    );
    this.node.scrollTo(0, this.node.scrollHeight);
  };

  renderOwnMessage = (status, username, message, date, dateId) => {
    const className = "ownMessage";
    if (status === "delivered") {
      const messageId = document.querySelector(
        `div[data-id='${dateId}'] .status`
      );
      setTimeout(() => {
        messageId.innerHTML = "delivered";
      }, 200);
    } else {
      const ownMessage = `<div data-id="${dateId}"><span class=${className} <b>[${username} <small>${renderDate(
        date
      )}</small>]</b> ${message} </span><small class="status">sending ...</small></div>`;
      this.node.insertAdjacentHTML("beforeend", ownMessage);
    }
  };

  renderSystemMessage = (message, date) => {
    this.renderMessage("system", message, date);
  };

  renderTyping = (names, message) => {
    if (message) {
      this.typing.innerHTML = Object.values(names)
        .map(name => `<p><small>${name} is ${message}</small></p>`)
        .join("");
    }
    setTimeout(() => {
      this.typing.innerHTML = "";
    }, 2000);
  };

  renderUsersList = (usersList, name) => {
    this.users.innerHTML = "";
    const users = usersList.reduce((cur, acc) => {
      return Object.assign(acc, cur);
    }, {});
    const documentFragment = document.createDocumentFragment();
    Object.values(users).forEach(user => {
      let element = document.createElement("p");
      if (name && user === name) {
        element.innerHTML = `<b class="ownMessage">${user}</b>\n`;
      } else {
        element.innerHTML = `${user}\n`;
      }
      documentFragment.appendChild(element);
    });

    this.users.appendChild(documentFragment);
  };

  clear() {
    this.node.innerHTML = "";
  }
}
