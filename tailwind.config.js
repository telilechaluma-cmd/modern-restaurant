/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#faf6ee',
          100: '#f4ebd6',
          200: '#e9d9ad',
          300: '#dec684',
          400: '#d3b35b',
          500: '#C9A45C', // Brand Primary Gold
          600: '#b58f43',
          700: '#8e6f32',
          800: '#685123',
          900: '#433415',
          950: '#231b09',
        },
        dark: {
          50: '#2a2a2a',
          100: '#222222',
          700: '#262626',
          800: '#1c1c1c',
          900: '#151515', // Brand Dark Black
          950: '#0e0e0e',
        },
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#0f3a28',
          950: '#092318',
        },
        berbere: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        cream: {
          50: '#fdfaf4',
          100: '#F7F2E8', // Brand Cream
          200: '#efe7d5',
          300: '#e2d4b8',
          400: '#d5c19b',
          500: '#cbad81',
          600: '#b89467',
          700: '#977651',
          800: '#7b6044',
          900: '#644e39',
        },
        charcoal: {
          800: '#1f2421',
          900: '#151515',
          950: '#0d100e',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -10px rgba(201, 164, 92, 0.25)',
        'luxury': '0 20px 40px -15px rgba(21, 21, 21, 0.4)',
        'gold': '0 10px 25px -5px rgba(201, 164, 92, 0.35)',
      }
    },
  },
  plugins: [],
}
