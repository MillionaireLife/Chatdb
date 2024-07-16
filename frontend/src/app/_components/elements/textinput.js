'use client';

import React, { useState } from 'react';
import { ActionIcon, Input } from '@mantine/core';
import { BsArrowUpCircleFill } from 'react-icons/bs';

export const TextInput = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <Input
        size="md"
        bottom={0}
        w={'100%'}
        radius="md"
        pos={'fixed'}
        value={query}
        bg={'#f0f0f0'}
        p={'12px 20px'}
        rightSectionWidth={100}
        rightSectionPointerEvents="all"
        placeholder="Enter your query here..."
        onChange={(e) => setQuery(e.currentTarget.value)}
        rightSection={
          <ActionIcon size="md" radius="xl" color="dark" variant="default" aria-label="Send">
            <BsArrowUpCircleFill style={{ width: '30px', height: '30px' }} />
          </ActionIcon>
        }
      />
    </>
  );
};
