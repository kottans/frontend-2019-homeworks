/*global io*/

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

  onUserLeft = handler => {
    this.socket.on("user left", handler);
  };

  emitChatMessage = message => {
    this.socket.emit("chat message", message);
  };

  onChatMessage = handler => {
    this.socket.on("chat message pending", handler);
    this.socket.on("chat message delivered", handler);
  };

  emitUserTyping = () => {
    this.socket.emit("typing");
  };

  onUserTyping = handler => {
    this.socket.on("typing", handler);
  };

  getUsersList = usersList => {
    this.socket.on("users list", usersList);
  };
}
