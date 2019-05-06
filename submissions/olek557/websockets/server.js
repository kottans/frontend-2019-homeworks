const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Moniker = require('moniker');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

const usersList = [];

const getDateInUTC = () => {
  const date = new Date();
  const now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
    date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  return new Date(now_utc)
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static('./client'));

server.listen(port, () => {
  console.log('listening on *:' + port);
});


io.on('connection', socket => {
  socket.username = Moniker.choose();
  usersList.push(socket.username);
  console.log(usersList);

  socket.emit('set username', { name: socket.username, timestamp: getDateInUTC() });
  io.emit('usersList changed', usersList);

  socket.broadcast.emit('user joined', { name: socket.username, timestamp: getDateInUTC() });

  socket.on('disconnect', () => {
    usersList.splice(usersList.indexOf(socket.username), 1);
    io.emit('usersList changed', usersList);
    console.log(usersList);
    socket.broadcast.emit('user left', { name: socket.username, timestamp: getDateInUTC() });
  })

  console.log('connected ' + socket.username);

  socket.on('chat message', message => {
    socket.emit('own message sent');
    io.emit('chat message', {
      name: socket.username,
      timestamp: getDateInUTC(),
      message
    });
  });

  socket.on('typing', _ => {
    console.log('typing');
    socket.broadcast.emit('typing');
  });

  socket.on('typing end', _ => {
    console.log('typing end');
    socket.broadcast.emit('typing end');
  });
});

