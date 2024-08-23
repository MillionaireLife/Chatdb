import React from 'react';
import { Table } from '@mantine/core';

export const TableComponent = ({ tabledata }) => {
  return <Table striped highlightOnHover withTableBorder withColumnBorders data={tabledata} />;
};
