"use strict";

const event = require("./pilot");
const { faker } = require("./index");

event.on("new-flight", (payload) => {
  console.log(
    `Manager: new flight with ID ‘${payload.Details.flightID}’ have been scheduled Flight`
  );
  console.log(payload);
});

setInterval(() => {
  const payload = {
    event: "new-flight",
    time: faker.date.recent(),
    Details: {
      airLine: "Fly Emirates",
      pilot: faker.internet.userName(),
      flightID: faker.datatype.uuid(),
      destination: faker.address.country(),
    },
  };

  event.emit("new-flight", payload);
  setTimeout(() => {
    event.emit("took-off", payload);
  }, 4000);
  setTimeout(() => {
    event.emit("arrived", payload);
  }, 7000);
  event.once("arrived", () => {
    console.log(
      ` Manager: we’re greatly thankful for the amazing flight, ${payload.Details.pilot}`
    );
  });
}, 10000);
