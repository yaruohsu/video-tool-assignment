/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          200: '#c3dafe',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf',
          800: '#434190',
          900: '#3a336b',
        },
        secondary: {
          500: '#764ba2',
          600: '#6b46c1',
        },
      },
    },
  },
  plugins: [],
};
