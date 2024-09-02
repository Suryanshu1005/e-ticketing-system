// src/components/Login.js
import React, {useState} from "react";
import {useUser} from "../../context/UserContext";
import "./Login.css";
import {useNavigate} from "react-router-dom";
import apiRequest from "../../services/api";

function Login() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const [error, setError] = useState("");
  const {setUser} = useUser();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest("POST", `/v1/auth/login`, formData);
      if (response) {
        //Store JWT token when login is successful
        localStorage.setItem("token", response.token);
        setUser(response.user);
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (err) {
      setError(err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <div className="input-group">
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="input-group">
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
      {error && (
        <p style={{color: "red", marginBottom: "15px", fontWeight: "bold"}}>
          {error}
        </p>
      )}
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  );
}

export default Login;
