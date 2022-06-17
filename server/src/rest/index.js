const express = require('express');
const router = express.Router();

let message = {};

router.get('/', (req, res) => {
  res.send({ message }).status(200);
});

router.post('/send', (req, res) => {
  const { io } = req.context;
  message = req.body;
  io.emit('receive', message);
  res.send({ status: 'sent', message }).status(200);
});

module.exports = router;