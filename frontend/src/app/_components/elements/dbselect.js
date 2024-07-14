'use client';

import React, { useState } from 'react';
import { Select } from '@mantine/core';
import { DiDatabase } from 'react-icons/di';

export const DBselect = () => {
  const [db, setDB] = useState('');
  
  return (
    <>
      <Select
        data={['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite']}
        nothingFoundMessage="Nothing found..."
        comboboxProps={{ shadow: 'md' }}
        placeholder="Select a Database"
        leftSection={<DiDatabase />}
        checkIconPosition="right"
        onChange={setDB}
        allowDeselect
        value={db}
        searchable
        maw={200}
        pointer
      />
    </>
  );
};
