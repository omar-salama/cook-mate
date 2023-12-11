import './globals.css';
import '@mantine/core/styles.css';
import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';
import Navbar from './_components/Navbar';
import { theme } from '../theme';

export const metadata: Metadata = {
  title: 'CookMate',
  description:
    "CookMate is an online platform that aims to bring food enthusiasts together in a community where they can share, discover, and enjoy cooking recipes. Whether you're a seasoned chef or a culinary novice, CookMate provides a comprehensive set of features that allow you to not only find the perfect dish to whip up but also contribute to a growing repository of diverse and delectable recipes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='container mx-auto text-[#363636]'>
        <Navbar />
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
