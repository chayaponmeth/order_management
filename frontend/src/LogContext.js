import React, { createContext, useState } from 'react';

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (productName, oldPrice, oldQuantity, newPrice, newQuantity) => {
    const newLog = {
      productName,
      oldPrice,
      oldQuantity,
      newPrice,
      newQuantity,
      timestamp: new Date().toLocaleString(), // Formatting timestamp
    };

    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  return (
    <LogContext.Provider value={{ logs, addLog }}>
      {children}
    </LogContext.Provider>
  );
};
