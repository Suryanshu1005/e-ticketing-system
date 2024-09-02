const generateUniqueTicketId = require("../utils/generateUniqueTicketId");
const sequelize = require("../config/database");
const Ticket = require("../models/Tickets");
const Event = require("../models/Events");

// Logic to book ticket for an event
async function bookTicket(req, res, next) {
  const {eventId} = req.params;
  const {userId, seat_number} = req.body;

  const transaction = await sequelize.transaction();

  try {
    const event = await Event.findByPk(eventId, {transaction});

    if (!event || event.availableSeats <= 0) {
      throw new Error("Event not found or no available seats");
    }

    // Reduce the available seats
    event.availableSeats -= seat_number.length;
    await event.save({transaction});

    const ticket = await Ticket.create(
      {
        userId,
        eventId,
        seat_number,
        ticketId: generateUniqueTicketId(),
      },
      {transaction}
    );

    await transaction.commit();
    res.status(201).json({ticket});
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
}

// Get the tickets booked by an user
async function getUserTickets(req, res, next) {
  const userId = req.user.id;

  try {
    const tickets = await Ticket.findAll({
      where: {userId},
      include: [
        {
          model: Event,
          attributes: ["name", "date", "time", "venue"],
        },
      ],
    });

    res.json({tickets});
  } catch (error) {
    next(error);
  }
}

module.exports = {
  bookTicket,
  getUserTickets,
};
