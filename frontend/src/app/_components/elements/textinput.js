'use client';
import React, { useState, useEffect } from 'react';
import { ActionIcon, Input } from '@mantine/core';
import { BsArrowUpCircleFill } from 'react-icons/bs';

export const TextInput = ({ userinput, setuserinput, setDisplaytext }) => {
  console.log(userinput);
  function submit(e){
    if (e.key === 'Enter') {
      console.log('Enter key pressed');
      // setuserinput(e.currentTarget.value);
      setDisplaytext(e.currentTarget.value);
      console.log(userinput);
    }
  }
  useEffect(() => {
    const submit = (event) => {
      if (event.key === 'Enter') {
        setDisplaytext(event.currentTarget.value);
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', submit);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('keydown', submit);
    };
  }, []);
  // useEffect(() => {
  //   document.addEventListener('keydown', submit);
  //   return () => {
  //     document.removeEventListener('keydown', submit);
  //   };
  // }, []);
  return (
    <>
      <Input
        size="md"
        bottom={0}
        w={'100%'}
        radius="md"
        pos={'fixed'}
        value={userinput}
        bg={'#f0f0f0'}
        p={'0.85rem 7.5rem'}
        rightSectionWidth={300}
        rightSectionPointerEvents="all"
        placeholder="Enter your query here..."
        onChange={(e) => setuserinput(e.currentTarget.value)}
        rightSection={
          <ActionIcon
            size="md"
            radius="xl"
            color="dark"
            variant="default"
            aria-label="Send"
            onClick={() => setDisplaytext(userinput)}
          >
            <BsArrowUpCircleFill style={{ width: '30px', height: '30px' }} />
          </ActionIcon>
        }
      />
    </>
  );
};
