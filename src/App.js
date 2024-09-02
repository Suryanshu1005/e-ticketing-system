import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import EventList from "./components/EventList/EventList";
import EventDetails from "./components/EventDetails/EventDetails";
import Dashboard from "./components/Dashboard/Dashboard";
import NavBar from "./components/Navbar/NavBar";
import AddNewEvent from "./components/AddNewEvent/AddNewEvent";
import BookTickets from "./components/BookTickets/BookTickets";
import "./App.css";
import {UserProvider} from "./context/UserContext";
import PrivateRoute from "./components/HOC";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="container">
          <NavBar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/events/add"
              element={<PrivateRoute element={<AddNewEvent />} />}
            />
            <Route path="/events/:id" element={<EventDetails />}>
              <Route
                path="book"
                element={<PrivateRoute element={<BookTickets />} />}
              />
            </Route>
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} />}
            />
            <Route path="/" element={<EventList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
