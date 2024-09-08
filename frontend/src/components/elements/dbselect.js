'use client';

import React, { useState, useContext } from 'react';

import { Select } from '@mantine/core';
import { stack } from '@/context/context';
import { DiDatabase } from 'react-icons/di';
import { notifications } from '@mantine/notifications';
import { NOTIFICATIONS } from '@/components/notifications/notifications';

export const DBselect = () => {
  const [db, setDB] = useState('');
  const { dblist } = useContext(stack);

  async function switchdatabase(database) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/switchdatabase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dbname: database,
        }),
      });

      if (response.ok) {
        notifications.show(NOTIFICATIONS.success_switchdb);
        return;
      }
    } catch (err) {
      notifications.show(NOTIFICATIONS.error_switchdb);
      console.error('Error switching database:', err);
    }
  }

  function handlechange(database) {
    setDB(database);
    switchdatabase(database);

    let Details = JSON.parse(window.localStorage.getItem('dbDetails'));
    if (Details) {
      Details.dbname = database;
      window.localStorage.setItem('dbDetails', JSON.stringify(Details));
    }
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
