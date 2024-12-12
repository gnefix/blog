/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,svelte,vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui:{
    themes:["wireframe", "sunset" ]
  },
  plugins: [require("daisyui"),require('@tailwindcss/typography')],
}

