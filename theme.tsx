'use client';

import { createTheme } from '@mantine/core';
import localFont from 'next/font/local';

const montserrat = localFont({
  src: '/public/fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
});

export const theme = createTheme({
  fontFamily: montserrat.style.fontFamily
});