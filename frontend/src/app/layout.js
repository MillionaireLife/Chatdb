import { Plus_Jakarta_Sans } from 'next/font/google';
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
        {children}
      </body>
    </html>
  );
}
