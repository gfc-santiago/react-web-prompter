const socketIo = require("socket.io");

module.exports = function createSocketServer(server) {
  const io = socketIo(server);
  io.on("receive", require('./emitters/receive'));
  return io;
}