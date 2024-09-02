import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useUser} from "../../context/UserContext";
import {Step1, Step2, Step3} from "./Steps"; // Import the new step components
import "./BookTickets.css";
import apiRequest from "../../services/api";

const BookTickets = () => {
  const [event, setEvent] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {id} = useParams();
  const navigate = useNavigate();
  const {user} = useUser();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiRequest("GET", `/v1/events/${id}`);

        setEvent(response.event);
      } catch (err) {
        setError("Failed to load event details");
      }
    };

    fetchEvent();
  }, [id]);

  const handleTicketSelection = (num) => {
    setSelectedTickets(num);
    setSelectedSeats([]);
  };

  //Logic to implement Seat Selection Process
  const handleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < selectedTickets) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBookTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        userId: user.id,
        seat_number: selectedSeats,
      };

      const response = await apiRequest(
        "POST",
        `/v1/tickets/book/${event.id}`,
        payload
      );
      if (response) {
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (err) {
      setError(err.message || "Failed to book tickets");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <div className="loading">Loading event details...</div>;

  return (
    <div className="ticket-booking-flow">
      <h2>Book Tickets for {event?.name}</h2>
      {step === 1 && (
        <Step1
          selectedTickets={selectedTickets}
          handleTicketSelection={handleTicketSelection}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <Step2
          event={event}
          selectedTickets={selectedTickets}
          selectedSeats={selectedSeats}
          handleSeatSelection={handleSeatSelection}
          setStep={setStep}
        />
      )}
      {step === 3 && (
        <Step3
          event={event}
          selectedTickets={selectedTickets}
          selectedSeats={selectedSeats}
          loading={loading}
          handleBookTickets={handleBookTickets}
          setStep={setStep}
        />
      )}
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          Tickets booked successfully! Redirecting to dashboard...
        </div>
      )}
    </div>
  );
};

export default BookTickets;
