const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const PORT = process.env.PORT || 5000;

let bodyParser = require('body-parser');

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "null");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function(req, res) {
    console.log(req);
    res.send("Successful post");
});

let server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
