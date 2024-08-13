/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"SF Pro Display"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"SF Pro Text"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"SFMono-Regular"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}