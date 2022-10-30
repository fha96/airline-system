"use strict";

const event = require("./event");
const { uuid4 } = require("./index");
const date = new Date();

// const airline = 'Fly Emirates';
// Flight { event: 'took_off', time: 2022-02-28 15:30:00.,
// Details: { airLine: 'Royal Jordanian Airlines', destination: Manchester,
// UK' pilot: 'Jane doe', flightID: 'ds7g86sa8v87dsv60v876d', }

// Manager: new flight with ID ‘ds7g86sa8v87dsv60v876d’ have been scheduled Flight
//  { event: 'new-flight', time: 2022-02-28 15:30:13 Details: { airLine: 'Royal Jordanian Airlines',
//  flightID: 'ds7g86sa8v87dsv60v876d', pilot: 'Jane doe', destination: ‘ Manchester, UK’ } }

const payload = {
  event: "new-flight",
  time: date,
  Details: {
    airLine: "Fly Emirates",
    pilot: "fahad",
    destination: "manchester, UK",
  },
};

event.on("new-flight", handleEvent);

function handleEvent() {
  payload.Details.fightID = uuid4();
  console.log(payload);
}

setInterval(() => {
  event.emit("new-flight");
}, 2000);
