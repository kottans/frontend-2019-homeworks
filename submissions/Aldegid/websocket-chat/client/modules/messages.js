export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  append(username, message, timestamp, messageStatus, id) {
    const messageHeight = document.getElementById('messages');
    const p = document.createElement('p');
    p.setAttribute('id', id);
    p.innerHTML = `${username} ${message} ${timestamp} <span class="message-status-pending">${
      messageStatus !== undefined ? messageStatus : ''
    }</span>`;
    this.node.appendChild(p);
    messageHeight.scrollTo(0, messageHeight.scrollHeight);
  }

  modify(username, message, timestamp, messageStatus, id) {
    const removeTarget = document.getElementById(id);
    const modifyed = document.createElement('p');
    modifyed.setAttribute('id', id);
    modifyed.innerHTML = `${username} ${message} ${timestamp} <span class="message-status-sent">${messageStatus}</span>`;
    this.node.removeChild(removeTarget);
    this.node.appendChild(modifyed);
  }

  appendSystem(message, timestamp) {
    this.append(
      `<span style="background-color: salmon; color: #fff; padding: 1px 10px; display: inline-block">system</span>`,
      message,
      `<span class='timestamp'> [${timestamp}] </span>`
    );
  }

  clear() {
    this.node.innerHTML = '';
  }
}
