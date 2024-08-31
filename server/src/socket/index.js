const socketIo = require("socket.io");

module.exports = function createSocketServer(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connect", (sock) => {
    sock.on("receive", (payload) => {
      io.emit("receive", payload);
    });
  });
  return io;
};
