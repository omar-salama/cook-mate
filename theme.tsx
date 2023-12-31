'use client';

import { createTheme } from '@mantine/core';
import localFont from 'next/font/local';

const montserrat = localFont({
  src: '/public/fonts/Montserrat-VariableFont_wght.ttf',
  variable: '--font-montserrat',
});

export const natasha = localFont({
  src: '/public/fonts/natasha-walker/NatashawalkerBold-vmevO.otf',
  variable: '--font-natasha',
});

export const theme = createTheme({
  fontFamily: montserrat.style.fontFamily,
  primaryColor: 'submain',
  colors: {
    main: ['#E36824','#E36824','#E36824','#E36824','#E36824','#E36824','#E36824','#E36824','#E36824','#E36824'],
    submain: ['#5B7C75','#5B7C75','#5B7C75','#5B7C75','#5B7C75','#5B7C75','#5B7C75','#5B7C75','#5B7C75','#5B7C75'],
  }
});