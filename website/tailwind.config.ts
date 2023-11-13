import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        anton: ['Anton','sans-serif'],
        montserrat:['Montserrat','sans-serif']
      },
      colors: {
        color1: "#0A0A0A",
        color2: "#101010",
        color3: "#1EFF96",
        color4: "#858486",
        color5: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
export default config
