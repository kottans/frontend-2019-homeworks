/* global io */
export class Socket {
  constructor(user) {
    this.socket = io();
    this.socket.emit('set username', user);
  }

  onSetUsername = handler => this.socket.on('set username', handler);
  onUserJoined = handler => this.socket.on('user joined', handler);
  onUserLeft = handler => this.socket.on('user left', handler);
  onSelf = handler => this.socket.on('self', handler);

  onUpdateMessageStatus = handler => this.socket.on('update message status', handler);
  emitUpdateMessageStatus = messageID => this.socket.emit('update message status', messageID);

  onChatMessage = handler => this.socket.on('chat message', handler);
  emitChatMessage = message => this.socket.emit('chat message', message);

  onStopTyping = handler => this.socket.on('stop typing', handler);
  emitStopTyping = () => this.socket.emit('stop typing');

  onTyping = handler => this.socket.on('typing', handler);
  emitTyping = () => this.socket.emit('typing');
}
