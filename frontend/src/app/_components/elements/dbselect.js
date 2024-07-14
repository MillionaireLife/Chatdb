"use client";
import { Select } from '@mantine/core';
import React from 'react'
import { DiDatabase } from 'react-icons/di';
import styles from '../header/header.module.css';

export const DBselect = () => {
  return (
    <>
      <Select
        className={styles.select}
        placeholder="Select Database"
        data={['MySQL', 'mongoDB', 'SQLITE']}
        allowDeselect
        searchable
        nothingFoundMessage="Nothing found..."
        checkIconPosition="right"
        leftSection={<DiDatabase />}
      />
    </>
  );
}
