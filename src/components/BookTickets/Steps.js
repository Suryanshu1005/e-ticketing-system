import React, {useEffect, useState} from "react";
import apiRequest from "../../services/api";

// Select Number of tickets
export const Step1 = ({selectedTickets, handleTicketSelection, setStep}) => (
  <div className="step-content">
    <h3>Step 1: Select Number of Tickets</h3>
    <select
      value={selectedTickets}
      onChange={(e) => handleTicketSelection(parseInt(e.target.value))}
      className="ticket-select"
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>
          {num} ticket{num > 1 ? "s" : ""}
        </option>
      ))}
    </select>
    <button onClick={() => setStep(2)} className="next-button">
      Next: Choose Seats
    </button>
  </div>
);

// Select Seats Step
export const Step2 = ({
  event,
  selectedTickets,
  selectedSeats,
  handleSeatSelection,
  setStep,
}) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seats = await apiRequest(
          "GET",
          `/v1/events/${event.id}/booked-seats`
        );
        const bookedSeats = seats.bookedSeats.flatMap((seatGroup) =>
          JSON.parse(seatGroup)
        );
        setBookedSeats(bookedSeats);
      } catch (err) {
        console.error("Failed to load booked seats", err);
      }
    };

    fetchSeats();
  }, [event?.id]);

  return (
    <div className="step-content">
      <h3>Step 2: Choose Your Seats</h3>
      <div className="seat-grid">
        {Array.from({length: event?.totalSeats}, (_, i) => i + 1).map(
          (seat) => (
            <button
              key={seat}
              className={`seat ${
                selectedSeats.includes(seat) ? "selected" : ""
              } ${bookedSeats.includes(seat) ? "booked" : ""}`}
              onClick={() => handleSeatSelection(seat)}
              disabled={
                bookedSeats.includes(seat) ||
                (selectedSeats.length >= selectedTickets &&
                  !selectedSeats.includes(seat))
              }
            >
              {seat}
            </button>
          )
        )}
      </div>
      <div className="button-group">
        <button onClick={() => setStep(1)} className="back-button">
          Back
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={selectedSeats.length !== selectedTickets}
          className="next-button"
        >
          Next: Review & Pay
        </button>
      </div>
    </div>
  );
};

// Review and Pay Step
export const Step3 = ({
  event,
  selectedTickets,
  selectedSeats,
  loading,
  handleBookTickets,
  setStep,
}) => (
  <div className="step-content">
    <h3>Step 3: Review & Pay</h3>
    <p>Event: {event?.name}</p>
    <p>Number of Tickets: {selectedTickets}</p>
    <p>Selected Seats: {selectedSeats.join(", ")}</p>
    <p>Total Price: $10</p>
    <div className="button-group">
      <button onClick={() => setStep(2)} className="back-button">
        Back
      </button>
      <button
        onClick={handleBookTickets}
        disabled={loading}
        className="pay-button"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>
    </div>
  </div>
);
