// tailwind.config.js
module.exports = {
  safelist: [
    "checked:bg-[url('/asset/check-white.svg')]"
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
