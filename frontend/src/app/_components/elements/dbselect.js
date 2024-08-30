'use client';

import React, { useState, useContext } from 'react';
import { Select } from '@mantine/core';
import { DiDatabase } from 'react-icons/di';
import { stack } from '../../context/context';

export const DBselect = () => {
  const [db, setDB] = useState('');
  const { dblist } = useContext(stack);

  async function switchdatabase(database) {
    const response = await fetch('http://localhost:8000/api/switchdatabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dbname: database,
      }),
    });
  }

  function handlechange(database) {
    setDB(database);
    switchdatabase(database);
    let Details = JSON.parse(window.localStorage.getItem('dbDetails'));
    Details.dbname = database;
    window.localStorage.setItem('dbDetails', JSON.stringify(Details));
  }

  return (
    <Select
      pointer
      maw={200}
      searchable
      value={db}
      allowDeselect
      onChange={handlechange}
      checkIconPosition="right"
      leftSection={<DiDatabase />}
      placeholder="Select a Database"
      comboboxProps={{ shadow: 'md' }}
      nothingFoundMessage="Nothing found..."
      data={dblist} // dblist is an array of database names
    />
  );
};
