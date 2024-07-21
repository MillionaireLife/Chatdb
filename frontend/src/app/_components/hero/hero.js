import React from 'react';
import Image from 'next/image';

import { TextInput } from '../elements/textinput';
import styles from './hero.module.css';

export const HeroBody = () => {
  return (
    <>
      <div className={styles.heroContainer}>
        <Image src="/logos/dblogo.png" alt="Logo" position="center" width={70} height={60} />

        <h1 className={styles.heroTitle}>Welcome to ChatDB</h1>
        <h2 className={styles.heroSubtitle}>Seamless Conversations with Your Database - No Queries, Just Answers</h2>
      </div>

      <TextInput />
    </>
  );
};
