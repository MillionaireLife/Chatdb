'use client';

import React, { useState } from 'react';
import styles from './hero.module.css';
import Image from 'next/image';
import { TextInput } from '../elements/textinput';

export const HeroBody = () => {
  const [messages, setMessages] = useState([]);

  const handleTextSubmit = (text) => {
    setMessages((prev) => [...prev, { sender: 'user', message:text }]); //... is a spread operator
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { sender: 'ai', message: 'AI response: ' + text }]);
    }, 1000);
  };

  return (
    <>
      <div className={styles.hero_container}>
        {messages.length === 0 ? (
          <div className={styles.hero_default_section}>
            <Image src="/logos/dblogo.png" alt="Logo" position="center" width={70} height={60} />
            <h1 className={styles.heroTitle}>Welcome to ChatDB</h1>
            <h2 className={styles.heroSubtitle}>
              Seamless Conversations with Your Database - No Queries, Just Answers
            </h2>
          </div>
        ) : (
          <div className={styles.display_setion}>
            {messages.map((input, index) => (
              <div
                key={index}
                className={`${styles.message} ${input.sender === 'user' ? styles.userMessage : styles.aiMessage}`}
              >
                <p>{input.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <TextInput onSubmit={handleTextSubmit} />
    </>
  );
};
