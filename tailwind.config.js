/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'flow-1': {
          '0%': { transform: 'translate(0, 0)', opacity: 1 },
          '100%': { transform: 'translate(100px, 120px)', opacity: 0.2 },
        },
        'flow-2': {
          '0%': { transform: 'translate(0, 0)', opacity: 1 },
          '100%': { transform: 'translate(-100px, 80px)', opacity: 0.2 },
        },
        'flow-3': {
          '0%': { transform: 'translate(0, 0)', opacity: 1 },
          '100%': { transform: 'translate(100px, -120px)', opacity: 0.2 },
        },
      },
      animation: {
        'flow-1': 'flow-1 1.5s ease-out forwards',
        'flow-2': 'flow-2 1.5s ease-out forwards',
        'flow-3': 'flow-3 1.5s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
