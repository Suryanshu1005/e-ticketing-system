import React, {useState, useEffect} from "react";
import "./EventList.css";
import {Link} from "react-router-dom";
import {formattedDate} from "../../utils/formattedDate";
import {token} from "../../utils/getToken";
import apiRequest from "../../services/api";

function EventList() {
  const [events, setEvents] = useState([]);
  const authToken = token();
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiRequest("GET", `/v1/events`);
        setEvents(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <div className="header">
        <h1>Event List</h1>
        {authToken && (
          <Link to="/events/add" className="add-new-event">
            Add New Event
          </Link>
        )}
      </div>
      <div className="event-list">
        {events?.events?.map((event) => (
          <>
            <div className="event-card" key={event.id}>
              <h2 className="event-name">{event.name}</h2>
              <p className="event-date">Date: {formattedDate(event.date)}</p>
              <p className="event-venue">Venue: {event.venue}</p>
              <p className="event-seats">
                Available Seats: {event.availableSeats}
              </p>
              <div className="hr-line" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link className="view-detail-button" to={`/events/${event.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default EventList;
