import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPoints, setUserPoints] = useState(0);

  return (
    <UserContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userPoints, setUserPoints }}
    >
      {children}
    </UserContext.Provider>
  );
};
