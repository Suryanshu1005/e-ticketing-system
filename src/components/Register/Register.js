import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import FormValidation from "../FormValidation";
import "./Register.css";
import apiRequest from "../../services/api";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {validate} = FormValidation({error, setError, formData});

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validate()) {
      return;
    }

    setError(""); // Clear previous error

    try {
      const response = await apiRequest("POST", `/v1/auth/register`, formData);
      if (response) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("An error occurred while registering. Please try again.");
    }
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-group">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {error && error.includes("Username") && (
          <p className="error-message">{error}</p>
        )}
      </div>
      <div className="form-group">
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {error && error.includes("email") && (
          <p className="error-message">{error}</p>
        )}
      </div>
      <div className="form-group">
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && error.includes("Password") && (
          <p className="error-message">{error}</p>
        )}
      </div>
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
