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
