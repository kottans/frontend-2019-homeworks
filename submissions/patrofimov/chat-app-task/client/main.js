import { UserName } from "./modules/user-name.js";
import { Socket } from "./modules/socket.js";
import { Messages } from "./modules/messages.js";
import { MessageForm } from "./modules/message-form.js";
import { TypingStatus } from "./modules/typing-status.js";
import { RoomForm } from "./modules/room-form.js";
import { Rooms } from "./modules/rooms.js";
import { Users } from "./modules/users.js";
import { SendingStatus } from "./modules/sending-status.js";

document.addEventListener("DOMContentLoaded", () => {
  const socket = new Socket();
  const userName = new UserName("#username");
  const messages = new Messages("#messages");
  const messageForm = new MessageForm("#messageForm");
  const typingStatus = new TypingStatus("#typingStatus");
  const roomForm = new RoomForm("#room");
  const rooms = new Rooms("#rooms");
  const users = new Users("#users");
  const sendingStatus = new SendingStatus("#sendingStatus");

  let currentUser = null;

  socket.onNameAssigned((username, timestamp, usernames) => {
    userName.render(username);
    currentUser = username;
    users.render(usernames.filter(user => user !== username));
    messages.appendSystem(`<b>${username}</b> assigned to you.`, timestamp);
  });

  socket.onUserJoined((username, timestamp, usernames) => {
    messages.appendSystem(`<b>${username}</b> joined.`, timestamp);
    users.render(usernames.filter(user => user !== username));
  });

  socket.onUserLeft((username, timestamp, usernames) => {
    messages.appendSystem(`<b>${username}</b> left.`, timestamp);
    users.render(usernames.filter(user => user !== username));
  });

  socket.onChatMessage(({ username, message, timestamp }) => {
    setTimeout(() => {
       if (username === currentUser) {
         sendingStatus.hide();
       }
      messages.append(username, message, timestamp, currentUser == username);
      typingStatus.removeTypingUser(username);
    }, 1000);
  });

  socket.onUserTyping(username => {
    typingStatus.addTypingUser(username);
  });

  messageForm.onSubmit(message => {
    sendingStatus.show();
    messages.append(username, message, '', true, true);
    socket.emitChatMessage(message);
  });

  messageForm.onKeypress(() => {
    socket.emitUserTyping();
  });

  rooms.render();

  roomForm.onSubmit(room => {
    socket.emitRoomChange(room);
  });

  socket.onRoomChanged(room => {
    rooms.add(room);
    rooms.select(room);
    rooms.render();
    messages.clear();
  });
});
