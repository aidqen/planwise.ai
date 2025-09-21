/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
	extend: {
		keyframes: {
			shine: {
				'0%': { backgroundPosition: '0% 0%' },
				'50%': { backgroundPosition: '100% 100%' },
				'100%': { backgroundPosition: '0% 0%' },
			},
			spotlight: {
				"0%": {
					opacity: 0,
					transform: "translate(-72%, -62%) scale(0.5)",
				},
				"100%": {
					opacity: 1,
					transform: "translate(-50%,-40%) scale(1)",
				},
			},
		},
		animation: {
			shine: 'shine var(--duration,14s) linear infinite',
			spotlight: "spotlight 2s ease .75s 1 forwards",
		},
		colors: {
			mainLight: '#fafbfc',
			secondaryLight: '#FFFFFF',
			primary: 'rgb(74 222 128)',
			secondary: 'rgb(59, 130, 246)',
			neutral: 'rgb(156, 163, 175)',
			textColorLight: '#212226',
			foreground: 'var(--foreground)',
			backgroundExp: 'var(--background)',
			backgroundExpLighter: 'var(--background-lighter)',
			sidebar: {
				DEFAULT: 'hsl(var(--sidebar-background))',
				foreground: 'hsl(var(--sidebar-foreground))',
				primary: 'hsl(var(--sidebar-primary))',
				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
				accent: 'hsl(var(--sidebar-accent))',
				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
				border: 'hsl(var(--sidebar-border))',
				ring: 'hsl(var(--sidebar-ring))'
			}
		},
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem'
		},
		borderRadius: {
			lg: 'var(--radius)',
			md: 'calc(var(--radius) - 2px)',
			sm: 'calc(var(--radius) - 4px)'
		},
		fontFamily: {
			sans: ["var(--font-poppins)", "var(--font-rubik)", ...fontFamily.sans],
		},
	},
},
	plugins: [require('tailwindcss-animate')],
}
