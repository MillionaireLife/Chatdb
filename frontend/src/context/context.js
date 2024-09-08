'use client';

import React, { useState, createContext } from 'react';

export const stack = createContext();

export const ContextProvider = ({ children }) => {
  const [dblist, setDblist] = useState([]);
  const [dbDetails, setDbDetails] = useState({
    dbtype: '',
    host: '',
    port: '',
    user: '',
    status: 'inactive', // Change this value to 'active' or 'inactive'
  });

  return (
    <>
      <stack.Provider
        value={{
          setDblist,
          dblist,
          setDbDetails,
          dbDetails,
        }}
      >
        {children}
      </stack.Provider>
    </>
  );
};
