const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Moniker = require('moniker');
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);
const currentTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return hours+':'+minutes+':'+seconds;
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static('./client'));

server.listen(port, () => {
  console.log('listening on *:' + port);
});

io.on('connection', socket=>{

  const getList = () => {
    const  users  = io.sockets.clients().connected;
    return Object.keys(users).map(item => {
      return users[item].username;
    });
  };
  socket.username = Moniker.choose();
  socket.emit('set username',{
    name: socket.username,
    data: currentTime(),
    users: getList(),
  });


  socket.broadcast.emit('user joined', {
    name:socket.username,
    data: currentTime(),
    users: getList(),
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', {
      name:socket.username,
      data: currentTime(),
      users: getList(),
    });
  });

  socket.on('chat message', (message) => {

    socket.emit('status',{
      status:'sent',
    });

    socket.broadcast.emit('chat message', {
      name: socket.username,
      message,
      data: currentTime(),
    });
  }
  );

  socket.on('confirm',ct=>{
    io.to(ct).emit('status',{status:'seen'});
  });
  socket.on('typing', () => socket.broadcast.emit('typing', {name: socket.username}));
  socket.on('stop typing', () => socket.broadcast.emit('stop typing', {name: socket.username}));
});


