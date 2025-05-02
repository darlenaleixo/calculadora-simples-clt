import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      colors: {
        background: '#f9fafb',
        foreground: '#111827',
        darkbg: '#111827',
        darktext: '#f9fafb',
      },
    },
  },
  plugins: [],
}
