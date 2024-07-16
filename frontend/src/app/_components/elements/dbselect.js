'use client';

import React, { useState } from 'react';
import { Select } from '@mantine/core';
import { DiDatabase } from 'react-icons/di';

export const DBselect = () => {
  const [db, setDB] = useState('');

  return (
    <>
      <Select
        pointer
        maw={200}
        searchable
        value={db}
        allowDeselect
        onChange={setDB}
        checkIconPosition="right"
        leftSection={<DiDatabase />}
        placeholder="Select a Database"
        comboboxProps={{ shadow: 'md' }}
        nothingFoundMessage="Nothing found..."
        data={['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite']}
      />
    </>
  );
};
