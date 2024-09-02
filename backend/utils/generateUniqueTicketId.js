const {v4: uuidv4} = require("uuid");

function generateUniqueTicketId() {
  return uuidv4(); // Generates a unique identifier
}

module.exports = generateUniqueTicketId;
