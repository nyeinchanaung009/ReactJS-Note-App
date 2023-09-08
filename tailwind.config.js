/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend : {
      colors : {
        accent : 'var(--accent)',
        accent2 : 'var(--accent2)',
        bg : 'var(--bg)',
        dark1 : 'var(--dark1)',
        dark2 : 'var(--dark2)',
        dark3 : 'var(--dark3)',
        grey : 'var(--grey)',
        bordercolor : 'var(--bordercolor)',
        bordercolor2 : 'var(--bordercolor2)',
        
        normaltext : 'var(--normaltext)',
        secondarytext : 'var(--secondarytext)'
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
        montserrat:'var(--font-montserrat)',
        anton : 'var(--font-anton)',
      },
    },
  },  
  plugins: [],
  
}