"use strict";

const { v4: uuid4 } = require("uuid");
console.log(uuid4());
console.log(uuid4());
console.log(uuid4());

module.exports = {
  uuid4,
};
