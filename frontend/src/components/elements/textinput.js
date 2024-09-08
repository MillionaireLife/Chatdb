'use client';

import React, { useState } from 'react';
import { ActionIcon, Input } from '@mantine/core';

import { IoMicCircleSharp } from 'react-icons/io5';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { notifications } from '@mantine/notifications';
import { NOTIFICATIONS } from '@/components/notifications/notifications';

export const TextInput = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query !== '') {
      onSubmit(query);
      setQuery('');
    }
  };

  const handleClick = () => {
    if (query !== '') {
      onSubmit(query);
      setQuery('');
    } else {
      notifications.show(NOTIFICATIONS.error_nullquery);
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
        <>
          <ActionIcon size="md" radius="xl" color="dark" variant="transparent" aria-label="Send" onClick={handleClick}>
            <BsArrowUpCircleFill style={{ width: '30px', height: '30px' }} />
          </ActionIcon>
          <ActionIcon size="lg" radius="xl" color="dark" variant="transparent" aria-label="Mic">
            <IoMicCircleSharp style={{ width: '33px', height: '33px' }} />
          </ActionIcon>
        </>
      }
    />
  );
};
