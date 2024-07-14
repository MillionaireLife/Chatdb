import { Plus_Jakarta_Sans } from 'next/font/google';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import  HeaderMenu   from './_components/header/header';

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
          <HeaderMenu/>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
