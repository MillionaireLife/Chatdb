import React from 'react';
import styles from '../hero/hero.module.css';

export const TextComponent = ({ userinput }) => {
  return (
    <>
      {userinput?.message && <p className={`${styles.userMessage} ${styles.message}`}>{userinput?.message}</p>}
      {userinput?.response && userinput.type !== 'table' && (
        <p className={`${styles.aiMessage} ${styles.message}`}>{userinput?.response.text}</p>
      )}
    </>
  );
};
