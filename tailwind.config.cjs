/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pokedex: ['"Arial Black"', 'Gadget', 'sans-serif'],
        'poke-message': ['"Courier New"', 'monospace'],
      },
      colors: {
        'poke-red': '#e3350d',
        'poke-red-dark': '#b32300',
        'poke-yellow': '#ffcb05',
        'poke-blue': '#3c5aa6',
        'poke-green': '#8bac0f',
        'poke-pixel-green': '#51ad60',
        'poke-dark-gray': '#454d55',
        'poke-border-dark-gray': '#333',
        'poke-gray': '#555',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 0.7s infinite',
      },
    },
  },
  plugins: [],
}
