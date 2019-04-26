import { Socket } from './modules/socket.js';
import { Username } from './modules/username.js';
import { Messages } from './modules/messages.js';
import { MessageForm } from './modules/message-form.js';
import { TypingMessage } from './modules/typing-message.js';
import { UsersList } from './modules/users-list.js';

document.addEventListener('DOMContentLoaded', () => {
  if(!localStorage.getItem('CURRENT_USER'))
    return window.location.replace('/');

  const user = JSON.parse(localStorage.getItem('CURRENT_USER'));
  const socket = new Socket(user);
  const username = new Username('#username');
  const messages = new Messages('#messages');
  const messageForm = new MessageForm('#messageForm');
  const typingMessage = new TypingMessage('#typing');
  const usersList = new UsersList('#user-list');

  socket.onSetUsername( ({ name, timestamp, userList }) => {
    username.render(name);
    usersList.render(userList);
    messages.renderSystemMessage(`${name} assigned to you.`, timestamp);
  });

  socket.onUserJoined( ({ name, timestamp, userList }) => {
    usersList.render(userList);
    messages.renderSystemMessage(`${name} joined.`, timestamp);
  });

  socket.onUserLeft( ({ name, timestamp, userList }) => {
    usersList.render(userList);
    messages.renderSystemMessage(`${name} left.`, timestamp);
  });

  socket.onChatMessage( ({ message, timestamp }) => {
    messages.renderMessage(message.name, message, timestamp);
    socket.emitUpdateMessageStatus(message.id);
  });

  socket.onSelf( ({ message, timestamp }) => messages.renderMessage('ME', message, timestamp));

  socket.onUpdateMessageStatus(({ id, status }) => messages.updateMessageStatus(id, status));

  socket.onTyping( ({ name }) => typingMessage.render(name));
  socket.onStopTyping( ({ name }) => typingMessage.clear(name));

  messageForm.onSubmit( message => socket.emitChatMessage(message));
  messageForm.onKeyDown( () =>  socket.emitTyping());
  messageForm.onKeyUp( () => socket.emitStopTyping());
});
