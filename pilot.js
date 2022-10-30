"use strict";

const event = require("./event");
const printDetails = require("./system");

// Pilot: flight with ID ‘ds7g86sa8v87dsv60v876d’ took-off Flight { event: 'took_off',
//   }
//    Pilot: flight with ID 'ds7g86sa8v87dsv60v876d' has arrived Flight
//    { event: 'arrived', time: 2022-02-28 15:30:20 Details: { airLine: 'Royal Jordanian Airlines', flightID:
// 'ds7g86sa8v87dsv60v876d', pilot: 'Jane doe', destination: ‘ Manchester, UK’ } }

event.on("took-off", (payload) => {
  console.log(`Pilot: flight with ID ‘${payload.Details.flightID}’ took-off`);
  payload.event = "took-off";
  printDetails(payload);
});
event.on("arrived", (payload) => {
  console.log(
    `Pilot: flight with ID '${payload.Details.flightID}' has arrived`
  );
  payload.event = "arrived";
  printDetails(payload);
});

module.exports = event;
