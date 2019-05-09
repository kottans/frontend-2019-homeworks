const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Moniker = require("moniker");

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

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

const formatter = new Intl.DateTimeFormat("ru", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
});

localDate = () => formatter.format(new Date());

const geUsers = () => {
  const  users  = io.sockets.clients().connected;
  return Object.keys(users).map(item => {
    return users[item].username;
  });
};

io.on("connection", socket => {
  socket.username = Moniker.choose();
  socket.room = "general";
  
  socket.emit("name assigned", socket.username, localDate(), geUsers());
  socket.join("general");

  socket
    .to(socket.room)
    .emit("user joined", socket.username, localDate(), geUsers());

  socket.on("disconnect", () => {
   
    socket
      .to(socket.room)
      .emit("user left", socket.username, localDate(), geUsers());
  });

  socket.on("user typing", () => {
    socket.to(socket.room).emit("user typing", socket.username);
  });

  socket.on("chat message", message => {
    io.to(socket.room).emit("chat message", {
      username: socket.username,
      message,
      timestamp: localDate()
    });
  });

  socket.on("change room", nextRoom => {
    socket.leave(socket.room);
    socket.join(nextRoom);

    socket.to(socket.room).emit("user left", socket.username, localDate());
    socket.to(nextRoom).emit("user joined", socket.username, localDate());

    socket.room = nextRoom;
    socket.emit("room changed", nextRoom, localDate());
  });
});
