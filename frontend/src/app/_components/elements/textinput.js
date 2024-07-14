import React from 'react';
import { Input } from '@mantine/core';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import styles from '../hero/hero.module.css';

const TextInput = () => {
  return (
    <div className={styles.inputContainer}>
      <Input
        className={styles.input}
        size="xl"
        radius="sm"
        placeholder="Message ChatDB"
        rightSection={<BsArrowUpCircleFill className={styles.icon} />}
      />
    </div>
  );
};

export default TextInput;
