/*global.io*/

export class Socket {
    constructor() {
        this.socket = io();
    }

    onSetUsername = handler => {
        this.socket.on('set username', handler);
    };
    onSent = handler => {
        this.socket.on('status',handler);
    };
    onUserJoined = (handler) => {
        this.socket.on('user joined', handler);
    };
    onUserLeft = handler => {
        this.socket.on('user left', handler);
    };
    onChatMessage = (handler) => {
        this.socket.on('chat message', handler);
    };
    emitChatMessage = message => {
        this.socket.emit('chat message', message);

    };
    emitConfirmation = value => {
        this.socket.emit('confirm',value)
    };
    onStopTyping = handler => this.socket.on('stop typing', handler);
    emitStopTyping = () => this.socket.emit('stop typing');

    onTyping = handler => this.socket.on('typing', handler);
    emitTyping = () => this.socket.emit('typing');

}
