import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import { IoSettingsSharp } from 'react-icons/io5';
import { DBselect } from '../elements/dbselect';
import { ActionIcon, Tooltip } from '@mantine/core';


export const HeaderMenu = async () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Image src="/logos/logo1.png" alt="Logo" position="right" width={70} height={60} />
        </Link>

        <div className={styles.header_right}>
          <DBselect />

          <Link href="/settings">
            <Tooltip label="Settings" position="right" withArrow>
              <ActionIcon variant="filled" color="dark" size="lg" radius="xl" aria-label="Settings">
                <IoSettingsSharp style={{ width: '65%', height: '65%' }} />
              </ActionIcon>
            </Tooltip>
          </Link>
        </div>
      </header>
    </>
  );
};
