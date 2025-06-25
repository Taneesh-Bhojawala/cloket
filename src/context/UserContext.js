import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  useEffect(() => {
    if (user)
    {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }
    else
    {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const login = (username) => setUser(username);
  const logout = () => {
    setUser(null);
    navigate("/");
    navigate(0);
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
