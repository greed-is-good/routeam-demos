import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        agro: {
          bg: '#F5F2EA',
          surface: '#FFFFFF',
          muted: '#ECE8DE',
          text: '#17231D',
          secondary: '#66716B',
          green: '#1F5E45',
          greenHover: '#184B38',
          greenSoft: '#DDE9E0',
          sand: '#E9E1D2',
          border: '#DED9CF',
          danger: '#9A4D45',
          dangerSoft: '#E9DDDA',
          warning: '#7A5520',
          warningSoft: '#F7E8C8',
          info: '#24507A',
          infoSoft: '#DBEAFE',
        },
      },
      borderRadius: {
        card: '20px',
        control: '16px',
      },
      boxShadow: {
        soft: '0 14px 34px rgba(23, 35, 29, 0.08)',
        lift: '0 18px 44px rgba(23, 35, 29, 0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
