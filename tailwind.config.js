// tailwind.config.js (for v3.4.17)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#01E6BD', // Accurate vibrant teal from image
        secondary: '#004D56',
        accent: '#01E6BD',
        dark: '#121212',     // Darker background from image
        light: '#FFFFFF',
        surface: '#2D2D2D',  // Input field background from image
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#666666', // Placeholder text color from image
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        }
      },
    },
  },
  plugins: [],
}