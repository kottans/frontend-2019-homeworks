const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Moniken = require("moniker");

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

let usersList = {};

const getTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static("./client"));

server.listen(port, () => {
  console.log("listening on *:" + port);
});

io.on("connect", socket => {
  socket.username = Moniken.choose();
  usersList[socket.id] = socket.username;

  socket.emit("set username", socket.username, getTime());
  socket.broadcast.emit("user joined", socket.username, getTime());

  socket.on("disconnect", () => {
    delete usersList[socket.id];
    socket.broadcast.emit("user left", socket.username, usersList, getTime());
  });

  socket.on("chat message", message => {
    socket.emit("chat message pending", {
      name: socket.username,
      message: message,
      time: getTime(),
      status: "pending"
    });

    setTimeout(() => {
      io.emit("chat message delivered", {
        name: socket.username,
        message: message,
        time: getTime(),
        status: "delivered"
      });
    }, 200);
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", socket.username);
  });

  io.emit("users list", usersList);
});
