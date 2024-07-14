import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import { ActionIcon } from '@mantine/core';
import { IoSettingsSharp } from 'react-icons/io5';
import { DBselect } from '../elements/dbselect';

const HeaderMenu = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/logos/logo1.png" alt="Logo" />
        </div>
        <div className={styles.dropdown}>
          <DBselect />
          <Link href="/settings">
            <ActionIcon variant="filled" color="dark" size="lg" radius="xl">
              <IoSettingsSharp />
            </ActionIcon>
          </Link>
        </div>
      </header>
    </>
  );
};

export default HeaderMenu;
