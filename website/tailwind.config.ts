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
        color1: "#000000",
        color2: "#666666",
        color3: "#979797",
        color4: "#eeeeee",
        color5: "#0088cc",
      },
    },
  },
  plugins: [],
}
export default config
