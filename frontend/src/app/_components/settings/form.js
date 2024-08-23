'use client';

import React, { useState, useContext } from 'react';
import { stack } from '../../context/context';

const Form = () => {
  const { setDblist } = useContext(stack);

  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [dbtype, setdbtype] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Submit the database to connect details to the backend & fetch the list of databases
  const fetchDBList = async () => {
    const response = await fetch('http://localhost:8000/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dbtype: dbtype,
        host: host,
        port: port,
        user: username,
        password: password,
      }),
    });

    const list = await response.json();
    setDblist(list);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setdbtype('');
    setHost('');
    setPort('');
    setUsername('');
    setPassword('');

    fetchDBList();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dbtype">Database Type</label>
        <input
          required
          id="dbtype"
          type="text"
          name="dbtype"
          value={dbtype}
          onChange={(e) => setdbtype(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="host">Host</label>
        <input type="text" id="host" name="host" value={host} onChange={(e) => setHost(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="port">Port</label>
        <input type="text" id="port" name="port" value={port} onChange={(e) => setPort(e.target.value)} required />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          required
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export { Form };
