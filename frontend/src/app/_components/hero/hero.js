'use client';

import React, { useState } from 'react';
import styles from './hero.module.css';
import Image from 'next/image';

import { TextInput } from '../elements/textinput';

export const HeroBody = () => {
  const [displayText, setDisplayText] = useState(null);

  const handleTextSubmit = (text) => {
    setDisplayText(text);
  };

  return (
    <>
      <div className={styles.hero_container}>
        {/* <div className={styles.hero_default_section}>
          <Image src="/logos/dblogo.png" alt="Logo" position="center" width={70} height={60} />
          <h1 className={styles.heroTitle}>Welcome to ChatDB</h1>
          <h2 className={styles.heroSubtitle}>Seamless Conversations with Your Database - No Queries, Just Answers</h2>
        </div> */}

        <div className={styles.display_section}>
          <p>{displayText}</p>
        </div>
      </div>

      <TextInput onSubmit={handleTextSubmit} />
    </>
  );
};
