'use client';
import React, { useState } from 'react';
import { TextInput } from '../elements/textinput';
import styles from './hero.module.css';
import Image from 'next/image';

export const HeroBody = () => {
  const [query, setQuery] = useState(''); // let query=""
  const [displaytext, setDisplaytext] = useState('');
console.log(query);
  return (
    <>
      {/* <div className={styles.heroContainer}>
        <Image src="/logos/dblogo.png" alt="Logo" position="center" width={70} height={60} />
        <h1 className={styles.heroTitle}>Welcome to ChatDB</h1>
        <h2 className={styles.heroSubtitle}>Seamless Conversations with Your Database - No Queries, Just Answers</h2>
      </div> */}
      <p>{displaytext}</p>
      <TextInput userinput={query} setuserinput={setQuery} setDisplaytext={setDisplaytext} />{' '}
      {/*userinput = value stored in the query variable */}
      {/* <input onChange={(e) => setQuery(e.target.value)} value = {query}></input> */}
    </>
  );
};
