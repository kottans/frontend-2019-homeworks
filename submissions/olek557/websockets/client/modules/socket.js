/* global io */

export class Socket {
  constructor() {
    this.socket = io();
    this.typing = false;
    this.timeout = null;
  };
  timeoutFinish = _ => {
    this.typing = false;
    this.socket.emit('typing end');
  };
  onSetUsername = handler => {
    this.socket.on('set username', handler);
  };
  onUserJoined = handler => {
    this.socket.on('user joined', handler);
  };
  onUserLeft = handler => {
    this.socket.on('user left', handler);
  };
  onChatMessage = handler => {
    this.socket.on('chat message', handler);
  };
  onTyping = handler => {
    this.socket.on('typing', handler);
  };
  onTypingEnd = handler => {
    this.socket.on('typing end', handler);
  };
  onUsersListChanged = handler => {
    this.socket.on('usersList changed', handler);
  };
  onOwnMessageSent = handler => {
    this.socket.on('own message sent', handler);
  };
  emitChatMessage = message => {
    this.socket.emit('chat message', message);
  };
  emitTyping = _ => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.socket.emit('typing');
    this.typing = true;
    this.timeout = setTimeout(this.timeoutFinish, 5000);
  };
}
