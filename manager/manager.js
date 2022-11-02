"use strict";
require('dotenv').config();

const io = require('socket.io-client');
const host = `http://localhost:${process.env.PORT}`;
const { faker } = require("@faker-js/faker");
const ManagerConnection = io.connect(host);



ManagerConnection.on("new-flight", (payload) => {
  console.log(
    `Manager: new flight with ID ‘${payload.Details.flightID}’ have been scheduled Flight`
  );
  payload.event = 'new-flight';
  payload.date = new Date();
  ManagerConnection.emit('log-status', payload);
});

ManagerConnection.on('notify-manager', (payload) => {
  console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.Details.pilot}`);
});


setInterval(() => {
  const payload = {
    Details: {
      airLine: "Fly Emirates",
      pilot: faker.internet.userName(),
      flightID: faker.datatype.uuid(),
      destination: faker.address.country(),
    },
  };
  ManagerConnection.emit("create-flight", payload);
}, 10000);
