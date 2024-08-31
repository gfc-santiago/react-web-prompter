const express = require("express");
const router = express.Router();

let message = {};

router.get("/", (req, res) => {
  res.send({ message }).status(200);
});

router.post("/send", (req, res) => {
  const { io } = req.context;
  const { type, content } = req.body;
  if (type) {
    console.log({ type, content });
    io.emit("receive", { type, content });
  }
  res.send({ status: "sent", message }).status(200);
});

module.exports = router;
