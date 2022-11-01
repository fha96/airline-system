"use strict";
require('dotenv').config();

const PORT = process.env.PORT;
const io = require('socket.io')(PORT);


const airLineConnection = io.of('/airline');

io.on('connection', (socket) => {
  console.log(`New connection has been created successfully with id: ${socket.id}`);
  socket.on('create-flight', (payload) => {
    io.emit('new-flight',payload);
    io.emit('get-payload', payload);
  });
  socket.on('log-status', (payload) => {
    console.log(payload);
  });
});


airLineConnection.on('connection', (socket) => {
  console.log('Pilot has been connected to airline name space');
  socket.on('get-flight', (payload) => {
    airLineConnection.emit('took-off', payload);
    airLineConnection.emit('arrived', payload);
  });
  socket.on('log-status', (payload) => {
    console.log(payload);
  });
});



