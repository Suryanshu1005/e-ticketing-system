import React, {useState, useEffect} from "react";
import {Link, Outlet, useParams} from "react-router-dom";
import "./EventDetails.css";
import {formattedDate} from "../../utils/formattedDate";
import apiRequest from "../../services/api";

function EventDetails() {
  const {id} = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!event) {
      const fetchEvent = async () => {
        try {
          const response = await apiRequest("GET", `/v1/events/${id}`);
          setEvent(response.event);
        } catch (err) {
          console.error(err);
        }
      };
      fetchEvent();
    }
  }, [id, event]);

  if (!event)
    return <p className="loading-message">Loading event details...</p>;

  return (
    <>
      <div className="event-details-container">
        <div className="event-info">
          <h2 className="event-title">{event.name}</h2>
          <p className="event-date-time">
            {formattedDate(event.date)} - {event.time}
          </p>
          <p className="event-venue">Venue: {event.venue}</p>
          <p className="event-seats">Available Seats: {event.availableSeats}</p>
        </div>
        <div className="book-ticket-container">
          <Link className="book-ticket-button" to="book">
            Book Tickets
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default EventDetails;
