/* global io */

export class Socket {
  constructor() {
    this.socket = io();
  }

  onSetUsername = handler => {
    this.socket.on("set username", handler);
  };

  onUserJoined = handler => {
    this.socket.on("user joined", handler);
  };

  onUserChangeName = handler => {
    this.socket.on("user change name", handler);
  };

  onUserLeft = handler => {
    this.socket.on("user left", handler);
  };

  emitChatMessage = ({ message, date }) => {
    this.socket.emit("chat message", { message, date });
  };

  onChatMessage = handler => {
    this.socket.on("chat message", handler);
  };

  onOwnMessage = handler => {
    this.socket.on("own message", handler);
  };

  emitTyping = message => {
    this.socket.emit("typing", message);
  };

  onTyping = handler => {
    this.socket.on("typing", handler);
  };

  onUsersList = handler => {
    this.socket.on("users list", handler);
  };

  emitChangingName = name => {
    this.socket.emit("change name", name);
  };

  emitRoomChange(room) {
    this.socket.emit("change room", room);
  }

  onRoomChanged(handler) {
    this.socket.on("room changed", handler);
  }
}
