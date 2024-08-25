const socketIo = require("socket.io");

module.exports = function createSocketServer(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("receive", require("./emitters/receive"));
  return io;
};
