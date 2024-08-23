'use client';
import React, { useState } from 'react';
export const stack = React.createContext();

export const ContextProvider = ({ children }) => {
  const [dblist, setDblist] = useState([]);

  return (
    <>
      <stack.Provider
        value={{
          setDblist,
          dblist,
        }}
      >
        {children}
      </stack.Provider>
    </>
  );
};
