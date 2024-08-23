'use client';

import React, { useState, useContext } from 'react';
import { stack } from '../../context/context';
import { DbDetails } from './dbdetails';
import styles from './form.module.css';

export const Form = () => {
  const { setDblist } = useContext(stack);

  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [dbtype, setdbtype] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Submit the database connection details to the backend & fetch the list of databases
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
    fetchDBList();

    // Clear form fields after submission
    setdbtype('');
    setHost('');
    setPort('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="dbtype">Database Type</label>
          <select required id="dbtype" name="dbtype" value={dbtype} onChange={(e) => setdbtype(e.target.value)}>
            <option value="" disabled>
              -- Select Database Type --
            </option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="mongodb">MongoDB</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="host">Host</label>
          <input
            required
            id="host"
            name="host"
            type="text"
            value={host}
            placeholder="localhost"
            onChange={(e) => setHost(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="port">Port</label>
          <input
            required
            id="port"
            type="text"
            name="port"
            value={port}
            placeholder="3306"
            onChange={(e) => setPort(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            required
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder="root"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
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

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>

      <DbDetails />
    </div>
  );
};
