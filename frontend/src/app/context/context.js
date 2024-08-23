'use client';

import React, { useState, createContext } from 'react';

export const stack = createContext();

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
