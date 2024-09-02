const sequelize = require("../config/database");
const Event = require("../models/Events");
const Ticket = require("../models/Tickets");

// Logic to add the event
async function addEvent(req, res, next) {
  const {name, date, time, venue, availableSeats} = req.body;

  try {
    const event = await Event.create({
      name,
      date,
      time,
      venue,
      availableSeats: availableSeats,
      totalSeats: availableSeats,
    });
    res.status(201).json({event});
  } catch (error) {
    next(error);
  }
}

// Logic to get all events
async function getEvents(req, res, next) {
  const {page = 1, pageSize = 10} = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const events = await Event.findAndCountAll({
      limit: parseInt(pageSize),
      offset: parseInt(offset),
      order: [["date", "ASC"]],
    });

    res.json({
      events: events.rows,
      total: events.count,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    next(error);
  }
}

// Logic to get the booked seats for an event
async function getBookedSeats(req, res, next) {
  const {id} = req.params;

  try {
    const bookedSeats = await Ticket.findAll({
      where: {eventId: id},
      attributes: ["seat_number"],
      transaction: await sequelize.transaction(),
    });

    const seatNumbers = bookedSeats.map((ticket) => ticket.seat_number);

    res.json({bookedSeats: seatNumbers});
  } catch (error) {
    next(error);
  }
}

// Logic to get the the event by ID
async function getEventsById(req, res, next) {
  const {id} = req.params;
  const event = await Event.findOne({
    where: {id: id},
  });
  if (!event) {
    return res.status(400).json({error: "No event found"});
  }
  res.json({
    event,
  });
}

module.exports = {
  addEvent,
  getEvents,
  getBookedSeats,
  getEventsById,
};
