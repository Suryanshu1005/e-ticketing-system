// /backend/routes/events.js
const express = require("express");
const {
  addEvent,
  getEvents,
  getEventsById,
  getBookedSeats,
} = require("../../controllers/eventController");
const authenticate = require("../../middleware/authenticate");
const router = express.Router();

// Route to add a new event
router.post("/", addEvent);

// Route to get a list of events
router.get("/", getEvents);

// Route to get event by ID
router.get("/:id", getEventsById);

// Route to get booked seats for an event
router.get("/:id/booked-seats", authenticate, getBookedSeats);

module.exports = router;
