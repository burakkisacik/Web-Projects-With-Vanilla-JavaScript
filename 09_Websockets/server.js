const express = require('express');
const socket = require('socket.io');

const app = express();

const server = app.listen(3000, () =>
  console.log('Server runnig at port 3000')
);

app.use(express.static('public'));

//socket setup
const io = socket(server);

//listen the connections from the frontend
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  //listen the message that send by client
  socket.on('chatMessage', (data) => {
    //send message to the all clients
    io.sockets.emit('chatMessage', data);
  });

  //broadcast : "burak typing"
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
