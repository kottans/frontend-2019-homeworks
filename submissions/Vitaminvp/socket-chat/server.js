const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Moniker = require("moniker");
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

const usersTyping = {};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.get("/multiview", (req, res) => {
  res.sendFile(__dirname + "/client/multiview.html");
});

app.use(express.static("./client"));

server.listen(port, () => {
  console.log("listening on *:" + port);
});

const getRoomUsers = room => {
  const clients =
    io.sockets.adapter.rooms[room] === undefined
      ? []
      : io.sockets.adapter.rooms[room].sockets;
  const { connected } = io.sockets.clients();
  const users = Object.keys(clients).map(item => {
    const { username } = connected[item];
    return { [item]: username };
  });
  return users;
};

io.on("connection", socket => {
  socket.username = Moniker.choose();

  socket.room = "general";
  socket.join("general");

  socket.emit("set username", { name: socket.username, date: new Date() });
  socket
    .to(socket.room)
    .emit("user joined", { name: socket.username, date: new Date() });

  socket.on("disconnect", () => {
    socket
      .to(socket.room)
      .emit("users list", { usersList: getRoomUsers(socket.room) });
    socket
      .to(socket.room)
      .emit("user left", { name: socket.username, date: new Date() });
  });

  socket.on("chat message", ({ message, date }) => {
    socket
      .to(socket.room)
      .emit("chat message", {
        message,
        name: socket.username,
        date: new Date()
      });
    socket.emit("own message", {
      status: "delivered",
      message,
      name: socket.username,
      date: new Date(),
      dateId: date
    });
  });

  socket.on("typing", message => {
    usersTyping[socket.id] = socket.username;
    setTimeout(() => {
      delete usersTyping[socket.id];
    }, 2000);
    socket.to(socket.room).emit("typing", { names: usersTyping, message });
  });

  socket.on("change name", newName => {
    const oldName = socket.username;
    socket.username = newName;

    io.to(socket.room).emit("users list", {
      usersList: getRoomUsers(socket.room)
    });
    socket.emit("set username", { name: socket.username, date: new Date() });
    socket.broadcast.emit("user change name", {
      name: oldName,
      newName: socket.username,
      date: new Date()
    });
  });

  socket.on("change room", nextRoom => {
    socket.leave(socket.room);
    socket.join(nextRoom);

    socket
      .to(socket.room)
      .emit("user left", { name: socket.username, date: new Date() });
    socket
      .to(nextRoom)
      .emit("user joined", { name: socket.username, date: new Date() });

    io.to(nextRoom).emit("users list", { usersList: getRoomUsers(nextRoom) });
    socket
      .to(socket.room)
      .emit("users list", { usersList: getRoomUsers(socket.room) });

    socket.room = nextRoom;
    socket.emit("room changed", nextRoom);
  });

  io.to(socket.room).emit("users list", {
    usersList: getRoomUsers(socket.room)
  });
});
