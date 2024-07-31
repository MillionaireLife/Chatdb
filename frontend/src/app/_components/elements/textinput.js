'use client';

import React, { useState } from 'react';
import { ActionIcon, Input } from '@mantine/core';
import { BsArrowUpCircleFill } from 'react-icons/bs';

export const TextInput = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSubmit(query);
      setQuery(''); 
    }
  };

  const handleClick = () => {
    onSubmit(query);
    setQuery(''); 
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
        <ActionIcon
          size="md"
          radius="xl"
          color="dark"
          variant="default"
          aria-label="Send"
          onClick={handleClick}
        >
          <BsArrowUpCircleFill style={{ width: '30px', height: '30px' }} />
        </ActionIcon>
      }
    />
  );
};
