module.exports = function receive(message, cb) {
  console.log("Message received", message);
  cb("OK");
}