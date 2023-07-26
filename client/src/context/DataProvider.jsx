import React, { createContext, useState } from "react";
export const DataContext = createContext(null);
export default function DataProvider({ children }) {
  const [acc, setAcc] = useState({ username: "", name: "" });
  return (
    <DataContext.Provider
      value={{
        acc,
        setAcc,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
