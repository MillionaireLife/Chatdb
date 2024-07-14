'use client';

import { Select } from '@mantine/core';
import React from 'react';
import { DiDatabase } from 'react-icons/di';

export const DBselect = () => {
  return (
    <>
      <Select
        data={['MySQL', 'MongoDB', 'PostgreSQL', 'SQLite']}
        comboboxProps={{ shadow: 'md' }}
        placeholder="Select a Database"
        leftSection={<DiDatabase />}
        checkIconPosition="right"
        allowDeselect
        searchable
        maw={200}
        pointer
      />
    </>
  );
};
