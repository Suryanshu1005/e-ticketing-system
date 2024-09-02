import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {formattedDateToAddNewEvent} from "../../utils/formattedDate";
import "./AddNewEvent.css";
import FormValidation from "../FormValidation";
import apiRequest from "../../services/api";

const AddEventForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    availableSeats: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleDateChange = (date) => {
    setStartDate(date);
    setFormData({...formData, date: formattedDateToAddNewEvent(date)});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {validate} = FormValidation({
      error,
      setError,
      formData,
      isEventForm: true,
    });
    if (!validate()) return;
    try {
      const response = await apiRequest("POST", "/v1/events", formData);
      if (response) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New Event</h1>
      <form onSubmit={handleSubmit} className="event-form">
        <label className="form-label">Event Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Event name"
          className="form-input"
        />
        <label className="form-label">Event Date</label>
        <DatePicker
          name="date"
          selected={startDate}
          onChange={handleDateChange}
          className="form-input date-picker"
          placeholderText="Select Date"
        />
        <label className="form-label">Event Time</label>
        <input
          name="time"
          value={formData.time}
          onChange={handleChange}
          placeholder="Event Time"
          type="time"
          className="form-input"
        />
        <label className="form-label">Event Venue</label>
        <input
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Event Venue"
          className="form-input"
        />
        <label className="form-label">Available Seats</label>
        <input
          name="availableSeats"
          value={formData.availableSeats}
          onChange={handleChange}
          placeholder="Available Seats"
          className="form-input"
        />
        <button type="submit" className="submit-button">
          Create Event
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AddEventForm;
