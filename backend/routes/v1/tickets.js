// /backend/routes/tickets.js
const express = require("express");
const {
  bookTicket,
  getUserTickets,
} = require("../../controllers/ticketController");
const authenticate = require("../../middleware/authenticate");
const router = express.Router();

// Route to book a ticket
router.post("/book/:eventId", authenticate, bookTicket);

// Route to get user's tickets
router.get("/my-tickets", authenticate, getUserTickets);

module.exports = router;
