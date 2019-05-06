export class Messages {
  constructor(selector) {
    this.node = document.querySelector(selector);
  }
  getLocalTimestamp = (date) => {
    const localDate = new Date(date);
    const time = localDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    return time;
  }
  renderMessage = (username, message, timestamp, className) => {
    const messageWrapper = document.createElement('span');
    messageWrapper.classList.add('message-wrapper');
    if (className) { messageWrapper.classList.add(className); }
    messageWrapper.innerHTML += `${this.getLocalTimestamp(timestamp)}[${username}] ${message} \n`
    this.node.append(messageWrapper);
  }
  renderOwnMessage = (message, timestamp) => {
    this.renderMessage('me', message, timestamp, 'mod-own');
  }
  renderSystemMessage = (message, timestamp) => {
    this.renderMessage('system', message, timestamp, 'mod-system');
  }
  renderTypingStatus = message => {
    this.node.innerHTML = message;
  }
}