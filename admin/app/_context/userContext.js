"use client"
const { createContext, useState, useEffect } = require("react");

export const UserContext = createContext();


const UserProvider = ({children}) => {
  const [token, setToken] = useState("");
  const values = { token, setToken };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token)
  }, [token])
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserProvider;