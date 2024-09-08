import { Plus_Jakarta_Sans } from 'next/font/google';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import { ContextProvider } from './context/context';
import { HeaderMenu } from './_components/header/header';

import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import './globals.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'], preload: true });

export const metadata = {
  title: 'ChatDB',
  description: 'Chat with your SQL or NoSQL database!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className} suppressHydrationWarning={true}>
        <MantineProvider>
          <Notifications />
          <ContextProvider>
            <HeaderMenu />
            {children}
          </ContextProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
