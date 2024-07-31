'use client';

import React, { useState, useEffect } from 'react';
import { ActionIcon, Input } from '@mantine/core';
import { BsArrowUpCircleFill } from 'react-icons/bs';

export const TextInput = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const [datatype, setDatatype] = useState('text');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query !== '') {
      onSubmit(query);
      setQuery('');
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://api.example.com/data', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ query, datatype }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   };
  //    if (fetchData.type === "chart") {
  //     setDatatype('chart');
  //    }
  //   return () => {  //cleanup function

  //   }
  // },[]) //dependency array in which the variable is stored based on which the use effect runs

  const handleClick = () => {
    if (query !== '') {
      onSubmit(query);
      setQuery('');
    }
  };

  return (
    <Input
      size="md"
      bottom={0}
      w={'100%'}
      radius="md"
      pos={'fixed'}
      value={query}
      bg={'#f0f0f0'}
      p={'0.85rem 7.5rem'}
      rightSectionWidth={300}
      rightSectionPointerEvents="all"
      placeholder="Enter your query here..."
      onChange={(e) => setQuery(e.currentTarget.value)}
      onKeyDown={handleKeyPress}
      rightSection={
        <ActionIcon size="md" radius="xl" color="dark" variant="default" aria-label="Send" onClick={handleClick}>
          <BsArrowUpCircleFill style={{ width: '30px', height: '30px' }} />
        </ActionIcon>
      }
    />
  );
};
