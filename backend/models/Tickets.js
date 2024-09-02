const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("./Users");
const Event = require("./Events");

const Ticket = sequelize.define(
  "Ticket",
  {
    seat_number: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    ticketId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    eventId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    indexes: [{fields: ["ticketId"]}],
  }
);

// Defining relationships
User.hasMany(Ticket, {foreignKey: "userId"});
Ticket.belongsTo(User, {foreignKey: "userId"});

Event.hasMany(Ticket, {foreignKey: "eventId"});
Ticket.belongsTo(Event, {foreignKey: "eventId"});

module.exports = Ticket;
