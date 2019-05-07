import { UserName } from './modules/user-name.js';
import { Socket } from './modules/socket.js';
import { Messages } from './modules/messages.js';
import { MessageForm } from './modules/message-form.js';
import { UsersList } from './modules/users-list.js';
import { RoomForm } from './modules/room-form.js';
import { Rooms } from './modules/rooms.js';
import { TypingStatus } from './modules/typing-status.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const userName = new UserName('#username');
  const messages = new Messages('#messages', '#userlist');
  const messageForm = new MessageForm('#messageForm');
  const usersList = new UsersList('#userslist');
  const roomForm = new RoomForm('#room');
  const rooms = new Rooms('#rooms');
  const typingStatus = new TypingStatus('#typingStatus');
  let myName;

  socket.onNameAssigned(data => {
    myName = data.name;
    userName.render(data.name);
    messages.appendSystem(
      `<b>${data.name}</b> assigned to you.`,
      data.timestamp
    );
  });

  socket.onUserJoined(data => {
    messages.appendSystem(
      `<span style="color: seagreen"><b>${data.name}</b> joined.</span>`,
      data.timestamp
    );
  });
  socket.onUsersList(username => {
    usersList.render(username);
  });

  socket.onUserLeft(data => {
    messages.appendSystem(
      `<span style="color: red"><b>${data.name}</b> left.</span>`,
      data.timestamp
    );
  });

  messageForm.onSubmit(value => {
    socket.emitChatMessage(value);
  });

  messageForm.onKeypress(() => {
    socket.emitUserTyping();
  });

  const getParams = (name, message, timestamp) => {
    if (name === myName) {
      name = `<span class = "username-accent">me</span>`;
      message = `<span style = "color: blue">${message}</span>`;
      timestamp = `<span style = "color: blue" class = "timestamp">[${timestamp}]</span>`;
    } else {
      name = `<span class="username-regular">${name}</span>`;
      message = `<span style = "color: #777">${message}</span>`;
      timestamp = `<span style = "color: #777" class = "timestamp">[${timestamp}]</span>`;
    }
    return { name, message, timestamp };
  };

  socket.onChatMessage(({ name, message, timestamp, messageStatus, id }) => {
    const params = getParams(name, message, timestamp);
    messages.append(
      params.name,
      params.message,
      params.timestamp,
      messageStatus,
      id
    );
  });

  socket.onStatusChanged(({ name, message, timestamp, messageStatus, id }) => {
    const params = getParams(name, message, timestamp);
    messages.modify(
      params.name,
      params.message,
      params.timestamp,
      messageStatus,
      id
    );
  });

  roomForm.onSubmit(room => {
    socket.emitRoomChange(room);
  });

  socket.onRoomChanged(room => {
    rooms.add(room);
    rooms.select(room);
    rooms.render();
    messages.clear();
  });

  socket.onUserTyping(username => {
    typingStatus.addTypingUser(username);
  });
});
