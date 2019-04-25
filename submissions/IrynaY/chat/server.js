/* eslint no-console: off */
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const messages = [];
const MESSAGE_STATUS = {pending: 'pending', sent: 'sent'}; 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});

app.use(express.static('./public'));

io.on('connection', function (socket) {
  const getConnectedClients = () => {
    const { connected } = io.sockets.clients();
    return Object.keys(connected).map(id => {
      const { username, img } = connected[id];
      return { username, img };
    });
  };

  socket.on('set username', ({ login, img }) => {
    socket.username = login;
    socket.img = img;

    const clients = getConnectedClients();
    const time = new Date().getTime();

    socket.emit('set username', {
      name: login,
      timestamp: time,
      userList: clients
    });

    socket.broadcast.emit('user joined', {
      name: socket.username,
      timestamp: time,
      userList: clients
    });
  });
  
  socket.on('chat message', message => {
    const time = new Date().getTime();
    const newMessage = { 
      id: messages.length === 0 ? 0 : messages.length,
      text: message, 
      status: MESSAGE_STATUS.pending
    }; 

    messages.push(newMessage);

    socket.emit('self', {message: newMessage, timestamp: time});

    setTimeout( () => {
      socket.broadcast.emit('chat message', {
        message: {
          id: newMessage.id,
          text: newMessage.text
        },
        timestamp: time,
        name: socket.username
      });
    }, 1500);
  });

  socket.on('update message status', messageID => {
    socket.broadcast.emit('update message status', {
      id: messageID, 
      status: MESSAGE_STATUS.sent
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', {
      name: socket.username,
      timestamp: new Date().getTime(),
      userList: getConnectedClients()
    });
  });

  socket.on('typing', () => socket.broadcast.emit('typing', {name: socket.username}));
  socket.on('stop typing', () => socket.broadcast.emit('stop typing', {name: socket.username}));
});

server.listen(port, () => console.log('listening on *: ' + port));
