import {Socket} from './modules/socket.js'
import {Messages} from './modules/messages.js'
import {Username} from './modules/username.js'
import {MessageForm} from './modules/message-form.js'
import {TypingMessage} from './modules/typing-message.js'
import {UserList} from "./modules/user-list.js";

document.addEventListener('DOMContentLoaded', () => {
  const socket = new Socket();
  const username = new Username('#username');
  const messages = new Messages('#chat');
  const messageForm = new MessageForm('#messageForm');
  const typingMessage = new TypingMessage('#typing');
  const userList = new UserList('#users');
  let name1='';
  socket.onSetUsername( ({data,name, users}) =>{
      username.render(name);
      messages.renderSystemMessage(data,`${name} assigned to you`);
      userList.render(users);
      return name1 = name;
  });
    socket.onUserJoined(({data,name, users}) => {
        messages.renderSystemMessage(data,`${name} joined`);
        userList.render(users);
    });
    socket.onUserLeft(({data, name, users}) => {
        messages.renderSystemMessage(data, `${name} left`);
        userList.render(users);
    });
    socket.onTyping( ({ name }) => typingMessage.render(name));
    socket.onStopTyping( ({ name }) => typingMessage.clear(name));

    socket.onChatMessage(({data, name, message, status}) => {
        messages.renderMessage(data, name, message, status);
        if(name!==name1){socket.emitConfirmation(socket.socket.id)}
    });
    socket.onSent((value)=>{
        let nodes = document.querySelectorAll('.status');
        let last =nodes[nodes.length-1];
        last.innerHTML=value.status;
    });
    messageForm.onSubmit(socket.emitChatMessage,name1);

    messageForm.onKeyDown( () =>  socket.emitTyping());
    messageForm.onKeyUp( () => socket.emitStopTyping());
});
