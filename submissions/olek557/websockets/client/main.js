import { Username } from './modules/username.js';
import { Socket } from './modules/socket.js';
import { Messages } from './modules/messages.js';
import { MessageForm } from './modules/messageForm.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const username = new Username('#username');
  const messages = new Messages('#messages');
  const typingStatus = new Messages('#typingStatus');
  const messageForm = new MessageForm('#messageForm');
  const usersListWrapper = document.getElementById('users');

  socket.onSetUsername(({ name, timestamp }) => {
    username.setName(name);
    messages.renderSystemMessage(`${name} assigned to you`, timestamp);
  });

  socket.onUserJoined(({ name, timestamp }) => {
    messages.renderSystemMessage(`${name} joined`, timestamp);
  });

  socket.onUserLeft(({ name, timestamp }) => {
    messages.renderSystemMessage(`${name} left`, timestamp);
  });

  socket.onUsersListChanged(usersList => {
    console.log(usersList);
    usersListWrapper.innerHTML = "";
    const userListHtml = usersList.map(user => {
      const li = document.createElement('li');
      li.innerHTML = user;
      return li;
    });
    usersListWrapper.append(...userListHtml);
  });

  socket.onChatMessage(({ name, message, timestamp }) => {
    const isOwnMessage = username.getName() === name;
    if (isOwnMessage) {
      messages.renderOwnMessage(message, timestamp);
    } else {
      messages.renderMessage(name, message, timestamp);
    }
  });

  socket.onOwnMessageSent(() => {
    console.log('sent');
  })

  socket.onTyping(_ => {
    typingStatus.renderTypingStatus('User is typing...');
  });

  socket.onTypingEnd(_ => {
    typingStatus.renderTypingStatus('');
  });

  messageForm.onSubmit(event => {
    console.log('sending');
    socket.emitChatMessage(event);
  });

  messageForm.onTyping(socket.emitTyping);
});
