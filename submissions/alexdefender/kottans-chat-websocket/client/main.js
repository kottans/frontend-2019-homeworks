import { Username } from "./modules/Username.js";
import { Socket } from "./modules/Socket.js";
import { Messages } from "./modules/Messages.js";
import { MessageForm } from "./modules/MessageForm.js";
import { UsernameList } from "./modules/UsernameList.js";
import { TypingStatus } from "./modules/TypingStatus.js";

document.addEventListener("DOMContentLoaded", () => {
  const socket = new Socket();
  const username = new Username("#username");
  const messages = new Messages("#messages");
  const messageForm = new MessageForm("#messageForm");
  const usernameList = new UsernameList("#usersList");
  const typingStatus = new TypingStatus("#typingStatus");

  socket.onSetUsername((name, time) => {
    username.render(name);
    messages.renderSystemMessage(`${name} assigned to you.`, time);
  });

  socket.onUserJoined((name, time) => {
    messages.renderSystemMessage(`${name} joined.`, time);
  });

  socket.onUserLeft((name, usersList, time) => {
    messages.renderSystemMessage(`${name} left.`, time);
    usernameList.render(Object.values(usersList));
  });

  messageForm.onSubmit(value => {
    socket.emitChatMessage(value);
  });

  socket.onChatMessage(({ name, message, time, status }) => {
    messages.renderMessage(name, message, time, status);
    typingStatus.render();
  });

  messageForm.onKeyPress(() => {
    socket.emitUserTyping();
  });

  socket.onUserTyping(name => {
    typingStatus.render(`${name} is typing...`);
  });

  socket.getUsersList(usersList => {
    usernameList.render(Object.values(usersList));
  });
});
