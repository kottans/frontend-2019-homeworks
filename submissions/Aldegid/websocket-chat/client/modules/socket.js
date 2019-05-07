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

  onChatMessage = handler => {
    this.socket.on('chat message', handler);
  };

  emitChatMessage = message => {
    this.socket.emit('chat message', message);
  };
  onUsersList = list => {
    this.socket.on('users list', list);
  };

  onRoomChanged(handler) {
    this.socket.on('room changed', handler);
  }

  onStatusChanged(handler) {
    this.socket.on('change status', handler);
  }

  emitRoomChange(room) {
    this.socket.emit('change room', room);
  }

  onUserTyping = handler => {
    this.socket.on('user typing', handler);
  };

  emitUserTyping = user => this.socket.emit('user typing', user);
}
