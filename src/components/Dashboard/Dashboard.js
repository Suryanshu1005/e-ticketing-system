import React, {useState, useEffect} from "react";
import "./Dashboard.css";
import {formattedDate} from "../../utils/formattedDate";
import apiRequest from "../../services/api";

function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await apiRequest("GET", "/v1/tickets/my-tickets");
        setTickets(response.tickets);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">My Tickets</h2>
      <div className="tickets-list">
        {tickets?.map((ticket) => (
          <div className="ticket-card" key={ticket.id}>
            <h3 className="event-title">{ticket.Event.name}</h3>
            <p className="seat-number">
              Seat:{" "}
              {Array.isArray(ticket.seat_number)
                ? ticket.seat_number.join(", ")
                : ticket.seat_number}
            </p>
            <p className="event-date">
              Date: {formattedDate(ticket.Event.date)}
            </p>
            <p className="event-time">Time: {ticket.Event.time}</p>
            <p className="event-venue">Venue: {ticket.Event.venue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
