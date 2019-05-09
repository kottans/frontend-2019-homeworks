export class Socket {
  constructor() {
    this.socket = io();
  }

  onNameAssigned(handler) {
    this.socket.on('name assigned', handler);
  }

  onUserJoined(handler) {
    this.socket.on('user joined', handler);
  }

  onUserLeft(handler) {
    this.socket.on('user left', handler);
  }

  onUserTyping(handler) {
    this.socket.on('user typing', handler);
  }

  onChatMessage(handler) {
    this.socket.on('chat message', handler);
  }

  onRoomChanged(handler) {
    this.socket.on('room changed', handler);
  }

  emitChatMessage(message) {
    this.socket.emit('chat message', message);
  }

  emitUserTyping() {
    this.socket.emit('user typing');
  }

  emitRoomChange(room) {
    this.socket.emit('change room', room);
  }

}
