// src/components/NavBar.js
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import logout from "../../assets/logout.png";
import {useUser} from "../../context/UserContext";
import "./Navbar.css";

function NavBar() {
  const {user, loading, error} = useUser();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const logoutButton = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <nav className="navbar-conatiner">
      <div>
        <h2>E-ticketing System</h2>
      </div>
      <ul className="navbar-items">
        <div className="right-side-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/events">Home</Link>
          {user ? (
            <>
              <div className="user-name-logout">
                {user.username}
                <img
                  title="logout"
                  style={{cursor: "pointer"}}
                  onClick={logoutButton}
                  src={logout}
                  alt="logout button"
                />
              </div>
            </>
          ) : (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
