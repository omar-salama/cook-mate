import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)']
      },
      backgroundColor: {
        'primary': '#E36824',
        'muted': '#FFFCF7',
        'secondary': '#5B7C75',
      },
    },
  },
  plugins: [],
}
export default config
