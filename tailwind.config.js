/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0805',
        'gold-pale': '#E2B568',
        surface: '#111008',
        'gold-light': '#C8882A',
        'gold-mid': '#A0661A',
        'gold-dark': '#6B3F0A',
        text: '#E8DCC8',
        muted: '#8A7A62',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 38px rgba(200, 136, 42, 0.16)',
      },
    },
  },
  plugins: [],
}

