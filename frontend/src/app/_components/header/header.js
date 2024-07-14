import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';

import { IoSettingsSharp } from 'react-icons/io5';
import { DBselect } from '../elements/dbselect';
import { ActionIcon } from '@mantine/core';

const HeaderMenu = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Image src="/logos/logo1.png" alt="Logo" width={40} height={40} />
        </Link>

        <div className={styles.header_right}>
          <DBselect />

          <Link href="/settings">
            <ActionIcon variant="filled" color="dark" size="lg" radius="xl" aria-label="Settings">
              <IoSettingsSharp style={{ width: '65%', height: '65%' }} />
            </ActionIcon>
          </Link>
        </div>
      </header>
    </>
  );
};

export default HeaderMenu;
