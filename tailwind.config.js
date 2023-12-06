/** @type {import('tailwindcss').Config} */

const colorSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900];

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    ...colorSizes.map(v => `bg-sky-${v}`),
    ...colorSizes.map(v => `bg-amber-${v}`),
  ],
  plugins: [],
}
