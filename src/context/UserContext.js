import React, {createContext, useState, useContext, useEffect} from "react";
import apiRequest from "../services/api";

const UserContext = createContext(undefined);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetching user profile based on the the JWT token
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiRequest("GET", "/v1/auth/me");
        setUser(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <UserContext.Provider value={{user, setUser, loading, error}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
