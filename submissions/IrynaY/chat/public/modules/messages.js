const dateFromTimestamp = (timestamp) => new Date(timestamp).toLocaleTimeString('en-US', { hour12: false });

export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }

  renderMessage = ( username, message, timestamp ) => {
    const p = document.createElement('p');
    p.dataset.key = message.id;
    p.innerHTML = `${dateFromTimestamp(timestamp)} [<b>${username}</b>]: ${message.text} <b class="status">${message.status || ""}</b>\n`;
    this.node.append(p);
  }

  renderSystemMessage = ( message, timestamp ) => this.renderMessage('SYSTEM', {text: message, id: 'system'}, timestamp);

  updateMessageStatus = ( messageID, status ) => {
    const el = this.node.querySelector(`p[data-key="${messageID}"] .status`);
    el.innerHTML = status;
  }
}
