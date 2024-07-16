import React from 'react';
import { TextInput } from '../elements/textinput';
import styles from './hero.module.css';
import Image from 'next/image';

export const HeroBody = () => {
  return (
    <>
      <div class={styles.heroContainer}>
        <Image src="/logos/dblogo.png" alt="Logo" position="center" width={70} height={60} />
        <h1 class={styles.heroTitle}>Welcome to ChatDB</h1>
        <h2 class={styles.heroSubtitle}>Seamless Conversations with Your Database - No Queries, Just Answers</h2>
      </div>
      <TextInput />
    </>
  );
};
