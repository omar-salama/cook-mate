import type { Metadata } from 'next';
import { MantineProvider } from '@mantine/core';
import './globals.css';
import Navbar from './_components/Navbar';

export const metadata: Metadata = {
  title: 'CookMate',
  description:
    "CookMate is an online platform that aims to bring food enthusiasts together in a community where they can share, discover, and enjoy cooking recipes. Whether you're a seasoned chef or a culinary novice, CookMate provides a comprehensive set of features that allow you to not only find the perfect dish to whip up but also contribute to a growing repository of diverse and delectable recipes.",
};

import localFont from '@next/font/local';
const montserrat = localFont({
  src: '../public/fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${montserrat.variable} font-sans text-[#363636]`}
    >
      <body className='container mx-auto'>
        <Navbar />
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
