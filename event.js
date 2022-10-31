"use strict";

const eventEmitter = require("events");

class Event extends eventEmitter {
  constructor() {
    super();
  }
}

const event = new Event();

module.exports = event;
