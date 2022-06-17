const express = require("express");
const http = require("http");
const cors = require("cors");
const rest = require("./rest");
const createSocketServer = require("./socket");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
const io = createSocketServer(server);

app.use((req, res, next) => {
  req.context = {
    server,
    io,
    session: {},
  };
  next();
});

app.use(rest);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));