'use client';

import React, { useState, useEffect } from 'react';
import styles from './hero.module.css';
import Image from 'next/image';

import { notifications } from '@mantine/notifications';
import { NOTIFICATIONS } from '@/components/notifications/notifications';

import { TextInput } from '@/components/elements/textinput';
import { Chartoutput } from '@/components/elements/chartoutput';
import { TextComponent } from '@/components/elements/textoutput';
import { TableComponent } from '@/components/elements/tableoutput';

export const HeroBody = () => {
  const [messages, setMessages] = useState([]);

  // Default fetch all the chat history
  useEffect(() => {
    async function fetchdata() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    }

    fetchdata();
  }, []);

  // Execute the Natural Language Query entered by the user
  const handleTextSubmit = async (text) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/fetchfromdb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        notifications.show(NOTIFICATIONS.error_checkconnection);
        return;
      } else {
        notifications.show(NOTIFICATIONS.success_fetchmessages);
        const data = await response.json();
        setMessages([...messages, data]);
      }
    } catch (err) {
      console.error('Error executing query:', err);
    }
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'table':
        return (
          <>
            <TextComponent userinput={message} />
            <TableComponent tabledata={message.response} />
          </>
        );
      case 'chart':
        return (
          <>
            <TextComponent userinput={message} />
            <Chartoutput chart_data={message.response} />
          </>
        );
      default:
        return <TextComponent userinput={message} />;
    }
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
          <div className={styles.display_section}>
            {messages.map((input, index) => (
              <div key={index}>{renderMessageContent(input)}</div>
            ))}
          </div>
        )}
      </div>

      <TextInput onSubmit={handleTextSubmit} />
    </>
  );
};
