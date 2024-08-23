'use client';

import React, { useState } from 'react';
import { Select } from '@mantine/core';
import { DiDatabase } from 'react-icons/di';
import { stack } from '../../context/context';
import { useContext } from 'react';

export const DBselect = () => {
  const [db, setDB] = useState('');
  const { dblist } = useContext(stack);

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
        data={dblist}
      />
    </>
  );
};
