"use strict";
require('dotenv').config();

const io = require('socket.io-client');
const airLine = `http://localhost:${process.env.PORT}/airline`;
const host = `http://localhost:${process.env.PORT}`;
const PilotConnectionAirline = io.connect(airLine);
const PilotConnection = io.connect(host);




PilotConnection.on("get-payload", (payload) => {
  PilotConnectionAirline.emit('get-flight',payload);
});


PilotConnectionAirline.on("took-off", (payload) => {
  setTimeout(() => {
    console.log(`Pilot: flight with ID ‘${payload.Details.flightID}’ took-off`);
    payload.event = 'took-off';
    payload.date = new Date();
    PilotConnectionAirline.emit('log-status',payload);
  },4000);
});

PilotConnectionAirline.on("arrived", (payload) => {
  setTimeout(() => {
    console.log(`Pilot: flight with ID '${payload.Details.flightID}' has arrived`);
    payload.event = 'arrived';
    payload.date = new Date();
    PilotConnectionAirline.emit('log-status',payload);
    PilotConnection.emit('notify-arrived', payload)
  },7000)
});

